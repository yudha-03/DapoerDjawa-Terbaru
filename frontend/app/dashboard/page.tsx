import type { Metadata } from 'next';

import DashboardClient from '@/app/dashboard/components/DashboardClient';
import type { DashboardStats } from '@/app/dashboard/components/DashboardClient';
import { STORE_NAME } from '@/lib/store-defaults';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: `Panel manajemen produk dan pesanan ${STORE_NAME}.`,
  robots: { index: false, follow: false },
  alternates: { canonical: '/dashboard' },
};

const DEFAULT_STATS: DashboardStats = {
  success: false,
  totalRevenue: 0,
  totalOrders: 0,
  totalProducts: 0,
  chartData: { today: [], last7: [], last30: [], thisMonth: [], thisYear: [], allTime: [] },
  periodStats: {
    today: { revenue: 0, orders: 0 }, last7: { revenue: 0, orders: 0 }, last30: { revenue: 0, orders: 0 },
    thisMonth: { revenue: 0, orders: 0 }, thisYear: { revenue: 0, orders: 0 }, allTime: { revenue: 0, orders: 0 },
  },
  topProducts: [],
  activeRulesCount: 0,
  fpGrowthRules: [],
};

async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    return { ...DEFAULT_STATS, success: true };
  } catch {
    return DEFAULT_STATS;
  }
}

export default async function DashboardPage() {
  const stats = await fetchDashboardStats();
  return (
    <main className="w-full bg-gray-50 min-h-screen">
      <DashboardClient initialStats={stats} />
    </main>
  );
}
