'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  FileSpreadsheet,
  Factory,
  Layers,
  FileText,
  Building2,
  PhoneCall,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
} from 'lucide-react';

interface DashboardData {
  counts: {
    rfqs: { total: number; new: number };
    oem: { total: number; new: number };
    general: { total: number };
    products: { total: number; verified: number };
    resources: { total: number };
  };
  recentRfqs: Array<{
    id: string;
    rfqNumber: string;
    companyName: string;
    contactPerson: string;
    volumeTier: string;
    status: string;
    createdAt: string;
  }>;
  recentOem: Array<{
    id: string;
    enquiryNumber: string;
    companyName: string;
    contactPerson: string;
    applicationType: string;
    status: string;
    createdAt: string;
  }>;
  recentAudits: Array<{
    id: string;
    adminEmail: string | null;
    action: string;
    entityType: string;
    entityId: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/dashboard');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load dashboard.');
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">CMS Overview</Badge>
            <span className="text-xs font-mono text-[#64748B]">B2B Administration Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Dashboard &amp; Operations Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={fetchDashboard}
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
          <Button
            href="/admin/products?action=new"
            variant="primary"
            size="sm"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add New Product
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B]">
          {error}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* RFQ Submissions */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
              RFQ Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">
              {loading ? '—' : data?.counts.rfqs.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#059669] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>{loading ? '—' : data?.counts.rfqs.new ?? 0} New Pending Review</span>
            </div>
          </div>
          <Link
            href="/admin/enquiries?tab=rfqs"
            className="pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#059669] hover:underline flex items-center justify-between"
          >
            <span>Review RFQ Queue</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* OEM Configurator Intakes */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
              OEM Custom Intakes
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
              <Factory className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">
              {loading ? '—' : data?.counts.oem.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#0284C7] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]"></span>
              <span>{loading ? '—' : data?.counts.oem.new ?? 0} New Engineering Specs</span>
            </div>
          </div>
          <Link
            href="/admin/enquiries?tab=oem"
            className="pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#0284C7] hover:underline flex items-center justify-between"
          >
            <span>Inspect OEM Engineering</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products & Verification */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Products in Catalog
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FEFCE8] border border-[#FEF08A] flex items-center justify-center text-[#854D0E]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">
              {loading ? '—' : data?.counts.products.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#854D0E] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#CA8A04]" />
              <span>{loading ? '—' : data?.counts.products.verified ?? 0} Client-Verified &amp; Published</span>
            </div>
          </div>
          <Link
            href="/admin/products"
            className="pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#854D0E] hover:underline flex items-center justify-between"
          >
            <span>Manage Product Models</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* General Inquiries */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
              General &amp; Dealer Contacts
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B]">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">
              {loading ? '—' : data?.counts.general.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#64748B] font-medium">
              <span>Dealership &amp; Corporate Leads</span>
            </div>
          </div>
          <Link
            href="/admin/enquiries?tab=general"
            className="pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#64748B] hover:underline flex items-center justify-between"
          >
            <span>View All Enquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Access Action Shortcuts */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
          Quick Administrative Actions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link
            href="/admin/sales-settings"
            className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#ECFDF5] transition-all flex items-center gap-2.5 font-semibold text-[#0F172A]"
          >
            <PhoneCall className="w-4 h-4 text-[#059669]" />
            <span>Update WhatsApp &amp; Sales Desks</span>
          </Link>

          <Link
            href="/admin/company-settings"
            className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#ECFDF5] transition-all flex items-center gap-2.5 font-semibold text-[#0F172A]"
          >
            <Building2 className="w-4 h-4 text-[#059669]" />
            <span>Edit Corporate &amp; GSTIN Info</span>
          </Link>

          <Link
            href="/admin/resources"
            className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#ECFDF5] transition-all flex items-center gap-2.5 font-semibold text-[#0F172A]"
          >
            <FileText className="w-4 h-4 text-[#059669]" />
            <span>Manage PDF Datasheets</span>
          </Link>

          <Link
            href="/admin/audit-logs"
            className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#ECFDF5] transition-all flex items-center gap-2.5 font-semibold text-[#0F172A]"
          >
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>Review Security Audit Logs</span>
          </Link>
        </div>
      </div>

      {/* Two-Column Recent Submissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent RFQs */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#059669]" />
              Recent RFQ Quotation Requests
            </h3>
            <Link href="/admin/enquiries?tab=rfqs" className="text-xs text-[#059669] hover:underline font-semibold font-mono">
              View All →
            </Link>
          </div>

          <div className="space-y-2">
            {!data?.recentRfqs || data.recentRfqs.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#94A3B8]">
                No RFQ submissions recorded yet.
              </div>
            ) : (
              data.recentRfqs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-[#059669] block">
                      {rfq.rfqNumber}
                    </span>
                    <span className="text-[#0F172A] font-semibold">{rfq.companyName}</span>
                    <span className="text-[#64748B] text-[11px] block">
                      Contact: {rfq.contactPerson}
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      {rfq.status}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] block font-mono">
                      {new Date(rfq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent OEM Custom Submissions */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <Factory className="w-4 h-4 text-[#0284C7]" />
              Recent OEM Configurator Intakes
            </h3>
            <Link href="/admin/enquiries?tab=oem" className="text-xs text-[#0284C7] hover:underline font-semibold font-mono">
              View All →
            </Link>
          </div>

          <div className="space-y-2">
            {!data?.recentOem || data.recentOem.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#94A3B8]">
                No OEM submissions recorded yet.
              </div>
            ) : (
              data.recentOem.map((oem) => (
                <div
                  key={oem.id}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-[#0284C7] block">
                      {oem.enquiryNumber}
                    </span>
                    <span className="text-[#0F172A] font-semibold">{oem.companyName}</span>
                    <span className="text-[#64748B] text-[11px] block">
                      App: {oem.applicationType}
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]">
                      {oem.status}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] block font-mono">
                      {new Date(oem.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
