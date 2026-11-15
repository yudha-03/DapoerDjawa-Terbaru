'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HERO_BANNERS, PRODUCTS } from '@/lib/data';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Edit, Image as ImageIcon, Loader2, Plus, Ticket, Trash2, Users, X } from 'lucide-react';
import { toast } from '@/components/ui/toast';
import type { HeroBanner, PromoCode } from '@/types/dashboard';

type AdminUser = {
  id_user: string;
  nama_user: string;
  email: string;
  role: string;
  no_hp?: string | null;
  alamat?: string | null;
  created_at?: string;
};

type ModalItem =
  | Partial<HeroBanner>
  | Partial<PromoCode>
  | Partial<AdminUser>;

type ConfirmAction =
  | 'delete-banner'
  | 'delete-promo'
  | 'demote-admin'
  | null;

type ConfirmDialogState = {
  open: boolean;
  action: ConfirmAction;
  id: string | null;
};

const INITIAL_BANNERS: HeroBanner[] = HERO_BANNERS.map((b) => ({
  id: b.id,
  title: b.title,
  subtitle: b.subtitle,
  promo_code: b.promo_code,
  cta_text: b.cta_text,
  image_url: b.image_url,
  link_url: b.link_url,
  is_active: b.is_active,
  sort_order: b.sort_order,
}));

const INITIAL_PROMOS: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'DAPOERHEMAT',
    discount_type: 'percentage',
    discount_value: 10,
    max_discount: 25000,
    min_order_value: 50000,
    start_date: new Date().toISOString(),
    end_date: null,
    usage_limit: 100,
    used_count: 14,
    is_active: true,
  },
  {
    id: 'promo-2',
    code: 'ONGKIRGRATIS',
    discount_type: 'nominal',
    discount_value: 15000,
    max_discount: 15000,
    min_order_value: 100000,
    start_date: new Date().toISOString(),
    end_date: null,
    usage_limit: 50,
    used_count: 8,
    is_active: true,
  },
];

const INITIAL_ADMINS: AdminUser[] = [
  {
    id_user: 'usr-1',
    nama_user: 'Owner DapoerDjawa',
    email: 'owner@dapoerdjawa.com',
    role: 'owner',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id_user: 'usr-2',
    nama_user: 'Admin DapoerDjawa',
    email: 'admin@dapoerdjawa.com',
    role: 'admin',
    created_at: '2025-01-10T00:00:00Z',
  },
];

function getStoredBanners(): HeroBanner[] {
  if (typeof window === 'undefined') return INITIAL_BANNERS;
  const raw = localStorage.getItem('dapoerdjawa_banners');
  if (raw) {
    try {
      return JSON.parse(raw) as HeroBanner[];
    } catch { }
  }
  localStorage.setItem('dapoerdjawa_banners', JSON.stringify(INITIAL_BANNERS));
  return INITIAL_BANNERS;
}

function getStoredPromos(): PromoCode[] {
  if (typeof window === 'undefined') return INITIAL_PROMOS;
  const raw = localStorage.getItem('dapoerdjawa_promos');
  if (raw) {
    try {
      return JSON.parse(raw) as PromoCode[];
    } catch { }
  }
  localStorage.setItem('dapoerdjawa_promos', JSON.stringify(INITIAL_PROMOS));
  return INITIAL_PROMOS;
}

