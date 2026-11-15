'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  link: string;
}

const SORT_OPTIONS = [
  { id: 'default', label: 'Pilihan Toko', iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { id: 'price-asc', label: 'Harga Terendah', iconPath: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' },
  { id: 'price-desc', label: 'Harga Tertinggi', iconPath: 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4' },
  { id: 'alpha', label: 'A-Z', iconPath: 'M3 4h13M3 8h9m-9 4h6' },
];

export default function ProductGrid({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [showSort, setShowSort] = useState(false);
  // Track whether initial animation has played; starts false, flipped after first render via effect
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time flag after mount animation
    setHasAnimated(true);
  }, []);

  // Close sort dropdown on outside click
  const sortRef = useRef<HTMLDivElement>(null);
  const sortBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!showSort) return;
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSort(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showSort]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    switch (sortOrder) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'alpha':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'id'));
      default:
        return filtered;
    }
  }, [products, searchQuery, sortOrder]);

  return (
    <section id="shop" className="bg-gray-50 pt-10 md:pt-16 pb-12 scroll-mt-20 min-h-[60vh] relative">
      <span id="products" className="absolute -top-24" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between pb-4 md:pb-6 border-b border-gray-300 mb-6 md:mb-10 gap-2">
          <div className="flex-1 w-full">
            {showSearch ? (
              <Input
                autoFocus
                placeholder="Cari produk..."
                className="w-full sm:max-w-md rounded-xl shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            ) : (
              <h2 className="uppercase font-bold text-gray-900 text-lg md:text-2xl">Produk Kami</h2>
            )}
          </div>
          <div className="flex items-center gap-2 relative" ref={sortRef}>
            <Button ref={sortBtnRef} variant={showSort ? 'secondary' : 'ghost'} size="icon" className="rounded-full w-10 h-10 md:w-10 md:h-10" onClick={() => setShowSort(!showSort)} aria-label="Urutkan produk" aria-expanded={showSort} aria-haspopup="listbox">
              <svg className="fill-current w-5 h-5 md:w-6 md:h-6 text-gray-600" viewBox="0 0 24 24"><path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" /></svg>
            </Button>
            <AnimatePresence>
            {showSort && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute top-12 right-0 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 overflow-hidden origin-top-right"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setShowSort(false);
                    sortBtnRef.current?.focus();
                  }
                  if (e.key === 'Tab') {
                    const focusable = e.currentTarget.querySelectorAll('button');
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                      e.preventDefault();
                      setShowSort(false);
                      sortBtnRef.current?.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                      e.preventDefault();
                      setShowSort(false);
                      sortBtnRef.current?.focus();
                    }
                  }
                }}
              >
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-100">
                  <p className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest">Urutkan</p>
                </div>
                <div className="p-1.5 flex flex-col gap-1" role="listbox" aria-label="Opsi pengurutan">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      role="option"
                      aria-selected={sortOrder === opt.id}
                      onClick={() => { setSortOrder(opt.id); setShowSort(false); sortBtnRef.current?.focus(); }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors ${sortOrder === opt.id ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={opt.iconPath} /></svg>
                      {opt.label}
                    </button>
                  ))}
                  {sortOrder !== 'default' && (
                    <button role="option" aria-selected={false} onClick={() => { setSortOrder('default'); setShowSort(false); sortBtnRef.current?.focus(); }} className="w-full text-left px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 flex items-center gap-2 mt-1">
                      Hapus Filter
                    </button>
                  )}
                </div>
              </motion.div>
            )}
            </AnimatePresence>
            <Button variant={showSearch ? 'secondary' : 'ghost'} size="icon" className="rounded-full w-10 h-10 md:w-12 md:h-12 transition-transform active:scale-95" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(''); }} aria-label="Cari produk">
              <svg className="fill-current w-5 h-5 md:w-6 md:h-6 text-gray-600" viewBox="0 0 24 24">
                {showSearch ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /> : <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />}
              </svg>
            </Button>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8"
            initial={hasAnimated ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                }}
              >
                <Link href={p.link} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-[box-shadow,border-color] duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 md:hover:-translate-y-1 md:transition-[box-shadow,border-color,transform] md:duration-300">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover md:group-hover:scale-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:group-hover:will-change-transform" />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 md:p-5 flex flex-col grow">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{p.name}</h3>
                    <p className="text-base md:text-xl font-extrabold text-gray-900 mt-auto">
                      {p.price > 0 ? `Rp${p.price.toLocaleString('id-ID')}` : 'Belum Diatur'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl py-16 px-4 text-center">
            <div className="text-5xl mb-4 animate-[float_3s_ease-in-out_infinite]">🍩</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-500 mb-6 max-w-md">Maaf, kami tidak dapat menemukan produk yang cocok dengan pencarian <strong>&quot;{searchQuery}&quot;</strong>.</p>
            <Button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="rounded-xl px-6">Hapus Pencarian</Button>
          </div>
        )}
      </div>
    </section>
  );
}
