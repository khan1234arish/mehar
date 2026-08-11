import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import {
  getCompanySettings,
  getSalesSettings,
  getContentSettings,
  saveSystemSetting,
} from '@/lib/settings';
import {
  companySettingsSchema,
  salesSettingsSchema,
  contentSettingsSchema,
} from '@/lib/validations/admin';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession(request);
    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized' },
        { status: session.statusCode || 401 }
      );
    }

    const [company, sales, content] = await Promise.all([
      getCompanySettings(),
      getSalesSettings(),
      getContentSettings(),
    ]);

    return NextResponse.json({ company, sales, content });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading system settings.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await verifyAdminSession(request);
    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized' },
        { status: session.statusCode || 401 }
      );
    }

    const csrfCheck = requireCsrfHeader(request, session.user.id);
    if (!csrfCheck.valid) {
      return NextResponse.json({ error: csrfCheck.error }, { status: 403 });
    }

    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { error: 'Missing section identifier or settings data.' },
        { status: 400 }
      );
    }

    let validatedData: Record<string, unknown>;

    if (section === 'company') {
      const parsed = companySettingsSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || 'Invalid company settings.' },
          { status: 400 }
        );
      }
      validatedData = parsed.data;
      await saveSystemSetting('company_settings', validatedData, session.user.email);
    } else if (section === 'sales') {
      const parsed = salesSettingsSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || 'Invalid sales contact settings.' },
          { status: 400 }
        );
      }
      validatedData = parsed.data;
      await saveSystemSetting('sales_settings', validatedData, session.user.email);
    } else if (section === 'content') {
      const parsed = contentSettingsSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || 'Invalid content parameters.' },
          { status: 400 }
        );
      }
      validatedData = parsed.data;
      await saveSystemSetting('content_settings', validatedData, session.user.email);
    } else {
      return NextResponse.json({ error: 'Unknown settings section specified.' }, { status: 400 });
    }

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'SETTINGS_UPDATE',
      entityType: 'SystemSetting',
      entityId: section,
      metadata: { section },
      request,
    });

    return NextResponse.json({
      success: true,
      message: `${section.toUpperCase()} settings saved and applied to the public website.`,
      data: validatedData,
    });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'An error occurred while saving system settings.' },
      { status: 500 }
    );
  }
}