function getStoredAdmins(): AdminUser[] {
  if (typeof window === 'undefined') return INITIAL_ADMINS;
  const raw = localStorage.getItem('dapoerdjawa_admins');
  if (raw) {
    try {
      return JSON.parse(raw) as AdminUser[];
    } catch { }
  }
  localStorage.setItem('dapoerdjawa_admins', JSON.stringify(INITIAL_ADMINS));
  return INITIAL_ADMINS;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}`;
}

export default function SettingsTab() {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [productList, setProductList] = useState<{ id: string; nama_produk: string }[]>([]);
  const [activeModal, setActiveModal] = useState<'banner' | 'promo' | 'admin' | null>(null);
  const [editingItem, setEditingItem] = useState<ModalItem | null>(null);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    action: null,
    id: null,
  });
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    promo_code: '',
    cta_text: 'Belanja Sekarang',
    image_url: '',
    link_url: '',
    sort_order: 1,
    is_active: true,
  });
  const [promoForm, setPromoForm] = useState({
    code: '',
    discount_type: 'nominal',
    discount_value: 0,
    max_discount: '',
    min_order_value: '',
    start_date: new Date().toISOString().substring(0, 16),
    end_date: '',
    usage_limit: '',
    is_active: true,
  });
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    role: 'admin',
  });

  const fetchData = useCallback(async () => {
    try {
      setBanners(getStoredBanners());
      setPromos(getStoredPromos());
      setAdmins(getStoredAdmins());
      setProductList(PRODUCTS.map((p) => ({ id: p.id, nama_produk: p.nama_produk })));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchData();
    }, 0);
    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchData]);

  const openConfirmDialog = (
    action: Exclude<ConfirmAction, null>,
    id: string
  ) => {
    setConfirmDialog({ open: true, action, id });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, action: null, id: null });
  };

  const getConfirmDialogContent = () => {
    switch (confirmDialog.action) {
      case 'delete-banner':
        return {
          title: 'Hapus Banner?',
          description: 'Banner ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.',
          actionText: 'Hapus Banner',
        };
      case 'delete-promo':
        return {
          title: 'Hapus Kode Promo?',
          description: 'Kode promo ini akan dihapus secara permanen dan tidak dapat digunakan lagi. Tindakan ini tidak dapat dibatalkan.',
          actionText: 'Hapus Promo',
        };
      case 'demote-admin':
        return {
          title: 'Turunkan Hak Akses Admin?',
          description: 'Akun ini akan dikembalikan menjadi user biasa dan tidak lagi memiliki akses sebagai admin.',
          actionText: 'Jadikan User',
        };
      default:
        return {
          title: 'Konfirmasi Tindakan',
          description: 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
          actionText: 'Lanjutkan',
        };
    }
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageUrl = bannerForm.image_url;
    try {
      setIsUploadingBanner(true);
      if (bannerFile) {
        finalImageUrl = await readFileAsDataUrl(bannerFile);
      }
      if (!finalImageUrl) throw new Error('Gambar banner wajib diisi!');

      const currentBanners = getStoredBanners();
      if (editingItem && 'id' in editingItem && editingItem.id) {
        const updated = currentBanners.map((b) =>
          b.id === editingItem.id
            ? {
              ...b,
              title: bannerForm.title,
              subtitle: bannerForm.subtitle || null,
              promo_code: bannerForm.promo_code || null,
              cta_text: bannerForm.cta_text || 'Belanja Sekarang',
              image_url: finalImageUrl,
              link_url: bannerForm.link_url || null,
              sort_order: Number(bannerForm.sort_order),
              is_active: bannerForm.is_active,
            }
            : b
        );
        localStorage.setItem('dapoerdjawa_banners', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Banner berhasil diperbarui!' });
      } else {
        const newBanner: HeroBanner = {
          id: generateId('banner'),
          title: bannerForm.title,
          subtitle: bannerForm.subtitle || null,
          promo_code: bannerForm.promo_code || null,
          cta_text: bannerForm.cta_text || 'Belanja Sekarang',
          image_url: finalImageUrl,
          link_url: bannerForm.link_url || null,
          sort_order: Number(bannerForm.sort_order),
          is_active: bannerForm.is_active,
          created_at: new Date().toISOString(),
        };
        const updated = [...currentBanners, newBanner];
        localStorage.setItem('dapoerdjawa_banners', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Banner baru berhasil ditambahkan!' });
      }
      closeModal();
      await fetchData();
    } catch (error) {
      toast.add({
        type: 'error',
        title: error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan banner.',
      });
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    openConfirmDialog('delete-banner', id);
  };

  const executeDeleteBanner = async (id: string) => {
    try {
      const currentBanners = getStoredBanners();
      const updated = currentBanners.filter((b) => b.id !== id);
      localStorage.setItem('dapoerdjawa_banners', JSON.stringify(updated));
      toast.add({ type: 'success', title: 'Banner berhasil dihapus!' });
      await fetchData();
    } catch {
      toast.add({ type: 'error', title: 'Terjadi kesalahan saat menghapus banner.' });
    }
  };

  const handleSavePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentPromos = getStoredPromos();
      if (editingItem && 'id' in editingItem && editingItem.id) {
        const updated = currentPromos.map((p) =>
          p.id === editingItem.id
            ? {
              ...p,
              code: promoForm.code.toUpperCase(),
              discount_type: promoForm.discount_type,
              discount_value: Number(promoForm.discount_value),
              max_discount: promoForm.max_discount ? Number(promoForm.max_discount) : null,
              min_order_value: promoForm.min_order_value ? Number(promoForm.min_order_value) : null,
              start_date: promoForm.start_date ? new Date(promoForm.start_date).toISOString() : new Date().toISOString(),
              end_date: promoForm.end_date ? new Date(promoForm.end_date).toISOString() : null,
              usage_limit: promoForm.usage_limit ? Number(promoForm.usage_limit) : null,
              is_active: promoForm.is_active,
            }
            : p
        );
        localStorage.setItem('dapoerdjawa_promos', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Kode promo berhasil diperbarui!' });
      } else {
        const newPromo: PromoCode = {
          id: generateId('promo'),
          code: promoForm.code.toUpperCase(),
          discount_type: promoForm.discount_type,
          discount_value: Number(promoForm.discount_value),
          max_discount: promoForm.max_discount ? Number(promoForm.max_discount) : null,
          min_order_value: promoForm.min_order_value ? Number(promoForm.min_order_value) : null,
          start_date: promoForm.start_date ? new Date(promoForm.start_date).toISOString() : new Date().toISOString(),
          end_date: promoForm.end_date ? new Date(promoForm.end_date).toISOString() : null,
          usage_limit: promoForm.usage_limit ? Number(promoForm.usage_limit) : null,
          used_count: 0,
          is_active: promoForm.is_active,
          created_at: new Date().toISOString(),
        };
        const updated = [newPromo, ...currentPromos];
        localStorage.setItem('dapoerdjawa_promos', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Kode promo baru berhasil dibuat!' });
      }
      closeModal();
      await fetchData();
    } catch {
      toast.add({ type: 'error', title: 'Terjadi kesalahan saat menyimpan promo.' });
    }
  };

  const handleDeletePromo = async (id: string) => {
    openConfirmDialog('delete-promo', id);
  };

  const executeDeletePromo = async (id: string) => {
    try {
      const currentPromos = getStoredPromos();
      const updated = currentPromos.filter((p) => p.id !== id);
      localStorage.setItem('dapoerdjawa_promos', JSON.stringify(updated));
      toast.add({ type: 'success', title: 'Kode promo berhasil dihapus!' });
      await fetchData();
    } catch {
      toast.add({ type: 'error', title: 'Terjadi kesalahan saat menghapus promo.' });
    }
  };

  const handleSaveAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const namaUser = adminForm.name.trim();
    const email = adminForm.email.trim().toLowerCase();
    if (!namaUser) return toast.add({ type: 'error', title: 'Nama admin wajib diisi.' });
    if (!email) return toast.add({ type: 'error', title: 'Email admin wajib diisi.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.add({ type: 'error', title: 'Format email tidak valid.' });
    }
    setSavingAdmin(true);
    try {
      const currentAdmins = getStoredAdmins();
      if (editingItem && 'id_user' in editingItem && editingItem.id_user) {
        const updated = currentAdmins.map((a) =>
          a.id_user === editingItem.id_user ? { ...a, nama_user: namaUser } : a
        );
        localStorage.setItem('dapoerdjawa_admins', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Data admin berhasil diperbarui.' });
      } else {
        const existing = currentAdmins.find((a) => a.email === email);
        if (existing) {
          toast.add({ type: 'error', title: 'Email tersebut sudah terdaftar sebagai admin.' });
          return;
        }
        const newAdmin: AdminUser = {
          id_user: generateId('usr'),
          nama_user: namaUser,
          email,
          role: 'admin',
          created_at: new Date().toISOString(),
        };
        const updated = [...currentAdmins, newAdmin];
        localStorage.setItem('dapoerdjawa_admins', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Admin baru berhasil ditambahkan.' });
      }
      closeModal();
      await fetchData();
    } finally {
      setSavingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    openConfirmDialog('demote-admin', id);
  };

  const executeDemoteAdmin = async (id: string) => {
    try {
      const currentAdmins = getStoredAdmins();
      const updated = currentAdmins.filter((a) => a.id_user !== id);
      localStorage.setItem('dapoerdjawa_admins', JSON.stringify(updated));
      toast.add({ type: 'success', title: 'Admin berhasil dikembalikan menjadi user biasa.' });
      await fetchData();
    } catch {
      toast.add({ type: 'error', title: 'Terjadi kesalahan saat mengubah role admin.' });
    }
  };

  const handleConfirmAction = async () => {
    const { action, id } = confirmDialog;
    if (!action || !id) {
      closeConfirmDialog();
      return;
    }
    closeConfirmDialog();
    if (action === 'delete-banner') await executeDeleteBanner(id);
    if (action === 'delete-promo') await executeDeletePromo(id);
    if (action === 'demote-admin') await executeDemoteAdmin(id);
  };

  const openModal = (
    type: 'banner' | 'promo' | 'admin',
    item: ModalItem | null = null
  ) => {
    setActiveModal(type);
    setEditingItem(item);
    if (type === 'banner') {
      setBannerFile(null);
      const banner = item as Partial<HeroBanner> | null;
      setBannerForm({
        title: banner?.title || '',
        subtitle: banner?.subtitle || '',
        promo_code: banner?.promo_code || '',
        cta_text: banner?.cta_text || 'Belanja Sekarang',
        image_url: banner?.image_url || '',
        link_url: banner?.link_url || '',
        sort_order: banner?.sort_order ?? (banners.length > 0 ? Math.max(...banners.map(b => b.sort_order)) + 1 : 1),
        is_active: banner?.is_active ?? true,
      });
    } else if (type === 'promo') {
      const promo = item as Partial<PromoCode> | null;
      setPromoForm({
        code: promo?.code || '',
        discount_type: promo?.discount_type || 'nominal',
        discount_value: promo?.discount_value || 0,
        max_discount: promo?.max_discount?.toString() || '',
        min_order_value: promo?.min_order_value?.toString() || '',
        start_date: promo?.start_date
          ? new Date(promo.start_date).toISOString().substring(0, 16)
          : new Date().toISOString().substring(0, 16),
        end_date: promo?.end_date
          ? new Date(promo.end_date).toISOString().substring(0, 16)
          : '',
        usage_limit: promo?.usage_limit?.toString() || '',
        is_active: promo?.is_active ?? true,
      });
    } else if (type === 'admin') {
      const admin = item as Partial<AdminUser> | null;
      setAdminForm({
        name: admin?.nama_user || '',
        email: admin?.email || '',
        role: 'admin',
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingItem(null);
    setBannerFile(null);
    setAdminForm({ name: '', email: '', role: 'admin' });
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-5xl pb-10 animate-pulse">
        <div>
          <div className="h-8 bg-gray-200 rounded-lg w-56 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-80" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 border-b border-gray-100 p-4 sm:p-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="h-5 bg-gray-200 rounded w-40" />
              </div>
              <div className="h-9 bg-gray-200 rounded-xl w-32" />
            </div>
            <div className="p-5 space-y-4">
              {[1, 2].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-24 h-12 bg-gray-200 rounded-lg shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                    <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const confirmContent = getConfirmDialogContent();

  return (
    <div className="space-y-8 max-w-5xl pb-10">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Pengaturan Sistem
        </h2>
        <p className="text-gray-500 mt-1 font-medium">
          Kelola hero banner, kode promo, dan akun admin toko.
        </p>
      </div>

      <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-600" />
              <CardTitle>Carousel Banner Utama</CardTitle>
            </div>
            <Button
              onClick={() => openModal('banner')}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-sm text-sm h-9"
            >
              <Plus className="w-4 h-4 mr-1" />
              Tambah Banner
            </Button>
          </div>
          <CardDescription>
            Kelola urutan dan tampilan banner di halaman utama toko.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {banners.length === 0 ? (
              <p className="p-5 text-sm text-gray-400 italic">
                Belum ada banner.
              </p>
            ) : (
              banners.map((b) => (
                <div
                  key={b.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <Image
                      src={b.image_url}
                      alt={b.title}
                      width={96}
                      height={48}
                      className="w-24 h-12 object-cover rounded-lg border border-gray-200 shrink-0"
                      unoptimized
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900 truncate">
                          {b.title}
                        </p>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono shrink-0">
                          Urutan: {b.sort_order}
                        </span>
                      </div>
                      {b.subtitle && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">{b.subtitle}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-block ${b.is_active
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-500'
                            }`}
                        >
                          {b.is_active ? 'Aktif' : 'Non-Aktif'}
                        </span>
                        {b.promo_code && (
                          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            {b.promo_code}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openModal('banner', b)}
                      className="h-8 w-8 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteBanner(b.id)}
                      className="h-8 w-8 rounded-lg border-red-100 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-blue-600" />
              <CardTitle>Kode Promo Diskon</CardTitle>
            </div>
            <Button
              onClick={() => openModal('promo')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm text-sm h-9"
            >
              <Plus className="w-4 h-4 mr-1" />
              Buat Promo
            </Button>
          </div>
          <CardDescription>
            Atur syarat dan potongan diskon untuk transaksi pembeli.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {promos.length === 0 ? (
              <p className="p-5 text-sm text-gray-400 italic">
                Belum ada promo.
              </p>
            ) : (
              promos.map((p) => {
                const now = new Date();
                const isExpired = p.end_date ? new Date(p.end_date) < now : false;
                const isFullyUsed = p.usage_limit !== null && (p.used_count || 0) >= (p.usage_limit || 0);
                return (
                  <div
                    key={p.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold font-mono bg-gray-100 px-2 py-0.5 rounded text-sm text-gray-900">
                          {p.code}
                        </span>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {p.discount_type === 'nominal'
                            ? `Rp ${Number(p.discount_value).toLocaleString('id-ID')}`
                            : `${p.discount_value}%`}
                        </span>
                        {(() => {
                          if (!p.is_active) {
                            return (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-gray-100 text-gray-500">
                                Non-Aktif
                              </span>
                            );
                          }
                          if (isExpired) {
                            return (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-red-100 text-red-700">
                                Kadaluarsa
                              </span>
                            );
                          }
                          if (isFullyUsed) {
                            return (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-orange-100 text-orange-700">
                                Habis
                              </span>
                            );
                          }
                          return (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-100 text-emerald-700">
                              Aktif
                            </span>
                          );
                        })()}
                      </div>
                      <div className="text-xs text-gray-500 flex gap-4 mt-1 flex-wrap">
                        <span>
                          Min Order:{' '}
                          {p.min_order_value
                            ? `Rp ${Number(p.min_order_value).toLocaleString('id-ID')}`
                            : '-'}
                        </span>
                        <span>
                          Terpakai: {p.used_count || 0}
                          {p.usage_limit ? `/${p.usage_limit}` : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openModal('promo', p)}
                        className="h-8 w-8 rounded-lg"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeletePromo(p.id)}
                        className="h-8 w-8 rounded-lg border-red-100 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <CardTitle>Akun Admin</CardTitle>
            </div>
            <Button
              onClick={() => openModal('admin')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm text-sm h-9"
            >
              <Plus className="w-4 h-4 mr-1" />
              Tambah Admin
            </Button>
          </div>
          <CardDescription>
            Manajemen pengguna yang memiliki akses dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {admins.length === 0 ? (
              <p className="p-5 text-sm text-gray-400 italic">
                Belum ada akun admin.
              </p>
            ) : (
              admins.map((a) => (
                <div
                  key={a.id_user}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex shrink-0 items-center justify-center text-sm">
                      {a.nama_user
                        ? a.nama_user.charAt(0).toUpperCase()
                        : 'A'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">
                        {a.nama_user}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {a.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      ADMIN
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openModal('admin', a)}
                      className="h-8 w-8 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteAdmin(a.id_user)}
                      className="h-8 w-8 rounded-lg border-red-100 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'banner' && (
              <form onSubmit={handleSaveBanner} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingItem ? 'Edit Banner' : 'Tambah Banner'}
                </h3>
                <div>
                  <label className="text-xs font-bold text-gray-700">Judul Banner</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                    placeholder="Contoh: Spesial Lebaran 2026"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Subtitle / Deskripsi</label>
                  <input
                    type="text"
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                    placeholder="Contoh: Diskon 15% untuk semua kue kering"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Opsional. Tampil di bawah judul.</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Kode Promo</label>
                  <input
                    type="text"
                    value={bannerForm.promo_code}
                    onChange={(e) => setBannerForm({ ...bannerForm, promo_code: e.target.value.toUpperCase() })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm font-mono uppercase"
                    placeholder="Contoh: LEBARAN26"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Opsional. Tampil sebagai badge yang bisa di-copy pengunjung.</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Teks Tombol CTA</label>
                  <input
                    type="text"
                    value={bannerForm.cta_text}
                    onChange={(e) => setBannerForm({ ...bannerForm, cta_text: e.target.value })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                    placeholder="Belanja Sekarang"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Tampil apabila Link Tujuan diisi.</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Gambar Banner</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setBannerFile(e.target.files[0]);
                      }
                    }}
                    className="w-full mt-1 p-2 border rounded-xl text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-amber-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-amber-700 hover:file:bg-amber-100"
                  />
                  {editingItem && !bannerFile && bannerForm.image_url && (
                    <p className="mt-2 text-xs text-gray-500">
                      *Biarkan kosong jika tidak ingin mengubah gambar.
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Link Tujuan (Klik Banner Menuju)</label>
                  <select
                    value={
                      bannerForm.link_url.startsWith('/product/')
                        ? bannerForm.link_url
                        : bannerForm.link_url
                          ? '__custom__'
                          : ''
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      setBannerForm({ ...bannerForm, link_url: val === '__custom__' ? '' : val });
                    }}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                  >
                    <option value="">— Tanpa Link (tidak bisa diklik) —</option>
                    {productList.map((p) => (
                      <option key={p.id} value={`/product/${p.id}`}>
                        🛒 {p.nama_produk}
                      </option>
                    ))}
                    <option value="__custom__">✏️ Custom URL (tulis sendiri)</option>
                  </select>
                  {bannerForm.link_url && !bannerForm.link_url.startsWith('/product/') && (
                    <input
                      type="text"
                      value={bannerForm.link_url}
                      onChange={(e) => setBannerForm({ ...bannerForm, link_url: e.target.value })}
                      className="w-full mt-2 p-2.5 border rounded-xl text-sm"
                      placeholder="Contoh: /products atau https://..."
                    />
                  )}
                  {bannerForm.link_url && (
                    <p className="mt-1 text-[11px] text-gray-500">
                      Link: <code className="bg-gray-100 px-1 rounded">{bannerForm.link_url}</code>
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Urutan</label>
                  <input
                    type="number"
                    value={bannerForm.sort_order}
                    onChange={(e) => setBannerForm({ ...bannerForm, sort_order: Number(e.target.value) })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="banner_is_active"
                    checked={bannerForm.is_active}
                    onChange={(e) => setBannerForm({ ...bannerForm, is_active: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="banner_is_active" className="text-xs font-semibold text-gray-700">
                    Aktifkan Banner
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={isUploadingBanner}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl disabled:opacity-70"
                >
                  {isUploadingBanner ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengunggah...
                    </>
                  ) : (
                    'Simpan Banner'
                  )}
                </Button>
              </form>
            )}

            {activeModal === 'promo' && (
              <form onSubmit={handleSavePromo} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingItem ? 'Edit Kode Promo' : 'Buat Kode Promo'}
                </h3>
                <div>
                  <label className="text-xs font-bold text-gray-700">Kode Promo</label>
                  <input
                    type="text"
                    required
                    value={promoForm.code}
                    onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm font-mono uppercase"
                    placeholder="LEBARAN2026"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700">Tipe Diskon</label>
                    <select
                      value={promoForm.discount_type}
                      onChange={(e) => setPromoForm({ ...promoForm, discount_type: e.target.value })}
                      className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                    >
                      <option value="nominal">Nominal (Rp)</option>
                      <option value="percentage">Persentase (%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700">Nilai Diskon</label>
                    <input
                      type="number"
                      required
                      value={promoForm.discount_value}
                      onChange={(e) => setPromoForm({ ...promoForm, discount_value: Number(e.target.value) })}
                      className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700">Min. Belanja</label>
                    <input
                      type="number"
                      value={promoForm.min_order_value}
                      onChange={(e) => setPromoForm({ ...promoForm, min_order_value: e.target.value })}
                      className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                      placeholder="Opsional"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700">Max Diskon</label>
                    <input
                      type="number"
                      value={promoForm.max_discount}
                      onChange={(e) => setPromoForm({ ...promoForm, max_discount: e.target.value })}
                      className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                      placeholder="Opsional"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700">Tanggal Mulai</label>
                    <input
                      type="datetime-local"
                      value={promoForm.start_date}
                      onChange={(e) => setPromoForm({ ...promoForm, start_date: e.target.value })}
                      className="w-full mt-1 p-2 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700">Tanggal Selesai</label>
                    <input
                      type="datetime-local"
                      value={promoForm.end_date}
                      onChange={(e) => setPromoForm({ ...promoForm, end_date: e.target.value })}
                      className="w-full mt-1 p-2 border rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Batas Penggunaan</label>
                  <input
                    type="number"
                    value={promoForm.usage_limit}
                    onChange={(e) => setPromoForm({ ...promoForm, usage_limit: e.target.value })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                    placeholder="Kosongkan jika tak terbatas"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="promo_is_active"
                    checked={promoForm.is_active}
                    onChange={(e) => setPromoForm({ ...promoForm, is_active: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="promo_is_active" className="text-xs font-semibold text-gray-700">
                    Status Promo Aktif
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  Simpan Promo
                </Button>
              </form>
            )}

            {activeModal === 'admin' && (
              <form onSubmit={handleSaveAdmin} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingItem ? 'Edit Admin' : 'Tambah Admin'}
                </h3>
                <div>
                  <label className="text-xs font-bold text-gray-700">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm"
                    placeholder="Contoh: Nama Admin"
                    disabled={savingAdmin}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="email@example.com"
                    disabled={savingAdmin || Boolean(editingItem)}
                  />
                  {editingItem && (
                    <p className="text-[11px] text-gray-400 mt-1">
                      Email login tidak diubah dari menu ini agar data profil tetap konsisten.
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Role</label>
                  <input
                    type="text"
                    value="admin"
                    disabled
                    className="w-full mt-1 p-2.5 border rounded-xl text-sm bg-gray-100 text-gray-500"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Role otomatis diset sebagai admin.
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={savingAdmin}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-60"
                >
                  {savingAdmin ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    'Simpan Admin'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            closeConfirmDialog();
          }
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className="rounded-xl bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {confirmContent.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
