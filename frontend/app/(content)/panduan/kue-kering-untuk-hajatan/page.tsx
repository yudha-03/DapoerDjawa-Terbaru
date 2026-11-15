import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Panduan Memesan Kue Kering untuk Hajatan dan Acara';
const pageDescription =
  `Panduan lengkap memesan kue kering ${STORE_NAME} untuk hajatan, pernikahan, arisan, dan acara besar. Estimasi kebutuhan per tamu, tips pemesanan massal, dan lead time produksi dari Balikpapan.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/panduan/kue-kering-untuk-hajatan' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/panduan/kue-kering-untuk-hajatan`,
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

export default function KueKeringUntukHajatanPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Berapa Banyak Kue Kering yang Dibutuhkan untuk Hajatan?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Panduan estimasi kebutuhan dan tips pemesanan kue kering untuk acara dari {STORE_NAME}
      </p>

      <div className="space-y-10 text-gray-700">
        {/* AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            Estimasi kebutuhan kue kering untuk hajatan adalah 50 hingga 100 gram per tamu.
            Apabila acara dihadiri oleh 100 tamu, Anda membutuhkan sekitar 5 hingga 10 kilogram
            kue kering atau setara dengan 10 hingga 20 toples kemasan 500 gram. Jumlah ini dapat
            disesuaikan berdasarkan jenis acara, durasi, dan apakah kue kering disajikan sebagai
            suguhan utama atau pelengkap. {STORE_NAME} menerima pesanan dalam jumlah besar dengan
            waktu persiapan 7 hingga 14 hari kerja.
          </p>
        </section>

        {/* Estimasi per tamu */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Cara Menghitung Kebutuhan Kue Kering per Tamu?
          </h2>
          <p className="mb-4 leading-relaxed">
            Perhitungan kebutuhan kue kering bergantung pada peran kue kering dalam acara tersebut.
            Berikut panduan estimasi berdasarkan jenis penyajian.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">Jenis Penyajian</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Estimasi per Tamu</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Contoh (100 tamu)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Suguhan di meja tamu</td>
                  <td className="px-4 py-3">50 - 70 gram</td>
                  <td className="px-4 py-3">5 - 7 kg (10 - 14 toples 500gr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Goodie bag / souvenir</td>
                  <td className="px-4 py-3">100 - 150 gram</td>
                  <td className="px-4 py-3">10 - 15 kg (20 - 30 toples 500gr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Pelengkap prasmanan</td>
                  <td className="px-4 py-3">30 - 50 gram</td>
                  <td className="px-4 py-3">3 - 5 kg (6 - 10 toples 500gr)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Angka di atas merupakan estimasi. Sesuaikan dengan kebiasaan dan budaya lokal di
            Balikpapan.
          </p>
        </section>

        {/* Produk untuk acara formal */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Produk Apa yang Cocok untuk Acara Formal?
          </h2>
          <p className="mb-4 leading-relaxed">
            Acara formal seperti pernikahan, syukuran, atau acara kantor memerlukan kue kering
            dengan tampilan elegan dan rasa yang diterima secara universal. Berikut produk
            {STORE_NAME} yang paling cocok untuk acara formal.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Nastar Classic
              </Link>
              {' '}- kue kering paling universal, disukai oleh hampir semua kalangan dan usia
            </li>
            <li>
              <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kastengel Keju
              </Link>
              {' '}- tampilan rapi dengan rasa keju yang mewah, cocok untuk acara berkelas
            </li>
            <li>
              <Link href="/product/putri-salju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Putri Salju
              </Link>
              {' '}- taburan gula halus memberikan kesan elegan dan meriah
            </li>
            <li>
              <Link href="/product/sagu-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Sagu Keju
              </Link>
              {' '}- tekstur lumer yang unik menjadi daya tarik tersendiri
            </li>
          </ul>
        </section>

        {/* Produk untuk acara informal */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Produk Apa yang Cocok untuk Acara Informal?
          </h2>
          <p className="mb-4 leading-relaxed">
            Acara informal seperti arisan, pengajian, kumpul keluarga, atau ulang tahun memberikan
            kebebasan lebih dalam memilih varian kue kering. Anda dapat memilih produk dengan
            karakter rasa yang lebih kuat dan beragam.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/product/cookies-cokelat" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat
              </Link>
              {' '}- rasa cokelat yang intens, favorit anak muda dan dewasa
            </li>
            <li>
              <Link href="/product/cookies-cokelat-vanila" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat &amp; Vanila
              </Link>
              {' '}- perpaduan dua rasa yang menarik dan berbeda
            </li>
            <li>
              <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Lidah Kucing
              </Link>
              {' '}- ringan dan mudah dimakan, cocok untuk camilan santai
            </li>
            <li>
              <Link href="/product/semprit-bunga" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Semprit Bunga
              </Link>
              {' '}dan{' '}
              <Link href="/product/semprit-panjang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Semprit Panjang
              </Link>
              {' '}- bentuk unik yang menarik perhatian
            </li>
            <li>
              <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kue Kacang
              </Link>
              {' '}- aroma kacang tanah yang harum, disukai oleh segala usia
            </li>
          </ul>
        </section>

        {/* Tips pemesanan massal */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa Tips Memesan Kue Kering dalam Jumlah Besar?
          </h2>
          <p className="mb-4 leading-relaxed">
            Pemesanan dalam jumlah besar memerlukan perencanaan yang lebih matang dibandingkan
            pemesanan biasa. Berikut beberapa tips yang perlu diperhatikan.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Pesan lebih awal</strong> - untuk pesanan lebih dari 20 toples, lakukan
              pemesanan minimal 2 minggu sebelum acara. Pesanan lebih dari 50 toples membutuhkan
              waktu persiapan 3 hingga 4 minggu.
            </li>
            <li>
              <strong>Pilih 3 hingga 5 varian</strong> - terlalu banyak varian menyulitkan
              produksi dalam waktu singkat. Variasi yang cukup tetap memberikan pilihan kepada tamu.
            </li>
            <li>
              <strong>Pertimbangkan kemasan 500 gram</strong> - secara per gram, kemasan 500 gram
              menawarkan nilai yang lebih ekonomis dibandingkan kemasan 300 gram.
            </li>
            <li>
              <strong>Komunikasikan tanggal acara</strong> - informasikan tanggal pasti acara agar
              kami dapat mengatur jadwal produksi dan memastikan kue kering tiba dalam kondisi
              paling segar.
            </li>
            <li>
              <strong>Siapkan anggaran cadangan</strong> - tambahkan 10 hingga 15 persen dari
              estimasi awal untuk mengantisipasi penambahan tamu mendadak.
            </li>
          </ul>
        </section>

        {/* Lead time */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Lama Waktu Produksi untuk Pesanan Besar?
          </h2>
          <p className="mb-4 leading-relaxed">
            Waktu produksi bergantung pada total jumlah toples yang dipesan. Seluruh kue kering
            {STORE_NAME} diproduksi secara rumahan di Balikpapan, sehingga kapasitas produksi
            harian terbatas untuk menjaga kualitas setiap produk.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">Jumlah Toples</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Waktu Produksi</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Rekomendasi Pesan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">1 - 10 toples</td>
                  <td className="px-4 py-3">3 - 5 hari kerja</td>
                  <td className="px-4 py-3 text-gray-500">Minimal 1 minggu sebelum acara</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">11 - 30 toples</td>
                  <td className="px-4 py-3">7 - 10 hari kerja</td>
                  <td className="px-4 py-3 text-gray-500">Minimal 2 minggu sebelum acara</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">31 - 50 toples</td>
                  <td className="px-4 py-3">10 - 14 hari kerja</td>
                  <td className="px-4 py-3 text-gray-500">Minimal 3 minggu sebelum acara</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Lebih dari 50 toples</td>
                  <td className="px-4 py-3">14 - 21 hari kerja</td>
                  <td className="px-4 py-3 text-gray-500">Minimal 4 minggu sebelum acara</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Kue kering sebagai souvenir */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apakah Kue Kering Cocok Dijadikan Souvenir Hajatan?
          </h2>
          <p className="leading-relaxed">
            Kue kering merupakan pilihan souvenir yang sangat praktis dan diapresiasi. Kemasan 300
            gram cocok dijadikan souvenir individu karena ukurannya yang pas untuk dibawa pulang.
            Apabila anggaran memungkinkan, Anda dapat mengombinasikan dua toples kemasan 300 gram
            dengan varian berbeda sebagai satu set souvenir. Kue kering {STORE_NAME} bertahan 2
            hingga 3 bulan dalam wadah kedap udara, sehingga penerima dapat menikmatinya dalam
            waktu yang cukup lama setelah acara. Dibandingkan souvenir berupa barang, kue kering
            memiliki keunggulan karena pasti dikonsumsi dan tidak menjadi barang yang menumpuk.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Rencanakan Pesanan untuk Acara Anda
          </h2>
          <p className="leading-relaxed">
            Lihat seluruh produk kami di halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering {STORE_NAME}
            </Link>
            . Apabila Anda ingin memesan dalam jumlah besar atau memiliki pertanyaan khusus,
            silakan{' '}
            <Link href="/contact" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hubungi Kami
            </Link>
            {' '}untuk konsultasi lebih lanjut. Untuk informasi pengiriman, baca halaman{' '}
            <Link href="/delivery-balikpapan" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Pengiriman Balikpapan
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
