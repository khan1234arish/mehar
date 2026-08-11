import crypto from 'crypto';

const CSRF_SECRET = process.env.JWT_SECRET || 'mehar_b2b_csrf_secret_key_minimum_32_characters';

/**
 * Generates a signed CSRF token tied to the user's ID
 */
export function generateCsrfToken(userId: string): string {
  const timestamp = Date.now().toString();
  const data = `${userId}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', CSRF_SECRET).update(data).digest('hex');
  return `${data}:${hmac}`;
}

/**
 * Validates a submitted CSRF token against the authenticated user's ID.
 * Tokens expire after 12 hours.
 */
export function verifyCsrfToken(token: string | null | undefined, userId: string): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split(':');
  if (parts.length !== 3) return false;

  const [tokenUserId, timestampStr, hmac] = parts;

  // Verify user matches
  if (tokenUserId !== userId) return false;

  // Verify expiration (12 hours)
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp) || Date.now() - timestamp > 12 * 60 * 60 * 1000) {
    return false;
  }

  // Verify HMAC signature
  const expectedData = `${tokenUserId}:${timestampStr}`;
  const expectedHmac = crypto.createHmac('sha256', CSRF_SECRET).update(expectedData).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac));
}

/**
 * Validates CSRF header for state-changing HTTP requests (POST, PUT, DELETE, PATCH).
 */
export function requireCsrfHeader(request: Request, userId: string): { valid: boolean; error?: string } {
  const method = request.method.toUpperCase();

  // Safe HTTP methods do not require CSRF token
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return { valid: true };
  }

  const csrfHeader = request.headers.get('x-csrf-token') || request.headers.get('x-xsrf-token');

  if (!csrfHeader) {
    return {
      valid: false,
      error: 'Security Error: Missing X-CSRF-Token header in state-changing request.',
    };
  }

  const isValid = verifyCsrfToken(csrfHeader, userId);
  if (!isValid) {
    return {
      valid: false,
      error: 'Security Error: Invalid or expired CSRF token. Please refresh your session.',
    };
  }

  return { valid: true };
}
