'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { validateLocalPromo } from '@/lib/api';

const promoSchema = z.object({
  code: z.string().min(3, 'Kode promo minimal 3 karakter').regex(/^[a-zA-Z0-9]+$/, 'Kode promo tidak boleh mengandung spasi atau simbol'),
});

type AppliedPromo = { code: string; type: 'fixed' | 'percentage'; value: number; maxDiscount?: number | null; discountAmount: number };

interface CartSummaryProps {
  subtotal: number;
  cartCount: number;
  isCartLoading: boolean;
  onCheckout: (discountAmount: number, promoCode: string | null) => void;
  isCheckoutLoading: boolean;
}

export default function CartSummary({ subtotal, cartCount, isCartLoading, onCheckout, isCheckoutLoading }: CartSummaryProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);

  React.useEffect(() => {
    if (!appliedPromo) return;
    if (appliedPromo.type === 'percentage') {
      let newDiscount = Math.round(subtotal * (appliedPromo.value / 100));
      if (appliedPromo.maxDiscount && newDiscount > appliedPromo.maxDiscount) {
        newDiscount = appliedPromo.maxDiscount;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliedPromo((prev) => (prev ? { ...prev, discountAmount: newDiscount } : null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal]);

  const handleApplyPromo = () => {
    const validation = promoSchema.safeParse({ code: promoInput });
    if (!validation.success) {
      const errorMsg = validation.error.issues[0].message;
      setPromoError(errorMsg);
      return toast.add({ type: 'error', title: 'Kode Promo Tidak Valid', description: errorMsg });
    }

    const res = validateLocalPromo(validation.data.code);
    if (!res.valid || !res.promo) {
      setPromoError(res.message);
      setAppliedPromo(null);
      return toast.add({ type: 'error', title: 'Promo Tidak Valid', description: res.message });
    }

    const calculatedDiscount = Math.min(
      Math.round(subtotal * (res.promo.discount_percent / 100)),
      res.promo.max_discount
    );

    setAppliedPromo({
      code: res.promo.code,
      type: 'percentage',
      value: res.promo.discount_percent,
      maxDiscount: res.promo.max_discount,
      discountAmount: calculatedDiscount,
    });
    setPromoError('');
    toast.add({ type: 'success', title: 'Hore!', description: `Kode promo ${res.promo.code} berhasil diterapkan.` });
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  const discount = appliedPromo ? appliedPromo.discountAmount : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">Ringkasan Pesanan</h3>

      <div className="mt-4 space-y-3 border-b border-gray-100 pb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Item</span>
          <span className="font-semibold text-gray-900">{cartCount} pcs</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal Produk</span>
          <span className="font-semibold text-gray-900">Rp{subtotal.toLocaleString('id-ID')}</span>
        </div>

        {appliedPromo && (
          <div className="flex justify-between text-sm font-semibold text-emerald-600">
            <span>Diskon ({appliedPromo.code})</span>
            <span>-Rp{discount.toLocaleString('id-ID')}</span>
          </div>
        )}
      </div>

      {/* Promo Code Input */}
      <div className="mt-4 border-b border-gray-100 pb-4">
        <label htmlFor="promo" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Kode Promo
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id="promo"
            type="text"
            placeholder="Contoh: DAPOER10"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
            disabled={!!appliedPromo}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm uppercase placeholder:normal-case focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:bg-gray-50"
          />
          {appliedPromo ? (
            <Button variant="outline" onClick={handleRemovePromo} className="rounded-xl text-red-600 hover:border-red-500">
              Hapus
            </Button>
          ) : (
            <Button onClick={handleApplyPromo} className="rounded-xl bg-amber-500 text-white hover:bg-amber-600">
              Gunakan
            </Button>
          )}
        </div>
        {promoError && <p className="mt-1.5 text-xs text-red-500">{promoError}</p>}
      </div>

      {/* Total Amount */}
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-base font-bold text-gray-900">Total Tagihan</span>
          <p className="text-xs text-gray-400">Belum termasuk ongkos kirim</p>
        </div>
        <span className="text-2xl font-extrabold text-amber-600">Rp{total.toLocaleString('id-ID')}</span>
      </div>

      <Button
        onClick={() => onCheckout(discount, appliedPromo?.code || null)}
        disabled={isCartLoading || isCheckoutLoading || cartCount === 0}
        className="mt-6 w-full rounded-2xl bg-amber-500 py-6 text-base font-bold text-white shadow-md transition-all hover:bg-amber-600 hover:shadow-lg disabled:opacity-50"
      >
        Lanjut ke Pembayaran
      </Button>
    </div>
  );
}
