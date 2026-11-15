import type { Metadata } from 'next';

import { STORE_NAME } from '@/lib/store-defaults';
import ReturnPolicy from './components/ReturnPolicy';

export const metadata: Metadata = {
  title: 'Kebijakan Pengembalian',
  description: `Syarat dan prosedur pengembalian barang atau dana di ${STORE_NAME}.`,
  alternates: { canonical: '/return-policy' },
};

export default function ReturnPolicyPage() {
  return <ReturnPolicy />;
}
