import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Hampers Imlek Kue Kering Balikpapan';
const pageDescription =
  `Panduan hampers Imlek dari ${STORE_NAME}. Nastar Classic melambangkan keberuntungan, dilengkapi Kue Kacang dan Sagu Keju. Kemasan merah-emas khas Tahun Baru Imlek dari Balikpapan.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/hampers-imlek' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/hampers-imlek`,
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

export default function HampersImlekPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Bagaimana Cara Menyusun Hampers Imlek dari {STORE_NAME}?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Panduan kue kering bertema keberuntungan untuk Tahun Baru Imlek - produk favorit, makna
        simbolis, dan pengemasan merah-emas
      </p>

      <div className="space-y-10 text-gray-700">
        {/* Intro / AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            Hampers Imlek dari {STORE_NAME} berpusat pada{' '}
            <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Nastar Classic
            </Link>
            {' '}yang mengandung nanas - buah yang dalam bahasa Hokkien disebut &quot;ong lai&quot;
            dan melambangkan datangnya rejeki. Lengkapi dengan{' '}
            <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kacang
            </Link>
            {' '}dan{' '}
            <Link href="/product/sagu-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Sagu Keju
            </Link>
            {' '}untuk variasi rasa. Kemas dalam kotak atau keranjang berwarna merah dan emas.
            Pesan minimal 2 minggu sebelum hari H agar pengiriman tepat waktu.
          </p>
        </section>

        {/* Makna simbolis */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa Nastar Menjadi Kue Kering Utama dalam Hampers Imlek?
          </h2>
          <p className="leading-relaxed">
            Dalam tradisi perayaan Imlek, nanas memiliki makna simbolis yang sangat kuat. Kata
            &quot;nanas&quot; dalam bahasa Hokkien berbunyi mirip dengan &quot;ong lai&quot; yang
            berarti datangnya kemakmuran dan rejeki. Oleh karena itu, kue kering berbahan nanas
            seperti nastar selalu hadir di meja perayaan Tahun Baru Imlek. {STORE_NAME} membuat
            selai nanas dari buah segar yang dimasak hingga padat, menghasilkan isian yang legit
            dan tidak terlalu manis. Apabila Anda ingin memberikan hampers yang bermakna, nastar
            adalah produk wajib yang tidak boleh absen dari susunan hampers Imlek Anda.
          </p>
        </section>

        {/* Produk rekomendasi */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kue Kering Apa Saja yang Cocok untuk Melengkapi Hampers Imlek?
          </h2>
          <p className="mb-4 leading-relaxed">
            Selain nastar, beberapa produk {STORE_NAME} lainnya sangat sesuai dengan nuansa Imlek
            baik dari segi rasa maupun tampilan. Berikut rekomendasi lengkapnya:
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kue Kacang
              </Link>
              {' '}- kacang tanah melambangkan umur panjang dalam budaya Tionghoa, dan aromanya
              yang harum menambah kekayaan rasa di dalam hampers
            </li>
            <li>
              <Link href="/product/sagu-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Sagu Keju
              </Link>
              {' '}- tekstur lumer yang kontras dengan nastar, memberikan pengalaman mencicipi
              yang bervariasi
            </li>
            <li>
              <Link href="/product/nastar-keranjang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Nastar Keranjang
              </Link>
              {' '}- bentuk keranjang yang unik menambah nilai estetika, cocok apabila Anda ingin
              memberikan dua varian nastar sekaligus
            </li>
            <li>
              <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Lidah Kucing
              </Link>
              {' '}- warna keemasan alami dari mentega memberikan kesan mewah yang sejalan dengan
              tema emas pada perayaan Imlek
            </li>
            <li>
              <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kastengel Keju
              </Link>
              {' '}- pilihan gurih untuk menyeimbangkan rasa manis dari nastar dan kue kacang
            </li>
          </ul>
        </section>

        {/* Waktu pemesanan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kapan Waktu Ideal Memesan Hampers Imlek?
          </h2>
          <p className="leading-relaxed">
            Pesan hampers Imlek minimal 2 minggu sebelum tanggal perayaan Tahun Baru Imlek. Tanggal
            Imlek berubah setiap tahun karena mengikuti kalender lunar, sehingga Anda perlu
            mengecek tanggal pastinya di awal tahun. Apabila Anda berencana mengirim hampers ke
            luar kota Balikpapan, tambahkan waktu 3 hingga 7 hari kerja untuk pengiriman. Artinya,
            pemesanan sebaiknya dilakukan 3 minggu sebelum hari H apabila tujuan pengiriman berada
            di luar Kalimantan. Pesanan lebih awal juga memberi Anda kesempatan memilih dari
            seluruh varian yang tersedia sebelum stok tertentu habis.
          </p>
        </section>

        {/* Pengemasan merah-emas */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Cara Mengemas Hampers dengan Tema Imlek?
          </h2>
          <p className="leading-relaxed">
            Warna dominan dalam perayaan Imlek adalah merah dan emas, yang melambangkan keberuntungan
            dan kemakmuran. Pilih kotak hampers berwarna merah dengan aksen emas, atau gunakan
            keranjang anyaman yang dilapisi kain merah. Ikat dengan pita emas atau merah bermotif.
            Apabila Anda ingin sentuhan tradisional, tempelkan stiker atau gantungan bertuliskan
            aksara &quot;Fu&quot; (keberuntungan) atau &quot;Xi&quot; (kebahagiaan ganda) pada kotak
            hampers. Tambahkan amplop angpao kecil sebagai hiasan pelengkap. Susun toples dengan
            rapi di dalam kotak dan isi celah dengan kertas krep merah atau serutan kayu berwarna
            emas agar tampilannya meriah dan toples tidak bergeser selama pengiriman.
          </p>
        </section>

        {/* Kisaran harga */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Anggaran Hampers Imlek dari {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            Hampers Imlek berisi tiga toples kemasan 300 gram membutuhkan anggaran sekitar Rp135.000
            hingga Rp225.000. Apabila Anda memilih kemasan 500 gram yang lebih berisi, kisarannya
            menjadi Rp210.000 hingga Rp360.000 untuk tiga toples. Untuk hampers eksklusif berisi
            empat hingga lima toples 500 gram, siapkan anggaran Rp280.000 hingga Rp600.000. Harga
            belum termasuk ongkos kirim dari Balikpapan dan perlengkapan pengemasan bertema Imlek
            yang Anda siapkan sendiri.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Siap Menyiapkan Hampers Imlek?
          </h2>
          <p className="leading-relaxed">
            Lihat seluruh koleksi kue kering kami di halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering
            </Link>
            {' '}dan mulai pilih produk untuk hampers Anda. Untuk panduan hampers di momen lain,
            kunjungi{' '}
            <Link href="/hampers" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers
            </Link>
            ,{' '}
            <Link href="/hampers-lebaran" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers Lebaran
            </Link>
            , atau{' '}
            <Link href="/hampers-natal" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers Natal
            </Link>
            . Apabila ada pertanyaan atau pesanan dalam jumlah besar, silakan{' '}
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
