'use client';

import React, { useState, useEffect, Suspense } from 'react';
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

  const openRfqInspect = (rfq: RfqItem) => {
    setInspectRfq(rfq);
    setModalStatus(rfq.status);
    setModalNotes(rfq.internalNotes || '');
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
                ) : rfqs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      No RFQ submissions found.
                    </td>
                  </tr>
                ) : (
                  rfqs.map((rfq) => (
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
                ) : oemList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      No OEM engineering intakes found.
                    </td>
                  </tr>
                ) : (
                  oemList.map((oem) => (
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
                ) : generalList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#64748B]">
                      No general contacts found.
                    </td>
                  </tr>
                ) : (
                  generalList.map((g) => (
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
      {inspectRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden my-6">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#059669]">
                  Official Quotation Request
                </span>
                <h2 className="text-lg font-bold text-[#0F172A]">{inspectRfq.rfqNumber}</h2>
              </div>
              <button
                onClick={() => setInspectRfq(null)}
                className="p-2 rounded-xl hover:bg-white text-[#64748B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Company Info Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-2 gap-3 font-mono">
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Company</span>
                  <span className="text-[#0F172A] font-bold text-xs">{inspectRfq.companyName}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Contact Person</span>
                  <span className="text-[#0F172A] font-bold text-xs">{inspectRfq.contactPerson}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Email</span>
                  <span className="text-[#0F172A]">{inspectRfq.email}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Phone</span>
                  <span className="text-[#0F172A]">{inspectRfq.phone}</span>
                </div>
              </div>

              {/* Requirements Payload */}
              {inspectRfq.customNotes && (
                <div className="space-y-1.5">
                  <span className="font-bold text-[#334155] block">Customer Stated Requirements</span>
                  <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] font-mono text-[11px] space-y-1">
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {inspectRfq.customNotes}
                    </pre>
                  </div>
                </div>
              )}

              {/* Status Update & Internal Notes */}
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-3">
                <span className="font-bold text-[#065F46] block">Commercial Status &amp; Internal Notes</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#064E3B] block mb-1">Update Status</label>
                    <select
                      value={modalStatus}
                      onChange={(e) => setModalStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#A7F3D0] text-xs font-semibold text-[#0F172A]"
                    >
                      <option value="NEW">NEW</option>
                      <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                      <option value="QUOTATION_SENT">QUOTATION_SENT</option>
                      <option value="IN_NEGOTIATION">IN_NEGOTIATION</option>
                      <option value="CLOSED_WON">CLOSED_WON</option>
                      <option value="CLOSED_LOST">CLOSED_LOST</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#064E3B] block mb-1">Internal Sales Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Log pricing notes, quotation revisions, or customer discussions..."
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#A7F3D0] text-xs text-[#0F172A] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleUpdateRfqStatus}
                    variant="primary"
                    size="sm"
                    disabled={savingStatus}
                    icon={<Save className="w-3.5 h-3.5" />}
                  >
                    {savingStatus ? 'Saving...' : 'Update RFQ Record'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OEM Inspection Modal */}
      {inspectOem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-6">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#0284C7]">
                  OEM Configurator Engineering Intake
                </span>
                <h2 className="text-lg font-bold text-[#0F172A]">{inspectOem.enquiryNumber}</h2>
              </div>
              <button
                onClick={() => setInspectOem(null)}
                className="p-2 rounded-xl hover:bg-white text-[#64748B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Company Info */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Company</span>
                  <span className="text-[#0F172A] font-bold text-xs">{inspectOem.companyName}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Contact</span>
                  <span className="text-[#0F172A] font-bold text-xs">{inspectOem.contactPerson}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Email</span>
                  <span className="text-[#0F172A] truncate block">{inspectOem.email}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Phone</span>
                  <span className="text-[#0F172A]">{inspectOem.phone}</span>
                </div>
              </div>

              {/* Requirement Sections */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#CBD5E1]">
                  <span className="font-bold text-[#0284C7] font-mono block mb-1">
                    Application: {inspectOem.applicationType}
                  </span>
                  {inspectOem.applicationDetail && (
                    <p className="text-[#64748B]">{inspectOem.applicationDetail}</p>
                  )}
                </div>

                {inspectOem.electricalRequirements && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="font-bold text-[#0F172A] font-mono block mb-1">
                      ⚡ Electrical Parameters:
                    </span>
                    <pre className="font-mono text-[11px] text-[#334155] whitespace-pre-wrap">
                      {inspectOem.electricalRequirements}
                    </pre>
                  </div>
                )}

                {inspectOem.mechanicalRequirements && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="font-bold text-[#0F172A] font-mono block mb-1">
                      📐 Mechanical Envelope &amp; Mountings:
                    </span>
                    <pre className="font-mono text-[11px] text-[#334155] whitespace-pre-wrap">
                      {inspectOem.mechanicalRequirements}
                    </pre>
                  </div>
                )}

                {inspectOem.attachmentMetadata && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="font-bold text-[#0F172A] font-mono block mb-1">
                      📎 Uploaded Attachments Metadata:
                    </span>
                    <pre className="font-mono text-[11px] text-[#334155] whitespace-pre-wrap">
                      {inspectOem.attachmentMetadata}
                    </pre>
                  </div>
                )}
              </div>

              {/* Status Update & Notes */}
              <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] space-y-3">
                <span className="font-bold text-[#0369A1] block">Engineering Review Status</span>
                <div>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#BAE6FD] text-xs font-semibold text-[#0F172A]"
                  >
                    <option value="NEW">NEW</option>
                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                    <option value="ENGINEERING_REVIEW">ENGINEERING_REVIEW</option>
                    <option value="QUOTATION">QUOTATION</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0369A1] block mb-1">Internal Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Log technical scoping notes, pack sizing simulations, or client feedback..."
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#BAE6FD] text-xs text-[#0F172A] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleUpdateOemStatus}
                    variant="primary"
                    size="sm"
                    disabled={savingStatus}
                    icon={<Save className="w-3.5 h-3.5" />}
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
