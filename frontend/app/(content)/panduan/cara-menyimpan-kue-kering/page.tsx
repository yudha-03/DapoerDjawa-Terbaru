import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Cara Menyimpan Kue Kering agar Tetap Renyah';
const pageDescription =
  `Panduan lengkap menyimpan kue kering ${STORE_NAME}: wadah kedap udara, suhu ruang, dan tips per jenis kue. Hindari kulkas agar kue tidak lembap.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/panduan/cara-menyimpan-kue-kering' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/panduan/cara-menyimpan-kue-kering`,
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

export default function CaraMenyimpanKueKeringPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Bagaimana Cara Menyimpan Kue Kering agar Tetap Renyah?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Panduan praktis dari {STORE_NAME} untuk menjaga kualitas kue kering di rumah
      </p>

      <div className="space-y-10 text-gray-700">
        {/* AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            Kue kering sebaiknya disimpan dalam wadah kedap udara pada suhu ruang, jauh dari
            paparan sinar matahari langsung dan sumber kelembapan. Apabila kondisi ini terpenuhi,
            kue kering dari {STORE_NAME} mampu bertahan selama 2 hingga 3 bulan tanpa kehilangan
            tekstur renyahnya. Hindari menyimpan kue kering di dalam kulkas karena perubahan suhu
            menyebabkan kondensasi yang membuat kue cepat melempem.
          </p>
        </section>

        {/* Kondisi penyimpanan optimal */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa Kondisi Penyimpanan yang Paling Ideal?
          </h2>
          <p className="mb-4 leading-relaxed">
            Kondisi penyimpanan optimal untuk kue kering meliputi beberapa faktor utama yang saling
            berkaitan. Apabila salah satu faktor tidak terpenuhi, daya tahan kue kering akan
            berkurang secara signifikan.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Wadah kedap udara</strong> - gunakan toples kaca, kontainer plastik food
              grade, atau kaleng dengan penutup rapat. Pastikan tidak ada celah udara yang
              memungkinkan kelembapan masuk.
            </li>
            <li>
              <strong>Suhu ruang</strong> - idealnya antara 25 hingga 30 derajat Celsius. Di
              Balikpapan, suhu ruang ber-AC sekitar 24 hingga 26 derajat Celsius merupakan
              kondisi yang sangat baik.
            </li>
            <li>
              <strong>Jauh dari sinar matahari</strong> - paparan sinar matahari langsung
              mempercepat oksidasi lemak pada kue kering, menghasilkan rasa tengik.
            </li>
            <li>
              <strong>Tempat kering</strong> - hindari menyimpan di dekat kompor, wastafel, atau
              area dapur yang sering terkena uap air.
            </li>
          </ul>
        </section>

        {/* Masa simpan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Berapa Lama Kue Kering Bertahan dalam Wadah Tertutup?
          </h2>
          <p className="leading-relaxed">
            Dalam wadah kedap udara yang jarang dibuka, kue kering {STORE_NAME} bertahan selama 2
            hingga 3 bulan. Apabila wadah sering dibuka-tutup, udara lembap yang masuk secara
            berulang akan mempercepat proses pelunakan tekstur. Dalam kondisi tersebut, daya tahan
            kue kering berkurang menjadi sekitar 3 hingga 4 minggu. Untuk hasil terbaik, ambil
            secukupnya lalu segera tutup kembali wadah dengan rapat.
          </p>
        </section>

        {/* Tips per jenis kue */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apakah Setiap Jenis Kue Kering Membutuhkan Penyimpanan Berbeda?
          </h2>
          <p className="mb-4 leading-relaxed">
            Ya, beberapa jenis kue kering memiliki karakteristik yang memerlukan perhatian khusus
            saat penyimpanan. Perbedaan utama terletak pada kandungan isian dan kadar lemak.
          </p>

          <h3 className="mb-2 font-semibold text-gray-900">
            Kue Kering dengan Isian (Nastar)
          </h3>
          <p className="mb-4 leading-relaxed">
            <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Nastar Classic
            </Link>
            ,{' '}
            <Link href="/product/nastar-daun" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Nastar Daun
            </Link>
            , dan{' '}
            <Link href="/product/nastar-keranjang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Nastar Keranjang
            </Link>
            {' '}memiliki isian selai nanas yang mengandung kadar air lebih tinggi dibandingkan kue
            kering tanpa isian. Apabila wadah tidak kedap udara, isian nastar dapat menjadi asam
            lebih cepat. Pastikan nastar disimpan dalam lapisan tunggal atau dengan pembatas
            kertas roti antar lapisan agar tidak saling menempel.
          </p>

          <h3 className="mb-2 font-semibold text-gray-900">
            Kue Kering Tipis dan Renyah
          </h3>
          <p className="mb-4 leading-relaxed">
            <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Lidah Kucing
            </Link>
            {' '}dan{' '}
            <Link href="/product/semprit-panjang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Semprit Panjang
            </Link>
            {' '}adalah kue kering bertekstur tipis yang sangat sensitif terhadap kelembapan udara.
            Jenis ini paling cepat kehilangan kerenyahan apabila terpapar udara terbuka. Simpan
            dalam wadah yang lebih kecil agar ruang udara di dalam wadah minimal.
          </p>

          <h3 className="mb-2 font-semibold text-gray-900">
            Kue Kering Berbahan Keju
          </h3>
          <p className="leading-relaxed">
            <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kastengel Keju
            </Link>
            {' '}dan{' '}
            <Link href="/product/sagu-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Sagu Keju
            </Link>
            {' '}mengandung kadar lemak yang lebih tinggi dari keju. Lemak ini rentan teroksidasi
            apabila terpapar cahaya dan udara secara berlebihan. Simpan di tempat gelap dan
            pastikan wadah benar-benar tertutup rapat setelah setiap pengambilan.
          </p>
        </section>

        {/* Yang harus dihindari */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa yang Tidak Boleh Dilakukan Saat Menyimpan Kue Kering?
          </h2>
          <p className="mb-4 leading-relaxed">
            Beberapa kebiasaan umum justru mempercepat kerusakan kue kering. Berikut hal-hal yang
            harus dihindari.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Jangan simpan di kulkas</strong> - suhu dingin kulkas menyebabkan kondensasi
              saat wadah dikeluarkan ke suhu ruang. Uap air yang terbentuk langsung diserap oleh
              kue kering, menjadikannya lembap dan melempem dalam hitungan jam.
            </li>
            <li>
              <strong>Jangan mencampur jenis kue</strong> - kue kering dengan kadar kelembapan
              berbeda akan saling mempengaruhi apabila disimpan dalam satu wadah. Nastar yang
              mengandung selai dapat membuat lidah kucing kehilangan kerenyahan.
            </li>
            <li>
              <strong>Jangan menggunakan wadah terbuka</strong> - meletakkan kue kering di piring
              atau nampan tanpa penutup mempercepat proses oksidasi dan penyerapan kelembapan dari
              udara.
            </li>
            <li>
              <strong>Jangan mengambil dengan tangan basah</strong> - kelembapan dari tangan
              berpindah ke kue kering dan menjadi titik awal pertumbuhan jamur. Gunakan sendok
              atau penjepit bersih dan kering.
            </li>
          </ul>
        </section>

        {/* Tanda kue kering sudah tidak layak */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Cara Mengetahui Kue Kering Sudah Tidak Layak Konsumsi?
          </h2>
          <p className="mb-4 leading-relaxed">
            Meskipun kue kering memiliki daya tahan yang cukup panjang, ada beberapa tanda yang
            menunjukkan bahwa kue sudah tidak layak dikonsumsi.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Aroma tengik</strong> - bau minyak atau mentega yang sudah tidak segar
              menandakan oksidasi lemak yang sudah lanjut.
            </li>
            <li>
              <strong>Tekstur sangat lembek</strong> - apabila kue kering sudah tidak memiliki
              kerenyahan sama sekali dan terasa kenyal, kualitasnya sudah menurun drastis.
            </li>
            <li>
              <strong>Bercak jamur</strong> - titik-titik hijau, putih, atau hitam pada permukaan
              kue menandakan kontaminasi jamur. Buang seluruh isi wadah, bukan hanya kue yang
              terkena.
            </li>
            <li>
              <strong>Rasa asam atau pahit</strong> - khususnya pada nastar, isian selai yang
              sudah berubah rasa menandakan fermentasi yang tidak diinginkan.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Ingin Tahu Lebih Lanjut tentang Daya Tahan Kue Kering?
          </h2>
          <p className="leading-relaxed">
            Baca panduan lengkap kami tentang{' '}
            <Link href="/panduan/kue-kering-tahan-berapa-lama" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              berapa lama kue kering bertahan
            </Link>
            {' '}untuk informasi lebih detail mengenai masa simpan setiap jenis produk. Apabila Anda
            berencana memesan dalam jumlah besar untuk acara, panduan{' '}
            <Link href="/panduan/kue-kering-untuk-hajatan" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              kue kering untuk hajatan
            </Link>
            {' '}juga tersedia. Anda juga dapat mengenal lebih jauh{' '}
            <Link href="/panduan/kue-kering-khas-kalimantan-timur" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              kue kering khas Kalimantan Timur
            </Link>
            {' '}yang menjadi inspirasi produk kami. Untuk melihat koleksi lengkap, kunjungi halaman{' '}
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
