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
  brandName: 'MEHAR',
  parentCompanyName: 'Lawad Infrastructure Private Limited',
  industry: 'Battery Manufacturing & Energy Storage Solutions',
  registeredOffice: 'Details to be updated with verified corporate address',
  plantLocation: 'Details to be updated with verified plant address',
  salesEmail: 'sales@meharbatteries.com',
  supportEmail: 'info@lawadinfrastructure.com',
  salesPhone: '+91 XXXXX XXXXX',
  whatsappDesk: '+91 XXXXX XXXXX',
  cin: 'UXXXXXXXXXXPTCXXXXXX (Subject to Client Verification)',
  gstin: 'XXAAAAA0000A1Z5 (Subject to Client Verification)',
  isPlaceholderData: true,
};
