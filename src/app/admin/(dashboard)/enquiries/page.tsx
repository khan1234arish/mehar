'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  FileSpreadsheet,
  Factory,
  Building2,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  MessageSquare,
  Mail,
  Phone,
  Save,
  X,
  FileText,
  ChevronDown,
  ChevronUp,
  Code,
  Zap,
  Layers,
  MapPin,
} from 'lucide-react';


interface RfqItem {
  id: string;
  rfqNumber: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gstin?: string | null;
  businessType: string;
  city: string;
  state: string;
  projectTimeline: string;
  volumeTier: string;
  customNotes?: string | null;
  status: string;
  internalNotes?: string | null;
  createdAt: string;
}

interface OemItem {
  id: string;
  enquiryNumber: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  gstin?: string | null;
  website?: string | null;
  applicationType: string;
  applicationDetail?: string | null;
  electricalRequirements?: string | null;
  mechanicalRequirements?: string | null;
  bmsRequirements?: string | null;
  environmentalRequirements?: string | null;
  commercialRequirements?: string | null;
  attachmentMetadata?: string | null;
  status: string;
  internalNotes?: string | null;
  createdAt: string;
}

interface GeneralItem {
  id: string;
  name: string;
  companyName?: string | null;
  email: string;
  phone: string;
  enquiryType: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

function EnquiriesContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'rfqs';

  const [activeTab, setActiveTab] = useState<'rfqs' | 'oem' | 'general'>(
    initialTab === 'oem' ? 'oem' : initialTab === 'general' ? 'general' : 'rfqs'
  );

