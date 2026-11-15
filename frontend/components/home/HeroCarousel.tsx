'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface Banner {
  id: string | number;
  img: string;
  alt: string;
  link?: string | null;
  title?: string | null;
  subtitle?: string | null;
  promoCode?: string | null;
  ctaText?: string | null;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const SLIDE_INTERVAL = 6000;   // 6s — standar e-commerce (Baymard: 5-7s)
const TRANSITION_MS  = 450;    // 450ms slide transition
const SWIPE_THRESHOLD = 40;    // px minimum swipe distance

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const isValidLink = (url: string) => url.startsWith('/') || /^https:\/\//i.test(url);
const hasOverlay = (b: Banner) => b.title || b.subtitle || b.promoCode;

/** Detect device with real hover capability (not touch-only) */
const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/* ------------------------------------------------------------------ */
/*  PromoCodeBadge                                                    */
/* ------------------------------------------------------------------ */

function PromoCodeBadge({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = code;
      el.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-1.5 rounded-lg border-2 border-dashed border-white/60 bg-white/20 px-2.5 py-1 transition-all hover:border-white hover:bg-white/30 active:scale-95 sm:gap-2 sm:px-4 sm:py-2"
      title="Klik untuk salin kode promo"
    >
      <span className="font-mono text-xs font-bold tracking-wider text-white sm:text-base">
        {code}
      </span>
      {copied ? (
        <Check className="h-3 w-3 text-green-300 sm:h-4 sm:w-4" />
      ) : (
        <Copy className="h-3 w-3 text-white/70 transition-colors group-hover:text-white sm:h-4 sm:w-4" />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroCarousel                                                      */
/* ------------------------------------------------------------------ */

export default function HeroCarousel({ banners, compact = false }: { banners: Banner[]; compact?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Autoplay selalu aktif, pause saat hover (desktop only)
  const shouldAutoplay = !hovered && banners.length > 1;

  /* ---- Timer management ---- */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setCurrent((p) => (p + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    clearTimer();
    if (!shouldAutoplay) return;
    timerRef.current = setTimeout(() => {
      advance();
    }, SLIDE_INTERVAL);
    return clearTimer;
  }, [shouldAutoplay, current, advance, clearTimer]);

  /* ---- Manual navigation: reset timer, autoplay tetap jalan ---- */
  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((p) => (p + 1) % banners.length);
  }, [banners.length]);

  const goPrev = useCallback(() => {
    setCurrent((p) => (p - 1 + banners.length) % banners.length);
  }, [banners.length]);

  /* ---- Touch/swipe handlers ---- */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      // Swipe di mobile → pindah slide tapi tidak stop autoplay (karena mobile sudah no-autoplay)
      setCurrent((p) => diff > 0 ? (p + 1) % banners.length : (p - 1 + banners.length) % banners.length);
    }
  };

  /* ---- Hover handlers ---- */
  const onMouseEnter = () => { if (canHover()) setHovered(true); };
  const onMouseLeave = () => setHovered(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') || href.startsWith('#')) {
      const targetId = href.replace('/#', '').replace('#', '');
      const targetElement = document.getElementById(targetId) || document.getElementById('shop') || document.getElementById('products');
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  if (!banners?.length) return null;

  const transitionDuration = TRANSITION_MS;

  return (
    <div
      data-carousel
      className={`carousel relative mx-auto w-full ${compact ? '' : 'max-w-[1600px] px-4 md:px-6 lg:px-8'}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner promosi"
    >
      <div
        className="group/carousel relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/*
          Aspect ratio breakdown (gambar 1600x460 = 3.48:1):
          mobile  (<640px)  : 3/1   = 3.0:1 → sedikit crop atas-bawah, minimal
          sm      (640px+)  : 3/1   = 3.0:1 → sama
          md      (768px+)  : 10/3  = 3.33:1 → hampir pas
          lg      (1024px+) : 7/2   = 3.5:1 → pas
          xl      (1280px+) : 7/2   = 3.5:1 → pas
        */}
        <div className="relative w-full aspect-[3/1] md:aspect-[10/3] lg:aspect-[7/2]">
          {/* Slide track — horizontal slide transition (translateX) */}
          <div
            className="absolute inset-0 flex"
            style={{
              width: `${banners.length * 100}%`,
              transform: `translateX(-${current * (100 / banners.length)}%)`,
              transition: transitionDuration > 0 ? `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
            }}
          >
            {banners.map((c, index) => {
              const isActive = index === current;
              const safeLink = c.link && isValidLink(c.link) ? c.link : null;
              const ctaText = c.ctaText || 'Belanja Sekarang';

              return (
                <div
                  key={c.id}
                  className="relative h-full shrink-0"
                  style={{ width: `${100 / banners.length}%` }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} dari ${banners.length}`}
                  aria-hidden={!isActive}
                >
                  {/* Background image */}
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px"
                    quality={index === 0 ? 85 : 75}
                    className="object-cover"
                  />

                  {/* Dark gradient overlay for text readability */}
                  {hasOverlay(c) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 sm:from-black/60 sm:via-black/30 sm:to-transparent" />
                  )}

                  {/* Text overlay */}
                  {hasOverlay(c) && (
                    <div
                      className={`absolute inset-0 flex items-center ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(-16px)',
                        transition: transitionDuration > 0 ? `opacity ${transitionDuration}ms ease-in-out, transform ${transitionDuration}ms ease-in-out` : 'none',
                      }}
                    >
                      <div className="w-full px-4 sm:px-10 md:px-14 lg:px-20">
                        <div className="max-w-[70%] sm:max-w-md lg:max-w-lg space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
                          {/* Title */}
                          {c.title && (
                            <h2 className="text-sm font-bold leading-tight text-white drop-shadow-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                              {c.title}
                            </h2>
                          )}

                          {/* Subtitle */}
                          {c.subtitle && (
                            <p className="text-[10px] leading-snug text-white/90 drop-shadow-md sm:text-xs md:text-sm lg:text-base">
                              {c.subtitle}
                            </p>
                          )}

                          {/* Promo code */}
                          {c.promoCode && (
                            <div className="flex items-center gap-1.5 sm:gap-3">
                              <span className="text-[9px] font-semibold text-white/80 sm:text-xs">
                                Kode:
                              </span>
                              <PromoCodeBadge code={c.promoCode} />
                            </div>
                          )}

                          {/* CTA button */}
                          {safeLink && (
                            <div className="pt-0.5 sm:pt-2">
                              <Link
                                href={safeLink}
                                onClick={(e) => handleLinkClick(e, safeLink)}
                                tabIndex={isActive ? 0 : -1}
                                className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-gray-900 shadow-lg transition-[background-color,box-shadow,transform] hover:bg-amber-50 hover:shadow-xl active:scale-95 sm:px-5 sm:py-2 sm:text-xs md:px-6 md:py-2.5 md:text-sm lg:px-8 lg:py-3 lg:text-base cursor-pointer"
                              >
                                {ctaText}
                                <ChevronRight className="ml-0.5 h-3 w-3 sm:ml-1 sm:h-4 sm:w-4" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Clickable area when no overlay but has link */}
                  {!hasOverlay(c) && safeLink && (
                    <Link
                      href={safeLink}
                      onClick={(e) => handleLinkClick(e, safeLink)}
                      className="absolute inset-0 z-[5]"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span className="sr-only">{c.alt}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation arrows — muncul saat hover (standar SE Asian e-commerce) */}
        {banners.length > 1 && (
          <>
            <button
              aria-label="Slide sebelumnya"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-[opacity,transform,background-color] opacity-70 md:opacity-0 md:group-hover/carousel:opacity-100 hover:bg-white hover:scale-110 sm:h-11 sm:w-11 md:left-4 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              aria-label="Slide selanjutnya"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-[opacity,transform,background-color] opacity-70 md:opacity-0 md:group-hover/carousel:opacity-100 hover:bg-white hover:scale-110 sm:h-11 sm:w-11 md:right-4 md:h-12 md:w-12"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 z-20 flex w-full items-center justify-center gap-1.5 sm:bottom-3 sm:gap-2 md:bottom-4">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`p-2 -m-2 group`}
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 sm:h-2 ${idx === current ? 'w-5 bg-white shadow-md sm:w-7' : 'w-1.5 bg-white/50 group-hover:bg-white/70 sm:w-2'}`} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
