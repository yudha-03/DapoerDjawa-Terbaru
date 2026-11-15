import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Hampers Lebaran Kue Kering Balikpapan';
const pageDescription =
  `Panduan hampers Lebaran dari ${STORE_NAME}. Kombinasi Nastar Classic, Kastengel Keju, dan Putri Salju sebagai trio klasik Idul Fitri. Pesan 2-3 minggu sebelum Lebaran dari Balikpapan.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/hampers-lebaran' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/hampers-lebaran`,
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

export default function HampersLebaranPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Bagaimana Cara Menyusun Hampers Lebaran dari {STORE_NAME}?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Panduan lengkap hampers kue kering untuk Idul Fitri - produk favorit, waktu pemesanan, dan
        tips pengemasan
      </p>

      <div className="space-y-10 text-gray-700">
        {/* Intro / AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            Hampers Lebaran terbaik dari {STORE_NAME} dibangun di atas trio klasik:{' '}
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
            . Ketiga produk ini memadukan rasa manis, gurih, dan lembut yang menjadi ciri khas
            suguhan Idul Fitri di meja tamu. Pesan minimal 2 hingga 3 minggu sebelum hari H agar
            produksi dan pengiriman berjalan lancar tanpa terburu-buru.
          </p>
        </section>

        {/* Mengapa trio klasik */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa Nastar, Kastengel, dan Putri Salju Disebut Trio Klasik Lebaran?
          </h2>
          <p className="leading-relaxed">
            Ketiga kue kering ini sudah menjadi tradisi Lebaran di hampir seluruh rumah tangga
            Indonesia selama puluhan tahun. Nastar menghadirkan rasa manis dari selai nanas yang
            legit. Kastengel memberikan kontras gurih dari keju cheddar berkualitas. Putri Salju
            melengkapi dengan tekstur lembut yang meleleh di mulut dan taburan gula halus. Apabila
            Anda hanya bisa memilih tiga jenis kue kering untuk hampers Lebaran, kombinasi ini
            adalah jawaban yang tidak pernah salah. Ketiganya saling melengkapi dan disukai oleh
            hampir semua kalangan usia.
          </p>
        </section>

        {/* Produk pelengkap */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kue Kering Apa yang Cocok Ditambahkan ke Hampers Lebaran?
          </h2>
          <p className="mb-4 leading-relaxed">
            Apabila Anda ingin hampers yang lebih berkesan, tambahkan satu atau dua produk di luar
            trio klasik. Beberapa pilihan yang sangat cocok dengan nuansa Lebaran antara lain:
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/product/sagu-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Sagu Keju
              </Link>
              {' '}- tekstur lumer yang unik, menambah variasi di antara kue kering renyah
            </li>
            <li>
              <Link href="/product/semprit-bunga" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Semprit Bunga
              </Link>
              {' '}- bentuknya cantik dan menambah tampilan visual hampers
            </li>
            <li>
              <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Lidah Kucing
              </Link>
              {' '}- ringan dan renyah, cocok dinikmati bersama teh atau kopi saat silaturahmi
            </li>
            <li>
              <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kue Kacang
              </Link>
              {' '}- aroma kacang sangrai yang harum memberikan sentuhan tradisional
            </li>
          </ul>
        </section>

        {/* Waktu pemesanan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kapan Waktu Terbaik Memesan Hampers Lebaran?
          </h2>
          <p className="leading-relaxed">
            Kami sangat menyarankan pemesanan dilakukan 2 hingga 3 minggu sebelum Idul Fitri.
            Periode menjelang Lebaran merupakan masa produksi puncak bagi {STORE_NAME}. Permintaan
            yang tinggi berarti kapasitas produksi terbatas, dan pesanan yang masuk terlambat
            berisiko tidak dapat dipenuhi tepat waktu. Apabila Anda memesan lebih awal, kami dapat
            menjadwalkan produksi dengan tenang dan memastikan setiap toples dikemas dalam kondisi
            terbaik. Pesanan yang masuk kurang dari satu minggu sebelum Lebaran akan diusahakan,
            namun kami tidak dapat menjamin ketersediaan seluruh varian.
          </p>
        </section>

        {/* Pengiriman */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Pengiriman Hampers Lebaran dari Balikpapan?
          </h2>
          <p className="leading-relaxed">
            Seluruh pesanan dikirim dari lokasi produksi kami di Perum BDS 2, Balikpapan, Kalimantan
            Timur. Untuk pengiriman dalam kota Balikpapan, estimasi waktu adalah 1 hingga 2 hari
            kerja. Pengiriman ke luar kota di wilayah Kalimantan umumnya membutuhkan 2 hingga 4
            hari kerja. Apabila Anda mengirim ke Pulau Jawa atau wilayah lainnya, perhitungkan waktu
            3 hingga 7 hari kerja tergantung jasa ekspedisi yang dipilih. Kami mengemas setiap
            hampers dengan perlindungan ekstra berupa bubble wrap dan kardus tebal agar toples
            sampai dalam keadaan utuh.
          </p>
        </section>

        {/* Kisaran harga */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Anggaran yang Dibutuhkan untuk Hampers Lebaran?
          </h2>
          <p className="leading-relaxed">
            Untuk hampers trio klasik menggunakan kemasan 300 gram, anggaran Anda berkisar antara
            Rp135.000 hingga Rp225.000 untuk tiga toples. Apabila Anda memilih kemasan 500 gram
            agar lebih berisi, kisarannya menjadi Rp210.000 hingga Rp360.000. Menambahkan satu
            hingga dua toples pelengkap akan menaikkan total sekitar Rp45.000 hingga Rp120.000
            tergantung produk dan ukuran yang dipilih. Harga ini belum termasuk ongkos kirim dan
            bahan pengemasan hampers yang Anda siapkan sendiri.
          </p>
        </section>

        {/* Pengemasan bertema */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Tips Mengemas Hampers Bertema Lebaran?
          </h2>
          <p className="leading-relaxed">
            Nuansa Lebaran identik dengan warna hijau, emas, dan putih. Gunakan kotak hampers
            berwarna netral seperti krem atau cokelat muda, lalu ikat dengan pita hijau atau emas.
            Tambahkan kartu ucapan bertuliskan salam Idul Fitri untuk sentuhan personal. Apabila
            Anda mengirim hampers ke beberapa penerima sekaligus, siapkan label nama di setiap kotak
            agar tidak tertukar. Letakkan toples dalam posisi berdiri dan isi celah dengan kertas
            tisu agar tampilan tetap rapi saat kotak dibuka oleh penerima.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Siap Memesan Hampers Lebaran?
          </h2>
          <p className="leading-relaxed">
            Kunjungi halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering
            </Link>
            {' '}untuk melihat seluruh produk yang tersedia, atau langsung pilih favorit Anda dan
            tambahkan ke keranjang. Apabila Anda ingin melihat panduan hampers untuk momen lain,
            kunjungi halaman{' '}
            <Link href="/hampers" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers
            </Link>
            ,{' '}
            <Link href="/hampers-natal" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers Natal
            </Link>
            , atau{' '}
            <Link href="/hampers-imlek" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers Imlek
            </Link>
            . Untuk pertanyaan, silakan{' '}
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
