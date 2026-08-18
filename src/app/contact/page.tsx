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
        <div className="p-8 rounded-2xl bg-theme-green/10 border border-theme-green/30 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-theme-card border border-theme-green/30 flex items-center justify-center text-theme-green mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-theme-green">
            Enquiry Received Successfully
          </h3>
          <p className="text-xs text-theme-secondary max-w-md mx-auto leading-relaxed">
            Thank you for contacting <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong>. Your requirement has been registered. Our technical sales team will review your parameters and follow up promptly.
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
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                Contact Person Name <span className="text-theme-green">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                Company / Organization Name <span className="text-theme-green">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EV Motors Pvt. Ltd."
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                Official Email Address <span className="text-theme-green">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. ramesh@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                Phone / Mobile Number <span className="text-theme-green">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                City &amp; State <span className="text-theme-green">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pune, Maharashtra"
                value={formData.cityState}
                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                GSTIN / Tax ID <span className="text-theme-muted font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 27AAAAA0000A1Z5"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                Enquiry Classification
              </label>
              <select
                value={formData.enquiryType}
                onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              >
                <option value="BULK_RFQ">Bulk Production RFQ</option>
                <option value="CUSTOM_OEM">Custom OEM Engineering</option>
                <option value="DEALERSHIP">Dealership &amp; Distribution</option>
                <option value="TECHNICAL">Technical Consultation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                Target Battery Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              >
                <option value="">General / Multiple Categories</option>
                {BROAD_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-theme-secondary block">
                Target Order Volume
              </label>
              <select
                value={formData.volumeTier}
                onChange={(e) => setFormData({ ...formData, volumeTier: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
              >
                <option value="PROTOTYPE">Prototype / Sample (1-10 units)</option>
                <option value="COMMERCIAL_BATCH">Commercial Pilot (10-50 units)</option>
                <option value="PRODUCTION_RUN">Production Batch (50-200 units)</option>
                <option value="ANNUAL_CONTRACT">Annual Supply Contract (200+ units)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Application Context &amp; Technical Requirements <span className="text-theme-green">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe your equipment voltage, continuous discharge current, mechanical constraints, target duty cycle, or any specific BMS telemetry needs..."
              value={formData.projectNotes}
              onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={<Send className="w-4 h-4" />}
            >
              Submit Official B2B Enquiry
            </Button>
          </div>

          <p className="text-[11px] text-theme-muted text-center font-mono">
            Strictly B2B &amp; Wholesale. No consumer retail inquiries.
          </p>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="py-8 sm:py-12 space-y-10 sm:space-y-16 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-5 sm:p-8 lg:p-12 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-3 sm:space-y-4 relative z-10">
            <Badge variant="green">B2B Commercial &amp; OEM Desk</Badge>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-theme-primary tracking-tight">
              Contact &amp; Business Enquiry
            </h1>
            <p className="text-xs sm:text-base text-theme-secondary leading-relaxed">
              Connect directly with the commercial and engineering team at <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> for brand <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong> battery procurement, custom OEM pack design, or regional distribution partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Corporate Details */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-theme-card border border-theme-border rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-theme-primary flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-theme-green shrink-0" />
                B2B Quotation &amp; Enquiry Form
              </h2>
              <p className="text-xs text-theme-secondary mt-1">
                Please complete your company and requirement details. Our commercial sales desk will respond within 24 business hours.
              </p>
            </div>

            <Suspense fallback={<div className="p-8 text-center text-xs text-theme-secondary">Loading enquiry form...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Right Column: Corporate & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Sales Card */}
            <div className="p-5 sm:p-8 rounded-3xl bg-theme-card border border-theme-border space-y-5 sm:space-y-6 shadow-xl">
              <h3 className="text-base font-bold text-theme-primary flex items-center gap-2">
                <Building2 className="w-5 h-5 text-theme-green shrink-0" />
                Direct B2B Sales Desk
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 sm:p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-1">
                  <span className="text-theme-secondary font-mono text-[10px] uppercase font-bold block">
                    Official Sales Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.salesEmail}`}
                    className="text-theme-primary font-mono font-bold hover:text-theme-green transition-colors block break-all"
                  >
                    {COMPANY_INFO.salesEmail}
                  </a>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-1">
                  <span className="text-theme-secondary font-mono text-[10px] uppercase font-bold block">
                    General Corporate Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.supportEmail}`}
                    className="text-theme-primary font-mono font-bold hover:text-theme-green transition-colors block break-all"
                  >
                    {COMPANY_INFO.supportEmail}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-2">
                  <span className="text-theme-secondary font-mono text-[10px] uppercase font-bold block">
                    Instant WhatsApp Sales Connect
                  </span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20am%20contacting%20MEHAR%20regarding%20B2B%20battery%20procurement.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-theme-green hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" /> Connect with Sales Desk
                  </a>
                </div>
              </div>
            </div>

            {/* Corporate Location Details */}
            <div className="p-8 rounded-3xl bg-theme-card border border-theme-border space-y-5 shadow-xl">
              <h3 className="text-base font-bold text-theme-primary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-theme-green" />
                Corporate &amp; Facility Locations
              </h3>

              <div className="space-y-4 text-xs font-mono text-theme-primary">
                <div className="space-y-1">
                  <span className="text-theme-primary font-bold block">Registered Corporate Office:</span>
                  <p className="text-theme-secondary">{COMPANY_INFO.registeredOffice}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-theme-primary font-bold block">Manufacturing &amp; Assembly Unit:</span>
                  <p className="text-theme-secondary">{COMPANY_INFO.plantLocation}</p>
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
