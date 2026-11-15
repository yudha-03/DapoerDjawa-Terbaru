import type { Metadata } from 'next';

import { STORE_NAME } from '@/lib/store-defaults';
import Contact from './components/Contact';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: `Ada pertanyaan atau kendala? Hubungi tim ${STORE_NAME} melalui WhatsApp, Instagram, atau TikTok. Kami siap membantu Anda.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <Contact />;
}
