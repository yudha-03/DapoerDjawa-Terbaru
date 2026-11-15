'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { STORE_DOMAIN } from '@/lib/store-defaults';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const allItems = [{ label: 'Beranda', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${STORE_DOMAIN}${item.href}` } : {}),
    })),
  };
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <nav aria-label="Breadcrumb" className="mb-4 md:mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500">
        <li>
          <Link href="/" className="flex items-center gap-1 font-medium transition hover:text-black">
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Beranda</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5" {...(isLast ? { 'aria-current': 'page' as const } : {})}>
              <ChevronRight className="h-3 w-3 text-gray-300" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link href={item.href} className="font-medium transition hover:text-black">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-gray-900 truncate max-w-[200px]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
