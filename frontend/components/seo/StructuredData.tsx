import { STORE_DOMAIN, STORE_NAME, STORE_DESCRIPTION } from '@/lib/store-defaults';
import { escapeJsonLd } from '@/lib/sanitize';

export type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

export function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }}
    />
  );
}

export const ORG_ID = `${STORE_DOMAIN}/#organization`;
export const BUSINESS_ID = `${STORE_DOMAIN}/#localbusiness`;
export const SITE_ID = `${STORE_DOMAIN}/#website`;

export function buildRootGraph() {
  const organization = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: STORE_NAME,
    url: STORE_DOMAIN,
    logo: { '@type': 'ImageObject', url: `${STORE_DOMAIN}/logo.png` },
    mainEntityOfPage: `${STORE_DOMAIN}/tentang`,
    sameAs: [
      'https://instagram.com/_dapoer_djawa',
      'https://tiktok.com/@dapoer_djawa',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+6289538327063',
      contactType: 'customer service',
      availableLanguage: ['id'],
    },
  };

  const localBusiness: Record<string, JsonValue> = {
    '@type': 'Bakery',
    '@id': BUSINESS_ID,
    name: STORE_NAME,
    url: STORE_DOMAIN,
    image: `${STORE_DOMAIN}/logo.png`,
    description: STORE_DESCRIPTION,
    priceRange: 'Rp45.000 - Rp120.000',
    telephone: '+6289538327063',
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Perum BDS 2',
      addressLocality: 'Balikpapan',
      addressRegion: 'Kalimantan Timur',
      addressCountry: 'ID',
    },
    areaServed: [
      { '@type': 'City', name: 'Balikpapan' },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      localBusiness,
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: STORE_DOMAIN,
        name: STORE_NAME,
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}
