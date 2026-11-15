import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Kue Kering Tahan Berapa Lama? Panduan Masa Simpan';
const pageDescription =
  `Kue kering ${STORE_NAME} bertahan 2-3 bulan dalam wadah kedap udara. Pelajari faktor yang mempengaruhi daya tahan, tips untuk iklim tropis Balikpapan, dan kapan harus membuang kue kering.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/panduan/kue-kering-tahan-berapa-lama' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/panduan/kue-kering-tahan-berapa-lama`,
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

export default function KueKeringTahanBerapaLamaPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Kue Kering Tahan Berapa Lama?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Panduan masa simpan kue kering dari {STORE_NAME}, Balikpapan
      </p>

      <div className="space-y-10 text-gray-700">
        {/* AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            Kue kering buatan {STORE_NAME} bertahan selama 2 hingga 3 bulan apabila disimpan dalam
            wadah kedap udara pada suhu ruang. Daya tahan ini berlaku untuk seluruh 12 varian
            produk kami, mulai dari nastar hingga lidah kucing. Faktor utama yang mempengaruhi masa
            simpan meliputi kelembapan udara, suhu penyimpanan, jenis kemasan, dan frekuensi
            pembukaan wadah. Di iklim tropis Balikpapan, perhatian ekstra terhadap kelembapan
            menjadi sangat penting.
          </p>
        </section>

        {/* Faktor yang mempengaruhi */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Faktor Apa Saja yang Mempengaruhi Daya Tahan Kue Kering?
          </h2>
          <p className="mb-4 leading-relaxed">
            Empat faktor utama menentukan berapa lama kue kering dapat bertahan dengan kualitas
            optimal. Memahami faktor-faktor ini membantu Anda memaksimalkan masa simpan setiap
            toples kue kering yang dibeli.
          </p>
          <ul className="space-y-3 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Kelembapan udara</strong> - musuh utama kue kering. Kelembapan relatif di
              Balikpapan rata-rata mencapai 80 hingga 85 persen, jauh lebih tinggi dibandingkan
              kota-kota di Jawa. Udara lembap yang masuk ke dalam wadah diserap oleh kue kering,
              mengubah tekstur renyah menjadi lembek dalam waktu singkat.
            </li>
            <li>
              <strong>Suhu penyimpanan</strong> - suhu ideal adalah 25 hingga 30 derajat Celsius.
              Suhu yang terlalu tinggi mempercepat oksidasi lemak pada mentega dan keju, sedangkan
              suhu terlalu rendah seperti di kulkas menyebabkan kondensasi.
            </li>
            <li>
              <strong>Kualitas kemasan</strong> - wadah kedap udara dengan seal yang rapat
              merupakan syarat mutlak. Plastik klip biasa tidak cukup kuat menahan penetrasi
              kelembapan dalam jangka panjang. Gunakan toples kaca atau kontainer plastik food
              grade dengan karet seal.
            </li>
            <li>
              <strong>Frekuensi pembukaan</strong> - setiap kali wadah dibuka, udara lembap masuk
              dan menggantikan udara kering di dalam wadah. Semakin sering dibuka, semakin cepat
              kue kering kehilangan kerenyahan.
            </li>
          </ul>
        </section>

        {/* Tabel perbandingan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Lama Setiap Jenis Kue Kering Bertahan?
          </h2>
          <p className="mb-4 leading-relaxed">
            Meskipun semua produk {STORE_NAME} memiliki estimasi umum 2 hingga 3 bulan, terdapat
            perbedaan daya tahan berdasarkan komposisi dan karakteristik masing-masing jenis kue
            kering.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">Jenis Kue Kering</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Wadah Kedap Udara</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Sering Dibuka</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/nastar-classic" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Nastar</Link>
                    {' '}(3 varian)
                  </td>
                  <td className="px-4 py-3">2 - 2,5 bulan</td>
                  <td className="px-4 py-3">3 - 4 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Isian selai mengandung kadar air lebih tinggi</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/kastengel-keju" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Kastengel Keju</Link>
                  </td>
                  <td className="px-4 py-3">2 - 3 bulan</td>
                  <td className="px-4 py-3">4 - 5 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Lemak keju rentan oksidasi</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/cookies-cokelat" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Cookies</Link>
                    {' '}(2 varian)
                  </td>
                  <td className="px-4 py-3">2,5 - 3 bulan</td>
                  <td className="px-4 py-3">4 - 6 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Kadar air rendah, cukup stabil</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/putri-salju" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Putri Salju</Link>
                  </td>
                  <td className="px-4 py-3">2 - 3 bulan</td>
                  <td className="px-4 py-3">3 - 4 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Gula halus menyerap kelembapan</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/kue-kacang" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Kue Kacang</Link>
                  </td>
                  <td className="px-4 py-3">2,5 - 3 bulan</td>
                  <td className="px-4 py-3">5 - 6 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Tekstur padat, daya tahan baik</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/sagu-keju" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Sagu Keju</Link>
                  </td>
                  <td className="px-4 py-3">2 - 3 bulan</td>
                  <td className="px-4 py-3">4 - 5 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Tekstur lumer, hindari suhu tinggi</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/lidah-kucing" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Lidah Kucing</Link>
                  </td>
                  <td className="px-4 py-3">2 - 2,5 bulan</td>
                  <td className="px-4 py-3">2 - 3 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Sangat tipis, paling sensitif terhadap kelembapan</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href="/product/semprit-bunga" className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">Semprit</Link>
                    {' '}(2 varian)
                  </td>
                  <td className="px-4 py-3">2,5 - 3 bulan</td>
                  <td className="px-4 py-3">4 - 5 minggu</td>
                  <td className="px-4 py-3 text-gray-500">Tekstur lembut, cukup stabil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Iklim tropis Balikpapan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa Iklim Balikpapan Mempengaruhi Daya Tahan Kue Kering?
          </h2>
          <p className="leading-relaxed">
            Balikpapan terletak di kawasan khatulistiwa dengan iklim tropis lembap. Suhu harian
            rata-rata berkisar antara 26 hingga 33 derajat Celsius, sementara kelembapan relatif
            udara sering kali melebihi 80 persen. Kombinasi suhu hangat dan kelembapan tinggi
            menciptakan kondisi yang mempercepat penyerapan uap air oleh kue kering. Apabila Anda
            tinggal di Balikpapan atau kota pesisir lainnya di Kalimantan Timur, penyimpanan dalam
            wadah kedap udara bukan sekadar saran, melainkan keharusan. Ruangan ber-AC dengan suhu
            terkontrol sekitar 24 hingga 26 derajat Celsius memberikan kondisi penyimpanan yang
            jauh lebih baik dibandingkan ruangan tanpa pendingin udara.
          </p>
        </section>

        {/* Kapan harus dibuang */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kapan Kue Kering Harus Dibuang?
          </h2>
          <p className="mb-4 leading-relaxed">
            Keamanan pangan harus menjadi prioritas utama. Meskipun kue kering tergolong makanan
            dengan daya tahan panjang, ada batas waktu di mana kue sudah tidak layak dikonsumsi.
            Berikut indikator yang harus diperhatikan.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Aroma tengik atau tidak sedap</strong> - mentega dan keju yang sudah
              teroksidasi menghasilkan bau yang tidak wajar. Apabila Anda mencium aroma yang
              berbeda dari saat pertama membuka toples, segera buang.
            </li>
            <li>
              <strong>Perubahan warna</strong> - kue kering yang berubah warna menjadi lebih gelap
              secara tidak merata menandakan proses kimiawi yang sudah berjalan terlalu jauh.
            </li>
            <li>
              <strong>Kemunculan jamur</strong> - bercak hijau, putih kapas, atau hitam pada
              permukaan kue kering menandakan kontaminasi mikroorganisme. Buang seluruh isi wadah
              karena spora jamur kemungkinan sudah menyebar.
            </li>
            <li>
              <strong>Tekstur berminyak berlebihan</strong> - apabila permukaan kue kering terasa
              berminyak padahal sebelumnya kering, lemak dalam kue sudah mulai terurai.
            </li>
            <li>
              <strong>Melewati 3 bulan</strong> - meskipun terlihat dan terasa normal, kue kering
              yang sudah disimpan lebih dari 3 bulan sebaiknya tidak dikonsumsi demi keamanan.
            </li>
          </ul>
        </section>

        {/* Tips memperpanjang daya tahan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Cara Memperpanjang Daya Tahan Kue Kering?
          </h2>
          <p className="mb-4 leading-relaxed">
            Selain menyimpan dalam wadah kedap udara, ada beberapa langkah tambahan yang dapat
            membantu memperpanjang masa simpan kue kering Anda.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              Tambahkan silica gel food grade ke dalam wadah untuk menyerap kelembapan berlebih.
              Pastikan silica gel tidak menyentuh kue kering secara langsung.
            </li>
            <li>
              Bagi kue kering ke dalam beberapa wadah kecil. Ambil dari satu wadah saja untuk
              konsumsi harian, sementara wadah lainnya tetap tertutup rapat.
            </li>
            <li>
              Simpan di ruangan ber-AC apabila memungkinkan. Suhu dan kelembapan yang terkontrol
              secara signifikan memperpanjang daya tahan kue kering.
            </li>
            <li>
              Gunakan sendok atau penjepit kering setiap kali mengambil kue kering. Kelembapan
              dari tangan dapat menjadi pemicu pertumbuhan jamur.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Pelajari Lebih Lanjut
          </h2>
          <p className="leading-relaxed">
            Untuk panduan penyimpanan yang lebih detail berdasarkan jenis kue, baca{' '}
            <Link href="/panduan/cara-menyimpan-kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Cara Menyimpan Kue Kering agar Tetap Renyah
            </Link>
            . Apabila Anda ingin melihat seluruh produk yang tersedia, kunjungi halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering {STORE_NAME}
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
