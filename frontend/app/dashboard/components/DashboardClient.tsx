'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Role, Tab } from '@/types/dashboard';
import Sidebar from './Sidebar';

const OverviewTab = dynamic(() => import('./tabs/OverviewTab'), { ssr: false, loading: () => <div className="animate-shimmer h-96 rounded-2xl bg-gray-100" /> });
const ProductsTab = dynamic(() => import('./tabs/ProductsTab'), { ssr: false, loading: () => <div className="animate-shimmer h-96 rounded-2xl bg-gray-100" /> });
const OrdersTab = dynamic(() => import('./tabs/OrdersTab'), { ssr: false, loading: () => <div className="animate-shimmer h-96 rounded-2xl bg-gray-100" /> });
const SettingsTab = dynamic(() => import('./tabs/SettingsTab'), { ssr: false, loading: () => <div className="animate-shimmer h-96 rounded-2xl bg-gray-100" /> });
const AuditTab = dynamic(() => import('./tabs/AuditTab'), { ssr: false, loading: () => <div className="animate-shimmer h-96 rounded-2xl bg-gray-100" /> });

export interface DashboardStats {
  success: boolean;
  totalRevenue?: number;
  totalOrders?: number;
  totalProducts?: number;
  chartData?: {
    today?: { name: string; revenue: number; orders?: number }[];
    last7?: { name: string; revenue: number; orders?: number }[];
    last30?: { name: string; revenue: number; orders?: number }[];
    thisMonth?: { name: string; revenue: number; orders?: number }[];
    thisYear?: { name: string; revenue: number; orders?: number }[];
    allTime?: { name: string; revenue: number; orders?: number }[];
  };
  periodStats?: {
    today?: { revenue: number; orders: number };
    last7?: { revenue: number; orders: number };
    last30?: { revenue: number; orders: number };
    thisMonth?: { revenue: number; orders: number };
    thisYear?: { revenue: number; orders: number };
    allTime?: { revenue: number; orders: number };
  };
  topProducts?: { nama: string; terjual: number; harga: string; gambar?: string }[];
  activeRulesCount?: number;
  fpGrowthRules?: Array<{
    product_a: string;
    product_b: string;
    product_c?: string | null;
    support: number;
    confidence: number;
    lift?: number;
    image_a?: string;
    image_b?: string;
    image_c?: string | null;
  }>;
  error?: string;
}

interface DashboardClientProps {
  initialStats: DashboardStats;
}

export default function DashboardClient({ initialStats }: DashboardClientProps) {
  const [role] = useState<Role>('owner');
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab as Tab);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 md:pt-28 pb-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Mobile Tab Navigation Bar */}
        <div className="mb-5 flex items-center justify-between md:hidden bg-white px-4 py-3 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tab:</span>
            <span className="text-sm font-bold text-gray-900">
              {activeTab === 'overview' && 'Ringkasan'}
              {activeTab === 'orders' && 'Pesanan'}
              {activeTab === 'products' && 'Katalog Produk'}
              {activeTab === 'settings' && 'Pengaturan Toko'}
              {activeTab === 'audit' && 'Log Aktivitas'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition active:scale-95"
          >
            Menu Dashboard
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleSetActiveTab}
            role={role}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 min-w-0 w-full overflow-x-hidden">
            {activeTab === 'overview' && <OverviewTab initialStats={initialStats} />}
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'settings' && <SettingsTab />}
            {activeTab === 'audit' && <AuditTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
