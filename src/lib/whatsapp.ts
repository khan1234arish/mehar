import { COMPANY_INFO } from '@/data/companyInfo';

/**
 * Validates and cleans a raw phone number into standard international WhatsApp digits.
 * Indian mobile numbers must have 10 digits (prefixed by 91 -> 12 digits total).
 * Returns null if the number is placeholder, invalid, or incomplete.
 */
export function getCleanWhatsAppDigits(rawNumber?: string | null): string | null {
  const num = rawNumber || COMPANY_INFO.whatsappDesk;
  if (!num) return null;

  // Detect placeholder strings like "+91 XXXXX XXXXX" or "UXXXXXXXXXX"
  if (num.includes('X') || num.includes('x')) {
    return null;
  }

  const digits = num.replace(/[^0-9]/g, '');

  // If starts with 91 and has 12 digits (e.g. 919876543210)
  if (digits.startsWith('91') && digits.length === 12) {
    const firstMobileDigit = digits[2];
    if (['6', '7', '8', '9'].includes(firstMobileDigit)) {
      return digits;
    }
  }

  // If 10 digits (standard Indian mobile starting with 6-9)
  if (digits.length === 10) {
    const firstMobileDigit = digits[0];
    if (['6', '7', '8', '9'].includes(firstMobileDigit)) {
      return `91${digits}`;
    }
  }

  // If it's a valid international number of 10-15 digits
  if (digits.length >= 10 && digits.length <= 15) {
    return digits;
  }

  return null;
}

/**
 * Builds a direct WhatsApp click-to-chat URL.
 * If the number is not yet configured or is a placeholder, gracefully falls back
 * to the internal `/contact` page with the prefilled note so users never hit a broken `wa.me/91` link.
 */
export function getWhatsAppUrl(text?: string, rawNumber?: string | null): string {
  const cleanDigits = getCleanWhatsAppDigits(rawNumber);

  if (!cleanDigits) {
    // Graceful fallback to contact page
    if (text) {
      return `/contact?note=${encodeURIComponent(text)}`;
    }
    return '/contact';
  }

  const baseUrl = `https://wa.me/${cleanDigits}`;
  if (text) {
    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  }
  return baseUrl;
}
