import type { Metadata } from 'next';

import { STORE_NAME } from '@/lib/store-defaults';

export const metadata: Metadata = {
  title: 'Verifikasi Akun',
  description: `Verifikasi dan konfirmasi akun ${STORE_NAME} Anda.`,
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
