import { z } from 'zod';

// ─── Login Schema ─────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

// ─── Password Change Schema (Enforces enterprise complexity) ──────────────────
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z
      .string()
      .min(10, 'New password must be at least 10 characters long.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Password must contain at least one numerical digit.')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New passwords do not match.',
    path: ['confirmPassword'],
  });

// ─── Product Spec Schema ──────────────────────────────────────────────────────
export const productSpecSchema = z.object({
  groupName: z.string().trim().min(1, 'Group name is required.'),
  specKey: z.string().trim().min(1, 'Spec key is required.'),
  specValue: z.string().trim().min(1, 'Spec value is required.'),
  specUnit: z.string().trim().optional().nullable(),
  isHighlight: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

// ─── Product Create/Update Schema ─────────────────────────────────────────────
export const productSchema = z.object({
  name: z.string().trim().min(2, 'Product name is required (min 2 chars).').max(200),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase alphanumeric characters and hyphens.'),
  categoryId: z.string().trim().min(1, 'Category is required.'),
  modelNumber: z.string().trim().max(100).optional().nullable(),
  shortDescription: z.string().trim().min(5, 'Short description is required.').max(1000),
  applicationTag: z.string().trim().min(2, 'Application tag is required.').max(100),
  chemistry: z.string().trim().max(100).optional().nullable(),
  voltageRange: z.string().trim().max(100).optional().nullable(),
  capacityRange: z.string().trim().max(100).optional().nullable(),
  energyRange: z.string().trim().max(100).optional().nullable(),
  cycleLife: z.string().trim().max(100).optional().nullable(),
  maxDischargeRate: z.string().trim().max(100).optional().nullable(),
  operatingTemp: z.string().trim().max(100).optional().nullable(),
  bmsProtocols: z.string().trim().max(200).optional().nullable(),
  ipRating: z.string().trim().max(50).optional().nullable(),
  dimensions: z.string().trim().max(100).optional().nullable(),
  weight: z.string().trim().max(50).optional().nullable(),
  warrantySummary: z.string().trim().max(200).optional().nullable(),
  placeholderNote: z.string().trim().max(500).optional().nullable(),
  tdsFileUrl: z.string().trim().max(500).optional().nullable(),
  imageUrl: z.string().trim().max(500).optional().nullable(),
  minimumOrderQuantity: z.number().int('MOQ must be an integer.').positive('MOQ must be greater than 0.').optional().nullable(),
  publishStatus: z.enum(['DRAFT', 'PENDING_VERIFICATION', 'VERIFIED', 'ARCHIVED']).default('DRAFT'),
  isPublished: z.boolean().default(false),
  isPlaceholder: z.boolean().default(false),
  specifications: z.array(productSpecSchema).optional(),
});

// ─── Product Image Schema ────────────────────────────────────────────────────
export const productImageSchema = z.object({
  imageUrl: z.string().trim().min(1, 'Image URL or path is required.'),
  altText: z.string().trim().max(200).optional().nullable(),
  sortOrder: z.number().int().default(0),
  isPrimary: z.boolean().default(false),
  isPublished: z.boolean().default(false), // Starts unpublished as per rule #2
  isArchived: z.boolean().default(false),
});

// ─── Site Managed Placeholder Image Schema ────────────────────────────────────
export const siteManagedImageSchema = z.object({
  key: z.string().trim().min(1, 'Key is required.'),
  imageUrl: z.string().trim().min(1, 'Image URL is required.'),
  altText: z.string().trim().min(1, 'Alt text is required.').max(200),
  description: z.string().trim().max(500).optional().nullable(),
  isActive: z.boolean().default(true),
});

// ─── Company Settings Schema ──────────────────────────────────────────────────
export const companySettingsSchema = z.object({
  brandName: z.string().trim().min(1, 'Brand name is required.').max(100),
  parentCompanyName: z.string().trim().min(1, 'Parent company name is required.').max(200),
  industry: z.string().trim().min(1).max(200),
  registeredOffice: z.string().trim().min(1).max(500),
  plantLocation: z.string().trim().min(1).max(500),
  cin: z.string().trim().max(50).optional().nullable(),
  gstin: z.string().trim().max(50).optional().nullable(),
  website: z.string().trim().max(200).optional().nullable(),
  socialLinkedIn: z.string().trim().max(200).optional().nullable(),
  socialTwitter: z.string().trim().max(200).optional().nullable(),
});

// ─── Sales & Contact Settings Schema ──────────────────────────────────────────
export const salesSettingsSchema = z.object({
  salesEmail: z.string().trim().email('Please enter a valid sales email address.'),
  supportEmail: z.string().trim().email('Please enter a valid support email address.'),
  engineeringEmail: z.string().trim().email('Please enter a valid engineering email address.').optional().nullable(),
  salesPhone: z.string().trim().min(5, 'Sales phone is required.').max(50),
  whatsappDesk: z.string().trim().min(5, 'WhatsApp desk number is required.').max(50),
  engineeringWhatsapp: z.string().trim().max(50).optional().nullable(),
  callbackPhone: z.string().trim().max(50).optional().nullable(),
});

// ─── Website Content Schema ───────────────────────────────────────────────────
export const contentSettingsSchema = z.object({
  heroHeadline: z.string().trim().min(5).max(300),
  heroSubheadline: z.string().trim().min(5).max(1000),
  topBarText: z.string().trim().max(300).optional().nullable(),
  footerDisclaimer: z.string().trim().max(1000).optional().nullable(),
});

// ─── Resource Document Schema ─────────────────────────────────────────────────
export const resourceSchema = z.object({
  title: z.string().trim().min(2, 'Resource title is required.').max(200),
  category: z.string().trim().min(2).max(100),
  description: z.string().trim().max(1000).optional().nullable(),
  fileUrl: z.string().trim().min(1, 'File URL is required.').max(500),
  fileType: z.string().trim().min(2).max(50).default('PDF'),
  fileSize: z.string().trim().max(50).optional().nullable(),
  isGated: z.boolean().default(false),
  isPlaceholder: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

// ─── Enquiry Status Update Schema ─────────────────────────────────────────────
export const enquiryStatusSchema = z.object({
  status: z.string().trim().min(1, 'Status is required.'),
  internalNotes: z.string().trim().max(2000).optional().nullable(),
});
