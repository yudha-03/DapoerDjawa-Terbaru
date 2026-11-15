'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Image as ImageIcon,
  Loader2,
  X,
  Upload,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';
import { formatRupiah } from '@/lib/api';
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

import { PRODUCTS, VARIANTS } from '@/lib/data';

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

type ProductVariant = {
  id: string;
  produk_id: string;
  raw_name: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  tinggi: number;
  diameter: number;
  image_url: string | null;
  foto_2: string | null;
  foto_3: string | null;
  size: string;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const possibleError = error as { message?: unknown };
    if (typeof possibleError.message === 'string') return possibleError.message;
  }
  return 'Terjadi kesalahan yang tidak diketahui.';
};

function getStoredProducts(): ProductVariant[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('dapoerdjawa_products');
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as ProductVariant[];
      let hasMigration = false;
      const migrated = parsed.map((p) => {
        if (p.image_url?.includes('1505253758473-96b3015f27eb')) {
          hasMigration = true;
          return {
            ...p,
            image_url: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=800&q=80',
            foto_2: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=800&q=80',
          };
        }
        return p;
      });
      if (hasMigration) {
        localStorage.setItem('dapoerdjawa_products', JSON.stringify(migrated));
        return migrated;
      }
      return parsed;
    } catch {
      // fallback
    }
  }
  const initial: ProductVariant[] = VARIANTS.map((v) => {
    const p = PRODUCTS.find((prod) => prod.id === v.produk_id);
    return {
      id: v.id,
      produk_id: v.produk_id,
      raw_name: p?.nama_produk || 'Produk',
      name: p ? `${p.nama_produk} (${v.ukuran})` : `Produk (${v.ukuran})`,
      description: p?.deskripsi || '',
      price: v.price,
      stock: v.stok,
      weight: 340,
      tinggi: 7,
      diameter: 9,
      image_url: v.img,
      foto_2: p?.foto_2 || null,
      foto_3: v.foto_3,
      size: v.ukuran,
    };
  });
  localStorage.setItem('dapoerdjawa_products', JSON.stringify(initial));
  return initial;
}

