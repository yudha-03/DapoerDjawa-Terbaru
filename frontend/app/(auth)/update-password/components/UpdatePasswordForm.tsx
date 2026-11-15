'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.add({ type: 'error', title: 'Kolom Kosong', description: 'Harap isi kata sandi baru dan konfirmasinya.' });
    }
    if (password.length < 8) {
      return toast.add({ type: 'error', title: 'Kata Sandi Lemah', description: 'Kata sandi harus terdiri dari minimal 8 karakter.' });
    }
    if (password !== confirmPassword) {
      return toast.add({ type: 'error', title: 'Kata Sandi Tidak Cocok', description: 'Kata sandi baru dan konfirmasi kata sandi tidak sama.' });
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    toast.add({ type: 'success', title: 'Kata Sandi Diperbarui (Demo)!', description: 'Kata sandi baru Anda berhasil disimpan.' });
    router.replace('/login');
    setIsLoading(false);
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8 animate-[fade-in-up_0.4s_ease-out_both]">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">Atur Ulang Kata Sandi</h1>
        <p className="text-sm text-gray-500">Masukkan kata sandi baru untuk akun Anda.</p>
      </div>

      <form className="space-y-5" onSubmit={handleUpdatePassword}>
        <div className="space-y-2">
          <Label htmlFor="password">Kata Sandi Baru</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Ulangi kata sandi baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="mt-2 w-full bg-black text-white hover:bg-gray-800">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Simpan Kata Sandi Baru'}
        </Button>
      </form>
    </div>
  );
}
