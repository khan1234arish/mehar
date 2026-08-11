'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  FileText,
  Plus,
  Edit2,
  Archive,
  CheckCircle2,
  AlertTriangle,
  X,
  Save,
  CloudUpload,
  ExternalLink,
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  fileUrl: string;
  fileType: string;
  fileSize?: string | null;
  isGated: boolean;
  isPlaceholder: boolean;
  isPublished: boolean;
  downloadCount: number;
  createdAt: string;
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResourceItem | null>(null);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Corporate Overview',
    description: '',
    fileUrl: '',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    isGated: false,
    isPlaceholder: false,
    isPublished: true,
  });

  const getCsrfToken = (): string => {
    const match = document.cookie.match(/(?:^|;\s*)mehar_admin_csrf=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/resources');
      const data = await res.json();
      setResources(data.resources || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load resources.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Product Catalogue',
      description: '',
      fileUrl: '/assets/resources/mehar-catalogue.pdf',
      fileType: 'PDF',
      fileSize: '2.5 MB',
      isGated: false,
      isPlaceholder: false,
      isPublished: true,
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (item: ResourceItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      fileUrl: item.fileUrl,
      fileType: item.fileType,
      fileSize: item.fileSize || '',
      isGated: item.isGated,
      isPlaceholder: item.isPlaceholder,
      isPublished: item.isPublished,
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    setFormError('');

    try {
      const url = editingItem
        ? `/api/admin/resources/${editingItem.id}`
        : '/api/admin/resources';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save resource.');

      setModalOpen(false);
      fetchResources();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Error saving resource.');
    } finally {
      setFormSaving(false);
    }
  };

  const handleArchive = async (id: string, title: string) => {
    if (!confirm(`Archive resource "${title}"? It will no longer be visible publicly.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/resources/${id}`, {
        method: 'DELETE',
        headers: { 'x-csrf-token': getCsrfToken() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to archive.');
      fetchResources();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error archiving.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">Resource Library</Badge>
            <span className="text-xs font-mono text-[#64748B]">B2B Datasheets &amp; Brochures</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Resource Center Management
          </h1>
        </div>

        <Button
          onClick={openNewModal}
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
        >
          Add Downloadable Resource
        </Button>
      </div>

      {/* Cloud Storage Notice */}
      <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-start gap-3 text-xs text-[#0369A1]">
        <CloudUpload className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Storage Architecture Compliance:</strong>
          <span>
            Production assets and large technical datasheets must be hosted on dedicated persistent cloud object storage (e.g. AWS S3, Cloudflare R2, or Google Cloud Storage) to avoid loss on ephemeral compute. Direct server disk writes are disallowed.
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B]">
          {error}
        </div>
      )}

      {/* Resources Table */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Resource Title</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Format &amp; Size</th>
                <th className="py-3.5 px-4 font-bold">Gated Lead Capture</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">
                    Loading resource library...
                  </td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">
                    No resource documents published.
                  </td>
                </tr>
              ) : (
                resources.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#0F172A] block">{item.title}</span>
                      <span className="font-mono text-[10px] text-[#64748B] block truncate max-w-xs">
                        {item.fileUrl}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] font-mono text-[10px] text-[#334155]">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#475569]">
                      {item.fileType} {item.fileSize ? `(${item.fileSize})` : ''}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.isGated ? (
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                          Requires Email
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#F1F5F9] text-[#475569]">
                          Direct Download
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.isPublished ? (
                        <span className="text-[#059669] font-bold font-mono text-[11px]">
                          ✓ Published
                        </span>
                      ) : (
                        <span className="text-[#94A3B8] font-mono text-[11px]">
                          Draft / Hidden
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg border border-[#CBD5E1] hover:bg-white hover:border-[#059669] text-[#0F172A] hover:text-[#059669] transition-colors"
                          title="Edit Document"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleArchive(item.id, item.title)}
                          className="p-1.5 rounded-lg border border-[#CBD5E1] hover:bg-[#FEF2F2] hover:border-[#FECACA] text-[#64748B] hover:text-[#DC2626] transition-colors"
                          title="Archive"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden my-6">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <h2 className="text-base font-bold text-[#0F172A]">
                {editingItem ? 'Edit Resource Document' : 'Add Downloadable Resource'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white text-[#64748B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]">
                  {formError}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MEHAR 2026 Commercial Battery Catalogue"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A]"
                  >
                    <option value="Product Catalogue">Product Catalogue</option>
                    <option value="Technical Datasheet">Technical Datasheet</option>
                    <option value="Engineering Brochure">Engineering Brochure</option>
                    <option value="Certifications & Safety">Certifications &amp; Safety</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">File Size (e.g. 2.4 MB)</label>
                  <input
                    type="text"
                    placeholder="2.4 MB"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">File Storage URL / Path *</label>
                <input
                  type="text"
                  required
                  placeholder="https://storage.meharbatteries.com/datasheets/lfp-72v.pdf"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the document contents..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <label className="flex items-center gap-2 font-semibold text-[#0F172A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isGated}
                    onChange={(e) => setFormData({ ...formData, isGated: e.target.checked })}
                    className="w-4 h-4 rounded text-[#059669]"
                  />
                  <span>Gate with B2B Business Lead Intake Form</span>
                </label>

                <label className="flex items-center gap-2 font-semibold text-[#0F172A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[#059669]"
                  />
                  <span>Published on Public /resources page</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={formSaving}
                  icon={<Save className="w-3.5 h-3.5" />}
                >
                  {formSaving ? 'Saving...' : 'Save Resource'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
