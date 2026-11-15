import {
  SHIPPING_AREAS,
  SHIPPING_RATES,
  PROMO_CODES,
  DASHBOARD_STATS,
  INITIAL_ORDERS,
  type ShippingArea,
  type ShippingRate,
  type PromoCode,
  type Order,
} from './data';

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

// Client-side helper functions (Pure Frontend)
export async function getLocalShippingAreas(keyword = ''): Promise<ShippingArea[]> {
  if (!keyword) return SHIPPING_AREAS;
  const kw = keyword.toLowerCase();
  return SHIPPING_AREAS.filter(
    (a) => a.name.toLowerCase().includes(kw) || a.city_name.toLowerCase().includes(kw)
  );
}

export async function getLocalShippingRates(): Promise<ShippingRate[]> {
  return SHIPPING_RATES;
}

export function validateLocalPromo(code: string): { valid: boolean; promo?: PromoCode; message: string } {
  const promo = PROMO_CODES.find((p) => p.code.toUpperCase() === code.toUpperCase() && p.is_active);
  if (!promo) {
    return { valid: false, message: 'Kode promo tidak ditemukan atau sudah kadaluarsa.' };
  }
  return {
    valid: true,
    promo,
    message: `Promo ${promo.code} berhasil diterapkan! Diskon hingga ${formatRupiah(promo.max_discount)}`,
  };
}

export function getLocalDashboardStats() {
  return DASHBOARD_STATS;
}

export function getLocalOrders(): Order[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem('dapoerdjawa_orders');
    if (!raw) return INITIAL_ORDERS;
    // Auto-purge stale dummy orders from browser storage
    if (raw.toLowerCase().includes('budi') || raw.includes('ORD-2026-001') || raw.includes('usr-001')) {
      localStorage.removeItem('dapoerdjawa_orders');
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveLocalOrder(order: Order): void {
  if (typeof window === 'undefined') return;
  try {
    const orders = getLocalOrders();
    orders.unshift(order);
    localStorage.setItem('dapoerdjawa_orders', JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save order:', err);
  }
}

export function updateLocalOrderStatus(orderId: string, status: Order['status'], trackingNumber?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const orders = getLocalOrders();
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          ...(trackingNumber !== undefined ? { tracking_number: trackingNumber } : {}),
        };
      }
      return o;
    });
    localStorage.setItem('dapoerdjawa_orders', JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update order status:', err);
  }
}
