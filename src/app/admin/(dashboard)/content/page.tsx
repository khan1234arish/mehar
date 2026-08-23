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
  Layers,
  ArrowUp,
  ArrowDown,
  Star,
  Sparkles,
  Check,
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

interface CarouselProductItem {
  id: string;
  name: string;
  slug: string;
  modelNumber?: string | null;
  category: string;
  categorySlug?: string;
  specs: string;
  imageUrl: string;
  isPublished: boolean;
  publishStatus: string;
  isFeatured: boolean;
  featuredOrder: number;
}

export default function AdminContentSettingsPage() {
  const [activeTab, setActiveTab] = useState<'content' | 'carousel' | 'images'>('content');
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

  // Hero Carousel Products
  const [carouselProducts, setCarouselProducts] = useState<CarouselProductItem[]>([]);
  const [featuredProductIds, setFeaturedProductIds] = useState<string[]>([]);
  const [carouselSaving, setCarouselSaving] = useState(false);
  const [carouselSuccess, setCarouselSuccess] = useState(false);

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
      const [resContent, resImages, resCarousel] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/settings/site-images'),
        fetch('/api/admin/hero-carousel'),
      ]);

      const dataContent = await resContent.json();
      if (resContent.ok && dataContent.content) {
        setFormData(dataContent.content);
      }

      const dataImages = await resImages.json();
      if (resImages.ok && dataImages.images) {
        setSiteImages(dataImages.images);
      }

      if (resCarousel.ok) {
        const dataCarousel = await resCarousel.json();
        setCarouselProducts(dataCarousel.products || []);
        setFeaturedProductIds(dataCarousel.featuredProductIds || []);
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

  const handleToggleCarouselProduct = async (productId: string) => {
    const isCurrentlyFeatured = featuredProductIds.includes(productId);
    const newFeaturedIds = isCurrentlyFeatured
      ? featuredProductIds.filter((id) => id !== productId)
      : [...featuredProductIds, productId];

    setFeaturedProductIds(newFeaturedIds);
    setCarouselProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isFeatured: !isCurrentlyFeatured } : p))
    );

    try {
      const res = await fetch('/api/admin/hero-carousel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({ productIds: newFeaturedIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update hero carousel.');
      setCarouselSuccess(true);
      setTimeout(() => setCarouselSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error updating carousel selection.');
    }
  };

  const handleMoveSlide = async (productId: string, direction: 'up' | 'down') => {
    const idx = featuredProductIds.indexOf(productId);
    if (idx === -1) return;

    const newIds = [...featuredProductIds];
    if (direction === 'up' && idx > 0) {
      const temp = newIds[idx - 1];
      newIds[idx - 1] = newIds[idx];
      newIds[idx] = temp;
    } else if (direction === 'down' && idx < newIds.length - 1) {
      const temp = newIds[idx + 1];
      newIds[idx + 1] = newIds[idx];
      newIds[idx] = temp;
    } else {
      return;
    }

    setFeaturedProductIds(newIds);

    try {
      const res = await fetch('/api/admin/hero-carousel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({ productIds: newIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save slide order.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving slide order.');
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

      setSiteImages((prev) =>
        prev.map((img) => (img.key === key ? { ...img, currentUrl: data.url } : img))
      );

      const targetImg = siteImages.find((i) => i.key === key);
      if (targetImg) {
        await handleSaveSiteImage({
          ...targetImg,
          currentUrl: data.url,
        });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error uploading placeholder image.');
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSaveSiteImage = async (img: SiteImageItem) => {
    setSaving(true);
    setError('');
    setSuccess(false);

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
          isActive: img.isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save site image settings.');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving site image.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-[#64748B]">
        Loading website content manager...
      </div>
    );
  }

  const filteredImages = siteImages.filter((img) => {
    if (imageSectionFilter === 'all') return true;
    return img.section === imageSectionFilter;
  });

  const featuredList = featuredProductIds
    .map((id) => carouselProducts.find((p) => p.id === id))
    .filter(Boolean) as CarouselProductItem[];

  const unfeaturedList = carouselProducts.filter(
    (p) => !featuredProductIds.includes(p.id) && p.isPublished
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="green">CMS &amp; Media Control</Badge>
          <span className="text-xs font-mono text-[#64748B]">Real-Time Production Sync</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Website Content &amp; Media Manager
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Configure public headlines, select home screen hero showcase products, and manage site media.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E2E8F0] pb-2 text-xs font-mono">
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
          onClick={() => setActiveTab('carousel')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${
            activeTab === 'carousel'
              ? 'bg-[#0F172A] text-white'
              : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#059669]" /> Home Screen Carousel ({featuredProductIds.length} Active)
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

      {carouselSuccess && (
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2 text-xs text-[#065F46]">
          <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0" />
          <span>Home Screen Hero Carousel selection saved and updated live!</span>
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

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Hero Main Headline <span className="text-[#059669]">*</span>
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Hero Sub-headline / Value Proposition <span className="text-[#059669]">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.heroSubheadline}
                onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
                required
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              Announcements &amp; Legal Disclaimers
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Top Bar Promotional / Notice Banner
              </label>
              <input
                type="text"
                value={formData.topBarText || ''}
                onChange={(e) => setFormData({ ...formData, topBarText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#334155] block">
                Footer Legal Disclaimer
              </label>
              <textarea
                rows={2}
                value={formData.footerDisclaimer || ''}
                onChange={(e) => setFormData({ ...formData, footerDisclaimer: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={saving}
              icon={<Save className="w-4 h-4" />}
            >
              {saving ? 'Saving Content...' : 'Save Public Website Copy'}
            </Button>
          </div>
        </form>
      )}


      {/* TAB 2: HOME SCREEN HERO CAROUSEL MANAGER */}
      {activeTab === 'carousel' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4 mb-6">
              <div>
                <h2 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#059669]" />
                  Home Screen Hero Carousel Products
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Choose exactly which battery products appear in the rotating showcase on the homepage. Reorder slides using the arrows.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-xs font-mono font-bold">
                  {featuredProductIds.length} Slides Selected
                </span>
              </div>
            </div>

            {/* Currently Active Slides in Order */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xs font-mono uppercase font-bold text-[#059669] tracking-wider">
                1. Active Slides (Rotating in this order)
              </h3>

              {featuredList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-center text-xs font-mono text-[#64748B]">
                  No products currently selected. Add products from the available list below to display them on the homepage.
                </div>
              ) : (
                <div className="space-y-2">
                  {featuredList.map((prod, idx) => (
                    <div
                      key={prod.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-4 hover:border-[#059669]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {idx + 1}
                        </span>

                        <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="max-h-10 max-w-full object-contain"
                          />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#0F172A] truncate">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] font-mono text-[#64748B] truncate">
                            {prod.category} · {prod.specs || 'Lithium Battery'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveSlide(prod.id, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#334155] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Slide Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveSlide(prod.id, 'down')}
                          disabled={idx === featuredList.length - 1}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#334155] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Slide Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleCarouselProduct(prod.id)}
                          className="px-2.5 py-1 rounded-xl bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] text-xs font-mono font-bold hover:bg-[#FEE2E2] transition-colors cursor-pointer"
                        >
                          Remove from Home
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Products to Add */}
            <div className="space-y-3 pt-6 border-t border-[#E2E8F0]">
              <h3 className="text-xs font-mono uppercase font-bold text-[#334155] tracking-wider">
                2. Available Products ({unfeaturedList.length} Not on Home Screen)
              </h3>

              {unfeaturedList.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-[#64748B]">
                  All active published products are currently featured in the hero carousel.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unfeaturedList.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3 hover:bg-white hover:border-[#CBD5E1] transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="max-h-8 max-w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#0F172A] truncate">
                            {prod.name}
                          </h4>
                          <p className="text-[10px] font-mono text-[#64748B] truncate">
                            {prod.category}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleCarouselProduct(prod.id)}
                        className="px-2.5 py-1 rounded-xl bg-white text-[#059669] border border-[#A7F3D0] hover:bg-[#ECFDF5] text-xs font-mono font-bold shrink-0 transition-colors cursor-pointer"
                      >
                        + Add to Home
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* TAB 3: MANAGED SITE PLACEHOLDERS */}
      {activeTab === 'images' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {(['all', 'homepage', 'technology', 'applications', 'placeholders'] as const).map(
                (sec) => (
                  <button
                    key={sec}
                    onClick={() => setImageSectionFilter(sec)}
                    className={`px-3 py-1.5 rounded-xl capitalize transition-colors ${
                      imageSectionFilter === sec
                        ? 'bg-[#0F172A] text-white font-bold'
                        : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {sec === 'all' ? 'All Sections' : sec}
                  </button>
                )
              )}
            </div>

            <span className="text-xs font-mono text-[#64748B]">
              Showing {filteredImages.length} of {siteImages.length} configured slots
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.key}
                className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
                      {img.section || 'General'}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">
                      Key: <strong>{img.key}</strong>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0F172A]">{img.label}</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">{img.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 aspect-video rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center p-3 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.currentUrl}
                      alt={img.altText || img.label}
                      className="max-h-28 max-w-full object-contain"
                    />
                  </div>

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
