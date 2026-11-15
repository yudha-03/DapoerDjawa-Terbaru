import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Pengiriman Kue Kering Balikpapan dan Seluruh Indonesia';
const pageDescription =
  `Informasi pengiriman ${STORE_NAME}: cakupan 6 kecamatan Balikpapan, ekspedisi via Biteship (JNE, J&T, SiCepat, AnterAja), estimasi 1-2 hari dalam kota, 3-7 hari luar Kalimantan. Packaging aman bubble wrap dan kardus.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/delivery-balikpapan' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/delivery-balikpapan`,
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

export default function DeliveryBalikpapanPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Bagaimana Pengiriman Kue Kering dari {STORE_NAME} Balikpapan?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Informasi lengkap cakupan pengiriman, ekspedisi, dan pengemasan produk
      </p>

      <div className="space-y-10 text-gray-700">
        {/* AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            {STORE_NAME} mengirim kue kering dari Perum BDS 2, Balikpapan, Kalimantan Timur ke
            seluruh Indonesia. Pengiriman dalam kota Balikpapan mencakup 6 kecamatan dan membutuhkan
            waktu 1 hingga 2 hari. Pengiriman ke luar Kalimantan membutuhkan waktu 3 hingga 7 hari
            tergantung tujuan dan jasa ekspedisi yang dipilih. Kami menggunakan platform Biteship
            yang mengintegrasikan berbagai jasa ekspedisi seperti JNE, J&T, SiCepat, dan AnterAja.
            Setiap paket dikemas menggunakan bubble wrap dan kardus tebal untuk melindungi kue
            kering selama perjalanan.
          </p>
        </section>

        {/* Cakupan area Balikpapan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kecamatan Mana Saja di Balikpapan yang Terjangkau Pengiriman?
          </h2>
          <p className="mb-4 leading-relaxed">
            Seluruh 6 kecamatan di Kota Balikpapan terjangkau oleh layanan pengiriman kami. Berikut
            daftar lengkap kecamatan beserta estimasi waktu pengiriman dari lokasi produksi kami
            di Perum BDS 2.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Balikpapan Kota</strong> - pusat kota, estimasi pengiriman same day hingga
              1 hari
            </li>
            <li>
              <strong>Balikpapan Selatan</strong> - area perumahan dan perkantoran, estimasi 1 hari
            </li>
            <li>
              <strong>Balikpapan Utara</strong> - area industri dan perumahan baru, estimasi 1
              hingga 2 hari
            </li>
            <li>
              <strong>Balikpapan Timur</strong> - area pengembangan kota, estimasi 1 hingga 2 hari
            </li>
            <li>
              <strong>Balikpapan Tengah</strong> - area komersial dan residensial, estimasi 1 hari
            </li>
            <li>
              <strong>Balikpapan Barat</strong> - area pelabuhan dan sekitarnya, estimasi 1
              hingga 2 hari
            </li>
          </ul>
        </section>

        {/* Jasa ekspedisi */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Jasa Ekspedisi Apa Saja yang Digunakan?
          </h2>
          <p className="mb-4 leading-relaxed">
            Kami menggunakan platform Biteship untuk mengakses berbagai jasa ekspedisi sekaligus.
            Biteship memungkinkan kami memilih ekspedisi terbaik berdasarkan tujuan pengiriman,
            kecepatan, dan biaya. Berikut jasa ekspedisi yang tersedia melalui platform kami.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>JNE</strong> - tersedia layanan REG (reguler), YES (yakin esok sampai), dan
              OKE (ongkos kirim ekonomis)
            </li>
            <li>
              <strong>J&T Express</strong> - pengiriman cepat dengan jangkauan luas ke seluruh
              Indonesia
            </li>
            <li>
              <strong>SiCepat</strong> - layanan REG, BEST, dan HALU untuk berbagai kebutuhan
              kecepatan
            </li>
            <li>
              <strong>AnterAja</strong> - pilihan ekonomis dengan tracking real-time
            </li>
            <li>
              <strong>Ekspedisi lainnya</strong> - tergantung ketersediaan di platform Biteship
              untuk rute tertentu
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Pilihan ekspedisi dan biaya pengiriman ditampilkan secara otomatis saat checkout
            berdasarkan alamat tujuan Anda.
          </p>
        </section>

        {/* Estimasi waktu pengiriman */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Lama Estimasi Waktu Pengiriman ke Luar Balikpapan?
          </h2>
          <p className="mb-4 leading-relaxed">
            Estimasi waktu pengiriman bervariasi berdasarkan tujuan dan jenis layanan ekspedisi
            yang dipilih. Berikut perkiraan umum berdasarkan zona pengiriman.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">Zona Tujuan</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Estimasi Waktu</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Dalam kota Balikpapan</td>
                  <td className="px-4 py-3">1 - 2 hari</td>
                  <td className="px-4 py-3 text-gray-500">Same day tersedia untuk area tertentu</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Kalimantan Timur (luar Balikpapan)</td>
                  <td className="px-4 py-3">2 - 3 hari</td>
                  <td className="px-4 py-3 text-gray-500">Samarinda, Bontang, Tenggarong, dll.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Kalimantan (provinsi lain)</td>
                  <td className="px-4 py-3">2 - 4 hari</td>
                  <td className="px-4 py-3 text-gray-500">Banjarmasin, Pontianak, Palangkaraya</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Pulau Jawa</td>
                  <td className="px-4 py-3">3 - 5 hari</td>
                  <td className="px-4 py-3 text-gray-500">Jakarta, Surabaya, Bandung, Semarang</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Pulau Sumatera, Sulawesi, Bali</td>
                  <td className="px-4 py-3">4 - 7 hari</td>
                  <td className="px-4 py-3 text-gray-500">Tergantung kota tujuan spesifik</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Indonesia Timur (Papua, Maluku, NTT)</td>
                  <td className="px-4 py-3">5 - 10 hari</td>
                  <td className="px-4 py-3 text-gray-500">Jalur pengiriman terbatas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pengemasan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Pengemasan Produk untuk Pengiriman?
          </h2>
          <p className="mb-4 leading-relaxed">
            Kami memahami bahwa kue kering merupakan produk yang mudah pecah apabila tidak dikemas
            dengan baik. Setiap pesanan dikemas melalui beberapa lapisan perlindungan untuk
            memastikan produk tiba dalam kondisi sempurna.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Lapisan pertama</strong> - toples plastik food grade dengan penutup kedap
              udara yang menjaga kerenyahan kue kering
            </li>
            <li>
              <strong>Lapisan kedua</strong> - bubble wrap yang membungkus setiap toples secara
              individual untuk meredam benturan selama transit
            </li>
            <li>
              <strong>Lapisan ketiga</strong> - kardus tebal bergelombang yang memberikan
              perlindungan struktural terhadap tekanan dari luar
            </li>
            <li>
              <strong>Pengisi ruang</strong> - kertas atau busa pengisi dimasukkan ke dalam kardus
              agar toples tidak bergeser selama pengiriman
            </li>
          </ul>
        </section>

        {/* Tips pemesanan untuk pengiriman */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa yang Perlu Diperhatikan Saat Memesan untuk Pengiriman Jarak Jauh?
          </h2>
          <p className="leading-relaxed">
            Apabila Anda memesan untuk pengiriman ke luar Kalimantan, beberapa hal perlu
            diperhatikan. Pilih produk dengan struktur padat seperti{' '}
            <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Nastar Classic
            </Link>
            ,{' '}
            <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kastengel Keju
            </Link>
            , atau{' '}
            <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kacang
            </Link>
            {' '}yang memiliki ketahanan fisik lebih baik selama transit. Produk bertekstur tipis
            seperti{' '}
            <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Lidah Kucing
            </Link>
            {' '}tetap aman dikirim berkat pengemasan berlapis kami. Pertimbangkan juga waktu
            pengiriman agar produk tidak terlalu lama dalam perjalanan, terutama pada musim hujan
            ketika kelembapan udara meningkat.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Siap Memesan Kue Kering dari Balikpapan?
          </h2>
          <p className="leading-relaxed">
            Kunjungi halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering {STORE_NAME}
            </Link>
            {' '}untuk melihat seluruh produk yang tersedia. Apabila Anda ingin mengirim sebagai
            hadiah, baca panduan{' '}
            <Link href="/hampers" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers {STORE_NAME}
            </Link>
            . Untuk pertanyaan lain seputar pengiriman, kunjungi halaman{' '}
            <Link href="/faq" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              FAQ
            </Link>
            {' '}atau{' '}
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
