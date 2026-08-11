import { prisma } from '@/lib/prisma';

export async function logAdminAudit(params: {
  userId?: string;
  adminEmail?: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | string;
  request?: Request;
}): Promise<void> {
  try {
    if (!prisma) return;

    let ipAddress: string | null = null;
    if (params.request) {
      ipAddress =
        params.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        params.request.headers.get('x-real-ip') ||
        '127.0.0.1';
    }

    const metadataString =
      typeof params.metadata === 'object'
        ? JSON.stringify(params.metadata)
        : params.metadata || null;

    await prisma.auditLog.create({
      data: {
        userId: params.userId || null,
        adminEmail: params.adminEmail || null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        metadata: metadataString,
        ipAddress,
      },
    });
  } catch (error) {
    // Append-only audit logger logs error to server console without blocking response
    console.error('Failed to write audit log entry:', error);
  }
}
