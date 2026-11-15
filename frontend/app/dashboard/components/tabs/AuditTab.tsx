'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AuditLog {
  id: string;
  user_email: string;
  user_role: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown>;
  created_at: string;
}

const ACTION_LABELS: Record<string, string> = {
  update_order_status: 'Ubah Status Pesanan',
  request_shipment: 'Atur Pengiriman',
  cancel_order: 'Batalkan Pesanan',
  create_product: 'Tambah Produk',
  update_product: 'Edit Produk',
  delete_product: 'Hapus Produk',
  create_admin: 'Tambah Admin',
  delete_admin: 'Hapus Admin',
  create_promo: 'Tambah Promo',
  update_promo: 'Edit Promo',
  delete_promo: 'Hapus Promo',
  create_banner: 'Tambah Banner',
  update_banner: 'Edit Banner',
  delete_banner: 'Hapus Banner',
};

const ENTITY_FILTERS = [
  { value: '', label: 'Semua' },
  { value: 'order', label: 'Pesanan' },
  { value: 'product', label: 'Produk' },
  { value: 'admin', label: 'Admin' },
  { value: 'promo', label: 'Promo' },
  { value: 'banner', label: 'Banner' },
];

const ITEMS_PER_PAGE = 20;

const MOCK_AUDIT_LOGS: AuditLog[] = [];

function formatDetails(details: Record<string, unknown>): string {
  if (!details || Object.keys(details).length === 0) return '-';
  return Object.entries(details)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
}

export default function AuditTab() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [entityFilter, setEntityFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = MOCK_AUDIT_LOGS;
      if (entityFilter) {
        filtered = filtered.filter((l) => l.entity_type === entityFilter);
      }
      setTotal(filtered.length);
      setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
      setLogs(filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [currentPage, entityFilter]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Log Aktivitas</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {total} log tercatat
            </p>
          </div>
          <select
            value={entityFilter}
            onChange={(e) => { setEntityFilter(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            {ENTITY_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">Belum ada log aktivitas</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px]">Waktu</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Entitas</TableHead>
                <TableHead className="min-w-[200px]">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString('id-ID', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="font-medium">{log.user_email}</span>
                    <span className="ml-1.5 text-xs text-gray-400 capitalize">({log.user_role})</span>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {ACTION_LABELS[log.action] || log.action}
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="capitalize">{log.entity_type}</span>
                    {log.entity_id && (
                      <span className="ml-1 text-xs text-gray-400 font-mono">
                        {log.entity_id.slice(0, 8)}...
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600 font-mono">
                    {formatDetails(log.details)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
