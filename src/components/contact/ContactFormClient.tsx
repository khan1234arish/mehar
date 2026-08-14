'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactFormClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialType = searchParams.get('type') || 'rfq';
  const initialNote = searchParams.get('note') || '';

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
    projectNotes: initialNote,
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
