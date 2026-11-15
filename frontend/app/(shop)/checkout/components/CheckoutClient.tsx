'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Truck, CheckCircle, Loader2, Search, Map } from 'lucide-react';
import Link from 'next/link';

import { toast } from '@/components/ui/toast';
import { Footer } from '@/components/layout/Footer';
import { DEFAULT_ADDRESSES, SHIPPING_AREAS, SHIPPING_RATES, type Order, type ShippingRate } from '@/lib/data';
import { saveLocalOrder } from '@/lib/api';
import { useCart } from '@/lib/cart-store';
import { useAuth } from '@/lib/auth-context';
import FormField from './FormField';

type DestinationResult = { id: string; name: string; label?: string };

const checkoutSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').regex(/^[a-zA-Z\s.'\-]+$/, 'Nama hanya boleh berisi huruf, spasi, titik, atau tanda hubung'),
  phone: z.string().min(10, 'Minimal 10 angka').regex(/^[0-9]+$/, 'Hanya masukkan angka'),
  postalCode: z.string().min(5, 'Kode pos wajib 5 angka').regex(/^[0-9]{5}$/, 'Harus 5 digit angka'),
  street: z.string().min(10, 'Alamat terlalu singkat, lengkapi detail jalan/blok'),
  customerNote: z.string().optional(),
  destinationId: z.string().min(1, 'Wajib memilih kecamatan tujuan'),
  destinationLabel: z.string().min(1, 'Wajib memilih kecamatan tujuan'),
  courierName: z.string().min(1, 'Wajib memilih jasa kurir'),
  courierPrice: z.number().min(0),
});
type CheckoutFormValues = z.infer<typeof checkoutSchema>;

function generateOrderId(param?: string | null): string {
  return param || `ORD-${Date.now().toString().slice(-6)}`;
}

