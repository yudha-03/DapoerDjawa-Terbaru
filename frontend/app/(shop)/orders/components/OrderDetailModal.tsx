'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';
import type { jsPDF } from 'jspdf';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { getStatusLabel } from '@/lib/constants';
import { toast } from '@/components/ui/toast';
import type { Order, TrackingHistory } from './HistoryClient';

type OrderDetailModalProps = {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderUpdated?: () => void;
};

export default function OrderDetailModal({ order, open, onOpenChange, onOrderUpdated }: OrderDetailModalProps) {
  const confirm = useConfirm();
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingHistory[] | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTrackingData(null);
      setTrackingError(null);
      setIsTracking(false);
    }
    onOpenChange(isOpen);
  };

  const handleTrackPackage = async () => {
    if (!order?.tracking_number) return;
    setIsTracking(true);
    setTrackingError(null);
    try {
      // Simulate real courier tracking steps
      await new Promise((r) => setTimeout(r, 600));
      setTrackingData([
        { note: 'Paket telah diterima oleh penerima yang bersangkutan.', status: 'DELIVERED', updated_at: '2026-11-14 14:20:00' },
        { note: 'Paket sedang dibawa kurir untuk diantar ke alamat tujuan.', status: 'ON_DELIVERY', updated_at: '2026-11-14 09:15:00' },
        { note: 'Paket telah tiba di Drop Point Balikpapan Kota.', status: 'IN_TRANSIT', updated_at: '2026-11-13 21:00:00' },
        { note: 'Paket telah di-pickup kurir dari DapoerDjawa Kitchen.', status: 'PICKED_UP', updated_at: '2026-11-13 11:30:00' },
      ]);
    } catch (error: unknown) {
      setTrackingError(error instanceof Error ? error.message : 'Terjadi kesalahan saat melacak paket.');
    } finally {
      setIsTracking(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    const confirmed = await confirm({
      title: 'Batalkan Pesanan?',
      description: 'Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini tidak dapat dibatalkan.',
      confirmLabel: 'Ya, Batalkan',
      variant: 'danger',
    });
    if (!confirmed) return;

    setIsCancelling(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      toast.add({ type: 'success', title: 'Pesanan Dibatalkan', description: 'Pesanan Anda telah berhasil dibatalkan.' });
      onOrderUpdated?.();
      handleOpenChange(false);
    } catch (error: unknown) {
      toast.add({ type: 'error', title: 'Gagal Membatalkan', description: error instanceof Error ? error.message : 'Terjadi kesalahan.' });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDownloadInvoice = async () => {
    if (!order) return;
    try {
      const { jsPDF } = await import('jspdf');
      await import('jspdf-autotable');
      const doc = new jsPDF() as jsPDF & { autoTable: (options: Record<string, unknown>) => void };

      doc.setFontSize(18);
      doc.text('DapoerDjawa - Invoice', 14, 22);
      doc.setFontSize(10);
      doc.text(`Nomor Invoice: ${order.invoice_number}`, 14, 30);
      doc.text(`Tanggal: ${new Date(order.created_at).toLocaleDateString('id-ID')}`, 14, 36);
      doc.text(`Status: ${order.status}`, 14, 42);

      const tableData = (order.order_items || []).map((item) => [
        item.product_name,
        item.ukuran || 'Reguler',
        item.qty.toString(),
        `Rp${item.price.toLocaleString('id-ID')}`,
        `Rp${(item.price * item.qty).toLocaleString('id-ID')}`,
      ]);

      doc.autoTable({
        startY: 50,
        head: [['Produk', 'Ukuran', 'Jumlah', 'Harga Satuan', 'Subtotal']],
        body: tableData,
      });

      doc.save(`Invoice-${order.invoice_number}.pdf`);
      toast.add({ type: 'success', title: 'Invoice Berhasil Diunduh' });
    } catch {
      toast.add({ type: 'error', title: 'Gagal Mengunduh Invoice' });
    }
  };

  if (!order) return null;

  const isCancellable = ['pending', 'unpaid', 'draft'].includes((order.status || '').toLowerCase());

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader>
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <DialogTitle className="text-xl font-extrabold text-gray-900">
                Detail Pesanan
              </DialogTitle>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{order.invoice_number}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase">
              {getStatusLabel(order.status)}
            </span>
          </div>
        </DialogHeader>

        {/* Product List */}
        <div className="space-y-3 my-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Daftar Produk</h4>
          {order.order_items?.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image src={item.product_image || '/placeholder.png'} alt={item.product_name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate">{item.product_name}</p>
                <p className="text-xs text-gray-500">{item.ukuran} &times; {item.qty} pcs</p>
              </div>
              <p className="text-sm font-bold text-gray-900">
                Rp{(item.price * item.qty).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>

        {/* Tracking info if shipped */}
        {order.tracking_number && (
          <div className="p-4 rounded-xl border border-gray-100 bg-blue-50/40 my-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-700 font-bold uppercase">No. Resi Pengiriman</p>
                <p className="font-mono font-bold text-gray-900 text-sm mt-0.5">{order.tracking_number}</p>
              </div>
              <button
                onClick={handleTrackPackage}
                disabled={isTracking}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isTracking ? 'Melacak...' : 'Lacak Resi'}
              </button>
            </div>

            {trackingError && (
              <p className="mt-2 text-xs text-red-600">{trackingError}</p>
            )}
            {trackingData && (
              <div className="mt-4 pt-3 border-t border-blue-100 space-y-3">
                {trackingData.map((t, idx) => (
                  <div key={idx} className="flex gap-2 text-xs">
                    <span className="text-blue-500 font-bold">&bull;</span>
                    <div>
                      <p className="text-gray-800 font-medium">{t.note}</p>
                      <p className="text-[10px] text-gray-400">{t.updated_at}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pricing Summary */}
        <div className="border-t border-gray-100 pt-3 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Biaya Pengiriman ({order.shipping_courier || 'Kurir'})</span>
            <span className="font-semibold text-gray-900">Rp{(order.shipping_cost || 0).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
            <span>Total Pembayaran</span>
            <span className="text-amber-600">Rp{order.grand_total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleDownloadInvoice}
            className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 transition"
          >
            <Download className="w-3.5 h-3.5" /> Unduh Invoice (PDF)
          </button>
          {isCancellable && (
            <button
              onClick={handleCancelOrder}
              disabled={isCancelling}
              className="py-2.5 px-4 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 transition disabled:opacity-50"
            >
              {isCancelling ? 'Membatalkan...' : 'Batalkan Pesanan'}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
