'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Role, Tab } from '@/types/dashboard';

interface SidebarProps {
  role: Role;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { id: Tab; label: string; roles: Role[] }[] = [
  { id: 'overview', label: 'Ringkasan', roles: ['owner'] },
  { id: 'orders', label: 'Pesanan', roles: ['owner', 'admin'] },
  { id: 'products', label: 'Katalog Produk', roles: ['owner', 'admin'] },
  { id: 'settings', label: 'Pengaturan Toko', roles: ['owner'] },
  { id: 'audit', label: 'Log Aktivitas', roles: ['owner'] },
];

export default function Sidebar({ role, activeTab, setActiveTab, open, onClose }: SidebarProps) {
  // Lock body scroll when drawer open on mobile
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    onClose();
  };

  const navContent = (
    <>
      <div className="mb-3 sm:mb-4 px-3 py-2 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Role Sesi</p>
        <p className="text-sm font-bold text-gray-800 capitalize">{role}</p>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`whitespace-nowrap text-left px-3 sm:px-4 py-2.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block h-fit self-start w-64 flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm md:sticky md:top-28">
        {navContent}
      </aside>

      {/* Mobile drawer overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        {/* Drawer panel */}
        <aside
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-sm font-bold text-gray-800">Menu Dashboard</span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="p-3">
            {navContent}
          </div>
        </aside>
      </div>
    </>
  );
}
