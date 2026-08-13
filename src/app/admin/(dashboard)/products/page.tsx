'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Layers,
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Archive,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Save,
  Check,
  ExternalLink,
  ImageIcon,
  Upload,
  ArrowUp,
  ArrowDown,
  Star,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';

interface ProductSpec {
  groupName: string;
  specKey: string;
  specValue: string;
  specUnit?: string;
  isHighlight: boolean;
  displayOrder: number;
}

interface ProductImageItem {
  id: string;
  productId?: string;
  imageUrl: string;
  altText?: string | null;
  sortOrder: number;
  isPrimary: boolean;
  isPublished: boolean;
  isArchived: boolean;
}

interface ProductItem {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  modelNumber?: string | null;
  shortDescription: string;
  applicationTag: string;
  chemistry?: string | null;
  voltageRange?: string | null;
  capacityRange?: string | null;
  energyRange?: string | null;
  cycleLife?: string | null;
  maxDischargeRate?: string | null;
  operatingTemp?: string | null;
  bmsProtocols?: string | null;
  ipRating?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  warrantySummary?: string | null;
  minimumOrderQuantity?: number | null;
  publishStatus: 'DRAFT' | 'PENDING_VERIFICATION' | 'VERIFIED' | 'ARCHIVED';
  isPublished: boolean;
  isPlaceholder: boolean;
  tdsFileUrl?: string | null;
  imageUrl?: string | null;
  category: { id: string; name: string; slug: string };
  specifications: ProductSpec[];
  images?: ProductImageItem[];
  updatedAt: string;
}

