'use client';

import { useState, useEffect } from 'react';
import { VARIANTS, PRODUCTS } from './data';

export interface CartItem {
  id: string;
  variant_id: string;
  name: string;
  ukuran: string;
  img: string;
  price: number;
  qty: number;
  stok: number;
}

const STORAGE_KEY = 'dapoerdjawa_cart';

const INITIAL_CART: CartItem[] = [];

export function getLocalCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    // Auto-purge stale dummy items from browser storage
    if (raw.includes('cart-init')) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('dapoerdjawa_cart_updated'));
  } catch (err) {
    console.error('Failed to save cart to localStorage:', err);
  }
}

export function addToLocalCart(variantId: string, quantity = 1): CartItem[] {
  const current = getLocalCart();
  const variant = VARIANTS.find((v) => v.id === variantId);
  const product = variant ? PRODUCTS.find((p) => p.id === variant.produk_id) : null;

  const existingIndex = current.findIndex((item) => item.variant_id === variantId);

  if (existingIndex > -1) {
    current[existingIndex].qty += quantity;
  } else {
    current.push({
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      variant_id: variantId,
      name: product?.nama_produk || 'Kue Kering',
      ukuran: variant?.ukuran || 'Toples',
      img: variant?.img || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
      price: variant?.price || 65000,
      qty: quantity,
      stok: variant?.stok || 50,
    });
  }

  saveLocalCart(current);
  return current;
}

export function updateLocalCartQty(id: string, delta: number): CartItem[] {
  const current = getLocalCart();
  const index = current.findIndex((item) => item.id === id);
  if (index > -1) {
    const newQty = current[index].qty + delta;
    if (newQty <= 0) {
      current.splice(index, 1);
    } else {
      current[index].qty = Math.min(newQty, current[index].stok);
    }
  }
  saveLocalCart(current);
  return current;
}

export function removeLocalCartItem(id: string): CartItem[] {
  const current = getLocalCart().filter((item) => item.id !== id);
  saveLocalCart(current);
  return current;
}

export function clearLocalCart(): void {
  saveLocalCart([]);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getLocalCart());
    setMounted(true);

    const onUpdate = () => setItems(getLocalCart());
    window.addEventListener('dapoerdjawa_cart_updated', onUpdate);
    return () => window.removeEventListener('dapoerdjawa_cart_updated', onUpdate);
  }, []);

  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return {
    items: mounted ? items : INITIAL_CART,
    totalCount: mounted ? totalCount : INITIAL_CART.reduce((s, i) => s + i.qty, 0),
    subtotal: mounted ? subtotal : INITIAL_CART.reduce((s, i) => s + i.price * i.qty, 0),
    updateQty: updateLocalCartQty,
    removeItem: removeLocalCartItem,
    clearCart: clearLocalCart,
    addToCart: addToLocalCart,
  };
}

