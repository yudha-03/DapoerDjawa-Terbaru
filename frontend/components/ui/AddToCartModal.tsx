'use client';

import { useState, useCallback, useEffect, createContext, useContext, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShoppingCart, X } from 'lucide-react';
import { formatRupiah } from '@/lib/api';

type CartModalData = {
  productName: string;
  variant: string;
  qty: number;
  price: number;
  image: string;
};

type ShowCartModalFn = (data: CartModalData) => void;

const CartModalContext = createContext<ShowCartModalFn | null>(null);

export function useCartModal(): ShowCartModalFn {
  const fn = useContext(CartModalContext);
  if (!fn) throw new Error('useCartModal must be used within CartModalProvider');
  return fn;
}

export function CartModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartModalData | null>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setClosing(true);
  };

  const show = useCallback<ShowCartModalFn>((data) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setClosing(false);
    setState(data);
    // Force a frame so the initial (hidden) styles apply before transitioning in
    requestAnimationFrame(() => setVisible(true));
    timerRef.current = setTimeout(() => triggerClose(), 8000);
  }, []);

  // After exit transition ends, unmount via onTransitionEnd
  const handleTransitionEnd = () => {
    if (closing) {
      setVisible(false);
      setClosing(false);
      setState(null);
    }
  };

  const isOpen = state && (visible || closing);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-focus close button when modal opens
  useEffect(() => {
    if (visible && !closing) {
      closeBtnRef.current?.focus();
    }
  }, [visible, closing]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') triggerClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <CartModalContext.Provider value={show}>
      {children}
      {isOpen && (
        <div
          style={{
            opacity: visible && !closing ? 1 : 0,
            transition: 'opacity 150ms ease',
          }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-4"
          onClick={triggerClose}
          role="dialog"
          aria-modal="true"
          aria-label="Produk ditambahkan ke keranjang"
        >
          <div
            style={{
              opacity: visible && !closing ? 1 : 0,
              transform: visible && !closing ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
              transition: 'opacity 200ms ease, transform 200ms ease',
            }}
            onClick={(e) => e.stopPropagation()}
            onTransitionEnd={handleTransitionEnd}
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-4.5 w-4.5 text-green-600" />
                </div>
                <span className="text-sm font-bold text-gray-900">Ditambahkan ke Keranjang</span>
              </div>
              <button ref={closeBtnRef} onClick={triggerClose} aria-label="Tutup" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Product info */}
            <div className="flex gap-3 rounded-xl bg-gray-50 p-3 mb-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white border border-gray-100">
                <Image
                  src={state.image || '/placeholder.jpg'}
                  alt={state.productName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{state.productName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{state.variant} - {state.qty} pcs</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{formatRupiah(state.price * state.qty)}</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-2.5">
              <button
                onClick={triggerClose}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition active:scale-[0.98]"
              >
                Lanjut Belanja
              </button>
              <Link
                href="/cart"
                onClick={triggerClose}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-800 transition active:scale-[0.98]"
              >
                <ShoppingCart className="h-4 w-4" />
                Lihat Keranjang
              </Link>
            </div>
          </div>
        </div>
      )}
    </CartModalContext.Provider>
  );
}
