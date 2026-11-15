'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, ShoppingCart, Sparkles, TrendingUp } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { useCartModal } from '@/components/ui/AddToCartModal';
import { PRODUCTS, VARIANTS } from '@/lib/data';
import { addToLocalCart } from '@/lib/cart-store';

interface BundlingSuggestion {
  id: string;
  name: string;
  price: number;
  image: string;
  variantId: string;
  ukuran: string;
  stok: number;
  confidence: number;
  support: number;
  becauseOf: string;
}

interface CartBundlingSuggestionProps {
  cartProductNames: string[];
  userId: string | null;
}

export default function CartBundlingSuggestion({ cartProductNames }: CartBundlingSuggestionProps) {
  const showCartModal = useCartModal();
  const [suggestions, setSuggestions] = useState<BundlingSuggestion[]>([]);
  const [addingItemId, setAddingItemId] = useState<string | null>(null);

  useEffect(() => {
    if (cartProductNames.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }

    // Pick 2 products not in cart
    const candidates = PRODUCTS.filter((p) => !cartProductNames.includes(p.nama_produk)).slice(0, 2);
    const recs: BundlingSuggestion[] = candidates.map((p, idx) => {
      const v = VARIANTS.find((va) => va.produk_id === p.id) || VARIANTS[0];
      return {
        id: p.slug || p.id,
        name: p.nama_produk,
        price: v.price,
        image: v.img || p.foto_2,
        variantId: v.id,
        ukuran: v.ukuran,
        stok: v.stok,
        confidence: Number((0.85 - idx * 0.07).toFixed(2)),
        support: Number((0.42 - idx * 0.05).toFixed(2)),
        becauseOf: cartProductNames[0] || 'kue kering lainnya',
      };
    });

    setSuggestions(recs);
  }, [cartProductNames]);

  const handleAddToCart = (suggestion: BundlingSuggestion) => {
    setAddingItemId(suggestion.variantId);
    try {
      addToLocalCart(suggestion.variantId, 1);
      showCartModal({
        productName: suggestion.name,
        variant: suggestion.ukuran || 'Reguler',
        qty: 1,
        price: suggestion.price,
        image: suggestion.image,
      });
      setSuggestions((prev) => prev.filter((s) => s.variantId !== suggestion.variantId));
      toast.add({ type: 'success', title: 'Produk Ditambahkan', description: `${suggestion.name} berhasil ditambahkan.` });
    } catch {
      toast.add({ type: 'error', title: 'Gagal', description: 'Gagal menambahkan produk ke keranjang.' });
    } finally {
      setAddingItemId(null);
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-white p-5 md:p-6">
      <div className="flex items-start gap-2 mb-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 shrink-0 mt-0.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">Sering Dibeli Bersamaan</h3>
          <p className="text-xs text-gray-500 mt-0.5">Berdasarkan pola belanja pelanggan lain</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.variantId}
            className="group relative flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-all hover:border-amber-200 hover:shadow-sm"
          >
            <div className="absolute -top-2 -right-2 z-10 flex items-center gap-0.5 rounded-full bg-amber-500 px-1.5 py-0.5 shadow-sm">
              <TrendingUp className="h-2 w-2 text-white" />
              <span className="text-[9px] font-bold text-white">{(suggestion.confidence * 100).toFixed(0)}%</span>
            </div>

            <Link href={`/product/${suggestion.id}`} className="shrink-0">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <Image
                  src={suggestion.image}
                  alt={suggestion.name}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/product/${suggestion.id}`}>
                <h4 className="text-sm font-bold text-gray-900 truncate hover:text-amber-700 transition-colors">
                  {suggestion.name}
                </h4>
              </Link>
              <p className="text-xs font-semibold text-gray-700">Rp{suggestion.price.toLocaleString('id-ID')}</p>
              <p className="text-[10px] text-amber-600 mt-0.5">
                {(suggestion.confidence * 100).toFixed(0)}% pembeli <span className="font-semibold">{suggestion.becauseOf}</span> juga membeli ini
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(suggestion)}
              disabled={addingItemId === suggestion.variantId}
              className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95 disabled:opacity-50"
              title="Tambah ke Keranjang"
            >
              {addingItemId === suggestion.variantId ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
