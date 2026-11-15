import type { Metadata } from 'next';

import { STORE_NAME } from '@/lib/store-defaults';
import PrivacyPolicy from './components/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: `Kebijakan privasi dan perlindungan data pengguna di ${STORE_NAME}.`,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
