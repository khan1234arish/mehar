import { track } from '@vercel/analytics';

/**
 * Safe B2B Analytics Tracker (Vercel Web Analytics)
 *
 * Privacy & Security Rules:
 * - NO personal identification data (PII: names, emails, phone numbers, addresses, GSTIN).
 * - NO form message bodies or sensitive credentials.
 * - Captures high-level B2B interaction milestones only (category visits, RFQ initiation, OEM configurator steps, finder runs).
 */

export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean | null>) {
  try {
    if (typeof window !== 'undefined') {
      // Filter out any accidentally passed null/undefined/sensitive values
      const sanitizedProps: Record<string, string | number | boolean> = {};
      if (properties) {
        for (const [key, val] of Object.entries(properties)) {
          if (val !== null && val !== undefined) {
            sanitizedProps[key] = val;
          }
        }
      }
      track(eventName, sanitizedProps);
    }
  } catch {
    // Fail silently without interrupting user experience
  }
}

export const analytics = {
  // Navigation & Product Catalogue
  viewCategory: (categorySlug: string) => {
    trackEvent('category_viewed', { category: categorySlug });
  },

  viewProduct: (productSlug: string, categorySlug?: string) => {
    trackEvent('product_viewed', { product: productSlug, category: categorySlug || 'general' });
  },

  // B2B Conversion Funnel
  rfqStart: (source?: string, categorySlug?: string, productSlug?: string) => {
    trackEvent('rfq_started', {
      source: source || 'button',
      category: categorySlug || 'none',
      product: productSlug || 'none',
    });
  },

  rfqSubmit: (itemCount: number, hasGstin: boolean, projectTimeline: string, volumeTier: string) => {
    trackEvent('rfq_submitted', {
      item_count: itemCount,
      has_gstin: hasGstin,
      timeline: projectTimeline,
      volume_tier: volumeTier,
    });
  },

  // OEM Custom Solutions
  oemConfigStart: () => {
    trackEvent('oem_configurator_started');
  },

  oemConfigStep: (stepNumber: number, stepName: string) => {
    trackEvent('oem_configurator_step', { step: stepNumber, name: stepName });
  },

  oemSubmit: (applicationType: string, bmsRequired: boolean) => {
    trackEvent('oem_inquiry_submitted', {
      application_type: applicationType,
      bms_required: bmsRequired,
    });
  },

  // Engineering Tools & Utilities
  useFinder: (vehicleType?: string, voltage?: string) => {
    trackEvent('battery_finder_used', {
      vehicle_type: vehicleType || 'any',
      voltage: voltage || 'any',
    });
  },

  useCompare: (productCount: number) => {
    trackEvent('matrix_compare_used', { products_compared: productCount });
  },

  // Contact & Sales Desk Interactivity
  clickWhatsApp: (sourceLocation: string, contextProduct?: string) => {
    trackEvent('contact_whatsapp_clicked', {
      location: sourceLocation,
      product: contextProduct || 'general',
    });
  },

  clickCallDesk: (sourceLocation: string) => {
    trackEvent('contact_phone_clicked', { location: sourceLocation });
  },

  clickEmailDesk: (sourceLocation: string) => {
    trackEvent('contact_email_clicked', { location: sourceLocation });
  },

  // Technical Resources & Downloads
  downloadResource: (resourceTitle: string, category: string) => {
    trackEvent('resource_downloaded', {
      resource_title: resourceTitle,
      category: category,
    });
  },
};