export default function ProductsTab() {
  const [products, setProducts] = useState<ProductVariant[]>(() => getStoredProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductVariant | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductVariant | null>(null);

  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSize, setFormSize] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formTinggi, setFormTinggi] = useState('');
  const [formDiameter, setFormDiameter] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile2, setImageFile2] = useState<File | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const [imageFile3, setImageFile3] = useState<File | null>(null);
  const [imagePreview3, setImagePreview3] = useState<string | null>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getStoredProducts();
      setProducts(data);
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshKey]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageSlot: 'main' | 'detail' | 'macro' = 'main'
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.add({ type: 'error', title: 'File yang dipilih harus berupa gambar.' }); return; }
    if (file.size > 5 * 1024 * 1024) { toast.add({ type: 'error', title: 'Ukuran gambar maksimal 5 MB.' }); return; }
    if (imageSlot === 'macro') {
      setImageFile3(file);
      setImagePreview3((prev) => {
        if (prev && !prev.startsWith('http')) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    } else if (imageSlot === 'detail') {
      setImageFile2(file);
      setImagePreview2((prev) => {
        if (prev && !prev.startsWith('http')) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    } else {
      setImageFile(file);
      setImagePreview((prev) => {
        if (prev && !prev.startsWith('http')) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    }
  };

  const resetForm = (): void => {
    setEditingProduct(null);
    setFormName('');
    setFormDesc('');
    setFormSize('');
    setFormPrice('');
    setFormStock('');
    setFormWeight('');
    setFormTinggi('');
    setFormDiameter('');
    setImageFile(null);
    setImagePreview((prev) => {
      if (prev && !prev.startsWith('http')) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setImageFile2(null);
    setImagePreview2((prev) => {
      if (prev && !prev.startsWith('http')) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef2.current) fileInputRef2.current.value = '';
    setImageFile3(null);
    setImagePreview3((prev) => {
      if (prev && !prev.startsWith('http')) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef3.current) fileInputRef3.current.value = '';
  };

  const closeModal = (): void => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditClick = (product: ProductVariant) => {
    setEditingProduct(product);
    setFormName(product.raw_name);
    setFormDesc(product.description);
    setFormSize(product.size);
    setFormPrice(product.price.toString());
    setFormStock(product.stock.toString());
    setFormWeight(product.weight.toString());
    setFormTinggi(product.tinggi.toString());
    setFormDiameter(product.diameter.toString());
    setImagePreview(product.image_url);
    setImagePreview2(product.foto_2);
    setImagePreview3(product.foto_3);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formSize || !formPrice || !formStock || !formWeight || !formTinggi || !formDiameter) {
      toast.add({ type: 'error', title: 'Mohon lengkapi semua data teks produk!' });
      return;
    }
    const price = Number(formPrice);
    const stock = Number(formStock);
    const weight = Number(formWeight);
    const tinggi = Number(formTinggi);
    const diameter = Number(formDiameter);
    if (!Number.isFinite(price) || price <= 0) { toast.add({ type: 'error', title: 'Harga produk tidak valid.' }); return; }
    if (!Number.isInteger(stock) || stock < 0) { toast.add({ type: 'error', title: 'Stok produk tidak valid.' }); return; }
    if (!Number.isInteger(weight) || weight <= 0) { toast.add({ type: 'error', title: 'Berat kemasan tidak valid (harus lebih dari 0 gram).' }); return; }
    if (!Number.isFinite(tinggi) || tinggi <= 0) { toast.add({ type: 'error', title: 'Tinggi kemasan tidak valid.' }); return; }
    if (!Number.isFinite(diameter) || diameter <= 0) { toast.add({ type: 'error', title: 'Lebar/diameter kemasan tidak valid.' }); return; }
    setIsSubmitting(true);
    try {
      let finalImageUrl = imagePreview || '/image.png';
      let finalImageUrl2 = imagePreview2 || null;
      let finalImageUrl3 = imagePreview3 || null;

      if (imageFile) finalImageUrl = await readFileAsDataUrl(imageFile);
      if (imageFile2) finalImageUrl2 = await readFileAsDataUrl(imageFile2);
      if (imageFile3) finalImageUrl3 = await readFileAsDataUrl(imageFile3);

      const currentStored = getStoredProducts();

      if (editingProduct) {
        const updated = currentStored.map((p) => {
          if (p.id === editingProduct.id) {
            return {
              ...p,
              raw_name: formName.trim(),
              name: `${formName.trim()} (${formSize.trim()})`,
              description: formDesc.trim(),
              size: formSize.trim(),
              price,
              stock,
              weight,
              tinggi,
              diameter,
              image_url: finalImageUrl,
              foto_2: finalImageUrl2,
              foto_3: finalImageUrl3,
            };
          }
          return p;
        });
        localStorage.setItem('dapoerdjawa_products', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Produk berhasil diperbarui!' });
      } else {
        const newProduct: ProductVariant = {
          id: generateId('var'),
          produk_id: generateId('prod'),
          raw_name: formName.trim(),
          name: `${formName.trim()} (${formSize.trim()})`,
          description: formDesc.trim(),
          price,
          stock,
          weight,
          tinggi,
          diameter,
          image_url: finalImageUrl,
          foto_2: finalImageUrl2,
          foto_3: finalImageUrl3,
          size: formSize.trim(),
        };
        const updated = [newProduct, ...currentStored];
        localStorage.setItem('dapoerdjawa_products', JSON.stringify(updated));
        toast.add({ type: 'success', title: 'Produk berhasil ditambahkan!' });
      }
      setIsModalOpen(false);
      resetForm();
      setRefreshKey((current) => current + 1);
    } catch (error: unknown) {
      toast.add({ type: 'error', title: getErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeDelete = async (product: ProductVariant): Promise<void> => {
    const loadingToast = toast.add({ type: 'loading', title: 'Menghapus produk...' });
    try {
      const currentStored = getStoredProducts();
      const updated = currentStored.filter((p) => p.id !== product.id);
      localStorage.setItem('dapoerdjawa_products', JSON.stringify(updated));
      toast.close(loadingToast);
      toast.add({ type: 'success', title: 'Produk berhasil dihapus.' });
      setRefreshKey((current) => current + 1);
    } catch (error: unknown) {
      toast.close(loadingToast);
      toast.add({ type: 'error', title: getErrorMessage(error) });
    }
  };

  const handleDeleteClick = (product: ProductVariant): void => {
    setDeleteTarget(product);
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    if (!normalizedSearchTerm) return true;
    return product.name.toLowerCase().includes(normalizedSearchTerm) || product.size.toLowerCase().includes(normalizedSearchTerm);
  });

  // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting pagination on search term change
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="relative space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manajemen Produk</h2>
          <p className="text-sm text-gray-500">Atur katalog kue kering DapoerDjawa di sini.</p>
        </div>
        <button type="button" onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700">
          <Plus className="h-5 w-5" />
          Tambah Produk
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
        <Search className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <input type="text" placeholder="Cari nama produk atau ukuran..." className="w-full border-none bg-transparent text-sm text-gray-800 outline-none focus:ring-0" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} aria-label="Cari produk" />
      </div>

      <div className="overflow-hidden rounded-none sm:rounded-xl border bg-white shadow-sm -mx-3 sm:mx-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 font-medium text-gray-600">
              <tr>
                <th className="px-6 py-4">Produk &amp; Varian</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-amber-600" />
                    <p className="text-gray-500">Memuat data produk...</p>
                  </td>
                </tr>
              ) : paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-100">
                          {product.image_url ? (
                            <Image src={product.image_url} alt={product.name} fill sizes="48px" className="object-cover" />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-xs text-gray-500">Ukuran: {product.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{formatRupiah(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        product.stock > 20 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock > 0 ? `${product.stock} tersisa` : 'Stok habis'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => handleEditClick(product)} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600" title={`Edit ${product.name}`}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(product)} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600" title={`Hapus ${product.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm.trim() ? `Tidak ada produk yang cocok dengan "${searchTerm}".` : 'Belum ada produk ditemukan.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && filteredProducts.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-4">
          <p className="text-xs sm:text-sm text-gray-500">
            Menampilkan {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} dari {filteredProducts.length} produk
          </p>
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center gap-1 rounded-lg border px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Sebelumnya</span>
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .reduce<(number | string)[]>((acc, page, idx, arr) => {
                  if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push('...');
                  acc.push(page);
                  return acc;
                }, [])
                .map((page, idx) =>
                  typeof page === 'string' ? (
                    <span key={`dots-${idx}`} className="px-1 sm:px-2 text-gray-400">…</span>
                  ) : (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`h-8 w-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${currentPage === page ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{page}</button>
                  )
                )}
            </div>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center gap-1 rounded-lg border px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">
              <span className="hidden sm:inline">Selanjutnya</span> <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <h3 className="text-lg font-bold text-gray-800">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button type="button" onClick={closeModal} disabled={isSubmitting} className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={(event) => void handleSubmit(event)} className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Foto Utama (Halaman Depan)</label>
                  <div onClick={() => fileInputRef.current?.click()} className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-amber-500 hover:bg-amber-50">
                    {imagePreview ? (
                      <div className="relative h-28 w-full">
                        <Image src={imagePreview} alt="Preview Utama" fill unoptimized className="rounded-md object-contain" />
                      </div>
                    ) : (
                      <>
                        <Upload className="mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Klik untuk upload foto</p>
                        <p className="mt-1 text-xs text-gray-400">Toples tertutup</p>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleImageChange(e, 'main')} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Foto Detail (Toples Terbuka)</label>
                  <div onClick={() => fileInputRef2.current?.click()} className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-amber-500 hover:bg-amber-50">
                    {imagePreview2 ? (
                      <div className="relative h-28 w-full">
                        <Image src={imagePreview2} alt="Preview Detail" fill unoptimized className="rounded-md object-contain" />
                      </div>
                    ) : (
                      <>
                        <Upload className="mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Klik untuk upload foto</p>
                        <p className="mt-1 text-xs text-gray-400">Toples terbuka</p>
                      </>
                    )}
                    <input type="file" ref={fileInputRef2} className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleImageChange(e, 'detail')} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Foto Makro (Close-up)</label>
                  <div onClick={() => fileInputRef3.current?.click()} className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-amber-500 hover:bg-amber-50">
                    {imagePreview3 ? (
                      <div className="relative h-28 w-full">
                        <Image src={imagePreview3} alt="Preview Makro" fill unoptimized className="rounded-md object-contain" />
                      </div>
                    ) : (
                      <>
                        <Upload className="mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Klik untuk upload foto</p>
                        <p className="mt-1 text-xs text-gray-400">Close-up tekstur</p>
                      </>
                    )}
                    <input type="file" ref={fileInputRef3} className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleImageChange(e, 'macro')} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                  <input required type="text" value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Cth: Kue Semprit" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Ukuran / Varian</label>
                  <input required type="text" value={formSize} onChange={(e) => setFormSize(e.target.value)} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Cth: Toples 500gr" />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
                  <input required type="number" min="1" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Cth: 45000" />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Stok Saat Ini</label>
                  <input required type="number" min="0" step="1" value={formStock} onChange={(e) => setFormStock(e.target.value)} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Cth: 20" />
                </div>
                <div className="space-y-1 md:col-span-2 mt-2 pt-4 border-t">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Informasi Kemasan (Untuk Pengiriman)</h4>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Berat Total Kemasan (gram)</label>
                  <input required type="number" min="1" value={formWeight} onChange={(e) => setFormWeight(e.target.value)} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Cth: 340 atau 550" />
                  <p className="text-[11px] text-gray-500 leading-tight">*Berat produk + toples plastik. 300gr→340gr, 500gr→550gr. Packaging luar (kardus, bubble wrap) dihitung otomatis.</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Lebar / Diameter Kemasan (cm)</label>
                  <input required type="number" min="1" step="0.1" value={formDiameter} onChange={(e) => setFormDiameter(e.target.value)} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Cth: 14" />
                  <p className="text-[11px] text-gray-500 leading-tight">*Produk satuan: diameter toples. Bundle/paket: lebar kardus pengiriman.</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Tinggi Kemasan (cm)</label>
                  <input required type="number" min="1" step="0.1" value={formTinggi} onChange={(e) => setFormTinggi(e.target.value)} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Cth: 6" />
                  <p className="text-[11px] text-gray-500 leading-tight">*Produk satuan: tinggi toples. Bundle/paket: tinggi kardus pengiriman.</p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                <textarea required value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="min-h-25 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Deskripsikan kelezatan kue ini..." />
              </div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={closeModal} disabled={isSubmitting} className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">Batal</button>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Menyimpan...' : (editingProduct ? 'Perbarui Produk' : 'Simpan Produk')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin menghapus &quot;{deleteTarget?.name}&quot;? Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { if (deleteTarget) { void executeDelete(deleteTarget); setDeleteTarget(null); } }}
              className="rounded-xl bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
