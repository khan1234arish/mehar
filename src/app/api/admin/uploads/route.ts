import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { validateImageBuffer } from '@/lib/uploadValidation';
import { saveUploadedFile, isProductionStorageConfigured } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
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

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as 'products' | 'placeholders') || 'products';

    if (!file) {
      return NextResponse.json({ error: 'No image file provided in upload.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Binary Magic Bytes & File Security Validation
    const validation = validateImageBuffer(buffer, file.name, file.type);
    if (!validation.valid || !validation.sanitizedExtension) {
      return NextResponse.json(
        { error: validation.error || 'File validation failed.' },
        { status: 400 }
      );
    }

    // 2. Provider-Independent Storage Dispatch
    const stored = await saveUploadedFile(buffer, folder, validation.sanitizedExtension);

    // 3. Audit Logging
    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'IMAGE_UPLOAD',
      entityType: 'MediaUpload',
      entityId: stored.storageKey,
      metadata: {
        originalName: file.name,
        sizeBytes: buffer.length,
        detectedMime: validation.detectedMime,
        storageProvider: stored.provider,
        isPersistent: stored.isPersistentProductionStorage,
      },
      request,
    });

    return NextResponse.json({
      success: true,
      url: stored.url,
      storageKey: stored.storageKey,
      detectedMime: validation.detectedMime,
      provider: stored.provider,
      isPersistentProductionStorage: stored.isPersistentProductionStorage,
      storageNotice: stored.isPersistentProductionStorage
        ? 'Stored on persistent cloud object storage.'
        : 'Development mode: stored on local filesystem. Configure S3/R2 object storage for persistent production deployments.',
    });
  } catch (error) {
    console.error('File upload handling error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while processing the file upload.' },
      { status: 500 }
    );
  }
}
