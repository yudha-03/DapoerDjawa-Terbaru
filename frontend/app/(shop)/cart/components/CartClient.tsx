'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { History, X } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import HeroCarousel from '@/components/home/HeroCarousel';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-store';
import { HERO_BANNERS } from '@/lib/data';
import CartBundlingSuggestion from './CartBundlingSuggestion';
import CartList from './CartList';
import CartSummary from './CartSummary';

export default function CartClient() {
  const router = useRouter();
  const confirm = useConfirm();
  const { items: cartItems, updateQty, removeItem, clearCart, subtotal } = useCart();

  const cartProductNames = Array.from(new Set(cartItems.map((item) => item.name)));

  const handleCheckout = (discountAmount: number, promoCode: string | null) => {
    if (cartItems.length === 0) {
      return toast.add({ type: 'error', title: 'Keranjang masih kosong.' });
    }
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    toast.add({ type: 'success', title: 'Pesanan Disiapkan', description: 'Mengarahkan ke pembayaran...' });
    router.push(`/checkout?order_id=${orderId}&promo=${encodeURIComponent(promoCode || '')}&discount=${discountAmount}`);
  };

  const bannersData = HERO_BANNERS.filter((b) => b.is_active).map((item) => ({
    id: item.id,
    img: item.image_url,
    alt: item.title || 'Promo',
    link: item.link_url || '#',
    title: item.title || null,
    subtitle: item.subtitle || null,
    promoCode: item.promo_code || null,
    ctaText: item.cta_text || null,
  }));

  return (
    <div className="animate-[fade-in-up_0.4s_ease-out_both] mx-auto w-full max-w-7xl px-4 py-6 md:py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Keranjang' }]} />
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Keranjang Belanja</h1>
          <p className="mt-1 text-gray-500">
            Anda memiliki <span className="font-semibold text-gray-700">{cartItems.length}</span> jenis produk
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={() => router.push('/orders')} className="flex-1 sm:flex-none gap-2 rounded-2xl shadow-sm">
            <History className="h-4 w-4" /> Riwayat Belanja
          </Button>
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              onClick={async () => {
                const confirmed = await confirm({
                  title: 'Kosongkan Keranjang?',
                  description: `Semua ${cartItems.length} produk di keranjang akan dihapus.`,
                  confirmLabel: 'Ya, Kosongkan',
                  variant: 'danger',
                });
                if (confirmed) clearCart();
              }}
              className="flex-1 sm:flex-none gap-2 rounded-2xl text-gray-500 shadow-sm hover:border-red-500 hover:text-red-600"
            >
              <X className="h-4 w-4" /> Kosongkan Keranjang
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-6 lg:w-2/3">
          <CartList
            items={cartItems}
            isLoading={false}
            onUpdateQty={(id, delta) => updateQty(id, delta)}
            onRemoveItem={async (id) => {
              const item = cartItems.find((c) => c.id === id);
              const confirmed = await confirm({
                title: 'Hapus Produk?',
                description: `${item?.name || 'Produk ini'} akan dihapus dari keranjang.`,
                confirmLabel: 'Ya, Hapus',
                variant: 'danger',
              });
              if (confirmed) removeItem(id);
            }}
          />
          {cartItems.length > 0 && (
            <CartBundlingSuggestion cartProductNames={cartProductNames} userId={null} />
          )}
          {bannersData.length > 0 && (
            <div className="w-full overflow-hidden rounded-2xl shadow-sm">
              <HeroCarousel banners={bannersData} compact />
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3">
          <CartSummary
            subtotal={subtotal}
            cartCount={cartItems.length}
            isCartLoading={false}
            onCheckout={(d, p) => handleCheckout(d, p)}
            isCheckoutLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
