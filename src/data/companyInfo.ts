export interface CompanyMetadata {
  brandName: string;
  parentCompanyName: string;
  industry: string;
  registeredOffice: string;
  plantLocation: string;
  salesEmail: string;
  supportEmail: string;
  salesPhone: string;
  whatsappDesk: string;
  cin: string;
  gstin: string;
  isPlaceholderData: boolean;
}

export const COMPANY_INFO: CompanyMetadata = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || 'MEHAR',
  parentCompanyName: process.env.NEXT_PUBLIC_PARENT_COMPANY || 'Lawad Infrastructure Private Limited',
  industry: 'Lithium Battery Pack Manufacturing & Energy Storage Systems',
  registeredOffice: process.env.NEXT_PUBLIC_REGISTERED_OFFICE || 'Details subject to final corporate verification',
  plantLocation: process.env.NEXT_PUBLIC_PLANT_LOCATION || 'Details subject to final corporate verification',
  salesEmail: process.env.NEXT_PUBLIC_SALES_EMAIL || 'sales@meharbatteries.com',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'info@lawadinfrastructure.com',
  salesPhone: process.env.NEXT_PUBLIC_SALES_PHONE || '+91 XXXXX XXXXX',
  whatsappDesk: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 XXXXX XXXXX',
  cin: process.env.NEXT_PUBLIC_CIN || 'UXXXXXXXXXXPTCXXXXXX (Subject to Client Corporate Verification)',
  gstin: process.env.NEXT_PUBLIC_GSTIN || 'XXAAAAA0000A1Z5 (Subject to Client Corporate Verification)',
  isPlaceholderData: true,
};
