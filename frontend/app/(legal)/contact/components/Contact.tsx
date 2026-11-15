import Image from 'next/image';
import Link from 'next/link';
import { Clock, MessageCircle } from 'lucide-react';

const contactChannels = [
  {
    name: 'WhatsApp',
    description: 'Chat langsung dengan tim DapoerDjawa untuk pertanyaan seputar pesanan, produk, atau kendala lainnya.',
    href: 'https://wa.me/62895383270632',
    icon: '/wa.png',
    cta: 'Chat via WhatsApp',
    hours: 'Senin - Sabtu, 08:00 - 20:00 WIB',
  },
  {
    name: 'Instagram',
    description: 'Ikuti kami di Instagram untuk update produk terbaru, promo, dan konten menarik lainnya.',
    href: 'https://instagram.com/_dapoer_djawa',
    icon: '/instagram.png',
    cta: 'Kunjungi Instagram',
    hours: 'Balas DM dalam 1x24 jam',
  },
  {
    name: 'TikTok',
    description: 'Tonton video produk, behind the scenes pembuatan kue, dan konten seru lainnya di TikTok kami.',
    href: 'https://tiktok.com/@dapoer_djawa',
    icon: '/tiktok.png',
    cta: 'Kunjungi TikTok',
    hours: 'Balas komentar dalam 1x24 jam',
  },
];

export default function Contact() {
  return (
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Hubungi Kami</h1>
          <p className="mb-8 border-b border-gray-100 pb-8 text-sm text-gray-500">
            Ada pertanyaan, saran, atau kendala? Kami senang mendengar dari Anda. Silakan hubungi kami melalui salah satu kanal berikut.
          </p>

          <div className="space-y-4">
            {contactChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all hover:border-gray-300 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm">
                  <Image src={channel.icon} alt={channel.name} width={28} height={28} className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-black">{channel.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{channel.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-xs font-bold text-white transition group-hover:bg-gray-800">
                      <MessageCircle className="h-3.5 w-3.5" /> {channel.cta}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="h-3 w-3" /> {channel.hours}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <h3 className="mb-2 text-sm font-bold text-gray-900">Pertanyaan Umum</h3>
            <p className="text-sm text-gray-600">
              Sebelum menghubungi kami, cek dulu halaman{' '}
              <Link href="/faq" className="font-semibold text-gray-900 hover:underline">
                FAQ (Pertanyaan Umum)
              </Link>{' '}
              untuk jawaban cepat atas pertanyaan yang sering diajukan.
            </p>
          </div>
        </div>
  );
}
