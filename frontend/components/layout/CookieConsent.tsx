'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setMounted(true);
        // trigger transition on next frame
        requestAnimationFrame(() => setShow(true));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('cookie-consent', 'dismissed');
    setShow(false);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      onTransitionEnd={() => {
        if (!show) setMounted(false);
      }}
    >
      <div className="border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Cookie className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Website ini menggunakan cookie untuk menjaga sesi login Anda. Kami tidak menggunakan cookie pelacakan untuk iklan.{' '}
              <Link href="/privacy-policy" className="font-semibold text-gray-900 hover:underline">
                Pelajari selengkapnya
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={handleDismiss}
              className="rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition active:scale-[0.98]"
            >
              Tolak
            </button>
            <button
              onClick={handleAccept}
              className="rounded-xl px-5 py-2.5 text-xs font-bold text-white bg-black hover:bg-gray-800 transition active:scale-[0.98]"
            >
              Terima Semua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
