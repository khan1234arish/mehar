'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Edit3,
  Save,
  CheckCircle2,
  AlertTriangle,
  LayoutTemplate,
  ShieldCheck,
  ImageIcon,
  Upload,
  Eye,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { ContentSettingsData } from '@/lib/settings';

interface SiteImageItem {
  key: string;
  label: string;
  section?: 'homepage' | 'technology' | 'applications' | 'placeholders';
  defaultUrl: string;
  currentUrl: string;
  altText: string;
  description: string;
  isActive: boolean;
}

export default function AdminContentSettingsPage() {
  const [activeTab, setActiveTab] = useState<'content' | 'images'>('content');
  const [imageSectionFilter, setImageSectionFilter] = useState<'all' | 'homepage' | 'technology' | 'applications' | 'placeholders'>('all');

  // Copy & Text Content
  const [formData, setFormData] = useState<ContentSettingsData>({
    heroHeadline: '',
    heroSubheadline: '',
    topBarText: '',
    footerDisclaimer: '',
  });

  // Site-wide Placeholder Images
  const [siteImages, setSiteImages] = useState<SiteImageItem[]>([]);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [storageNotice, setStorageNotice] = useState('');
  const [success, setSuccess] = useState(false);

  const getCsrfToken = (): string => {
    const match = document.cookie.match(/(?:^|;\s*)mehar_admin_csrf=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  const fetchSettings = async () => {
    setLoading(true);
    setError('');
    try {
      const [resContent, resImages] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/settings/site-images'),
      ]);

      const dataContent = await resContent.json();
      if (resContent.ok && dataContent.content) {
        setFormData(dataContent.content);
      }

      const dataImages = await resImages.json();
      if (resImages.ok && dataImages.images) {
        setSiteImages(dataImages.images);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching content settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveContent = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ section: 'content', data: formData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save website content.');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving content settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageFileUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    setError('');
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'placeholders');

      const res = await fetch('/api/admin/uploads', {
        method: 'POST',
        headers: {
          'x-csrf-token': getCsrfToken(),
        },
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');

      if (!data.url) throw new Error('Upload succeeded but no URL was returned.');

      // Update image url in state with the confirmed upload URL
      setSiteImages((prev) =>
        prev.map((img) => (img.key === key ? { ...img, currentUrl: data.url } : img))
      );

      // Warn if using non-persistent local dev storage
      if (!data.isPersistentProductionStorage) {
        setStorageNotice(
          `Upload saved to local dev storage. Click "Save Image Settings" to persist the URL to the database. Configure S3/R2 for persistent production storage.`
        );
      } else {
        setStorageNotice('');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSaveSiteImage = async (img: SiteImageItem) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings/site-images', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({
          key: img.key,
          imageUrl: img.currentUrl,
          altText: img.altText,
          description: img.description,
          isActive: img.isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update placeholder image.');

      // Re-fetch from DB to confirm the write actually persisted
      await fetchSettings();
      setStorageNotice('');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving image setting.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="green">Public Branding &amp; Visuals</Badge>
          <span className="text-xs font-mono text-[#64748B]">XSS-Safe &amp; Managed Placeholders</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Website Content &amp; Media Manager
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Configure public headlines, announcements, and managed fallback placeholder imagery used across the website.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E2E8F0] pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${
            activeTab === 'content'
              ? 'bg-[#0F172A] text-white'
              : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Edit3 className="w-4 h-4" /> Copy &amp; Announcements
        </button>
        <button
          onClick={() => setActiveTab('images')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${
            activeTab === 'images'
              ? 'bg-[#0F172A] text-white'
              : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Managed Site Placeholders ({siteImages.length})
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-2 text-xs text-[#991B1B]">
          <AlertTriangle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {storageNotice && !error && (
        <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center gap-2 text-xs text-[#1E40AF]">
          <Eye className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
          <span>{storageNotice}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2 text-xs text-[#065F46]">
          <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0" />
          <span>Configuration changes saved and confirmed in database.</span>
        </div>
      )}


      {/* TAB 1: COPY & ANNOUNCEMENTS */}
      {activeTab === 'content' && (
        <form onSubmit={handleSaveContent} className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
              <LayoutTemplate className="w-4 h-4 text-[#059669]" />
              Homepage Hero Section
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Primary Hero Headline <span className="text-[#059669]">*</span>
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Hero Subheadline / Value Proposition <span className="text-[#059669]">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.heroSubheadline}
                onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              Global Header Alert &amp; Footer Notices
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Top Announcement Bar Text (Optional)
              </label>
              <input
                type="text"
                value={formData.topBarText || ''}
                onChange={(e) => setFormData({ ...formData, topBarText: e.target.value })}
                placeholder="e.g. ISO 9001:2015 Certified Manufacturing Facility"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Footer Legal &amp; Manufacturing Disclaimer
              </label>
              <textarea
                rows={2}
                value={formData.footerDisclaimer || ''}
                onChange={(e) => setFormData({ ...formData, footerDisclaimer: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={saving || loading}
              icon={<Save className="w-4 h-4" />}
            >
              {saving ? 'Publishing Content...' : 'Save Content Settings'}
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: MANAGED SITE IMAGES & VISUALS */}
      {activeTab === 'images' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#475569] space-y-1">
            <strong className="text-[#0F172A] block">Independent Image Management Architecture:</strong>
            <p>
              Each visual on the MEHAR website is independently configurable across Homepage sections, Battery Cell &amp; Engineering pages, and Industrial Application sectors. Uploading or changing an image for one location does not impact other sections.
            </p>
          </div>

          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
            {[
              { id: 'all', label: `All Visuals (${siteImages.length})` },
              { id: 'homepage', label: `Homepage (${siteImages.filter((i) => i.section === 'homepage').length})` },
              { id: 'technology', label: `Technology & Cells (${siteImages.filter((i) => i.section === 'technology').length})` },
              { id: 'applications', label: `Applications (${siteImages.filter((i) => i.section === 'applications').length})` },
              { id: 'placeholders', label: `Global Defaults (${siteImages.filter((i) => i.section === 'placeholders').length})` },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setImageSectionFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  imageSectionFilter === f.id
                    ? 'bg-[#059669] text-white shadow-sm'
                    : 'bg-white border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] hover:border-[#059669]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {siteImages
              .filter((img) => imageSectionFilter === 'all' || img.section === imageSectionFilter)
              .map((img) => (
                <div
                  key={img.key}
                  className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-[#059669] uppercase tracking-wider bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                          {img.key}
                        </span>
                        {img.section && (
                          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                            · {img.section}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[#0F172A]">{img.label}</h3>
                      {img.description && (
                        <p className="text-xs text-[#64748B] mt-0.5">{img.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          const updated = { ...img, isActive: !img.isActive };
                          setSiteImages((prev) =>
                            prev.map((i) => (i.key === img.key ? updated : i))
                          );
                          await handleSaveSiteImage(updated);
                        }}
                        disabled={saving}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 disabled:opacity-50 ${
                          img.isActive
                            ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                            : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]'
                        }`}
                      >
                        {img.isActive ? <ToggleRight className="w-4 h-4 text-[#059669]" /> : <ToggleLeft className="w-4 h-4" />}
                        {img.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    {/* Image Preview */}
                    <div className="md:col-span-4 aspect-video rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center p-3 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.currentUrl}
                        alt={img.altText || img.label}
                        className="max-h-28 max-w-full object-contain"
                      />
                    </div>

                    {/* Settings & Upload */}
                    <div className="md:col-span-8 space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-bold text-[#334155] block">
                          Alt Text (Accessibility &amp; SEO) <span className="text-[#059669]">*</span>
                        </label>
                        <input
                          type="text"
                          value={img.altText}
                          onChange={(e) =>
                            setSiteImages((prev) =>
                              prev.map((i) => (i.key === img.key ? { ...i, altText: e.target.value } : i))
                            )
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div>
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#059669] text-xs font-mono font-semibold text-[#0F172A] transition-colors">
                            <Upload className="w-3.5 h-3.5 text-[#059669]" />
                            {uploadingKey === img.key ? 'Uploading...' : 'Replace Image'}
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/svg+xml"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageFileUpload(img.key, file);
                              }}
                            />
                          </label>
                        </div>

                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={() => handleSaveSiteImage(img)}
                          disabled={saving}
                          icon={<Save className="w-3.5 h-3.5" />}
                        >
                          Save Image Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
