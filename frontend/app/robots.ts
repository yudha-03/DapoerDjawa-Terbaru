import { MetadataRoute } from 'next';
import { STORE_DOMAIN } from '@/lib/store-defaults';

const AI_RETRIEVAL_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  'DuckAssistBot',
];

const SEARCH_BOTS = ['Googlebot', 'Bingbot', 'Applebot', 'Googlebot-Image'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/profile/',
          '/checkout/',
          '/cart/',
          '/orders/',
          '/order-success',
          '/login',
          '/register',
          '/forgot-password',
          '/update-password',
          '/invite',
          '/auth/',
        ],
      },
      {
        userAgent: SEARCH_BOTS,
        allow: '/',
        disallow: [
          '/dashboard/',
          '/profile/',
          '/checkout/',
          '/cart/',
          '/orders/',
          '/order-success',
          '/login',
          '/register',
          '/forgot-password',
          '/update-password',
          '/invite',
          '/auth/',
        ],
      },
      {
        userAgent: AI_RETRIEVAL_BOTS,
        allow: '/',
        disallow: [
          '/dashboard/',
          '/profile/',
          '/checkout/',
          '/cart/',
          '/orders/',
          '/order-success',
          '/login',
          '/register',
          '/forgot-password',
          '/update-password',
          '/invite',
          '/auth/',
        ],
      },
    ],
    sitemap: `${STORE_DOMAIN}/sitemap.xml`,
    host: STORE_DOMAIN,
  };
}
