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
  CheckCircle2,
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
    <div className="space-y-8 text-theme-primary">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">CMS Overview</Badge>
            <span className="text-xs font-mono text-theme-muted">B2B Administration Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight">
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
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-500">
          {error}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* RFQ Submissions */}
        <div className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-theme-muted">
              RFQ Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-theme-green/10 border border-theme-green/30 flex items-center justify-center text-theme-green">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-theme-primary">
              {loading ? '—' : data?.counts.rfqs.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-theme-green font-medium">
              <span className="w-2 h-2 rounded-full bg-theme-green"></span>
              <span>{loading ? '—' : data?.counts.rfqs.new ?? 0} New Pending Review</span>
            </div>
          </div>
          <Link
            href="/admin/enquiries?tab=rfqs"
            className="pt-3 border-t border-theme-border text-xs font-bold text-theme-green hover:underline flex items-center justify-between"
          >
            <span>Review RFQ Queue</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* OEM Configurator Intakes */}
        <div className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-theme-muted">
              OEM Custom Intakes
            </span>
            <div className="w-9 h-9 rounded-xl bg-theme-blue/10 border border-theme-blue/30 flex items-center justify-center text-theme-blue">
              <Factory className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-theme-primary">
              {loading ? '—' : data?.counts.oem.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-theme-blue font-medium">
              <span className="w-2 h-2 rounded-full bg-theme-blue"></span>
              <span>{loading ? '—' : data?.counts.oem.new ?? 0} New Engineering Specs</span>
            </div>
          </div>
          <Link
            href="/admin/enquiries?tab=oem"
            className="pt-3 border-t border-theme-border text-xs font-bold text-theme-blue hover:underline flex items-center justify-between"
          >
            <span>Inspect OEM Engineering</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products & Verification */}
        <div className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-theme-muted">
              Products in Catalog
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-theme-primary">
              {loading ? '—' : data?.counts.products.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-600 dark:text-amber-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
              <span>{loading ? '—' : data?.counts.products.verified ?? 0} Client-Verified &amp; Published</span>
            </div>
          </div>
          <Link
            href="/admin/products"
            className="pt-3 border-t border-theme-border text-xs font-bold text-amber-600 dark:text-amber-300 hover:underline flex items-center justify-between"
          >
            <span>Manage Product Models</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* General Inquiries */}
        <div className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-theme-muted">
              General &amp; Dealer Contacts
            </span>
            <div className="w-9 h-9 rounded-xl bg-theme-elevated border border-theme-border flex items-center justify-center text-theme-secondary">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-theme-primary">
              {loading ? '—' : data?.counts.general.total ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-theme-secondary font-medium">
              <span>Dealership &amp; Corporate Leads</span>
            </div>
          </div>
          <Link
            href="/admin/enquiries?tab=general"
            className="pt-3 border-t border-theme-border text-xs font-bold text-theme-secondary hover:text-theme-primary hover:underline flex items-center justify-between"
          >
            <span>View All Enquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Access Action Shortcuts */}
      <div className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-theme-muted">
          Quick Administrative Actions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link
            href="/admin/sales-settings"
            className="p-3.5 rounded-xl bg-theme-elevated border border-theme-border hover:border-theme-green/50 hover:bg-theme-green/10 transition-all flex items-center gap-2.5 font-semibold text-theme-primary"
          >
            <PhoneCall className="w-4 h-4 text-theme-green" />
            <span>Update WhatsApp &amp; Sales Desks</span>
          </Link>

          <Link
            href="/admin/company-settings"
            className="p-3.5 rounded-xl bg-theme-elevated border border-theme-border hover:border-theme-green/50 hover:bg-theme-green/10 transition-all flex items-center gap-2.5 font-semibold text-theme-primary"
          >
            <Building2 className="w-4 h-4 text-theme-green" />
            <span>Edit Corporate &amp; GSTIN Info</span>
          </Link>

          <Link
            href="/admin/resources"
            className="p-3.5 rounded-xl bg-theme-elevated border border-theme-border hover:border-theme-green/50 hover:bg-theme-green/10 transition-all flex items-center gap-2.5 font-semibold text-theme-primary"
          >
            <FileText className="w-4 h-4 text-theme-green" />
            <span>Manage PDF Datasheets</span>
          </Link>

          <Link
            href="/admin/audit-logs"
            className="p-3.5 rounded-xl bg-theme-elevated border border-theme-border hover:border-theme-green/50 hover:bg-theme-green/10 transition-all flex items-center gap-2.5 font-semibold text-theme-primary"
          >
            <ShieldCheck className="w-4 h-4 text-theme-green" />
            <span>Review Security Audit Logs</span>
          </Link>
        </div>
      </div>

      {/* Two-Column Recent Submissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent RFQs */}
        <div className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-theme-border">
            <h3 className="text-sm font-bold text-theme-primary flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-theme-green" />
              Recent RFQ Quotation Requests
            </h3>
            <Link href="/admin/enquiries?tab=rfqs" className="text-xs text-theme-green hover:underline font-semibold font-mono">
              View All →
            </Link>
          </div>

          <div className="space-y-2">
            {!data?.recentRfqs || data.recentRfqs.length === 0 ? (
              <div className="py-8 text-center text-xs text-theme-muted">
                No RFQ submissions recorded yet.
              </div>
            ) : (
              data.recentRfqs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="p-3.5 rounded-xl bg-theme-elevated border border-theme-border flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-theme-green block">
                      {rfq.rfqNumber}
                    </span>
                    <span className="text-theme-primary font-semibold">{rfq.companyName}</span>
                    <span className="text-theme-secondary text-[11px] block">
                      Contact: {rfq.contactPerson}
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-theme-green/10 text-theme-green border border-theme-green/30">
                      {rfq.status}
                    </span>
                    <span className="text-[10px] text-theme-muted block font-mono">
                      {new Date(rfq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent OEM Custom Submissions */}
        <div className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-theme-border">
            <h3 className="text-sm font-bold text-theme-primary flex items-center gap-2">
              <Factory className="w-4 h-4 text-theme-blue" />
              Recent OEM Configurator Intakes
            </h3>
            <Link href="/admin/enquiries?tab=oem" className="text-xs text-theme-blue hover:underline font-semibold font-mono">
              View All →
            </Link>
          </div>

          <div className="space-y-2">
            {!data?.recentOem || data.recentOem.length === 0 ? (
              <div className="py-8 text-center text-xs text-theme-muted">
                No OEM submissions recorded yet.
              </div>
            ) : (
              data.recentOem.map((oem) => (
                <div
                  key={oem.id}
                  className="p-3.5 rounded-xl bg-theme-elevated border border-theme-border flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-theme-blue block">
                      {oem.enquiryNumber}
                    </span>
                    <span className="text-theme-primary font-semibold">{oem.companyName}</span>
                    <span className="text-theme-secondary text-[11px] block">
                      App: {oem.applicationType}
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-theme-blue/10 text-theme-blue border border-theme-blue/30">
                      {oem.status}
                    </span>
                    <span className="text-[10px] text-theme-muted block font-mono">
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
