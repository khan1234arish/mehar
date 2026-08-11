import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Accepted file types for OEM attachment uploads
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/msword',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/octet-stream', // generic binary for CAD exports
  'model/step',
  'model/iges',
];

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_FILES = 5;

function generateEnquiryNumber(): string {
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `MEHAR-OEM-${year}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let fields: Record<string, string> = {};
    let attachmentMetadata: Array<{ name: string; size: number; type: string }> = [];

    if (contentType.includes('multipart/form-data')) {
      // Parse multipart form data
      const formData = await request.formData();

      // Extract text fields
      Array.from(formData.entries()).forEach(([key, value]) => {
        if (typeof value === 'string') {
          fields[key] = value;
        }
      });

      // Validate and extract file metadata
      const files = formData.getAll('attachments') as File[];

      if (files.length > MAX_FILES) {
        return NextResponse.json(
          { error: `Maximum ${MAX_FILES} files allowed.` },
          { status: 400 }
        );
      }

      for (const file of files) {
        if (!(file instanceof File) || file.size === 0) continue;

        // Validate size
        if (file.size > MAX_FILE_SIZE_BYTES) {
          return NextResponse.json(
            { error: `File "${file.name}" exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB.` },
            { status: 400 }
          );
        }

        // Validate filename (sanitize path characters)
        const safeName = file.name.replace(/[^a-zA-Z0-9._\- ]/g, '_');

        // Validate type
        const isAllowedType =
          ALLOWED_TYPES.includes(file.type) ||
          safeName.match(/\.(pdf|jpg|jpeg|png|webp|docx|doc|xlsx|xls|step|stp|iges|igs|dwg|dxf)$/i);

        if (!isAllowedType) {
          return NextResponse.json(
            { error: `File type not accepted for "${file.name}". Allowed: PDF, images, Office docs, CAD files.` },
            { status: 400 }
          );
        }

        // Store validated metadata for technical scoping
        attachmentMetadata.push({
          name: safeName,
          size: file.size,
          type: file.type || 'application/octet-stream',
        });
      }
    } else {
      // JSON fallback (for clients without file attachments)
      fields = await request.json();
    }

    // ── Validate required B2B fields ──────────────────────────────
    const { companyName, contactPerson, email, phone, city, state, applicationType } = fields;

    if (!companyName || !contactPerson || !email || !phone || !applicationType) {
      return NextResponse.json(
        { error: 'Company name, contact person, email, phone, and application type are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid business email address.' },
        { status: 400 }
      );
    }

    // ── Generate unique enquiry reference ────────────────────────
    const enquiryNumber = generateEnquiryNumber();

    // ── Check Prisma availability & persist to PostgreSQL ─────────
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database service is temporarily unavailable. Please contact our engineering desk directly.' },
        { status: 503 }
      );
    }

    try {
      await prisma.oemEnquiry.create({
        data: {
          enquiryNumber,
          companyName,
          contactPerson,
          email,
          phone,
          city: city || 'Unspecified',
          state: state || 'India',
          country: fields.country || 'India',
          gstin: fields.gstin || null,
          website: fields.website || null,
          applicationType,
          applicationDetail: fields.applicationDetail || null,
          electricalRequirements: fields.electricalRequirements || null,
          mechanicalRequirements: fields.mechanicalRequirements || null,
          bmsRequirements: fields.bmsRequirements || null,
          environmentalRequirements: fields.environmentalRequirements || null,
          commercialRequirements: fields.commercialRequirements || null,
          attachmentMetadata:
            attachmentMetadata.length > 0
              ? JSON.stringify(attachmentMetadata)
              : null,
          status: 'NEW',
        },
      });
    } catch (dbError) {
      console.error('Database write error during OEM enquiry persistence:', dbError);
      // Strictly return error response so customer is NOT falsely told it succeeded
      return NextResponse.json(
        {
          error: 'We were unable to save your OEM engineering enquiry to the database. Please try again or contact our engineering desk directly.',
        },
        { status: 500 }
      );
    }

    // ── Build pre-filled WhatsApp message ────────────────────────
    const waText = [
      `OEM Enquiry Reference: ${enquiryNumber}`,
      `Company: ${companyName}`,
      `Application: ${applicationType}`,
      `Contact: ${contactPerson} | ${phone}`,
      'Please evaluate the attached customer requirements.',
    ].join('\n');

    return NextResponse.json({
      success: true,
      enquiryNumber,
      waText: encodeURIComponent(waText),
      message:
        'Your OEM engineering enquiry has been registered. Our engineering team will review your requirements and be in touch within 2 business days.',
    });
  } catch (error) {
    console.error('Error processing OEM enquiry:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your enquiry. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
