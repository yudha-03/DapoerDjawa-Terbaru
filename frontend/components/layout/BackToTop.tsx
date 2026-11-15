'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > 400;
      setVisible(prev => prev === show ? prev : show);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-20 left-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-[opacity,transform,box-shadow,background-color] duration-300 active:scale-95 ${
        visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      }`}
      aria-label="Kembali ke atas"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
