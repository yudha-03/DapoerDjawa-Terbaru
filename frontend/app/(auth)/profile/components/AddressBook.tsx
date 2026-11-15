'use client';

import { useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { DEFAULT_ADDRESSES, SHIPPING_AREAS } from '@/lib/data';

type Address = {
  id: string;
  label: string;
  recipient_name: string;
  phone: string;
  street: string;
  postal_code: string;
  destination_id: string;
  destination_label: string;
  is_default: boolean;
};

type FormData = Omit<Address, 'id' | 'is_default'>;

const emptyForm: FormData = {
  label: 'Rumah',
  recipient_name: '',
  phone: '',
  street: '',
  postal_code: '',
  destination_id: 'area-bpn-01',
  destination_label: 'Balikpapan Kota',
};

export default function AddressBook() {
  const confirm = useConfirm();
  const [addresses, setAddresses] = useState<Address[]>(
    DEFAULT_ADDRESSES.map((a) => ({
      id: a.id,
      label: a.label,
      recipient_name: a.receiver_name,
      phone: a.phone,
      street: a.full_address,
      postal_code: '76111',
      destination_id: a.area_id,
      destination_label: a.label,
      is_default: a.is_primary,
    }))
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [destKeyword, setDestKeyword] = useState('');
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setDestKeyword('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      label: addr.label,
      recipient_name: addr.recipient_name,
      phone: addr.phone,
      street: addr.street,
      postal_code: addr.postal_code,
      destination_id: addr.destination_id,
      destination_label: addr.destination_label,
    });
    setDestKeyword(addr.destination_label);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipient_name || !formData.phone || !formData.street) {
      return toast.add({ type: 'error', title: 'Data Belum Lengkap' });
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...formData } : a))
      );
      toast.add({ type: 'success', title: 'Alamat Berhasil Diperbarui' });
    } else {
      const newAddr: Address = {
        ...formData,
        id: `addr-${Date.now()}`,
        is_default: addresses.length === 0,
      };
      setAddresses((prev) => [newAddr, ...prev]);
      toast.add({ type: 'success', title: 'Alamat Baru Ditambahkan' });
    }

    setIsFormOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, is_default: a.id === id }))
    );
    toast.add({ type: 'success', title: 'Alamat Utama Diubah' });
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: 'Hapus Alamat?',
      description: 'Alamat ini akan dihapus dari daftar.',
      confirmLabel: 'Hapus',
      variant: 'danger',
    });
    if (!ok) return;

    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.add({ type: 'success', title: 'Alamat Dihapus' });
  };

  const filteredAreas = SHIPPING_AREAS.filter(
    (a) =>
      !destKeyword ||
      a.name.toLowerCase().includes(destKeyword.toLowerCase()) ||
      a.city_name.toLowerCase().includes(destKeyword.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Buku Alamat</h2>
          <p className="text-sm text-gray-500 mt-0.5">Kelola alamat pengiriman untuk checkout lebih cepat.</p>
        </div>
        {!isFormOpen && (
          <Button onClick={handleOpenAdd} className="bg-black text-white hover:bg-gray-800 rounded-xl gap-2">
            <Plus className="h-4 w-4" /> Tambah Alamat
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <form onSubmit={handleSave} className="mt-6 space-y-4 max-w-xl bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h3 className="font-bold text-base text-gray-900">
            {editingId ? 'Edit Alamat' : 'Tambah Alamat Baru'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Label Alamat</label>
              <input
                type="text"
                placeholder="Rumah / Kantor"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Nama Penerima</label>
              <input
                type="text"
                placeholder="Contoh: Nama Penerima"
                value={formData.recipient_name}
                onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Nomor HP</label>
              <input
                type="tel"
                placeholder="081234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Kode Pos</label>
              <input
                type="text"
                placeholder="76111"
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase">Kecamatan Tujuan</label>
            <div className="relative mt-1">
              <input
                type="text"
                placeholder="Cari kecamatan..."
                value={destKeyword}
                onChange={(e) => {
                  setDestKeyword(e.target.value);
                  setShowDestDropdown(true);
                }}
                onFocus={() => setShowDestDropdown(true)}
                className="w-full rounded-xl border border-gray-300 p-2.5 text-sm pl-9"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              {showDestDropdown && (
                <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredAreas.map((area) => (
                    <li
                      key={area.id}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          destination_id: area.id,
                          destination_label: `${area.name}, ${area.city_name}`,
                        });
                        setDestKeyword(`${area.name}, ${area.city_name}`);
                        setShowDestDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-50 text-sm cursor-pointer"
                    >
                      {area.name}, {area.city_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase">Alamat Lengkap</label>
            <textarea
              rows={3}
              placeholder="Jl. Jenderal Sudirman No. 45"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-xl">
              Simpan Alamat
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="rounded-xl">
              Batal
            </Button>
          </div>
        </form>
      ) : addresses.length === 0 ? (
        <div className="mt-6 py-8 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-2xl p-6">
          Belum ada alamat tersimpan. Klik &quot;Tambah Alamat&quot; untuk menambahkan alamat baru.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 rounded-2xl border transition-all ${
                addr.is_default ? 'border-amber-400 bg-amber-50/20' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900">{addr.label}</span>
                  {addr.is_default && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                      Utama
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {!addr.is_default && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-xs text-amber-700 font-semibold px-2 py-1 rounded hover:bg-amber-100 mr-2"
                    >
                      Jadikan Utama
                    </button>
                  )}
                  <button onClick={() => handleOpenEdit(addr)} className="p-1.5 text-gray-500 hover:text-black">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(addr.id)} className="p-1.5 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="font-semibold text-sm text-gray-800">{addr.recipient_name} ({addr.phone})</p>
              <p className="text-xs text-gray-600 mt-1">{addr.street}</p>
              <p className="text-xs text-gray-500">{addr.destination_label} {addr.postal_code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
