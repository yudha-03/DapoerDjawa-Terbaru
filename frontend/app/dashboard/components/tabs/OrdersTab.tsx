'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getStatusLabel, getStatusColorAdmin as getStatusColor } from '@/lib/constants';
import { getLocalOrders, updateLocalOrderStatus } from '@/lib/api';
import { ChevronLeft, ChevronRight, Clock, Eye, Loader2, MapPin, Package, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import type { Order } from '@/types/dashboard';

interface TrackingHistory {
  note: string;
  status: string;
  updated_at: string;
}

const ITEMS_PER_PAGE = 10;

export default function OrdersTab() {
  const confirm = useConfirm();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessingPickup, setIsProcessingPickup] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingHistory[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = () => {
      setIsLoading(true);
      const local = getLocalOrders();
      const mapped: Order[] = local.map((o) => ({
        id: o.id,
        invoice_number: `INV-${o.id.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()}`,
        created_at: o.created_at,
        customer_name: o.customer_name,
        customer_phone: '081234567890',
        shipping_address: o.destination_address,
        shipping_city: 'Balikpapan',
        shipping_courier: o.shipping_courier,
        shipping_cost: o.shipping_cost,
        grand_total: o.total_amount,
        status: o.status,
        tracking_number: o.tracking_number,
        biteship_order_id: 'bite-01',
        order_items: (o.items || []).map((it, idx) => ({
          id: `${o.id}-${idx}`,
          qty: it.qty,
          price: it.price,
          product_name: it.name,
          ukuran: it.variant,
          produk_varian: { img: it.img },
        })),
      }));
      setOrders(mapped);
      setCurrentPage(1);
      setIsLoading(false);
    };
    fetchOrders();
  }, [refreshKey]);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setTrackingData(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleRequestPickup = async (orderId: string) => {
    setIsProcessingPickup(true);
    const loadingToast = toast.add({ type: 'loading', title: 'Meminta pickup ke Biteship...' });
    try {
      await new Promise((r) => setTimeout(r, 500));
      const newTrackingNumber = `DJW${Math.floor(100000000 + Math.random() * 900000000)}`;
      updateLocalOrderStatus(orderId, 'shipped', newTrackingNumber);
      toast.close(loadingToast);
      toast.add({ type: 'success', title: `Pickup berhasil! Resi: ${newTrackingNumber}` });
      if (selectedOrder) {
        setSelectedOrder({
          ...selectedOrder,
          status: 'shipped',
          tracking_number: newTrackingNumber,
        });
      }
      setRefreshKey((prev) => prev + 1);
    } catch (error: unknown) {
      toast.close(loadingToast);
      toast.add({ type: 'error', title: error instanceof Error ? error.message : 'Gagal request pickup' });
    } finally {
      setIsProcessingPickup(false);
    }
  };

  const handleTrackPackage = async (trackingNumber?: string) => {
    if (!selectedOrder) return;
    setIsTracking(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      const resi = trackingNumber || selectedOrder.tracking_number || '';
      const history = [
        { note: `Paket ${resi ? `(${resi}) ` : ''}telah diterima oleh penerima yang bersangkutan.`, status: 'DELIVERED', updated_at: '2026-11-14 14:00' },
        { note: 'Paket sedang dalam perjalanan menuju alamat tujuan.', status: 'ON_DELIVERY', updated_at: '2026-11-14 09:15' },
        { note: 'Paket telah di-pickup kurir dari toko.', status: 'PICKED_UP', updated_at: '2026-11-13 11:30' },
      ];
      setTrackingData(history);
    } catch (error: unknown) {
      toast.add({ type: 'error', title: error instanceof Error ? error.message : 'Gagal melacak paket' });
    } finally {
      setIsTracking(false);
    }
  };

  const isOrderPaid = (status: string) => {
    const s = (status || '').toLowerCase();
    return s === 'paid' || s === 'lunas' || s === 'settlement';
  };

  const isOrderCancellable = (status: string) => {
    const s = (status || '').toLowerCase();
    return s === 'pending' || s === 'paid' || s === 'lunas' || s === 'settlement' || s === 'cancel_requested';
  };

  const handleCancelOrder = async (orderId: string) => {
    const isRequest = selectedOrder?.status?.toLowerCase() === 'cancel_requested';
    const confirmed = await confirm({
      title: isRequest ? 'Setujui Pembatalan Pesanan?' : 'Batalkan Pesanan?',
      description: isRequest
        ? 'Pesanan akan dibatalkan dan stok akan dikembalikan apabila sudah dibayar.'
        : 'Pesanan yang dibatalkan tidak dapat dikembalikan. Stok akan dikembalikan apabila sudah dibayar.',
      confirmLabel: isRequest ? 'Ya, Setujui' : 'Ya, Batalkan',
      variant: 'danger',
    });
    if (!confirmed) return;
    setIsCancelling(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      updateLocalOrderStatus(orderId, 'cancelled');
      toast.add({ type: 'success', title: 'Pesanan berhasil dibatalkan' });
      if (selectedOrder) {
        setSelectedOrder({ ...selectedOrder, status: 'cancelled' });
      }
      setRefreshKey((prev) => prev + 1);
    } catch (error: unknown) {
      toast.add({ type: 'error', title: error instanceof Error ? error.message : 'Gagal membatalkan pesanan' });
    } finally {
      setIsCancelling(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE));
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border p-3 sm:p-6 relative">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Daftar Pesanan</h2>
      </div>

      <div className="border rounded-md overflow-hidden -mx-3 sm:mx-0">
        {/* Mobile card view */}
        <div className="md:hidden divide-y">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-32">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Memuat data pesanan...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-3">
                <Package className="w-8 h-8 text-amber-400" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Belum Ada Pesanan Masuk</h4>
              <p className="text-xs text-gray-500 max-w-xs">Pesanan dari pelanggan akan muncul di sini setelah mereka melakukan transaksi.</p>
            </div>
          ) : (
            paginatedOrders.map((order) => (
              <div key={order.id} className="p-4 space-y-3 hover:bg-gray-50/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{order.customer_name}</p>
                    <p className="text-xs text-gray-500">{order.customer_phone}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white shrink-0`}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                  <span className="font-medium text-gray-900">
                    Rp {(order.grand_total || 0).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-medium text-gray-500">
                    {order.shipping_courier || '-'}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => openModal(order)} className="gap-1.5 text-xs">
                    <Eye className="w-3.5 h-3.5" /> Detail
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Penerima</TableHead>
              <TableHead>Kurir</TableHead>
              <TableHead>Total Tagihan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Memuat data pesanan...</p>
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-3">
                      <Package className="w-8 h-8 text-amber-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Belum Ada Pesanan Masuk</h4>
                    <p className="text-xs text-gray-500 max-w-xs">Pesanan dari pelanggan akan muncul di sini setelah mereka melakukan transaksi.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-sm">
                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-gray-900">{order.customer_name}</p>
                    <p className="text-xs text-gray-500">{order.customer_phone}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm uppercase font-medium">{order.shipping_courier || '-'}</span>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    Rp {(order.grand_total || 0).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => openModal(order)} className="gap-2">
                      <Eye className="w-4 h-4" /> Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </div>
      </div>

      {!isLoading && orders.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-4 mt-4">
          <p className="text-xs sm:text-sm text-gray-500">
            Menampilkan {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, orders.length)} dari {orders.length} pesanan
          </p>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg border px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Sebelumnya</span>
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .reduce<(number | string)[]>((acc, page, idx, arr) => {
                  if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push('...');
                  acc.push(page);
                  return acc;
                }, [])
                .map((page, idx) =>
                  typeof page === 'string' ? (
                    <span key={`dots-${idx}`} className="px-1 sm:px-2 text-gray-400">…</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-lg border px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="hidden sm:inline">Selanjutnya</span> <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
            <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-500 shrink-0" />
                  Detail Pesanan
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1 font-mono truncate">ID: {selectedOrder.id}</p>
              </div>
              <Badge className={`${getStatusColor(selectedOrder.status)} text-white px-3 py-1 text-sm`}>
                {getStatusLabel(selectedOrder.status)}
              </Badge>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Penerima</h4>
                  <p className="font-semibold text-gray-900">{selectedOrder.customer_name}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer_phone}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Alamat Pengiriman
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedOrder.shipping_address}<br/>
                    <span className="font-medium text-gray-800">{selectedOrder.shipping_city}</span>
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl border border-blue-100 flex flex-col gap-3 sm:gap-4">
                <div>
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Ekspedisi
                  </h4>
                  <p className="font-bold text-blue-900 uppercase">{selectedOrder.shipping_courier || 'Belum dipilih'}</p>
                  {selectedOrder.tracking_number && (
                    <p className="text-sm font-mono text-blue-700 mt-1 break-all">Resi: {selectedOrder.tracking_number}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                {isOrderPaid(selectedOrder.status) && (
                  <Button
                    onClick={() => handleRequestPickup(selectedOrder.id)}
                    disabled={isProcessingPickup}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    {isProcessingPickup ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
                    Atur Pengiriman
                  </Button>
                )}
                {selectedOrder.tracking_number && (
                  <Button
                    onClick={() => handleTrackPackage(selectedOrder.tracking_number!)}
                    disabled={isTracking}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 gap-2 font-semibold"
                  >
                    {isTracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                    Lacak Paket
                  </Button>
                )}
                {isOrderCancellable(selectedOrder.status) && (
                  <Button
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    disabled={isCancelling}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 gap-2 font-semibold"
                  >
                    {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="text-sm">✕</span>}
                    {selectedOrder.status?.toLowerCase() === 'cancel_requested' ? 'Setujui Pembatalan' : 'Batalkan Pesanan'}
                  </Button>
                )}
                </div>
              </div>

              {selectedOrder.order_items && selectedOrder.order_items.length > 0 && (
                <div className="border rounded-xl p-4 bg-white">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Item Produk</h4>
                  <div className="divide-y">
                    {selectedOrder.order_items.map((item) => (
                      <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                            {item.produk_varian?.img ? (
                              <Image
                                src={item.produk_varian.img}
                                alt={item.product_name || 'Produk'}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{item.product_name || 'Produk'}</p>
                            {item.ukuran && <p className="text-xs text-gray-500">Varian: {item.ukuran}</p>}
                          </div>
                        </div>
                        <div className="text-right sm:text-right">
                          <p className="font-semibold text-gray-900">{item.qty} x Rp {item.price.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {trackingData && (
                <div className="border rounded-xl p-4 bg-white animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-sm font-bold text-gray-800 mb-4 border-b pb-2">Riwayat Perjalanan Paket</h4>
                  <div className="space-y-4">
                    {trackingData.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">Belum ada riwayat pergerakan paket.</p>
                    ) : (
                      trackingData.map((track, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                            {idx !== trackingData.length - 1 && <div className="w-px h-full bg-gray-200 my-1" />}
                          </div>
                          <div className="pb-2">
                            <p className={`text-sm font-medium ${idx === 0 ? 'text-gray-900' : 'text-gray-600'}`}>
                              {track.note}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {new Date(track.updated_at).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 border-b pb-2">Ringkasan Pesanan</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal Produk</span>
                    <span className="font-medium text-gray-900">
                      Rp {((selectedOrder.grand_total || 0) - (selectedOrder.shipping_cost || 0) + (selectedOrder.discount || 0)).toLocaleString('id-ID')}
                    </span>
                  </div>
                  {(selectedOrder.discount || 0) > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Voucher Diskon</span>
                      <span className="font-medium text-green-600">
                        - Rp {selectedOrder.discount!.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ongkos Kirim</span>
                    <span className="font-medium text-gray-900">
                      Rp {(selectedOrder.shipping_cost || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t mt-2">
                    <span>Total Bayar</span>
                    <span>Rp {(selectedOrder.grand_total || 0).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end bg-gray-50 rounded-b-2xl">
              <Button variant="outline" onClick={closeModal} className="w-full sm:w-auto">
                Tutup Panel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
