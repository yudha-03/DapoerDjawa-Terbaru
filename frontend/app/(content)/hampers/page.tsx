import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Hampers Kue Kering Balikpapan';
const pageDescription =
  `Panduan lengkap meracik hampers kue kering ${STORE_NAME}. Kombinasikan 12 varian kue kering premium dari Balikpapan untuk hadiah di setiap momen spesial - Lebaran, Natal, Imlek, dan acara keluarga.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/hampers' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/hampers`,
    siteName: STORE_NAME,
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
  },
};

export default function HampersPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Bagaimana Cara Meracik Hampers Kue Kering dari {STORE_NAME}?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Panduan kombinasi produk, kisaran harga, dan pengemasan hadiah kue kering premium Balikpapan
      </p>

      <div className="space-y-10 text-gray-700">
        {/* Intro / AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            {STORE_NAME} saat ini tidak menjual hampers jadi dalam bentuk paket baku. Sebagai
            gantinya, Anda bebas mengombinasikan sendiri dari 12 varian kue kering yang tersedia
            untuk menciptakan hampers sesuai selera dan anggaran. Setiap produk tersedia dalam
            kemasan 300 gram dan 500 gram, sehingga Anda dapat menyesuaikan isi hampers mulai dari
            dua hingga enam toples sekaligus. Pendekatan ini memberi fleksibilitas penuh tanpa
            terikat pada paket tertentu.
          </p>
        </section>

        {/* Kombinasi populer */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kombinasi Kue Kering Apa yang Paling Cocok untuk Hampers?
          </h2>
          <p className="mb-4 leading-relaxed">
            Hampers terbaik memadukan rasa manis, gurih, dan tekstur yang bervariasi. Kombinasi
            yang paling banyak diminati pelanggan kami terdiri dari tiga profil rasa berbeda agar
            penerima hampers mendapatkan pengalaman mencicipi yang lengkap. Apabila Anda ingin
            memberikan kesan mewah, tambahkan satu produk bertekstur unik seperti{' '}
            <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Lidah Kucing
            </Link>
            {' '}atau{' '}
            <Link href="/product/semprit-bunga" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Semprit Bunga
            </Link>
            .
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Trio Klasik</strong> -{' '}
              <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Nastar Classic
              </Link>
              ,{' '}
              <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kastengel Keju
              </Link>
              , dan{' '}
              <Link href="/product/putri-salju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Putri Salju
              </Link>
              . Paduan manis-gurih-lembut yang selalu tepat di segala momen.
            </li>
            <li>
              <strong>Paket Cokelat</strong> -{' '}
              <Link href="/product/cookies-cokelat" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat
              </Link>
              ,{' '}
              <Link href="/product/cookies-cokelat-vanila" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat &amp; Vanila
              </Link>
              , dan{' '}
              <Link href="/product/sagu-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Sagu Keju
              </Link>
              . Ideal untuk penyuka rasa cokelat yang ingin sedikit variasi gurih.
            </li>
            <li>
              <strong>Paket Tradisional</strong> -{' '}
              <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kue Kacang
              </Link>
              ,{' '}
              <Link href="/product/semprit-panjang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Semprit Panjang
              </Link>
              , dan{' '}
              <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Lidah Kucing
              </Link>
              . Nuansa nostalgia kue kering khas Indonesia.
            </li>
          </ul>
        </section>

        {/* Kisaran harga */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Kisaran Harga Hampers Kue Kering {STORE_NAME}?
          </h2>
          <p className="mb-4 leading-relaxed">
            Harga hampers bergantung pada jumlah toples dan ukuran kemasan yang Anda pilih. Kemasan
            300 gram dibanderol mulai Rp45.000 hingga Rp75.000 per toples, sedangkan kemasan 500
            gram berkisar antara Rp70.000 hingga Rp120.000. Berikut gambaran anggaran untuk
            beberapa level hampers yang umum dipesan pelanggan kami.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Hampers Hemat (2 toples 300gr)</strong> - mulai dari Rp90.000 hingga
              Rp150.000. Cocok untuk hadiah ringan kepada teman atau rekan kerja.
            </li>
            <li>
              <strong>Hampers Standar (3 toples 300gr)</strong> - mulai dari Rp135.000 hingga
              Rp225.000. Pilihan paling populer untuk acara keluarga dan hari raya.
            </li>
            <li>
              <strong>Hampers Premium (3-4 toples 500gr)</strong> - mulai dari Rp210.000 hingga
              Rp480.000. Memberikan kesan eksklusif dan jumlah yang berlimpah.
            </li>
          </ul>
        </section>

        {/* Pengemasan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Cara Mengemas Hampers agar Terlihat Menarik?
          </h2>
          <p className="leading-relaxed">
            Setiap toples kue kering {STORE_NAME} sudah dikemas dalam wadah kedap udara yang rapi.
            Apabila Anda ingin menjadikannya hampers, cukup susun toples di dalam kotak karton atau
            keranjang anyaman, lalu tambahkan pita dan kartu ucapan. Kami menyarankan penggunaan
            kertas tisu atau serutan kayu sebagai bantalan di antara toples agar tidak bergeser
            selama pengiriman. Untuk momen Lebaran, gunakan pita hijau atau emas. Untuk Natal,
            pita merah dan hijau. Untuk Imlek, pita merah dan emas. Kreativitas Anda menentukan
            tampilan akhir hampers tersebut.
          </p>
        </section>

        {/* Hampers musiman */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apakah Ada Panduan Hampers untuk Hari Raya Tertentu?
          </h2>
          <p className="mb-4 leading-relaxed">
            Kami telah menyiapkan panduan khusus untuk tiga momen hari raya besar. Setiap panduan
            membahas produk yang paling sesuai dengan nuansa perayaan, waktu pemesanan ideal, dan
            tips pengemasan bertema. Apabila Anda sedang mempersiapkan hadiah untuk salah satu
            perayaan berikut, silakan kunjungi halaman yang relevan.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/hampers-lebaran" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Hampers Lebaran
              </Link>
              {' '}- panduan trio klasik nastar, kastengel, dan putri salju untuk Idul Fitri
            </li>
            <li>
              <Link href="/hampers-natal" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Hampers Natal
              </Link>
              {' '}- rekomendasi kue kering bernuansa Natal dengan kemasan merah-hijau
            </li>
            <li>
              <Link href="/hampers-imlek" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Hampers Imlek
              </Link>
              {' '}- kue kering bertema keberuntungan untuk perayaan Tahun Baru Imlek
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Cara Memesan Hampers dari {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            Pilih produk yang Anda inginkan langsung melalui website kami, tentukan ukuran kemasan,
            dan selesaikan pembayaran. Apabila Anda membutuhkan saran kombinasi atau memiliki
            permintaan khusus terkait jumlah besar, silakan{' '}
            <Link href="/contact" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hubungi Kami
            </Link>
            . Semua pesanan dikirim dari Perum BDS 2, Balikpapan, Kalimantan Timur.
          </p>
        </section>
      </div>
    </article>
  );
}
