export const ORDER_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  pending: 'Menunggu',
  paid: 'Dibayar',
  settlement: 'Dibayar',
  lunas: 'Dibayar',
  shipped: 'Dikirim',
  delivered: 'Selesai',
  cancelled: 'Dibatalkan',
  refunded: 'Dana Dikembalikan',
  returned: 'Diretur',
  cancel_requested: 'Minta Pembatalan',
  unpaid: 'Belum Bayar',
  expire: 'Kedaluwarsa',
};

/** Dashboard admin badge colors (solid bg) */
export const ORDER_STATUS_COLORS_ADMIN: Record<string, string> = {
  pending: 'bg-yellow-500 hover:bg-yellow-600',
  paid: 'bg-green-500 hover:bg-green-600',
  lunas: 'bg-green-500 hover:bg-green-600',
  settlement: 'bg-green-500 hover:bg-green-600',
  shipped: 'bg-blue-500 hover:bg-blue-600',
  delivered: 'bg-gray-800 hover:bg-gray-900',
  cancelled: 'bg-red-500 hover:bg-red-600',
  cancel_requested: 'bg-yellow-500 hover:bg-yellow-600',
  refunded: 'bg-purple-500 hover:bg-purple-600',
  returned: 'bg-amber-500 hover:bg-amber-600',
};

/** Customer order list badge styles (border + bg) */
export const ORDER_STATUS_BADGE_STYLES: Record<string, string> = {
  DELIVERED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  SELESAI: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  SUCCESS: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  SHIPPED: 'bg-blue-100 text-blue-800 border-blue-200',
  DIKIRIM: 'bg-blue-100 text-blue-800 border-blue-200',
  PAID: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  DIPROSES: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  PENDING: 'bg-orange-50 text-orange-700 border-orange-200',
  UNPAID: 'bg-orange-50 text-orange-700 border-orange-200',
  'BELUM BAYAR': 'bg-orange-50 text-orange-700 border-orange-200',
  DRAFT: 'bg-orange-50 text-orange-700 border-orange-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  BATAL: 'bg-red-100 text-red-800 border-red-200',
  FAILED: 'bg-red-100 text-red-800 border-red-200',
  REFUNDED: 'bg-purple-100 text-purple-800 border-purple-200',
  RETURNED: 'bg-amber-100 text-amber-800 border-amber-200',
  CANCEL_REQUESTED: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export function getStatusLabel(status: string = ''): string {
  return ORDER_STATUS_LABELS[(status || '').toLowerCase()] || status.toUpperCase();
}

export function getStatusColorAdmin(status: string = ''): string {
  return ORDER_STATUS_COLORS_ADMIN[(status || '').toLowerCase()] || 'bg-gray-500 hover:bg-gray-600';
}

export function getStatusBadgeStyle(status: string = ''): string {
  return (ORDER_STATUS_BADGE_STYLES[status.toUpperCase()] || 'bg-gray-100 text-gray-700 border-gray-200') + ' shadow-sm';
}
