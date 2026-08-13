'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  Building2,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialType = searchParams.get('type') || 'rfq';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    cityState: '',
    gstin: '',
    enquiryType:
      initialType === 'oem'
        ? 'CUSTOM_OEM'
        : initialType === 'dealer' || initialType === 'dealership'
        ? 'DEALERSHIP'
        : initialType === 'technical' || initialType === 'engineering'
        ? 'TECHNICAL'
        : 'BULK_RFQ',
    category: initialCategory,
    volumeTier: 'COMMERCIAL_BATCH',
    projectNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="p-8 rounded-2xl bg-[#39D353]/10 border border-[#39D353]/30 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#11161D] border border-[#39D353]/30 flex items-center justify-center text-[#39D353] mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#39D353]">
            Enquiry Received Successfully
          </h3>
          <p className="text-xs text-[#A3AAB5] max-w-md mx-auto leading-relaxed">
            Thank you for contacting <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong>. Your requirement has been registered. Our technical sales team will review your parameters and follow up promptly.
          </p>
          <div className="pt-4">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              size="sm"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                Contact Person Name <span className="text-[#39D353]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                Company / Organization Name <span className="text-[#39D353]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EV Motors Pvt. Ltd."
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                Official Email Address <span className="text-[#39D353]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. ramesh@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                Phone / Mobile Number <span className="text-[#39D353]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                City &amp; State <span className="text-[#39D353]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. New Delhi, Delhi"
                value={formData.cityState}
                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                GSTIN (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 07AAAAA0000A1Z5"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                Enquiry Classification <span className="text-[#39D353]">*</span>
              </label>
              <select
                value={formData.enquiryType}
                onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors font-medium"
              >
                <option value="BULK_RFQ">B2B Bulk Quotation (RFQ)</option>
                <option value="CUSTOM_OEM">Custom OEM Battery Pack Engineering</option>
                <option value="DEALERSHIP">Authorized Dealership / Distribution</option>
                <option value="TECHNICAL">Technical Specifications Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                Primary Category of Interest
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors font-medium"
              >
                <option value="">-- Select Battery Category --</option>
                {BROAD_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Estimated Procurement / Production Volume
            </label>
            <select
              value={formData.volumeTier}
              onChange={(e) => setFormData({ ...formData, volumeTier: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors font-medium"
            >
              <option value="PILOT">Evaluation &amp; Testing Batch (1 – 10 Units)</option>
              <option value="COMMERCIAL_BATCH">Commercial Production Batch (50 – 200 Units)</option>
              <option value="OEM_ANNUAL">OEM Annual Supply Contract (500+ Units/Month)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Project Scope &amp; Technical Requirements
            </label>
            <textarea
              rows={4}
              placeholder="Specify target vehicle/application, voltage requirements, desired runtime, or custom enclosure dimensions..."
              value={formData.projectNotes}
              onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center"
            icon={<Send className="w-4 h-4" />}
          >
            Submit Official B2B Inquiry
          </Button>

          <p className="text-[11px] text-[#A3AAB5] text-center font-mono font-medium">
            Strictly B2B &amp; Wholesale. No consumer retail inquiries.
          </p>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="py-12 space-y-16 bg-[#0B0F14] text-[#E6EAF0]">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="green">B2B Commercial &amp; OEM Desk</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#E6EAF0] tracking-tight">
              Contact &amp; Business Enquiry
            </h1>
            <p className="text-sm sm:text-base text-[#A3AAB5] leading-relaxed">
              Connect directly with the commercial and engineering team at <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong> for brand <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong> battery procurement, custom OEM pack design, or regional distribution partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Corporate Details */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#11161D] border border-[#1E2633] rounded-3xl p-8 sm:p-10 shadow-xl">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#E6EAF0] flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#39D353]" />
                B2B Quotation &amp; Enquiry Form
              </h2>
              <p className="text-xs text-[#A3AAB5] mt-1">
                Please complete your company and requirement details. Our commercial sales desk will respond within 24 business hours.
              </p>
            </div>

            <Suspense fallback={<div className="p-8 text-center text-xs text-[#A3AAB5]">Loading enquiry form...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Right Column: Corporate & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Sales Card */}
            <div className="p-8 rounded-3xl bg-[#11161D] border border-[#1E2633] space-y-6 shadow-xl">
              <h3 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#39D353]" />
                Direct B2B Sales Desk
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] space-y-1">
                  <span className="text-[#A3AAB5] font-mono text-[10px] uppercase font-bold block">
                    Official Sales Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.salesEmail}`}
                    className="text-[#E6EAF0] font-mono font-bold hover:text-[#39D353] transition-colors block"
                  >
                    {COMPANY_INFO.salesEmail}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] space-y-1">
                  <span className="text-[#A3AAB5] font-mono text-[10px] uppercase font-bold block">
                    General Corporate Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.supportEmail}`}
                    className="text-[#E6EAF0] font-mono font-bold hover:text-[#39D353] transition-colors block"
                  >
                    {COMPANY_INFO.supportEmail}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] space-y-2">
                  <span className="text-[#A3AAB5] font-mono text-[10px] uppercase font-bold block">
                    Instant WhatsApp Sales Connect
                  </span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20am%20contacting%20MEHAR%20regarding%20B2B%20battery%20procurement.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#39D353] hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" /> Connect with Sales Desk
                  </a>
                </div>
              </div>
            </div>

            {/* Corporate Location Details */}
            <div className="p-8 rounded-3xl bg-[#11161D] border border-[#1E2633] space-y-5 shadow-xl">
              <h3 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#39D353]" />
                Corporate &amp; Facility Locations
              </h3>

              <div className="space-y-4 text-xs font-mono text-[#E6EAF0]">
                <div className="space-y-1">
                  <span className="text-[#E6EAF0] font-bold block">Registered Corporate Office:</span>
                  <p className="text-[#A3AAB5]">{COMPANY_INFO.registeredOffice}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[#E6EAF0] font-bold block">Manufacturing &amp; Assembly Unit:</span>
                  <p className="text-[#A3AAB5]">{COMPANY_INFO.plantLocation}</p>
                </div>
              </div>

              <PlaceholderNotice message="Exact facility addresses and location map will be embedded upon receipt of verified client corporate records." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
