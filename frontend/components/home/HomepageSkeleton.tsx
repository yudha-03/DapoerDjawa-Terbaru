import { Footer } from '../layout/Footer';

/** Skeleton fallback for homepage Suspense boundary.
 *  Matches HeroCarousel + ProductGrid + About layout so CLS stays near zero. */
export default function HomepageSkeleton() {
  return (
    <section className="bg-gray-50 text-gray-800 pt-24 min-h-screen">
      {/* Hero carousel skeleton */}
      <div className="relative mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg animate-pulse">
          <div className="relative w-full aspect-[3/1] md:aspect-[10/3] lg:aspect-[7/2]" />
        </div>
      </div>

      {/* Product grid skeleton */}
      <section className="bg-gray-50 pt-10 md:pt-16 pb-12 min-h-[60vh]">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header bar */}
          <div className="flex items-center justify-between pb-4 md:pb-6 border-b border-gray-300 mb-6 md:mb-10">
            <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Product cards skeleton — 12 items, 2col mobile / 3col tablet / 4col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-4 md:p-5 flex flex-col gap-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section skeleton */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-5 max-w-4xl">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
}
