'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      return toast.add({ type: 'error', title: 'Perhatian', description: 'Alamat email wajib diisi.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return toast.add({ type: 'error', title: 'Email Tidak Valid', description: 'Silakan masukkan alamat email yang valid.' });
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    toast.add({
      type: 'success',
      title: 'Email Terkirim (Demo)!',
      description: `Instruksi untuk mengatur ulang password telah dikirim ke ${cleanEmail}.`,
    });
    setEmail('');
    setIsLoading(false);
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8 animate-[fade-in-up_0.4s_ease-out_both]">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">Lupa Password?</h1>
        <p className="text-sm text-gray-500">Masukkan email kamu untuk menerima instruksi reset password.</p>
      </div>

      <form className="space-y-5" onSubmit={handleResetPassword}>
        <div className="space-y-2">
          <Label htmlFor="email">Alamat Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="mt-2 w-full bg-black text-white hover:bg-gray-800">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Kirim Link Reset (Demo)'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="inline-flex items-center text-sm font-semibold text-gray-600 transition-colors hover:text-black">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Halaman Masuk
        </Link>
      </div>
    </div>
  );
}
