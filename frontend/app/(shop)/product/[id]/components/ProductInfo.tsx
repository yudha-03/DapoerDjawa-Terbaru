import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Link2, Loader2, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

export interface ProductVariant { id: string; ukuran: string; price: number; stok: number; img: string | null; foto_2?: string | null; foto_3?: string | null; }
export interface ProductDisplay { id: string; nama_produk: string; deskripsi: string; foto_2: string | null; foto_3: string | null; variants: ProductVariant[]; }

interface ProductInfoProps {
  product: ProductDisplay;
  selectedVariant: ProductVariant | null;
  setSelectedVariant: (variant: ProductVariant) => void;
  setReviewVariantId: (id: string) => void;
  qty: number;
  setQty: (qty: number) => void;
  isAddingToCart: boolean;
  handleAddToCart: () => void;
  averageRating: string;
  reviewCount: number;
}

export default function ProductInfo({
  product, selectedVariant, setSelectedVariant, setReviewVariantId,
  qty, setQty, isAddingToCart, handleAddToCart, averageRating, reviewCount,
}: ProductInfoProps) {
  const galleryImages = [
    selectedVariant?.foto_2 || product.foto_2 || '/placeholder.png',
    selectedVariant?.foto_3 || product.foto_3 || '',
  ].filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting carousel index on variant change
    setActiveIndex(0);
    setSlideDir(0);
    setHasInteracted(false);
  }, [selectedVariant]);

  const goTo = (next: number, dir: number) => {
    setHasInteracted(true);
    setSlideDir(dir);
    setActiveIndex(next);
  };
  const goPrev = () => goTo((activeIndex - 1 + galleryImages.length) % galleryImages.length, -1);
  const goNext = () => goTo((activeIndex + 1) % galleryImages.length, 1);

  const swipeThreshold = 50;
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -swipeThreshold) goNext();
    else if (info.offset.x > swipeThreshold) goPrev();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12 md:mb-20 items-start">
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl md:rounded-[2rem] bg-[#F5F5F5] group">
          <AnimatePresence initial={false} mode="popLayout" custom={slideDir}>
            <motion.div
              key={activeIndex}
              custom={slideDir}
              initial={hasInteracted ? { x: slideDir > 0 ? '40%' : '-40%', opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDir > 0 ? '-40%' : '40%', opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              drag={galleryImages.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[activeIndex] || '/placeholder.png'}
                alt={product.nama_produk}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-gray-100 active:scale-95"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-gray-100 active:scale-95"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                    aria-label={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {galleryImages.length > 1 && (
          <div className="flex gap-2 md:gap-3 mt-3 md:mt-4">
            {galleryImages.map((src, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden border-2 bg-white transition-all duration-300 cursor-pointer ${activeIndex === i ? 'border-[#111111] ring-2 ring-black/20 scale-105' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <Image src={src} alt={`${product.nama_produk} ${i + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-start lg:pt-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        <h1 className="mb-2 md:mb-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{product.nama_produk}</h1>
        <p className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold text-gray-900">{selectedVariant ? `Rp${selectedVariant.price.toLocaleString('id-ID')}` : 'Pilih Varian'}</p>

        <div className="mb-6 md:mb-8 flex items-center gap-3">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 md:h-5 md:w-5 ${
                  reviewCount > 0 && star <= Math.round(Number(averageRating))
                    ? 'fill-current'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          {reviewCount > 0 ? (
            <span className="text-xs md:text-sm font-medium text-gray-500">
              {averageRating}/5 ({reviewCount} Ulasan)
            </span>
          ) : (
            <span className="text-xs md:text-sm font-medium text-gray-400">
              Belum ada ulasan
            </span>
          )}
        </div>

        <div className="mb-6 md:mb-8">
          <h3 className="text-[10px] md:text-xs font-bold text-gray-900 mb-3 md:mb-4 uppercase tracking-widest">Pilih Ukuran</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {product.variants.map((v) => (
              <Button
                key={v.id}
                variant={selectedVariant?.id === v.id ? 'default' : 'outline'}
                onClick={() => { setSelectedVariant(v); setReviewVariantId(v.id); }}
                className={`px-4 py-3 md:px-6 md:py-6 rounded-xl md:rounded-2xl font-bold transition-all text-xs md:text-sm border-2 ${
                  selectedVariant?.id === v.id ? 'bg-[#111111] border-[#111111] text-white hover:bg-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                {v.ukuran}
              </Button>
            ))}
          </div>
        </div>

        <p className="mb-4 md:mb-6 text-xs md:text-sm font-semibold text-red-600">Ketersediaan: Stok Terbatas (Tersisa {selectedVariant?.stok || 0} Toples)</p>
        <p className="mb-8 md:mb-10 text-sm md:text-base leading-relaxed text-gray-500 text-justify whitespace-pre-wrap">{product.deskripsi}</p>

        <div className="mb-8 md:mb-10 flex flex-row items-center gap-4 md:gap-6">
          <span className="text-sm md:text-base font-bold text-gray-900">Jumlah:</span>
          <div className="flex h-12 w-36 md:h-12 md:w-36 items-center rounded-xl border-2 border-gray-200 bg-white shadow-sm overflow-hidden">
            <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} aria-label="Kurangi jumlah" className="flex h-full w-12 md:w-12 items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors active:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed">
              <Minus className="h-4 w-4" />
            </button>
            <div className="flex h-full flex-1 items-center justify-center border-x-2 border-gray-200 text-base md:text-lg font-bold text-gray-900 bg-gray-50">{qty}</div>
            <button onClick={() => setQty(Math.min(selectedVariant?.stok || 99, qty + 1))} disabled={qty >= (selectedVariant?.stok || 99)} aria-label="Tambah jumlah" className="flex h-full w-12 md:w-12 items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors active:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={selectedVariant?.stok === 0 || isAddingToCart}
          className="h-14 md:h-16 w-full rounded-xl md:rounded-2xl bg-[#111111] text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-white transition-transform active:scale-[0.98] hover:bg-black hover:shadow-xl disabled:bg-gray-300 disabled:active:scale-100"
        >
          {isAddingToCart ? <><Loader2 className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 animate-spin" /> MEMPROSES...</> : <><ShoppingCart className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" /> TAMBAHKAN KE KERANJANG</>}
        </Button>

        <div className="mt-4 md:mt-6 flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bagikan:</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const url = typeof window !== 'undefined' ? window.location.href : '';
                const text = `Cek ${product.nama_produk} di DapoerDjawa! ${selectedVariant ? `Rp${selectedVariant.price.toLocaleString('id-ID')}` : ''}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
              }}
              className="flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-[#25D366] hover:text-white"
              title="Bagikan via WhatsApp"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
            <button
              onClick={() => {
                const url = typeof window !== 'undefined' ? window.location.href : '';
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(url);
                  toast.add({ type: 'success', title: 'Link produk disalin!' });
                }
              }}
              className="flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-900 hover:text-white"
              title="Salin link produk"
            >
              <Link2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