function generateTrackingNumber(): string {
  return `DJW${Math.floor(100000000 + Math.random() * 900000000)}`;
}

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [orderId] = useState(() => generateOrderId(searchParams.get('order_id')));
  const discountParam = Number(searchParams.get('discount') || 0);

  const { items: cartItems, subtotal, clearCart } = useCart();

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCourierId, setSelectedCourierId] = useState<string | null>('jne-reg');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const savedAddresses = DEFAULT_ADDRESSES;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      name: user?.nama_user || '',
      phone: user?.phone || '',
      postalCode: '',
      street: '',
      destinationId: '',
      destinationLabel: '',
      courierName: 'JNE - Reguler (REG)',
      courierPrice: 18000,
    },
  });

  const watchDestId = useWatch({ control, name: 'destinationId' });
  const watchCourierPrice = useWatch({ control, name: 'courierPrice' }) || 18000;

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedKeyword(keyword), 300);
    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSavedAddress = (addr: typeof savedAddresses[0]) => {
    setValue('name', addr.receiver_name, { shouldValidate: true });
    setValue('phone', addr.phone, { shouldValidate: true });
    setValue('street', addr.full_address, { shouldValidate: true });
    setValue('destinationId', addr.area_id, { shouldValidate: true });
    setValue('destinationLabel', addr.label, { shouldValidate: true });
    setKeyword(addr.label);
  };

  const searchResults: DestinationResult[] = SHIPPING_AREAS.filter(
    (a) =>
      a.name.toLowerCase().includes(debouncedKeyword.toLowerCase()) ||
      a.city_name.toLowerCase().includes(debouncedKeyword.toLowerCase())
  ).map((a) => ({ id: a.id, name: `${a.name}, ${a.city_name}`, label: `${a.name}, ${a.city_name}` }));

  const dynamicCouriers = SHIPPING_RATES;

  const handleSelectDestination = (dest: DestinationResult) => {
    const label = dest.label || dest.name;
    setValue('destinationId', dest.id, { shouldValidate: true });
    setValue('destinationLabel', label, { shouldValidate: true });
    setKeyword(label);
    setShowDropdown(false);
  };

  const onSubmit = (formData: CheckoutFormValues) => {
    setIsSubmitting(true);
    try {
      const newOrder: Order = {
        id: orderId,
        user_id: user?.id || 'guest-user',
        customer_name: formData.name,
        status: 'paid',
        total_amount: Math.max(0, subtotal - discountParam + formData.courierPrice),
        shipping_cost: formData.courierPrice,
        tracking_number: generateTrackingNumber(),
        shipping_courier: formData.courierName,
        destination_address: `${formData.street}, ${formData.destinationLabel}`,
        created_at: new Date().toISOString(),
        items: cartItems.map((item) => ({
          name: item.name,
          variant: item.ukuran,
          price: item.price,
          qty: item.qty,
          img: item.img,
        })),
      };

      saveLocalOrder(newOrder);
      clearCart();
      toast.add({ type: 'success', title: 'Pembayaran Berhasil! (Simulasi)', description: 'Pesanan Anda telah kami terima.' });
      router.push(`/order-success?order_id=${orderId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal membuat pesanan';
      toast.add({ type: 'error', title: 'Gagal Memproses', description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <main className="container mx-auto max-w-2xl px-4 py-32 text-center flex-1">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Belanja Kosong</h1>
            <p className="text-gray-500 mb-6">Pilih kue kering favorit Anda terlebih dahulu sebelum melakukan checkout.</p>
            <Link href="/#products" className="inline-block bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
              Lihat Produk
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="container mx-auto max-w-7xl px-4 md:px-6 pt-24 lg:pt-32 pb-12 lg:pb-16 flex-1 w-full relative z-0">
        <div className="mb-6 lg:mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Pembayaran</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base font-medium">Lengkapi alamat pengiriman dan selesaikan pesanan Anda.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:w-[65%] space-y-6 md:space-y-8">
            {/* Form Alamat */}
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5 md:mb-6 pb-4 border-b border-gray-100">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-black" />
                <h2 className="text-lg md:text-xl font-semibold">Alamat Pengiriman</h2>
              </div>

              {/* Saved Address Pill */}
              {savedAddresses.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {savedAddresses.map((addr) => (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => handleSelectSavedAddress(addr)}
                      className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 font-medium text-gray-700 transition"
                    >
                      📍 Gunakan {addr.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <FormField label="Nama Lengkap Penerima" name="name" register={register} errors={errors} placeholder="Contoh: Nama Anda" />
                <FormField label="Nomor WhatsApp / HP" name="phone" register={register} errors={errors} placeholder="Contoh: 081234567890" />
                <div className="md:col-span-2">
                  <FormField label="Alamat Lengkap" name="street" register={register} errors={errors} placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan" />
                </div>
                <FormField label="Kode Pos" name="postalCode" register={register} errors={errors} placeholder="76111" />

                {/* Kecamatan Selector */}
                <div className="relative md:col-span-2" ref={dropdownRef}>
                  <label htmlFor="dest-search" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Kecamatan Tujuan Pengiriman
                  </label>
                  <div className="relative">
                    <input
                      id="dest-search"
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition text-sm"
                      placeholder="Ketik nama kecamatan di Balikpapan/Kaltim..."
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  </div>
                  {errors.destinationLabel && <p className="text-red-500 text-xs mt-1">{errors.destinationLabel.message}</p>}

                  {showDropdown && (
                    <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.length ? (
                        searchResults.map((res) => (
                          <li
                            key={res.id}
                            onClick={() => handleSelectDestination(res)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 text-sm flex items-center gap-3"
                          >
                            <Map className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="font-medium text-gray-800">{res.name}</span>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-4 text-center text-sm text-gray-500">Kecamatan tidak ditemukan. Coba ejaan lain.</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="md:col-span-2">
                  <FormField
                    label={<span>Catatan Pesanan <span className="text-gray-400 font-normal">(Opsional)</span></span>}
                    name="customerNote"
                    register={register}
                    errors={errors}
                    isTextArea
                    placeholder="Contoh: Tolong packing toples ekstra bubble wrap..."
                  />
                </div>
              </div>
            </form>

            {/* Courier Selection */}
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5 md:mb-6 pb-4 border-b border-gray-100">
                <Truck className="w-6 h-6 md:w-7 md:h-7 text-black" />
                <h2 className="text-lg md:text-xl font-semibold">Pilih Jasa Kurir</h2>
              </div>

              {!watchDestId ? (
                <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-6 text-center text-gray-600 text-sm font-medium">
                  Silakan cari dan pilih kecamatan tujuan terlebih dahulu.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4 max-h-96 overflow-y-auto pr-1 pb-1">
                  {dynamicCouriers.map((courier: ShippingRate) => {
                    const isSelected = selectedCourierId === courier.type;
                    return (
                      <button
                        key={courier.type}
                        type="button"
                        onClick={() => {
                          setSelectedCourierId(courier.type);
                          setValue('courierName', `${courier.courier_name} - ${courier.courier_service_name}`, { shouldValidate: true });
                          setValue('courierPrice', courier.price, { shouldValidate: true });
                        }}
                        className={`flex flex-col p-4 border-2 rounded-2xl w-full text-left transition duration-200 ${
                          isSelected ? 'border-black bg-gray-50/50 ring-1 ring-black shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3 w-full">
                          <span className="font-bold text-gray-800 text-sm uppercase px-2 py-0.5 bg-gray-100 rounded">
                            {courier.courier_name}
                          </span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-black' : 'border-gray-300'}`}>
                            {isSelected && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                          </div>
                        </div>
                        <p className="font-bold text-gray-900 pr-2 leading-tight">{courier.courier_service_name}</p>
                        <p className="text-sm text-gray-600 mb-3 flex-1 mt-1">Estimasi {courier.duration}</p>
                        <p className="text-lg font-extrabold text-gray-900 mt-auto">Rp{courier.price.toLocaleString('id-ID')}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Ringkasan Belanja */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-7 lg:sticky lg:top-28 shadow-sm">
              <h2 className="uppercase tracking-wide font-bold text-gray-900 text-base md:text-lg mb-5 pb-2 border-b border-gray-100">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>Total Produk ({cartItems.length} item)</span>
                  <span className="font-semibold text-gray-900">Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discountParam > 0 && (
                  <div className="flex justify-between text-sm md:text-base text-green-600 font-medium">
                    <span>Voucher Diskon</span>
                    <span>- Rp{discountParam.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>Biaya Pengiriman</span>
                  <span className="font-semibold text-gray-900">Rp{watchCourierPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-gray-900 border-t border-gray-200 pt-5 mt-4">
                  <span className="text-base md:text-lg font-bold">Total Bayar</span>
                  <span className="text-xl md:text-2xl font-bold text-amber-600">
                    Rp{Math.max(0, subtotal - discountParam + watchCourierPrice).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 text-center mb-4 leading-relaxed px-1">
                Dengan melanjutkan, Anda menyetujui{' '}
                <Link href="/terms-conditions" className="text-gray-800 font-semibold hover:underline">
                  Syarat &amp; Ketentuan
                </Link>{' '}
                DapoerDjawa.
              </p>

              <button
                type="submit"
                form="checkout-form"
                disabled={!isValid || isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Memproses Pesanan...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" /> Bayar Sekarang (Simulasi)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
