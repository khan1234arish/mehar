export interface UploadValidationResult {
  valid: boolean;
  error?: string;
  detectedMime?: string;
  sanitizedExtension?: string;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

export function validateImageBuffer(
  buffer: Buffer,
  originalFilename: string,
  declaredMimeType: string
): UploadValidationResult {
  // 1. Size check
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed limit of 5 MB (received ${(buffer.length / (1024 * 1024)).toFixed(2)} MB).`,
    };
  }

  // 2. Extension check
  const dotIndex = originalFilename.lastIndexOf('.');
  if (dotIndex === -1) {
    return { valid: false, error: 'File must have an extension (.jpg, .png, .webp, .svg).' };
  }
  const ext = originalFilename.substring(dotIndex).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file extension "${ext}". Allowed formats: JPG, JPEG, PNG, WebP, SVG.`,
    };
  }

  // 3. Binary Magic Byte Validation (Do NOT trust client-declared MIME type alone)
  // JPEG: FF D8 FF
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedMime: 'image/jpeg', sanitizedExtension: '.jpg' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, detectedMime: 'image/png', sanitizedExtension: '.png' };
  }

  // WebP: RIFF ... WEBP (Bytes 0-3: 52 49 46 46, Bytes 8-11: 57 45 42 50)
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, detectedMime: 'image/webp', sanitizedExtension: '.webp' };
  }

  // SVG: Inspect text content for <svg xmlns tag without script injection
  if (ext === '.svg' || declaredMimeType.includes('svg')) {
    const textContent = buffer.toString('utf8', 0, Math.min(buffer.length, 2048));
    if (textContent.includes('<svg') || textContent.includes('<?xml')) {
      // Security: Disallow inline script tags inside SVG
      if (textContent.toLowerCase().includes('<script') || textContent.toLowerCase().includes('javascript:')) {
        return { valid: false, error: 'SVG file contains disallowed executable scripts.' };
      }
      return { valid: true, detectedMime: 'image/svg+xml', sanitizedExtension: '.svg' };
    }
  }

  return {
    valid: false,
    error: 'File content does not match a verified image format (corrupted header or invalid binary signature).',
  };
}