  const [rfqs, setRfqs] = useState<RfqItem[]>([]);
  const [oemList, setOemList] = useState<OemItem[]>([]);
  const [generalList, setGeneralList] = useState<GeneralItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Inspection / Edit Modal
  const [inspectRfq, setInspectRfq] = useState<RfqItem | null>(null);
  const [inspectOem, setInspectOem] = useState<OemItem | null>(null);
  const [modalStatus, setModalStatus] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  const getCsrfToken = (): string => {
    const match = document.cookie.match(/(?:^|;\s*)mehar_admin_csrf=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      if (activeTab === 'rfqs') {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const res = await fetch(`/api/admin/enquiries/rfqs${query}`);
        const data = await res.json();
        setRfqs(data.rfqs || []);
      } else if (activeTab === 'oem') {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const res = await fetch(`/api/admin/enquiries/oem${query}`);
        const data = await res.json();
        setOemList(data.oemEnquiries || []);
      } else {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const res = await fetch(`/api/admin/enquiries/general${query}`);
        const data = await res.json();
        setGeneralList(data.enquiries || []);
      }
    } catch (err) {
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [activeTab]);

  const filteredRfqs = useMemo(() => {
    if (!search.trim()) return rfqs;
    const q = search.trim().toLowerCase();
    return rfqs.filter(
      (r) =>
        r.rfqNumber.toLowerCase().includes(q) ||
        r.companyName.toLowerCase().includes(q) ||
        r.contactPerson.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.volumeTier.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [rfqs, search]);

  const filteredOem = useMemo(() => {
    if (!search.trim()) return oemList;
    const q = search.trim().toLowerCase();
    return oemList.filter(
      (o) =>
        o.enquiryNumber.toLowerCase().includes(q) ||
        o.companyName.toLowerCase().includes(q) ||
        o.contactPerson.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.applicationType.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
    );
  }, [oemList, search]);

  const filteredGeneral = useMemo(() => {
    if (!search.trim()) return generalList;
    const q = search.trim().toLowerCase();
    return generalList.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.companyName && g.companyName.toLowerCase().includes(q)) ||
        g.email.toLowerCase().includes(q) ||
        g.phone.toLowerCase().includes(q) ||
        g.subject.toLowerCase().includes(q) ||
        g.message.toLowerCase().includes(q) ||
        g.status.toLowerCase().includes(q)
    );
  }, [generalList, search]);

  const openRfqInspect = (rfq: RfqItem) => {
    setInspectRfq(rfq);
    setModalStatus(rfq.status);
    setModalNotes(rfq.internalNotes || '');
    setShowRawJson(false);
  };


  const openOemInspect = (oem: OemItem) => {
    setInspectOem(oem);
    setModalStatus(oem.status);
    setModalNotes(oem.internalNotes || '');
  };

  const handleUpdateRfqStatus = async () => {
    if (!inspectRfq) return;
    setSavingStatus(true);
    try {
      const res = await fetch(`/api/admin/enquiries/rfqs/${inspectRfq.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({ status: modalStatus, internalNotes: modalNotes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status.');
      setInspectRfq(null);
      fetchEnquiries();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error updating RFQ status.');
    } finally {
      setSavingStatus(false);
    }
  };

  const handleUpdateOemStatus = async () => {
    if (!inspectOem) return;
    setSavingStatus(true);
    try {
      const res = await fetch(`/api/admin/enquiries/oem/${inspectOem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({ status: modalStatus, internalNotes: modalNotes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status.');
      setInspectOem(null);
      fetchEnquiries();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error updating OEM status.');
    } finally {
      setSavingStatus(false);
    }
  };

  const parseJsonSafe = (jsonStr?: string | null) => {
    if (!jsonStr) return null;
    try {
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">Procurement Queue</Badge>
            <span className="text-xs font-mono text-[#64748B]">B2B Lead &amp; Intake Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Customer Enquiries &amp; RFQs
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => {
            setActiveTab('rfqs');
            setSearch('');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'rfqs'
              ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>B2B RFQ Submissions</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('oem');
            setSearch('');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'oem'
              ? 'bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>OEM Engineering Intakes</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('general');
            setSearch('');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'general'
              ? 'bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>General &amp; Dealer Contacts</span>
        </button>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchEnquiries();
        }}
        className="relative max-w-md"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search by reference ID, company, contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-none focus:border-[#059669]"
        />
      </form>

      {/* Tab 1: RFQs Table */}
      {activeTab === 'rfqs' && (
        <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">RFQ Reference</th>
                  <th className="py-3.5 px-4 font-bold">Company &amp; Contact</th>
                  <th className="py-3.5 px-4 font-bold">Volume / Timeline</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Received Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      Loading RFQ submissions...
                    </td>
                  </tr>
                ) : filteredRfqs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      No RFQ submissions found.
                    </td>
                  </tr>
                ) : (
                  filteredRfqs.map((rfq) => (
                    <tr key={rfq.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-[#059669] block">
                          {rfq.rfqNumber}
                        </span>
                        <span className="text-[10px] text-[#64748B] font-mono">
                          {rfq.city}, {rfq.state}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#0F172A] block">{rfq.companyName}</span>
                        <span className="text-[#64748B] text-[11px]">
                          {rfq.contactPerson} • {rfq.phone}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#475569]">
                        {rfq.volumeTier} / {rfq.projectTimeline}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                          {rfq.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                        {new Date(rfq.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Button
                          onClick={() => openRfqInspect(rfq)}
                          variant="outline"
                          size="sm"
                          icon={<Eye className="w-3.5 h-3.5" />}
                        >
                          Inspect &amp; Update
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: OEM Table */}
      {activeTab === 'oem' && (
        <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">OEM Reference</th>
                  <th className="py-3.5 px-4 font-bold">Company &amp; Contact</th>
                  <th className="py-3.5 px-4 font-bold">Target Application</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Received Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      Loading OEM submissions...
                    </td>
                  </tr>
                ) : filteredOem.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      No OEM engineering intakes found.
                    </td>
                  </tr>
                ) : (
                  filteredOem.map((oem) => (
                    <tr key={oem.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-[#0284C7] block">
                          {oem.enquiryNumber}
                        </span>
                        <span className="text-[10px] text-[#64748B] font-mono">
                          {oem.city}, {oem.state}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#0F172A] block">{oem.companyName}</span>
                        <span className="text-[#64748B] text-[11px]">
                          {oem.contactPerson} • {oem.phone}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#F0F9FF] border border-[#BAE6FD] font-mono text-[11px] text-[#0369A1] font-semibold">
                          {oem.applicationType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]">
                          {oem.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                        {new Date(oem.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Button
                          onClick={() => openOemInspect(oem)}
                          variant="outline"
                          size="sm"
                          icon={<Eye className="w-3.5 h-3.5" />}
                        >
                          Inspect Specs
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: General / Dealer Table */}
      {activeTab === 'general' && (
        <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Contact Person / Company</th>
                  <th className="py-3.5 px-4 font-bold">Enquiry Type</th>
                  <th className="py-3.5 px-4 font-bold">Subject / Notes</th>
                  <th className="py-3.5 px-4 font-bold">Received Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#64748B]">
                      Loading general enquiries...
                    </td>
                  </tr>
                ) : filteredGeneral.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#64748B]">
                      No general contacts found.
                    </td>
                  </tr>
                ) : (
                  filteredGeneral.map((g) => (
                    <tr key={g.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#0F172A] block">{g.name}</span>
                        <span className="text-[#64748B] text-[11px]">
                          {g.companyName ? `${g.companyName} • ` : ''}
                          {g.email} • {g.phone}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#FEFCE8] border border-[#FEF08A] font-mono text-[10px] text-[#854D0E] font-bold">
                          {g.enquiryType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#475569] max-w-xs truncate">
                        <strong className="text-[#0F172A]">{g.subject}:</strong> {g.message}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                        {new Date(g.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RFQ Inspection Modal */}
      {inspectRfq && (() => {
        const parsedNotes = parseJsonSafe(inspectRfq.customNotes);
        const categoriesList = parsedNotes?.categories
          ? Array.isArray(parsedNotes.categories)
            ? parsedNotes.categories
            : [parsedNotes.categories]
          : [];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto overflow-x-hidden">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl w-full max-w-[min(900px,calc(100vw-24px))] sm:max-w-[min(900px,calc(100vw-32px))] max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden my-auto min-w-0 box-border">
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC] flex-shrink-0 min-w-0">
                <div className="min-w-0 pr-3">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#059669] block tracking-wider">
                    Official Quotation Request
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] truncate">
                    {inspectRfq.rfqNumber}
                  </h2>
                </div>
                <button
                  onClick={() => setInspectRfq(null)}
                  className="p-2 rounded-xl hover:bg-white text-[#64748B] hover:text-[#0F172A] transition-colors flex-shrink-0 border border-transparent hover:border-[#CBD5E1]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden space-y-5 text-xs flex-1 min-w-0 max-w-full">
                {/* Company & Contact Information Box */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono min-w-0 max-w-full">
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Company</span>
                    <span className="text-[#0F172A] font-bold text-xs break-words block">{inspectRfq.companyName}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Contact Person</span>
                    <span className="text-[#0F172A] font-bold text-xs break-words block">{inspectRfq.contactPerson}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Email</span>
                    <span className="text-[#0F172A] break-all block">{inspectRfq.email}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Phone</span>
                    <span className="text-[#0F172A] break-words block">{inspectRfq.phone}</span>
                  </div>
                  {inspectRfq.gstin && (
                    <div className="min-w-0">
                      <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">GSTIN</span>
                      <span className="text-[#0F172A] break-words block">{inspectRfq.gstin}</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Location</span>
                    <span className="text-[#0F172A] break-words block">
                      {inspectRfq.city}{inspectRfq.state ? `, ${inspectRfq.state}` : ''}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Volume Tier</span>
                    <span className="text-[#059669] font-bold break-words block">{inspectRfq.volumeTier}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Project Timeline</span>
                    <span className="text-[#0F172A] break-words block">{inspectRfq.projectTimeline}</span>
                  </div>
                </div>

                {/* Stated Requirements Payload */}
                {inspectRfq.customNotes && (
                  <div className="space-y-3 min-w-0 max-w-full">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-[#0F172A] block text-xs tracking-wide uppercase font-mono">
                        Customer Technical Requirements
                      </span>
                      {parsedNotes && (
                        <button
                          type="button"
                          onClick={() => setShowRawJson(!showRawJson)}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#059669] hover:underline"
                        >
                          <Code className="w-3.5 h-3.5" />
                          {showRawJson ? 'Hide Raw JSON' : 'View Raw JSON'}
                          {showRawJson ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}
                    </div>

                    {/* Structured Parameter Cards when JSON is available */}
                    {parsedNotes ? (
                      <div className="space-y-3 min-w-0 max-w-full">
                        {/* Category Badges if any */}
                        {categoriesList.length > 0 && (
                          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap items-center gap-2 min-w-0">
                            <span className="text-[10px] font-bold text-[#64748B] uppercase font-mono flex items-center gap-1">
                              <Layers className="w-3 h-3 text-[#059669]" />
                              Categories:
                            </span>
                            {categoriesList.map((catName: string, cIdx: number) => (
                              <span
                                key={cIdx}
                                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] break-words"
                              >
                                {catName}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Technical Parameters Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 min-w-0 max-w-full">
                          {parsedNotes.targetVoltage && (
                            <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] min-w-0">
                              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-0.5">
                                Target Voltage
                              </span>
                              <span className="font-mono font-bold text-xs text-[#0F172A] break-words block">
                                {parsedNotes.targetVoltage}
                              </span>
                            </div>
                          )}

                          {parsedNotes.targetCapacity && (
                            <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] min-w-0">
                              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-0.5">
                                Target Capacity
                              </span>
                              <span className="font-mono font-bold text-xs text-[#0F172A] break-words block">
                                {parsedNotes.targetCapacity}
                              </span>
                            </div>
                          )}

                          {parsedNotes.continuousCurrent && (
                            <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] min-w-0">
                              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-0.5">
                                Continuous Current
                              </span>
                              <span className="font-mono text-xs text-[#0F172A] break-words block">
                                {parsedNotes.continuousCurrent}
                              </span>
                            </div>
                          )}

                          {parsedNotes.peakCurrent && (
                            <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] min-w-0">
                              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-0.5">
                                Peak Current
                              </span>
                              <span className="font-mono text-xs text-[#0F172A] break-words block">
                                {parsedNotes.peakCurrent}
                              </span>
                            </div>
                          )}

                          {parsedNotes.dimensionEnvelope && (
                            <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] min-w-0">
                              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-0.5">
                                Physical Envelope / Dimensions
                              </span>
                              <span className="font-mono text-xs text-[#0F172A] break-words block">
                                {parsedNotes.dimensionEnvelope}
                              </span>
                            </div>
                          )}

                          {parsedNotes.chemistryPreference && (
                            <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] min-w-0">
                              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-0.5">
                                Chemistry Preference
                              </span>
                              <span className="font-mono font-bold text-xs text-[#059669] break-words block">
                                {parsedNotes.chemistryPreference}
                              </span>
                            </div>
                          )}

                          {parsedNotes.bmsProtocol && (
                            <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] min-w-0 sm:col-span-2 lg:col-span-3">
                              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-0.5">
                                BMS &amp; Communication Protocol
                              </span>
                              <span className="font-mono text-xs text-[#0F172A] break-words block">
                                {parsedNotes.bmsProtocol}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Customer Stated Notes / Scope */}
                        {parsedNotes.userNotes && (
                          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 min-w-0 max-w-full">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
                              Customer Project Notes &amp; Special Requirements:
                            </span>
                            <p className="text-xs text-[#334155] whitespace-pre-wrap break-words leading-relaxed">
                              {parsedNotes.userNotes}
                            </p>
                          </div>
                        )}

                        {/* Optional Collapsible Raw JSON Code Block */}
                        {showRawJson && (
                          <div className="p-3 rounded-xl bg-[#0F172A] border border-[#334155] overflow-hidden min-w-0 max-w-full">
                            <span className="text-[10px] font-mono text-[#94A3B8] block mb-1">
                              Raw JSON Payload:
                            </span>
                            <pre className="font-mono text-[11px] text-[#A7F3D0] whitespace-pre-wrap break-words max-w-full overflow-x-auto">
                              {JSON.stringify(parsedNotes, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Plain Text Fallback */
                      <div className="p-3.5 rounded-xl bg-white border border-[#CBD5E1] min-w-0 max-w-full overflow-hidden">
                        <pre className="font-mono text-[11px] text-[#334155] whitespace-pre-wrap break-words leading-relaxed max-w-full overflow-x-auto">
                          {inspectRfq.customNotes}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Status Update & Internal Notes (Green Update Section) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-4 min-w-0 max-w-full box-border">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-[#065F46] block text-xs tracking-wide">
                      Commercial Status &amp; Internal Notes
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-white text-[#065F46] border border-[#A7F3D0]">
                      Current: {inspectRfq.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                    <div className="min-w-0">
                      <label className="text-[11px] font-bold text-[#064E3B] block mb-1">
                        Update Pipeline Status
                      </label>
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full max-w-full px-3 py-2 rounded-xl bg-white border border-[#A7F3D0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#059669] box-border"
                      >
                        <option value="NEW">NEW (Fresh Intake)</option>
                        <option value="UNDER_REVIEW">UNDER_REVIEW (Engineering Scoping)</option>
                        <option value="QUOTATION_SENT">QUOTATION_SENT (Commercial Proposal Dispatched)</option>
                        <option value="IN_NEGOTIATION">IN_NEGOTIATION (Terms Discussion)</option>
                        <option value="CLOSED_WON">CLOSED_WON (Order Confirmed)</option>
                        <option value="CLOSED_LOST">CLOSED_LOST (Cancelled / Incompatible)</option>
                      </select>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="text-[11px] font-bold text-[#064E3B] block mb-1">
                      Internal Sales &amp; Engineering Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Log pricing notes, pack configuration discussions, quotation revisions, or customer updates..."
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      className="w-full max-w-full px-3 py-2 rounded-xl bg-white border border-[#A7F3D0] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#059669] box-border resize-y"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-[#A7F3D0]/60 min-w-0 max-w-full">
                    <span className="text-[10px] text-[#065F46] font-mono">
                      Changes are recorded in the audit log upon saving.
                    </span>
                    <Button
                      onClick={handleUpdateRfqStatus}
                      variant="primary"
                      size="sm"
                      disabled={savingStatus}
                      icon={<Save className="w-3.5 h-3.5" />}
                      className="w-full sm:w-auto justify-center flex-shrink-0"
                    >
                      {savingStatus ? 'Saving...' : 'Update RFQ Record'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* OEM Inspection Modal */}
      {inspectOem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto overflow-x-hidden">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl w-full max-w-[min(900px,calc(100vw-24px))] sm:max-w-[min(900px,calc(100vw-32px))] max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden my-auto min-w-0 box-border">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC] flex-shrink-0 min-w-0">
              <div className="min-w-0 pr-3">
                <span className="text-[10px] font-mono font-bold uppercase text-[#0284C7] block tracking-wider">
                  OEM Configurator Engineering Intake
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] truncate">
                  {inspectOem.enquiryNumber}
                </h2>
              </div>
              <button
                onClick={() => setInspectOem(null)}
                className="p-2 rounded-xl hover:bg-white text-[#64748B] hover:text-[#0F172A] transition-colors flex-shrink-0 border border-transparent hover:border-[#CBD5E1]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden space-y-5 text-xs flex-1 min-w-0 max-w-full">
              {/* Company Info */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono min-w-0 max-w-full">
                <div className="min-w-0">
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Company</span>
                  <span className="text-[#0F172A] font-bold text-xs break-words block">{inspectOem.companyName}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Contact</span>
                  <span className="text-[#0F172A] font-bold text-xs break-words block">{inspectOem.contactPerson}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Email</span>
                  <span className="text-[#0F172A] break-all block">{inspectOem.email}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold tracking-wider">Phone</span>
                  <span className="text-[#0F172A] break-words block">{inspectOem.phone}</span>
                </div>
              </div>

              {/* Requirement Sections */}
              <div className="space-y-3 min-w-0 max-w-full">
                <div className="p-3.5 rounded-xl bg-white border border-[#CBD5E1] min-w-0 max-w-full">
                  <span className="font-bold text-[#0284C7] font-mono block mb-1">
                    Application: {inspectOem.applicationType}
                  </span>
                  {inspectOem.applicationDetail && (
                    <p className="text-[#64748B] break-words leading-relaxed">{inspectOem.applicationDetail}</p>
                  )}
                </div>

                {inspectOem.electricalRequirements && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] min-w-0 max-w-full">
                    <span className="font-bold text-[#0F172A] font-mono block mb-1">
                      ⚡ Electrical Parameters:
                    </span>
                    <pre className="font-mono text-[11px] text-[#334155] whitespace-pre-wrap break-words max-w-full overflow-x-auto">
                      {inspectOem.electricalRequirements}
                    </pre>
                  </div>
                )}

                {inspectOem.mechanicalRequirements && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] min-w-0 max-w-full">
                    <span className="font-bold text-[#0F172A] font-mono block mb-1">
                      📐 Mechanical Envelope &amp; Mountings:
                    </span>
                    <pre className="font-mono text-[11px] text-[#334155] whitespace-pre-wrap break-words max-w-full overflow-x-auto">
                      {inspectOem.mechanicalRequirements}
                    </pre>
                  </div>
                )}

                {inspectOem.attachmentMetadata && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] min-w-0 max-w-full">
                    <span className="font-bold text-[#0F172A] font-mono block mb-1">
                      📎 Uploaded Attachments Metadata:
                    </span>
                    <pre className="font-mono text-[11px] text-[#334155] whitespace-pre-wrap break-words max-w-full overflow-x-auto">
                      {inspectOem.attachmentMetadata}
                    </pre>
                  </div>
                )}
              </div>

              {/* Status Update & Notes */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] space-y-4 min-w-0 max-w-full box-border">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-[#0369A1] block text-xs tracking-wide">
                    Engineering Review Status
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-white text-[#0369A1] border border-[#BAE6FD]">
                    Current: {inspectOem.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                  <div className="min-w-0">
                    <label className="text-[11px] font-bold text-[#0369A1] block mb-1">
                      Update Review Status
                    </label>
                    <select
                      value={modalStatus}
                      onChange={(e) => setModalStatus(e.target.value)}
                      className="w-full max-w-full px-3 py-2 rounded-xl bg-white border border-[#BAE6FD] text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7] box-border"
                    >
                      <option value="NEW">NEW</option>
                      <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                      <option value="ENGINEERING_REVIEW">ENGINEERING_REVIEW</option>
                      <option value="QUOTATION">QUOTATION</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>
                </div>

                <div className="min-w-0">
                  <label className="text-[11px] font-bold text-[#0369A1] block mb-1">
                    Internal Notes &amp; Engineering Scoping
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Log technical scoping notes, pack sizing simulations, or client feedback..."
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    className="w-full max-w-full px-3 py-2 rounded-xl bg-white border border-[#BAE6FD] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7] box-border resize-y"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-[#BAE6FD]/60 min-w-0 max-w-full">
                  <span className="text-[10px] text-[#0369A1] font-mono">
                    Changes are saved to the engineering review queue.
                  </span>
                  <Button
                    onClick={handleUpdateOemStatus}
                    variant="primary"
                    size="sm"
                    disabled={savingStatus}
                    icon={<Save className="w-3.5 h-3.5" />}
                    className="w-full sm:w-auto justify-center flex-shrink-0"
                  >
                    {savingStatus ? 'Saving...' : 'Update OEM Record'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminEnquiriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#64748B]">Loading enquiries...</div>}>
      <EnquiriesContent />
    </Suspense>
  );
}
