import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Hampers Natal Kue Kering Balikpapan';
const pageDescription =
  `Panduan hampers Natal dari ${STORE_NAME}. Kastengel Keju, Cookies Cokelat, dan Putri Salju menjadi kombinasi favorit untuk hadiah Natal. Pesan awal Desember dari Balikpapan.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/hampers-natal' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/hampers-natal`,
    siteName: STORE_NAME,
    type: 'article',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
  },
};

export default function HampersNatalPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Bagaimana Cara Meracik Hampers Natal dari {STORE_NAME}?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Rekomendasi kue kering untuk hadiah Natal - produk populer, waktu pesan, dan pengemasan
        bertema merah-hijau
      </p>

      <div className="space-y-10 text-gray-700">
        {/* Intro / AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            Hampers Natal dari {STORE_NAME} paling cocok diisi dengan{' '}
            <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kastengel Keju
            </Link>
            ,{' '}
            <Link href="/product/cookies-cokelat" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Cookies Cokelat
            </Link>
            , dan{' '}
            <Link href="/product/putri-salju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Putri Salju
            </Link>
            . Kombinasi rasa gurih, cokelat, dan manis lembut ini sangat sesuai dengan tradisi
            tukar-menukar hadiah saat Natal. Pesan di awal Desember agar produksi selesai jauh
            sebelum tanggal 25 dan Anda punya waktu untuk mengemas hampers dengan rapi.
          </p>
        </section>

        {/* Tradisi kue kering Natal */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa Kue Kering Menjadi Hadiah Populer Saat Natal?
          </h2>
          <p className="leading-relaxed">
            Budaya memberi hampers saat Natal sudah mengakar kuat di Indonesia, terutama di kalangan
            keluarga yang merayakan hari raya ini. Kue kering menjadi pilihan favorit karena
            praktis, tahan lama, dan bisa dinikmati oleh seluruh anggota keluarga. Berbeda dengan
            makanan basah yang harus segera dikonsumsi, kue kering dari {STORE_NAME} bertahan 2
            hingga 3 bulan apabila disimpan dalam wadah kedap udara. Hal ini menjadikannya hadiah
            yang ideal - penerima dapat menikmatinya selama masa liburan Natal dan Tahun Baru
            tanpa terburu-buru.
          </p>
        </section>

        {/* Produk rekomendasi */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kue Kering Apa Saja yang Paling Diminati untuk Hampers Natal?
          </h2>
          <p className="mb-4 leading-relaxed">
            Berdasarkan pesanan pelanggan kami di musim Natal sebelumnya, berikut produk yang paling
            sering dipilih untuk hampers beserta alasannya:
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kastengel Keju
              </Link>
              {' '}- rasa gurih keju cheddar yang cocok sebagai camilan ringan di acara kumpul
              keluarga Natal
            </li>
            <li>
              <Link href="/product/cookies-cokelat" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat
              </Link>
              {' '}- nuansa cokelat yang kaya dan hangat, sangat identik dengan suasana perayaan
              akhir tahun
            </li>
            <li>
              <Link href="/product/putri-salju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Putri Salju
              </Link>
              {' '}- taburan gula halus menyerupai salju, memberikan kesan visual yang sempurna
              untuk Natal
            </li>
            <li>
              <Link href="/product/cookies-cokelat-vanila" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat &amp; Vanila
              </Link>
              {' '}- variasi yang lebih lembut dari cookies cokelat, disukai oleh mereka yang
              menyukai perpaduan rasa
            </li>
            <li>
              <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Nastar Classic
              </Link>
              {' '}- kue kering universal yang selalu diterima dengan baik di segala perayaan
            </li>
          </ul>
        </section>

        {/* Waktu pemesanan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kapan Sebaiknya Memesan Hampers Natal?
          </h2>
          <p className="leading-relaxed">
            Waktu ideal untuk memesan hampers Natal adalah awal Desember, yaitu sekitar minggu
            pertama atau kedua. Jangka waktu ini memberi ruang 2 hingga 3 minggu untuk produksi
            dan pengiriman sebelum tanggal 25 Desember. Apabila Anda berencana mengirim hampers
            ke luar Balikpapan, pertimbangkan waktu pengiriman tambahan 3 hingga 7 hari kerja
            tergantung tujuan. Pesanan yang masuk setelah tanggal 15 Desember tetap kami terima,
            namun ketersediaan varian tertentu mungkin terbatas karena lonjakan permintaan.
          </p>
        </section>

        {/* Kisaran harga */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Biaya Hampers Natal dari {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            Hampers Natal dengan tiga toples kemasan 300 gram membutuhkan anggaran sekitar Rp135.000
            hingga Rp225.000, tergantung varian yang dipilih. Apabila Anda menginginkan hampers
            yang lebih besar menggunakan kemasan 500 gram, siapkan anggaran Rp210.000 hingga
            Rp360.000 untuk tiga toples. Untuk hampers mewah berisi empat hingga lima toples 500
            gram, kisaran harga mencapai Rp280.000 hingga Rp600.000. Biaya ini belum termasuk
            ongkos kirim dan perlengkapan pengemasan hampers.
          </p>
        </section>

        {/* Pengemasan bertema */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Tips Mengemas Hampers Bertema Natal?
          </h2>
          <p className="leading-relaxed">
            Warna khas Natal adalah merah, hijau, dan emas. Pilih kotak hampers berwarna merah tua
            atau hijau gelap, lalu ikat dengan pita emas atau perak. Apabila menggunakan keranjang,
            lapisi bagian dalam dengan kain berwarna merah atau hijau kotak-kotak yang mengingatkan
            pada motif tartan. Tambahkan hiasan kecil seperti bintang, lonceng mini, atau ranting
            pinus artifisial di atas toples. Jangan lupa sertakan kartu ucapan Natal dengan pesan
            personal. Sentuhan-sentuhan kecil ini mengubah kumpulan toples kue kering menjadi
            hadiah yang berkesan dan penuh kehangatan.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Siap Menyiapkan Hampers Natal?
          </h2>
          <p className="leading-relaxed">
            Jelajahi seluruh koleksi kue kering kami di halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering
            </Link>
            {' '}dan mulai pilih favorit Anda. Untuk panduan hampers di momen lain, kunjungi{' '}
            <Link href="/hampers" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers
            </Link>
            ,{' '}
            <Link href="/hampers-lebaran" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers Lebaran
            </Link>
            , atau{' '}
            <Link href="/hampers-imlek" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers Imlek
            </Link>
            . Apabila ada pertanyaan, silakan{' '}
            <Link href="/contact" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hubungi Kami
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
