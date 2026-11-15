'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMsg] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
      setTimeout(() => router.push('/login'), 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchParams, router]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl text-center">
      {status === 'verifying' && (
        <>
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Memverifikasi Email...</h2>
          <p className="mt-2 text-sm text-gray-500">Tunggu sebentar, kami sedang mengaktifkan akun kamu.</p>
        </>
      )}
      {status === 'success' && (
        <>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Email Terverifikasi!</h2>
          <p className="mt-2 text-sm text-gray-600">Akun kamu sudah aktif. Mengalihkan ke halaman login...</p>
        </>
      )}
      {status === 'error' && (
        <>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Verifikasi Gagal</h2>
          <p className="mt-2 text-sm text-gray-600">{errorMsg}</p>
          <a href="/register" className="mt-4 inline-block text-sm font-semibold text-black hover:underline">
            Daftar Ulang
          </a>
        </>
      )}
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Memuat...</h2>
        </div>
      }>
        <ConfirmContent />
      </Suspense>
    </div>
  );
}
