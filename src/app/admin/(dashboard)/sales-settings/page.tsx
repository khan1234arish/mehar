'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  PhoneCall,
  Save,
  CheckCircle2,
  AlertTriangle,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { SalesSettingsData } from '@/lib/settings';

export default function AdminSalesSettingsPage() {
  const [formData, setFormData] = useState<SalesSettingsData>({
    salesEmail: '',
    supportEmail: '',
    engineeringEmail: '',
    salesPhone: '',
    whatsappDesk: '',
    engineeringWhatsapp: '',
    callbackPhone: '',
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
      if (data.sales) {
        setFormData(data.sales);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching sales settings.');
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
        body: JSON.stringify({ section: 'sales', data: formData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save sales contact settings.');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving sales settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="green">Procurement Desks</Badge>
          <span className="text-xs font-mono text-[#64748B]">Centralized Sales Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Sales &amp; WhatsApp Communication Desks
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Updating these numbers and email addresses dynamically updates public website CTAs, contact desks, WhatsApp links, and footer directories.
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
          <span>Sales desks successfully updated across the website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Email Communication Channels */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <Mail className="w-4 h-4 text-[#059669]" />
            Official Email Inboxes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Primary Sales Email *</label>
              <input
                type="email"
                required
                placeholder="sales@meharbatteries.com"
                value={formData.salesEmail}
                onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Customer Support / General Email *</label>
              <input
                type="email"
                required
                placeholder="info@meharbatteries.com"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-[#334155] block">OEM &amp; Engineering Technical Desk Email</label>
              <input
                type="email"
                placeholder="engineering@meharbatteries.com"
                value={formData.engineeringEmail || ''}
                onChange={(e) => setFormData({ ...formData, engineeringEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Direct Phone Lines */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <MessageSquare className="w-4 h-4 text-[#059669]" />
            WhatsApp Business &amp; Voice Desks
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Primary Sales WhatsApp Desk *</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={formData.whatsappDesk}
                onChange={(e) => setFormData({ ...formData, whatsappDesk: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Engineering WhatsApp Desk</label>
              <input
                type="text"
                placeholder="+91 98765 43211"
                value={formData.engineeringWhatsapp || ''}
                onChange={(e) => setFormData({ ...formData, engineeringWhatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Primary Voice Line / Landline *</label>
              <input
                type="text"
                required
                placeholder="+91 11 2345 6789"
                value={formData.salesPhone}
                onChange={(e) => setFormData({ ...formData, salesPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#334155] block">Direct Callback Phone</label>
              <input
                type="text"
                placeholder="+91 11 2345 6780"
                value={formData.callbackPhone || ''}
                onChange={(e) => setFormData({ ...formData, callbackPhone: e.target.value })}
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
            {saving ? 'Saving Desks...' : 'Save Sales Desks'}
          </Button>
        </div>
      </form>
    </div>
  );
}
