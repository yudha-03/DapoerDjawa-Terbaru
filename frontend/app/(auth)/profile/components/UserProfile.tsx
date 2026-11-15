'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Eye, EyeOff, Key, Loader2, LogOut, Mail, Pencil, Phone, Shield, User, X } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export default function UserProfile() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();

  const [editField, setEditField] = useState<'name' | 'phone' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <p className="mb-4 text-sm text-gray-500">Sesi login belum aktif.</p>
        <Button onClick={() => router.replace('/login')} className="bg-black text-white hover:bg-gray-800">
          Masuk ke Akun
        </Button>
      </div>
    );
  }

  const handleStartEdit = (field: 'name' | 'phone') => {
    setEditField(field);
    setEditValue(field === 'name' ? user.nama_user : user.phone || '');
  };

  const handleCancelEdit = () => {
    setEditField(null);
    setEditValue('');
  };

  const handleSaveEdit = async () => {
    if (!editField) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    if (editField === 'name') {
      updateProfile({ nama_user: editValue });
    } else {
      updateProfile({ phone: editValue });
    }
    setIsSaving(false);
    setEditField(null);
    toast.add({ type: 'success', title: 'Profil Diperbarui', description: 'Perubahan berhasil disimpan.' });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      return toast.add({ type: 'error', title: 'Kata Sandi Lemah', description: 'Minimal 8 karakter.' });
    }
    if (newPassword !== confirmPassword) {
      return toast.add({ type: 'error', title: 'Kata Sandi Tidak Cocok', description: 'Konfirmasi tidak sesuai.' });
    }
    setIsSavingPassword(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsSavingPassword(false);
    setShowPasswordForm(false);
    setNewPassword('');
    setConfirmPassword('');
    toast.add({ type: 'success', title: 'Kata Sandi Berhasil Diperbarui' });
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((r) => setTimeout(r, 300));
    logout();
    toast.add({ type: 'success', title: 'Logout Berhasil' });
    router.replace('/login');
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white font-extrabold text-2xl shadow-sm">
            {user.nama_user.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{user.nama_user}</h2>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                {user.role}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
          </div>
        </div>

        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="outline"
          className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <LogOut className="h-4 w-4 mr-2" />}
          Keluar
        </Button>
      </div>

      {/* Fields */}
      <div className="mt-6 space-y-4">
        {/* Name */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-3">
          <User className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Nama Lengkap</p>
            {editField === 'name' ? (
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold"
                />
                <button onClick={handleSaveEdit} disabled={isSaving} className="rounded bg-black p-1.5 text-white disabled:opacity-50">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={handleCancelEdit} className="rounded bg-gray-200 p-1.5">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-base font-bold text-gray-900">{user.nama_user}</p>
                <button onClick={() => handleStartEdit('name')} className="text-gray-400 hover:text-gray-600">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-3">
          <Mail className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Email</p>
            <p className="text-base font-semibold text-gray-900 mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-3">
          <Phone className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Nomor Telepon</p>
            {editField === 'phone' ? (
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="tel"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold"
                />
                <button onClick={handleSaveEdit} disabled={isSaving} className="rounded bg-black p-1.5 text-white disabled:opacity-50">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={handleCancelEdit} className="rounded bg-gray-200 p-1.5">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-base font-bold text-gray-900">{user.phone || '081234567890'}</p>
                <button onClick={() => handleStartEdit('phone')} className="text-gray-400 hover:text-gray-600">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Role */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-3">
          <Shield className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Tipe Akses Akun</p>
            <p className="text-base font-semibold text-gray-900 mt-0.5 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Password change form toggle */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        {!showPasswordForm ? (
          <Button variant="outline" onClick={() => setShowPasswordForm(true)} className="rounded-xl gap-2">
            <Key className="h-4 w-4" /> Ganti Kata Sandi (Demo)
          </Button>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold text-sm text-gray-900">Perbarui Kata Sandi</h4>
            <div className="relative">
              <input
                type={showNewPw ? 'text' : 'password'}
                placeholder="Kata Sandi Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm pr-10"
              />
              <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-2.5 text-gray-400">
                {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPw ? 'text' : 'password'}
                placeholder="Konfirmasi Kata Sandi Baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm pr-10"
              />
              <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-2.5 text-gray-400">
                {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSavingPassword} className="bg-black text-white hover:bg-gray-800">
                {isSavingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowPasswordForm(false)}>
                Batal
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
