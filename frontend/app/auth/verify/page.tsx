'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import OtpInput, { type OtpInputRef } from '@/components/ui/OtpInput';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function VerifyContent() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'otp' | 'done'>('otp');
  const [email] = useState('pengguna@gmail.com');
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const otpRef = useRef<OtpInputRef>(null);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t: number) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (status === 'otp') otpRef.current?.focusFirst();
  }, [status]);

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      return toast.add({ type: 'error', title: 'Kode Tidak Lengkap', description: `Masukkan ${OTP_LENGTH} digit kode OTP.` });
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.add({ type: 'success', title: 'Verifikasi Berhasil!', description: 'Selamat datang di DapoerDjawa!' });
      setStatus('done');
      setTimeout(() => router.push('/'), 1000);
    }, 600);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.add({ type: 'success', title: 'Kode Terkirim!', description: 'Kode OTP baru sudah dikirim ke email kamu.' });
      setResendTimer(RESEND_COOLDOWN);
      setOtp(Array(OTP_LENGTH).fill(''));
      otpRef.current?.focusFirst();
    }, 400);
  };

  if (status === 'loading') {
    return (
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl text-center">
        <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-gray-400" />
        <h2 className="text-lg font-bold text-gray-900">Memverifikasi Akun...</h2>
        <p className="mt-2 text-sm text-gray-500">Tunggu sebentar.</p>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Verifikasi Berhasil!</h2>
        <p className="mt-2 text-sm text-gray-600">Mengalihkan ke halaman utama...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8">
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="mb-1 text-xl font-bold text-gray-900">Verifikasi Email</h2>
        <p className="text-sm text-gray-500">
          Untuk keamanan akun, masukkan kode {OTP_LENGTH} digit yang dikirim ke
        </p>
        <p className="mt-1 text-sm font-bold text-gray-900">{email}</p>
      </div>

      <OtpInput
        ref={otpRef}
        length={OTP_LENGTH}
        value={otp}
        onChange={setOtp}
        disabled={isVerifying}
        className="gap-2 mb-6"
        inputClassName="h-12 w-11"
      />

      <Button onClick={handleVerify} disabled={isVerifying || otp.join('').length !== OTP_LENGTH} className="w-full bg-black text-white hover:bg-gray-800">
        {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verifikasi'}
      </Button>

      <div className="mt-4 text-center text-sm text-gray-500">
        Tidak menerima kode?{' '}
        {resendTimer > 0 ? (
          <span className="text-gray-400">Kirim ulang dalam {resendTimer}s</span>
        ) : (
          <button onClick={handleResend} disabled={isVerifying} className="font-semibold text-black hover:underline disabled:opacity-50">
            Kirim Ulang
          </button>
        )}
      </div>

      <p className="mt-4 text-center text-[11px] text-gray-400">
        Cek folder spam apabila email tidak ditemukan di inbox.
      </p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 pt-20">
      <Suspense fallback={
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Memuat...</h2>
        </div>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
