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
  Filter,
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
        return 'Today';
      case '7d':
        return 'Last 7 Days';
      case '30d':
        return 'Last 30 Days';
      case 'all':
        return 'All Time';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">Private Admin Telemetry</Badge>
            <span className="text-xs font-mono text-[#64748B]">Vercel Web Analytics &amp; B2B Funnel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Website Analytics &amp; Lead Intelligence
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Private telemetry visible exclusively to authorized MEHAR administrators.
          </p>
        </div>

        {/* Date Range Selector & Refresh */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#CBD5E1] shadow-xs text-xs font-medium font-mono">
            {(['today', '7d', '30d', 'all'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRangeChange(r)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  range === r
                    ? 'bg-[#059669] text-white font-bold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {r === 'today' ? 'Today' : r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : 'All'}
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
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B]">
          {error}
        </div>
      )}

      {/* Vercel Web Analytics Integration Status Card */}
      <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0F172A]">Vercel Web Analytics Provider</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                <CheckCircle2 className="w-3 h-3" /> Active &amp; Instrumenting
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Privacy-first telemetry enabled in <code className="text-[#059669] font-mono">RootLayout</code>. Zero cookies, zero PII, and full GDPR compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#059669] hover:text-[#059669] text-xs font-medium text-[#334155] transition-colors shadow-xs"
          >
            <span>Vercel Analytics Cloud</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Total B2B Leads</span>
            <Users className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-mono">
            {loading ? '...' : data?.metrics.totalLeads ?? 0}
          </div>
          <p className="text-[11px] text-[#64748B]">
            Combined inquiries in <span className="font-semibold text-[#059669]">{getRangeLabel()}</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Official RFQ Inquiries</span>
            <FileSpreadsheet className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-mono">
            {loading ? '...' : data?.metrics.totalRfqs ?? 0}
          </div>
          <p className="text-[11px] text-[#64748B]">
            Formal B2B quotation requests
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">OEM Custom Projects</span>
            <Cpu className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-mono">
            {loading ? '...' : data?.metrics.totalOem ?? 0}
          </div>
          <p className="text-[11px] text-[#64748B]">
            Custom pack engineering requests
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Datasheet Downloads</span>
            <Download className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-mono">
            {loading ? '...' : data?.metrics.totalDownloads ?? 0}
          </div>
          <p className="text-[11px] text-[#64748B]">
            Technical specification files downloaded
          </p>
        </div>
      </div>

      {/* Main Grid: Category Demand & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Category Demand & Top Products (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Top Battery Categories Inquired */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#059669]" />
                <h2 className="text-base font-bold text-[#0F172A]">Catalogue Category Demand</h2>
              </div>
              <span className="text-xs font-mono text-[#64748B]">
                {data?.topCategories.length || 6} Active Categories
              </span>
            </div>

            <div className="space-y-4">
              {data?.topCategories.map((cat) => {
                const totalInquiries = data.metrics.totalRfqs || 1;
                const percent = Math.min(100, Math.round(((cat.inquiryCount || 0) / (totalInquiries || 1)) * 100));

                return (
                  <div key={cat.slug} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <Link
                        href={`/products/${cat.slug}`}
                        target="_blank"
                        className="font-bold text-[#0F172A] hover:text-[#059669] flex items-center gap-1 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
                      </Link>
                      <span className="font-mono text-[#64748B]">
                        <strong className="text-[#0F172A]">{cat.productCount}</strong> models
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                      <div
                        className="h-full bg-[#059669] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(8, percent)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Product Models */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#059669]" />
                <h2 className="text-base font-bold text-[#0F172A]">Top Product Models &amp; Specifications</h2>
              </div>
              <Link href="/admin/products" className="text-xs font-mono text-[#059669] hover:underline font-bold">
                Manage Products →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono uppercase text-[10px]">
                    <th className="py-2.5 px-3 font-bold">Model / Product</th>
                    <th className="py-2.5 px-3 font-bold">Category</th>
                    <th className="py-2.5 px-3 font-bold text-right">Inquiries</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                  {data?.topProducts && data.topProducts.length > 0 ? (
                    data.topProducts.map((p, idx) => (
                      <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3 px-3">
                          <p className="font-bold text-[#0F172A] truncate max-w-xs">{p.name}</p>
                          {p.modelNumber && (
                            <span className="text-[10px] font-mono text-[#64748B] block">
                              Model: {p.modelNumber}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-[#64748B] font-mono">
                          {p.categoryName}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-[#059669]">
                          {p.inquiries}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-xs text-[#64748B]">
                        No product inquiry data recorded for this timeframe.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Public Routes, B2B Funnel & Lead Signals (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* B2B Conversion Funnel Overview */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <BarChart3 className="w-5 h-5 text-[#059669]" />
              <h2 className="text-base font-bold text-[#0F172A]">B2B Conversion Milestone Funnel</h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#0F172A] font-bold">
                  <span>1. Public Traffic Discovery</span>
                  <span className="text-[#059669]">Step 1</span>
                </div>
                <p className="text-[11px] text-[#64748B] font-sans">
                  Homepage, Applications, &amp; Cell Technology engineering pages.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#0F172A] font-bold">
                  <span>2. Product Catalogue Exploration</span>
                  <span className="text-[#059669]">Step 2</span>
                </div>
                <p className="text-[11px] text-[#64748B] font-sans">
                  Interactive category listings, technical specification sheets, and Battery Finder tool.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#0F172A] font-bold">
                  <span>3. High-Intent Procurement Action</span>
                  <span className="text-[#059669]">Step 3</span>
                </div>
                <p className="text-[11px] text-[#64748B] font-sans">
                  B2B RFQ submissions, OEM custom pack configurator completions, and WhatsApp desk inquiries.
                </p>
              </div>
            </div>
          </div>

          {/* Key Public Routes Table */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#059669]" />
                <h2 className="text-base font-bold text-[#0F172A]">Monitored Public Routes</h2>
              </div>
              <Badge variant="slate">App Router</Badge>

            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {data?.publicRoutes.map((r) => (
                <div
                  key={r.path}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs hover:border-[#A7F3D0] transition-colors"
                >
                  <div className="overflow-hidden">
                    <Link
                      href={r.path}
                      target="_blank"
                      className="font-bold text-[#0F172A] hover:text-[#059669] flex items-center gap-1 truncate"
                    >
                      <span>{r.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#94A3B8] shrink-0" />
                    </Link>
                    <span className="text-[10px] font-mono text-[#64748B] truncate block">
                      {r.path}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#475569] border border-[#CBD5E1] shrink-0">
                    {r.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Compliance Assurance Box */}
          <div className="p-5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>Data Privacy Governance</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#047857]">
              In strict accordance with corporate privacy guidelines, no customer personal details, passwords, message bodies, or IP addresses are shared with public analytics vendors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
