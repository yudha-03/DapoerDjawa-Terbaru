'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getLocalOrders } from '@/lib/api';
import OrderDetailModal from './OrderDetailModal';
import OrderList from './OrderList';

export type OrderItem = { id: string; product_name: string; qty: number; price: number; product_image: string; ukuran: string };
export type Order = { id: string; invoice_number: string; status: string; grand_total: number; created_at: string; shipping_cost?: number; discount?: number; subtotal?: number; tracking_number?: string | null; shipping_courier?: string; order_items?: OrderItem[] };
export type TrackingHistory = { note: string; status: string; updated_at: string };

const STATUS_TABS = [
  { key: 'semua', label: 'Semua', statuses: [] as string[] },
  { key: 'belum_bayar', label: 'Belum Bayar', statuses: ['draft', 'pending', 'unpaid'] },
  { key: 'diproses', label: 'Diproses', statuses: ['paid', 'settlement', 'lunas'] },
  { key: 'dikirim', label: 'Dikirim', statuses: ['shipped'] },
  { key: 'selesai', label: 'Selesai', statuses: ['delivered'] },
  { key: 'dibatalkan', label: 'Dibatalkan', statuses: ['cancelled', 'refunded', 'returned', 'cancel_requested'] },
];

const EMPTY_MESSAGES: Record<string, string> = {
  semua: 'Belum ada pesanan',
  belum_bayar: 'Tidak ada pesanan yang belum dibayar',
  diproses: 'Tidak ada pesanan yang sedang diproses',
  dikirim: 'Tidak ada pesanan yang sedang dikirim',
  selesai: 'Tidak ada pesanan yang selesai',
  dibatalkan: 'Tidak ada pesanan yang dibatalkan',
};

export default function HistoryClient() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('semua');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const rawOrders = getLocalOrders();
      setOrders(rawOrders.map((o) => ({
        id: o.id,
        invoice_number: `INV-${o.id.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()}`,
        status: o.status,
        grand_total: o.total_amount,
        created_at: o.created_at,
        shipping_cost: o.shipping_cost,
        tracking_number: o.tracking_number,
        shipping_courier: o.shipping_courier,
        order_items: (o.items || []).map((it, idx) => ({
          id: `${o.id}-${idx}`,
          product_name: it.name,
          qty: it.qty,
          price: it.price,
          product_image: it.img,
          ukuran: it.variant,
        })),
      })));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { semua: orders.length };
    for (const tab of STATUS_TABS) {
      if (tab.statuses.length === 0) continue;
      counts[tab.key] = orders.filter((o) =>
        tab.statuses.includes((o.status || '').toLowerCase())
      ).length;
    }
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const tab = STATUS_TABS.find((t) => t.key === activeTab);
    if (!tab || tab.statuses.length === 0) return orders;
    return orders.filter((o) =>
      tab.statuses.includes((o.status || '').toLowerCase())
    );
  }, [orders, activeTab]);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Keranjang', href: '/cart' }, { label: 'Riwayat Belanja' }]} />
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <Link href="/cart" className="p-2.5 bg-white rounded-full border border-gray-200 hover:bg-gray-100 transition shadow-sm shrink-0">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Riwayat Belanja</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-medium">Lacak pesanan dan lihat riwayat transaksimu di sini.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {STATUS_TABS.map((tab) => {
          const count = tabCounts[tab.key] || 0;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
            <Package className="w-8 h-8" />
          </div>
          <p className="font-semibold text-gray-700">{EMPTY_MESSAGES[activeTab] || 'Tidak ada pesanan'}</p>
          <Link href="/#products" className="mt-4 px-5 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div layout className="space-y-4">
            <OrderList orders={filteredOrders} onOpenDetail={setSelectedOrder} />
          </motion.div>
        </AnimatePresence>
      )}

      <OrderDetailModal
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}
      />
    </div>
  );
}
