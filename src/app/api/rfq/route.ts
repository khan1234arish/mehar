import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      companyName,
      contactPerson,
      email,
      phone,
      cityState,
      gstin,
      categories,
      targetVoltage,
      targetCapacity,
      continuousCurrent,
      peakCurrent,
      dimensionEnvelope,
      chemistryPreference,
      bmsProtocol,
      volumeTier,
      timeline,
      notes,
    } = body;

    // Validate essential B2B fields
    if (!companyName || !contactPerson || !email || !phone) {
      return NextResponse.json(
        { error: 'Company Name, Contact Person, Official Email, and Phone are required.' },
        { status: 400 }
      );
    }

    // Generate unique RFQ reference number
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const rfqNumber = `MEHAR-RFQ-2026-${randomSuffix}`;

    const cityParts = (cityState || '').split(',');
    const city = cityParts[0]?.trim() || 'Unspecified';
    const state = cityParts[1]?.trim() || 'India';

    const customNotesSummary = JSON.stringify({
      targetVoltage: targetVoltage || 'Unspecified',
      targetCapacity: targetCapacity || 'Unspecified',
      continuousCurrent: continuousCurrent || 'Unspecified',
      peakCurrent: peakCurrent || 'Unspecified',
      dimensionEnvelope: dimensionEnvelope || 'Unspecified',
      chemistryPreference: chemistryPreference || 'NOT_SURE',
      bmsProtocol: bmsProtocol || 'STANDARD',
      categories: categories || [],
      userNotes: notes || '',
    });

    // Store in PostgreSQL via Prisma if available
    try {
      if (prisma) {
        await prisma.rfqRequest.create({
          data: {
            rfqNumber,
            companyName,
            contactPerson,
            email,
            phone,
            gstin: gstin || null,
            businessType: 'B2B_PROCUREMENT',
            city,
            state,
            projectTimeline: timeline || 'WITHIN_30_DAYS',
            volumeTier: volumeTier || 'COMMERCIAL_BATCH',
            customNotes: customNotesSummary,
            status: 'NEW',
          },
        });
      }
    } catch (dbError) {
      console.warn('PostgreSQL write skipped or pending migration:', dbError);
    }

    return NextResponse.json({
      success: true,
      rfqNumber,
      message: 'Official B2B RFQ registered successfully. Our commercial sales engineers will evaluate your requirements within 24 business hours.',
    });
  } catch (error) {
    console.error('Error processing RFQ:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your quotation request.' },
      { status: 500 }
    );
  }
}
