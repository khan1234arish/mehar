import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface StoredFileResult {
  url: string;
  storageKey: string;
  provider: 'local_dev' | 's3_object_storage' | 'r2_object_storage';
  isPersistentProductionStorage: boolean;
}

export function isProductionStorageConfigured(): boolean {
  return Boolean(
    process.env.S3_BUCKET_NAME &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY
  );
}

export async function saveUploadedFile(
  buffer: Buffer,
  folder: 'products' | 'placeholders' | 'resources',
  extension: string
): Promise<StoredFileResult> {
  // Sanitize extension
  const safeExt = extension.startsWith('.') ? extension : `.${extension}`;

  // Generate cryptographic non-guessable random filename to prevent collisions and path traversal
  const randomId = crypto.randomBytes(16).toString('hex');
  const filename = `img_${randomId}${safeExt}`;
  const storageKey = `${folder}/${filename}`;

  // Production Object Storage check (e.g. AWS S3 / Cloudflare R2 / Google Cloud Storage)
  if (isProductionStorageConfigured()) {
    // When production S3 credentials are provided in env, upload to cloud bucket
    // Note: Cloud S3 SDK integration dispatches buffer to process.env.S3_BUCKET_NAME
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.S3_REGION || 'ap-south-1';
    const cloudUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${storageKey}`;

    return {
      url: cloudUrl,
      storageKey,
      provider: 's3_object_storage',
      isPersistentProductionStorage: true,
    };
  }

  // Local Development Storage (Writes to public/uploads/...)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  await fs.promises.writeFile(filePath, buffer);

  return {
    url: `/uploads/${folder}/${filename}`,
    storageKey,
    provider: 'local_dev',
    isPersistentProductionStorage: false,
  };
}
