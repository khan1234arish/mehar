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

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid business email address.' },
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

    // Check Prisma database availability and persist
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database service is temporarily unavailable. Please contact our commercial sales desk directly.' },
        { status: 503 }
      );
    }

    try {
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
    } catch (dbError) {
      console.error('Database write error during RFQ persistence:', dbError);
      // Strictly return error response so customer is NOT falsely told it succeeded
      return NextResponse.json(
        {
          error: 'We were unable to save your quotation request to the database. Please try again or contact our sales desk directly.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      rfqNumber,
      message: 'Official B2B RFQ registered successfully. Our commercial sales engineers will evaluate your requirements within 24 business hours.',
    });
  } catch (error) {
    console.error('Error processing RFQ request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your quotation request. Please try again.' },
      { status: 500 }
    );
  }
}
