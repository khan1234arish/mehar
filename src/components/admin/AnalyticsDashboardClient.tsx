'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  RefreshCw,
  Globe,
  ShieldCheck,
  Download,
  Users,
  Cpu,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface AnalyticsData {
  range: string;
  metrics: {
    totalRfqs: number;
    totalOem: number;
    totalGeneral: number;
    totalLeads: number;
    totalDownloads: number;
  };
  telemetryStatus: {
    provider: string;
    instrumentation: string;
    environment: string;
    privacyMode: string;
    trackingHooksActive: boolean;
  };
  topCategories: Array<{
    name: string;
    slug: string;
    productCount: number;
    inquiryCount: number;
  }>;
  topProducts: Array<{
    name: string;
    modelNumber: string | null;
    slug: string;
    categoryName: string;
    inquiries: number;
  }>;
  downloads: Array<{
    id: string;
    title: string;
    category: string;
    downloadCount: number;
  }>;
  recentRfqs: Array<{
    id: string;
    rfqNumber: string;
    companyName: string;
    businessType: string;
    volumeTier: string;
    projectTimeline: string;
    status: string;
    createdAt: string;
  }>;
  publicRoutes: Array<{
    path: string;
    label: string;
    category: string;
  }>;
}

export default function AnalyticsDashboardClient() {
  const [range, setRange] = useState<'today' | '7d' | '30d' | 'all'>('7d');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = useCallback(async (selectedRange: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/analytics?range=${selectedRange}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load analytics.');
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching analytics metrics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(range);
  }, [range, fetchAnalytics]);

  const handleRangeChange = (newRange: 'today' | '7d' | '30d' | 'all') => {
    setRange(newRange);
  };

  const getRangeLabel = () => {
    switch (range) {
      case 'today':
        return 'Today (Last 24 Hours)';
      case '7d':
        return 'Last 7 Days';
      case '30d':
        return 'Last 30 Days';
      case 'all':
        return 'All Time History';
    }
  };

  return (
    <div className="space-y-8 text-theme-primary transition-colors duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="green">Live Telemetry</Badge>
            <span className="text-xs font-mono text-theme-secondary">Vercel Web Analytics &amp; B2B Funnel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight">
            Traffic &amp; Conversion Analytics
          </h1>
          <p className="text-xs text-theme-secondary mt-1">
            Real-time B2B conversion metrics, RFQ generation rates, and product enquiry signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Range Selector */}
          <div className="inline-flex items-center p-1 rounded-xl bg-theme-elevated border border-theme-border shadow-sm text-xs font-medium font-mono">
            {(['today', '7d', '30d', 'all'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRangeChange(r)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  range === r
                    ? 'bg-theme-green text-white dark:text-[#0B0F14] font-bold shadow-sm'
                    : 'text-theme-secondary hover:text-theme-primary'
                }`}
              >
                {r === 'today' ? '24h' : r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          <Button
            onClick={() => fetchAnalytics(range)}
            variant="outline"
            size="sm"
            disabled={loading}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-300">
          <strong>Telemetry Error:</strong> {error}
        </div>
      )}

      {/* Vercel Status Badge */}
      <div className="p-5 rounded-2xl bg-theme-card border border-theme-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-theme-elevated border border-theme-green/30 flex items-center justify-center text-theme-green shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-theme-primary">Vercel Web Analytics Provider</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-theme-green/10 text-theme-green border border-theme-green/30">
                <CheckCircle2 className="w-3 h-3" /> Active &amp; Instrumenting
              </span>
            </div>
            <p className="text-[11px] text-theme-secondary mt-0.5">
              Privacy-first telemetry enabled in <code className="text-theme-green font-mono">RootLayout</code>. Zero cookies, zero PII, and full GDPR compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://vercel.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-elevated border border-theme-border hover:border-theme-green/50 hover:text-theme-green text-xs font-medium text-theme-primary transition-colors shadow-sm"
          >
            <span>Open Vercel Dashboard</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Key Conversion Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="p-5 rounded-2xl bg-theme-card border border-theme-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-theme-secondary">
            <span className="text-xs font-mono font-bold uppercase">Total Qualified Leads</span>
            <Users className="w-4 h-4 text-theme-green" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-theme-primary font-mono">
            {loading ? '...' : data?.metrics.totalLeads ?? 0}
          </div>
          <p className="text-[11px] text-theme-secondary">
            Combined inquiries in <span className="font-semibold text-theme-green">{getRangeLabel()}</span>
          </p>
        </div>

        {/* RFQ Submissions */}
        <div className="p-5 rounded-2xl bg-theme-card border border-theme-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-theme-secondary">
            <span className="text-xs font-mono font-bold uppercase">RFQ Submissions</span>
            <FileSpreadsheet className="w-4 h-4 text-theme-green" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-theme-primary font-mono">
            {loading ? '...' : data?.metrics.totalRfqs ?? 0}
          </div>
          <p className="text-[11px] text-theme-secondary">Multi-parameter quotations requested</p>
        </div>

        {/* OEM Configurator */}
        <div className="p-5 rounded-2xl bg-theme-card border border-theme-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-theme-secondary">
            <span className="text-xs font-mono font-bold uppercase">OEM Engineering Intakes</span>
            <Cpu className="w-4 h-4 text-theme-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-theme-primary font-mono">
            {loading ? '...' : data?.metrics.totalOem ?? 0}
          </div>
          <p className="text-[11px] text-theme-secondary">Custom battery pack projects scoped</p>
        </div>

        {/* Resource Downloads */}
        <div className="p-5 rounded-2xl bg-theme-card border border-theme-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-theme-secondary">
            <span className="text-xs font-mono font-bold uppercase">Catalogue Downloads</span>
            <Download className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-theme-primary font-mono">
            {loading ? '...' : data?.metrics.totalDownloads ?? 0}
          </div>
          <p className="text-[11px] text-theme-secondary">Technical datasheets accessed</p>
        </div>
      </div>

      {/* Deep Funnel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Interest */}
        <div className="bg-theme-card rounded-3xl p-6 border border-theme-border shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-theme-border">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-theme-green" />
              <h2 className="text-base font-bold text-theme-primary">Catalogue Category Demand</h2>
            </div>
            <span className="text-xs font-mono text-theme-secondary">
              {data?.topCategories.length || 0} Categories Active
            </span>
          </div>

          <div className="space-y-4">
            {data?.topCategories.map((cat) => {
              const maxInquiries = Math.max(...(data.topCategories.map((c) => c.inquiryCount) || [1]), 1);
              const percentage = Math.round((cat.inquiryCount / maxInquiries) * 100);
              return (
                <div key={cat.slug} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/products/${cat.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-theme-primary hover:text-theme-green flex items-center gap-1 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-3 h-3 text-theme-muted" />
                    </Link>
                    <span className="font-mono text-theme-secondary">
                      <strong className="text-theme-primary">{cat.productCount}</strong> models
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-theme-elevated overflow-hidden">
                    <div
                      className="h-full bg-theme-green rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.max(percentage, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Product Inquiries */}
        <div className="bg-theme-card rounded-3xl p-6 border border-theme-border shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-theme-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-theme-green" />
              <h2 className="text-base font-bold text-theme-primary">Top Product Models &amp; Specifications</h2>
            </div>
            <Link href="/admin/products" className="text-xs font-mono text-theme-green hover:underline font-bold">
              Manage Products →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.topProducts.slice(0, 6).map((prod, idx) => (
              <div
                key={prod.slug}
                className="p-3.5 rounded-xl bg-theme-elevated border border-theme-border flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-theme-base border border-theme-border flex items-center justify-center font-mono font-bold text-[11px] text-theme-green">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-theme-primary block">{prod.name}</span>
                    <span className="text-[10px] font-mono text-theme-muted">
                      {prod.modelNumber || 'Standard Spec'} • {prod.categoryName}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/products/${prod.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-theme-base border border-theme-border text-theme-secondary hover:text-theme-green transition-colors font-mono text-[10px]"
                >
                  View Datasheet ↗
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent RFQ Submissions Feed */}
      <div className="bg-theme-card rounded-3xl p-6 border border-theme-border shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-theme-border">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-theme-green" />
            <h2 className="text-base font-bold text-theme-primary">Recent B2B Commercial Quotations (RFQs)</h2>
          </div>
          <Link href="/admin/enquiries" className="text-xs font-mono text-theme-green hover:underline font-bold">
            View All Enquiries →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-theme-border text-theme-secondary text-[11px] uppercase">
                <th className="py-3 px-4">RFQ Ref #</th>
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Volume Scope</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Received Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border text-theme-primary">
              {data?.recentRfqs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-theme-secondary">
                    No RFQs recorded in selected timeframe.
                  </td>
                </tr>
              ) : (
                data?.recentRfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-theme-elevated transition-colors">
                    <td className="py-3.5 px-4 font-bold text-theme-green">{rfq.rfqNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{rfq.companyName}</td>
                    <td className="py-3.5 px-4 text-theme-secondary">{rfq.volumeTier}</td>
                    <td className="py-3.5 px-4 text-theme-secondary">{rfq.projectTimeline}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-theme-elevated border border-theme-border text-[10px] text-theme-primary">
                        {rfq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-theme-muted">
                      {new Date(rfq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Public Pages Monitored */}
      <div className="p-6 rounded-3xl bg-theme-card border border-theme-border space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-theme-green" />
          <h3 className="text-base font-bold text-theme-primary">Platform Pages Monitored</h3>
        </div>
        <p className="text-xs text-theme-secondary">
          Vercel Web Analytics automatically tracks traffic, page views, and client navigation across all active routes:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
          {data?.publicRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-theme-elevated border border-theme-border hover:border-theme-green/50 text-xs flex items-center justify-between group transition-colors"
            >
              <div>
                <span className="font-bold text-theme-primary group-hover:text-theme-green block transition-colors">
                  {route.label}
                </span>
                <span className="text-[10px] font-mono text-theme-muted truncate block">
                  {route.path}
                </span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-theme-muted group-hover:text-theme-green transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
