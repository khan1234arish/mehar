'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Building2,
  Save,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Globe,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { CompanySettingsData } from '@/lib/settings';

export default function AdminCompanySettingsPage() {
  const [formData, setFormData] = useState<CompanySettingsData>({
    brandName: '',
    parentCompanyName: '',
    industry: '',
    registeredOffice: '',
    plantLocation: '',
    cin: '',
    gstin: '',
    website: '',
    socialLinkedIn: '',
    socialTwitter: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getCsrfToken = (): string => {
    const match = document.cookie.match(/(?:^|;\s*)mehar_admin_csrf=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  const fetchSettings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load settings.');
      if (data.company) {
        setFormData(data.company);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({ section: 'company', data: formData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save company settings.');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving company settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="green">Corporate Identity</Badge>
          <span className="text-xs font-mono text-[#64748B]">Centralized Database Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Company &amp; Legal Information
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Changes made here are stored in the PostgreSQL database and immediately update public footers, legal pages, and corporate metadata.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-2 text-xs text-[#991B1B]">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2 text-xs text-[#065F46] font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
          <span>Company settings successfully saved and applied to the public website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Parent Entity */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <Building2 className="w-4 h-4 text-[#059669]" />
            Corporate Entity &amp; Trade Name
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Brand Name *</label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Parent Legal Company Name *</label>
              <input
                type="text"
                required
                value={formData.parentCompanyName}
                onChange={(e) => setFormData({ ...formData, parentCompanyName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-[#334155] block">Industry &amp; Manufacturing Domain</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <MapPin className="w-4 h-4 text-[#059669]" />
            Official &amp; Manufacturing Locations
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Registered Corporate Office *</label>
              <textarea
                rows={2}
                required
                value={formData.registeredOffice}
                onChange={(e) => setFormData({ ...formData, registeredOffice: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Plant &amp; Factory Location *</label>
              <textarea
                rows={2}
                required
                value={formData.plantLocation}
                onChange={(e) => setFormData({ ...formData, plantLocation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
        </div>

        {/* Legal Identifiers */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <FileCheck className="w-4 h-4 text-[#059669]" />
            Statutory &amp; Legal Identifiers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Corporate Identification Number (CIN)</label>
              <input
                type="text"
                placeholder="e.g. U29309DL2020PTC..."
                value={formData.cin || ''}
                onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">GSTIN Number</label>
              <input
                type="text"
                placeholder="e.g. 07AAACL1234F1Z5"
                value={formData.gstin || ''}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-[#334155] block">Official Website URL</label>
              <input
                type="url"
                placeholder="https://www.meharbatteries.com"
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={saving || loading}
            icon={<Save className="w-4 h-4" />}
          >
            {saving ? 'Saving Settings...' : 'Save Company Information'}
          </Button>
        </div>
      </form>
    </div>
  );
}
