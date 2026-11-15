import type { Metadata } from 'next';

import { STORE_NAME } from '@/lib/store-defaults';
import TermsConditions from './components/TermsConditions';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: `Syarat dan ketentuan penggunaan layanan di ${STORE_NAME}.`,
  alternates: { canonical: '/terms-conditions' },
};

export default function TermsConditionsPage() {
  return <TermsConditions />;
}