function ProductsManagementContent() {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get('action');

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(initialAction === 'new');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Image Uploading State
  const [productImages, setProductImages] = useState<ProductImageItem[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
    modelNumber: '',
    shortDescription: '',
    applicationTag: '',
    chemistry: '',
    voltageRange: '',
    capacityRange: '',
    energyRange: '',
    cycleLife: '',
    maxDischargeRate: '',
    operatingTemp: '',
    bmsProtocols: '',
    ipRating: '',
    dimensions: '',
    weight: '',
    warrantySummary: '',
    minimumOrderQuantity: '',
    publishStatus: 'DRAFT' as 'DRAFT' | 'PENDING_VERIFICATION' | 'VERIFIED' | 'ARCHIVED',
    isPublished: false,
    tdsFileUrl: '',
    specifications: [] as ProductSpec[],
  });

  const getCsrfToken = (): string => {
    const match = document.cookie.match(/(?:^|;\s*)mehar_admin_csrf=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      if (filterCategory) query.set('categoryId', filterCategory);
      if (filterStatus) query.set('status', filterStatus);
      if (search) query.set('search', search);

      const res = await fetch(`/api/admin/products?${query.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load products.');

      setProducts(data.products || []);
      setCategories(data.categories || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterCategory, filterStatus]);

  const openNewModal = () => {
    setEditingProduct(null);
    setProductImages([]);
    setFormData({
      name: '',
      slug: '',
      categoryId: categories[0]?.id || '',
      modelNumber: '',
      shortDescription: '',
      applicationTag: '',
      chemistry: '',
      voltageRange: '',
      capacityRange: '',
      energyRange: '',
      cycleLife: '',
      maxDischargeRate: '',
      operatingTemp: '',
      bmsProtocols: '',
      ipRating: '',
      dimensions: '',
      weight: '',
      warrantySummary: '',
      minimumOrderQuantity: '',
      publishStatus: 'DRAFT',
      isPublished: false,
      tdsFileUrl: '',
      specifications: [
        { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: '', isHighlight: true, displayOrder: 0 },
        { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: '', isHighlight: true, displayOrder: 1 },
      ],
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = async (prod: ProductItem) => {
    setEditingProduct(prod);
    setProductImages(prod.images || []);
    setFormData({
      name: prod.name,
      slug: prod.slug,
      categoryId: prod.categoryId,
      modelNumber: prod.modelNumber || '',
      shortDescription: prod.shortDescription,
      applicationTag: prod.applicationTag,
      chemistry: prod.chemistry || '',
      voltageRange: prod.voltageRange || '',
      capacityRange: prod.capacityRange || '',
      energyRange: prod.energyRange || '',
      cycleLife: prod.cycleLife || '',
      maxDischargeRate: prod.maxDischargeRate || '',
      operatingTemp: prod.operatingTemp || '',
      bmsProtocols: prod.bmsProtocols || '',
      ipRating: prod.ipRating || '',
      dimensions: prod.dimensions || '',
      weight: prod.weight || '',
      warrantySummary: prod.warrantySummary || '',
      minimumOrderQuantity: prod.minimumOrderQuantity ? String(prod.minimumOrderQuantity) : '',
      publishStatus: prod.publishStatus,
      isPublished: prod.isPublished,
      tdsFileUrl: prod.tdsFileUrl || '',
      specifications: prod.specifications && prod.specifications.length > 0 ? prod.specifications : [],
    });
    setFormError('');
    setModalOpen(true);

    // Fetch fresh images
    try {
      const res = await fetch(`/api/admin/products/${prod.id}/images`);
      const data = await res.json();
      if (res.ok && data.images) {
        setProductImages(data.images);
      }
    } catch {
      // Fallback to existing
    }
  };

  const handleSlugify = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleAddSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        {
          groupName: 'Electrical',
          specKey: '',
          specValue: '',
          specUnit: '',
          isHighlight: false,
          displayOrder: prev.specifications.length,
        },
      ],
    }));
  };

  const handleUpdateSpecRow = (index: number, field: keyof ProductSpec, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.specifications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, specifications: updated };
    });
  };

  const handleRemoveSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, idx) => idx !== index),
    }));
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormError('');
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'products');

      const res = await fetch('/api/admin/uploads', {
        method: 'POST',
        headers: {
          'x-csrf-token': getCsrfToken(),
        },
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image.');

      // If we are editing an existing product, attach to product in DB
      if (editingProduct) {
        const attachRes = await fetch(`/api/admin/products/${editingProduct.id}/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': getCsrfToken(),
          },
          body: JSON.stringify({
            imageUrl: data.url,
            altText: `${formData.name || 'MEHAR Product'} View`,
            sortOrder: productImages.length,
            isPrimary: productImages.length === 0,
            isPublished: false, // Starts unpublished by default per Correction #2
          }),
        });

        const attachData = await attachRes.json();
        if (attachRes.ok && attachData.image) {
          setProductImages((prev) => [...prev, attachData.image]);
        }
      } else {
        // Local temporary state for new product before first save
        const newImg: ProductImageItem = {
          id: `tmp-${Date.now()}`,
          imageUrl: data.url,
          altText: `${formData.name || 'MEHAR Product'} View`,
          sortOrder: productImages.length,
          isPrimary: productImages.length === 0,
          isPublished: false,
          isArchived: false,
        };
        setProductImages((prev) => [...prev, newImg]);
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Error uploading image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSetPrimaryImage = async (index: number) => {
    const target = productImages[index];
    if (!target) return;

    const updated = productImages.map((img, idx) => ({
      ...img,
      isPrimary: idx === index,
    }));
    setProductImages(updated);

    if (editingProduct && !target.id.startsWith('tmp-')) {
      await fetch(`/api/admin/products/${editingProduct.id}/images/${target.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({
          ...target,
          isPrimary: true,
        }),
      });
    }
  };

  const handleTogglePublishImage = async (index: number) => {
    const target = productImages[index];
    if (!target) return;

    const updatedState = !target.isPublished;
    const updated = productImages.map((img, idx) =>
      idx === index ? { ...img, isPublished: updatedState } : img
    );
    setProductImages(updated);

    if (editingProduct && !target.id.startsWith('tmp-')) {
      await fetch(`/api/admin/products/${editingProduct.id}/images/${target.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({
          ...target,
          isPublished: updatedState,
        }),
      });
    }
  };

  const handleMoveImage = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= productImages.length) return;

    const reordered = [...productImages];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIdx, 0, moved);

    const withOrder = reordered.map((img, idx) => ({ ...img, sortOrder: idx }));
    setProductImages(withOrder);

    if (editingProduct) {
      for (const img of withOrder) {
        if (!img.id.startsWith('tmp-')) {
          fetch(`/api/admin/products/${editingProduct.id}/images/${img.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-csrf-token': getCsrfToken(),
            },
            body: JSON.stringify(img),
          });
        }
      }
    }
  };

  const handleArchiveImage = async (index: number) => {
    const target = productImages[index];
    if (!target) return;

    if (editingProduct && !target.id.startsWith('tmp-')) {
      await fetch(`/api/admin/products/${editingProduct.id}/images/${target.id}`, {
        method: 'DELETE',
        headers: {
          'x-csrf-token': getCsrfToken(),
        },
      });
    }

    setProductImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    setFormError('');

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      // Parse MOQ
      let moqVal: number | null = null;
      if (formData.minimumOrderQuantity && formData.minimumOrderQuantity.trim() !== '') {
        const parsed = parseInt(formData.minimumOrderQuantity, 10);
        if (isNaN(parsed) || parsed <= 0) {
          throw new Error('Minimum Order Quantity must be a positive integer.');
        }
        moqVal = parsed;
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({
          ...formData,
          minimumOrderQuantity: moqVal,
          specifications: formData.specifications.filter((s) => s.specKey && s.specValue),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product.');

      setModalOpen(false);
      fetchProducts();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Error saving product.');
    } finally {
      setFormSaving(false);
    }
  };

  const handleArchiveProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to archive "${name}"? This removes it from public view.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'x-csrf-token': getCsrfToken(),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to archive product.');
      fetchProducts();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error archiving product.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & New Product CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">Catalog Management</Badge>
            <span className="text-xs font-mono text-[#64748B]">Dual-State Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Product &amp; Technical Catalog
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage battery specifications, verified models, minimum order quantities (MOQ), and multi-image galleries.
          </p>
        </div>

        <Button
          onClick={openNewModal}
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Battery
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by battery name, model code, application, or chemistry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs font-mono focus:outline-none focus:border-[#059669]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs font-mono focus:outline-none focus:border-[#059669]"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING_VERIFICATION">Pending Verification</option>
            <option value="VERIFIED">Verified &amp; Published</option>
          </select>

          <Button onClick={fetchProducts} variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-2 text-xs text-[#991B1B]">
          <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#64748B]">
            Loading product repository...
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Layers className="w-8 h-8 text-[#94A3B8] mx-auto" />
            <h3 className="text-sm font-bold text-[#0F172A]">No products found</h3>
            <p className="text-xs text-[#64748B]">
              No battery systems match the selected filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono uppercase text-[10px]">
                  <th className="py-3.5 px-6 font-bold">Battery Model / Name</th>
                  <th className="py-3.5 px-6 font-bold">Category &amp; Specs</th>
                  <th className="py-3.5 px-6 font-bold">MOQ</th>
                  <th className="py-3.5 px-6 font-bold">Gallery</th>
                  <th className="py-3.5 px-6 font-bold">Publish Status</th>
                  <th className="py-3.5 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#0F172A]">{p.name}</div>
                      <div className="font-mono text-[11px] text-[#64748B]">
                        {p.modelNumber || p.slug}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-[#0F172A]">{p.category?.name}</div>
                      <div className="text-[11px] font-mono text-[#059669]">
                        {p.voltageRange || 'Voltage TBD'} | {p.capacityRange || 'Capacity TBD'}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono font-bold">
                      {p.minimumOrderQuantity ? (
                        <span className="text-[#0F172A]">{p.minimumOrderQuantity} units</span>
                      ) : (
                        <span className="text-[#64748B] text-[11px]">Contact MEHAR</span>
                      )}
                    </td>

                    <td className="py-4 px-6 font-mono text-[11px]">
                      {p.images && p.images.length > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]">
                          <ImageIcon className="w-3 h-3 text-[#059669]" />
                          {p.images.length} image{p.images.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">Placeholder</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      {p.publishStatus === 'VERIFIED' && p.isPublished ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                          <CheckCircle2 className="w-3 h-3 text-[#059669]" /> Publicly Live
                        </span>
                      ) : p.publishStatus === 'PENDING_VERIFICATION' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                          <Clock className="w-3 h-3 text-[#CA8A04]" /> Pending Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]">
                          Draft (Hidden)
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg border border-[#CBD5E1] text-[#334155] hover:bg-[#F1F5F9] hover:text-[#059669] transition-colors"
                          title="Edit Battery & Images"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleArchiveProduct(p.id, p.name)}
                          className="p-1.5 rounded-lg border border-[#CBD5E1] text-[#991B1B] hover:bg-[#FEF2F2] transition-colors"
                          title="Archive Product"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase tracking-wider block">
                  Product Editor
                </span>
                <h2 className="text-xl font-extrabold text-[#0F172A]">
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'Create New Battery Product'}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
              {formError && (
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]">
                  {formError}
                </div>
              )}

              {/* Basic Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">
                    Product Display Name <span className="text-[#059669]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MEHAR 72V 100Ah LFP Pack"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        name,
                        slug: prev.slug ? prev.slug : handleSlugify(name),
                      }));
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">
                    URL Slug <span className="text-[#059669]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 72v-100ah-lfp-pack"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: handleSlugify(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] font-mono focus:outline-none focus:border-[#059669]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">
                    Battery Category <span className="text-[#059669]">*</span>
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">
                    Model Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MHR-72100-LFP"
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] font-mono focus:outline-none focus:border-[#059669]"
                  />
                </div>

                {/* B2B MOQ Field */}
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">
                    Minimum Order Quantity (MOQ Units)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 50 (Leave blank for 'Contact MEHAR')"
                    value={formData.minimumOrderQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, minimumOrderQuantity: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] font-mono focus:outline-none focus:border-[#059669]"
                  />
                  <span className="text-[10px] text-[#64748B] block">
                    Optional. Blank entries will display &quot;Contact MEHAR&quot; on public RFQ pages.
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">
                    Application Tag <span className="text-[#059669]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commercial 3-Wheelers & E-Rickshaws"
                    value={formData.applicationTag}
                    onChange={(e) => setFormData({ ...formData, applicationTag: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-[#334155] block">
                    Short Description <span className="text-[#059669]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief industrial summary of product application and durability..."
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              {/* PRODUCT IMAGE GALLERY MANAGER */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-xs text-[#059669] uppercase font-mono tracking-wider">
                      Product Photography &amp; Image Gallery
                    </h3>
                    <p className="text-[11px] text-[#64748B]">
                      Upload multiple angles. Images start unpublished until verified and published by an administrator.
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] font-bold text-xs hover:bg-[#D1FAE5] transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#059669]" />
                    {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {/* Gallery List */}
                {productImages.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-center text-xs text-[#64748B]">
                    No custom images attached. The public website will render the configured category placeholder.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {productImages.map((img, idx) => (
                      <div
                        key={img.id || idx}
                        className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.imageUrl}
                              alt={img.altText || 'Thumbnail'}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {img.isPrimary && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                                  <Star className="w-3 h-3 text-[#CA8A04] fill-[#CA8A04]" /> Primary Image
                                </span>
                              )}
                              {img.isPublished ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                                  <Eye className="w-3 h-3 text-[#059669]" /> Published
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]">
                                  <EyeOff className="w-3 h-3" /> Draft / Hidden
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-[#64748B] truncate max-w-xs">
                              {img.imageUrl}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center">
                          {/* Reorder Buttons */}
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded-lg border border-[#CBD5E1] text-[#64748B] hover:bg-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, 'down')}
                            disabled={idx === productImages.length - 1}
                            className="p-1 rounded-lg border border-[#CBD5E1] text-[#64748B] hover:bg-white disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Set Primary Button */}
                          {!img.isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="px-2 py-1 rounded-lg border border-[#CBD5E1] bg-white text-[11px] font-mono font-semibold text-[#334155] hover:border-[#059669]"
                            >
                              Make Primary
                            </button>
                          )}

                          {/* Toggle Publish Button */}
                          <button
                            type="button"
                            onClick={() => handleTogglePublishImage(idx)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-mono font-semibold border ${
                              img.isPublished
                                ? 'bg-white border-[#CBD5E1] text-[#64748B]'
                                : 'bg-[#059669] text-white border-[#059669]'
                            }`}
                          >
                            {img.isPublished ? 'Unpublish' : 'Publish'}
                          </button>

                          {/* Archive/Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleArchiveImage(idx)}
                            className="p-1 rounded-lg border border-[#FECACA] text-[#991B1B] hover:bg-[#FEF2F2]"
                            title="Archive Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Parameters */}
              <div className="pt-4 border-t border-[#E2E8F0]">
                <h3 className="font-bold text-xs text-[#059669] uppercase font-mono tracking-wider mb-3">
                  Technical Specifications (Verified Parameters)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-medium text-[#64748B] block mb-1">Nominal Voltage</label>
                    <input
                      type="text"
                      placeholder="e.g. 72V (60V–87.6V)"
                      value={formData.voltageRange}
                      onChange={(e) => setFormData({ ...formData, voltageRange: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[#64748B] block mb-1">Rated Capacity</label>
                    <input
                      type="text"
                      placeholder="e.g. 100Ah"
                      value={formData.capacityRange}
                      onChange={(e) => setFormData({ ...formData, capacityRange: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[#64748B] block mb-1">Total Energy</label>
                    <input
                      type="text"
                      placeholder="e.g. 7.2 kWh"
                      value={formData.energyRange}
                      onChange={(e) => setFormData({ ...formData, energyRange: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[#64748B] block mb-1">Cell Chemistry</label>
                    <input
                      type="text"
                      placeholder="e.g. LiFePO4 (LFP)"
                      value={formData.chemistry}
                      onChange={(e) => setFormData({ ...formData, chemistry: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[#64748B] block mb-1">Cycle Life (@ 80% DoD)</label>
                    <input
                      type="text"
                      placeholder="e.g. 3,500+ Cycles"
                      value={formData.cycleLife}
                      onChange={(e) => setFormData({ ...formData, cycleLife: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[#64748B] block mb-1">Max Discharge Rate</label>
                    <input
                      type="text"
                      placeholder="e.g. 1.5C Continuous / 3.0C Peak"
                      value={formData.maxDischargeRate}
                      onChange={(e) => setFormData({ ...formData, maxDischargeRate: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* DETAILED GROUPED SPECIFICATIONS EDITOR */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-[#059669] uppercase font-mono tracking-wider">
                      Grouped Technical Specifications Table
                    </h3>
                    <p className="text-[11px] text-[#64748B]">
                      Add, edit, or remove detailed specifications shown in the customer datasheet matrix.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleAddSpecRow}
                    icon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add Specification Row
                  </Button>
                </div>

                {formData.specifications.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-center text-xs text-[#64748B]">
                    No custom specification rows defined. Click &ldquo;Add Specification Row&rdquo; to add parameters.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {formData.specifications.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-12 gap-2 items-center text-xs"
                      >
                        {/* Group Name */}
                        <div className="col-span-3">
                          <select
                            value={spec.groupName}
                            onChange={(e) => handleUpdateSpecRow(sIdx, 'groupName', e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg border border-[#CBD5E1] text-[11px] font-semibold bg-white"
                          >
                            <option value="Electrical">Electrical</option>
                            <option value="Electrochemistry">Electrochemistry</option>
                            <option value="BMS & Safety">BMS &amp; Safety</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Operational">Operational</option>
                            <option value="Quality & Testing">Quality &amp; Testing</option>
                          </select>
                        </div>

                        {/* Spec Key */}
                        <div className="col-span-3">
                          <input
                            type="text"
                            placeholder="Parameter Name (e.g. Nominal Voltage)"
                            value={spec.specKey}
                            onChange={(e) => handleUpdateSpecRow(sIdx, 'specKey', e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg border border-[#CBD5E1] text-[11px]"
                          />
                        </div>

                        {/* Spec Value */}
                        <div className="col-span-3">
                          <input
                            type="text"
                            placeholder="Value (e.g. 51.2)"
                            value={spec.specValue}
                            onChange={(e) => handleUpdateSpecRow(sIdx, 'specValue', e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg border border-[#CBD5E1] text-[11px] font-mono"
                          />
                        </div>

                        {/* Spec Unit */}
                        <div className="col-span-1">
                          <input
                            type="text"
                            placeholder="Unit (V)"
                            value={spec.specUnit || ''}
                            onChange={(e) => handleUpdateSpecRow(sIdx, 'specUnit', e.target.value)}
                            className="w-full px-1.5 py-1.5 rounded-lg border border-[#CBD5E1] text-[11px] font-mono text-center"
                          />
                        </div>

                        {/* Highlight Toggle */}
                        <div className="col-span-1 flex items-center justify-center">
                          <label className="flex items-center gap-1 cursor-pointer" title="Highlight in Summary Badges">
                            <input
                              type="checkbox"
                              checked={spec.isHighlight}
                              onChange={(e) => handleUpdateSpecRow(sIdx, 'isHighlight', e.target.checked)}
                              className="w-3.5 h-3.5 rounded text-[#059669]"
                            />
                            <span className="text-[10px] font-mono text-[#64748B]">Star</span>
                          </label>
                        </div>

                        {/* Delete Row Button */}
                        <div className="col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecRow(sIdx)}
                            className="p-1 rounded-lg border border-[#FECACA] text-[#991B1B] hover:bg-[#FEF2F2]"
                            title="Remove Row"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Publication Governance Controls */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">

                <span className="font-bold text-xs text-[#0F172A] block font-mono uppercase">
                  Release &amp; Verification State
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-[#334155] block mb-1">Verification Status</label>
                    <select
                      value={formData.publishStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publishStatus: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs font-mono bg-white"
                    >
                      <option value="DRAFT">DRAFT (Internal Engineering Only)</option>
                      <option value="PENDING_VERIFICATION">PENDING_VERIFICATION (QA Review)</option>
                      <option value="VERIFIED">VERIFIED (Enterprise QA Confirmed)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="isPublishedCheck"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669]"
                    />
                    <label htmlFor="isPublishedCheck" className="font-medium text-[#0F172A]">
                      Publish to Live Customer Catalog
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
                <Button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  variant="outline"
                  size="md"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={formSaving}
                  icon={<Save className="w-4 h-4" />}
                >
                  {formSaving ? 'Saving Product...' : 'Save Battery Model'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs font-mono text-[#64748B]">
          Loading product console...
        </div>
      }
    >
      <ProductsManagementContent />
    </Suspense>
  );
}
