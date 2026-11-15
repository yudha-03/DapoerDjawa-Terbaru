import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export interface RelatedProduct { id: string; slug?: string; name: string; price: number; image: string; }
export interface FpGrowthProduct extends RelatedProduct { confidence: number; support: number; }

interface RelatedProductsProps {
  fpGrowthProducts: FpGrowthProduct[];
  fallbackProducts: RelatedProduct[];
  recommendationSource: string;
  currentProductName: string;
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

function ProductCard({ product, showConfidence }: { product: RelatedProduct | FpGrowthProduct; showConfidence: boolean }) {
  const confidence = showConfidence && 'confidence' in product ? (product as FpGrowthProduct).confidence : 0;

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/product/${product.slug || product.id}`} className="group relative flex flex-col overflow-hidden rounded-xl md:rounded-2xl bg-white transition-[box-shadow] duration-300 hover:shadow-xl md:hover:-translate-y-1 md:transition-[box-shadow,transform] md:duration-300 border border-gray-100 h-full">
        {showConfidence && confidence > 0 && (
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 shadow-sm">
            <TrendingUp className="h-2.5 w-2.5 text-white" />
            <span className="text-[10px] font-bold text-white">{(confidence * 100).toFixed(0)}%</span>
          </div>
        )}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:group-hover:will-change-transform md:group-hover:scale-[1.08]" />
        </div>
        <div className="flex flex-col p-3 md:p-4">
          <h3 className="mb-1 text-xs md:text-sm font-bold text-gray-800 truncate">{product.name}</h3>
          <p className="text-sm md:text-base font-bold text-[#111111]">Rp{product.price.toLocaleString('id-ID')}</p>
          {showConfidence && confidence > 0 && (
            <p className="mt-1 text-[10px] text-amber-600 font-medium">
              {(confidence * 100).toFixed(0)}% pembeli juga membeli ini
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function RelatedProducts({ fpGrowthProducts, fallbackProducts, recommendationSource, currentProductName }: RelatedProductsProps) {
  const hasFpGrowth = recommendationSource === 'fp-growth' && fpGrowthProducts.length > 0;
  const fpGrowthIds = new Set(fpGrowthProducts.map(p => p.id));
  const filteredFallback = fallbackProducts.filter(p => !fpGrowthIds.has(p.id));

  if (!hasFpGrowth && filteredFallback.length === 0) return null;

  return (
    <div className="mt-8 md:mt-10 mb-12 md:mb-20 space-y-10 md:space-y-14">
      {hasFpGrowth && (
        <section>
          <div className="mb-5 md:mb-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#111111]">Sering Dibeli Bersamaan</h2>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-1 ml-9">
              Berdasarkan pola belanja pelanggan yang membeli <span className="font-semibold text-gray-700">{currentProductName}</span>
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={gridVariants}
          >
            {fpGrowthProducts.map((p) => (
              <ProductCard key={p.id} product={p} showConfidence />
            ))}
          </motion.div>
        </section>
      )}

      {filteredFallback.length > 0 && (
        <section>
          <div className="mb-5 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#111111]">
              {hasFpGrowth ? 'Produk Lainnya' : 'Anda Mungkin Juga Suka'}
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={gridVariants}
          >
            {filteredFallback.map((p) => (
              <ProductCard key={p.id} product={p} showConfidence={false} />
            ))}

            <motion.div variants={cardVariants}>
              <Link href="/" className="group flex flex-col items-center justify-center overflow-hidden rounded-xl md:rounded-2xl bg-gray-50 transition-all duration-300 hover:bg-gray-100 border border-gray-200 h-full min-h-32 md:min-h-50">
                <div className="flex flex-col items-center justify-center p-3 md:p-4 text-center">
                  <div className="bg-white p-3 md:p-4 rounded-full shadow-sm mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                  </div>
                  <span className="font-bold text-xs md:text-sm text-gray-900 leading-tight">Lihat Semua<br />Produk</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
