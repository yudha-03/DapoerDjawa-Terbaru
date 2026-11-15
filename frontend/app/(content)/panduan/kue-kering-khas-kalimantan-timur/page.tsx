import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Kue Kering Khas Kalimantan Timur dari Balikpapan';
const pageDescription =
  `${STORE_NAME} menghadirkan kue kering premium dari Balikpapan, Kalimantan Timur. Bahan baku lokal, peran kue kering dalam budaya sosial dan keagamaan masyarakat Kaltim, serta perpaduan resep tradisional dan modern.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/panduan/kue-kering-khas-kalimantan-timur' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/panduan/kue-kering-khas-kalimantan-timur`,
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

export default function KueKeringKhasKalimantanTimurPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Apa yang Membuat Kue Kering dari Kalimantan Timur Berbeda?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Mengenal budaya kue kering di Balikpapan dan peran {STORE_NAME} dalam tradisi lokal
      </p>

      <div className="space-y-10 text-gray-700">
        {/* AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            Kue kering dari Kalimantan Timur memiliki kekhasan yang berakar pada penggunaan bahan
            baku lokal dan keanekaragaman budaya masyarakatnya. {STORE_NAME}, yang berdiri sejak
            tahun 2020 di Perum BDS 2, Balikpapan, memproduksi 12 varian kue kering premium
            menggunakan bahan baku dari pemasok lokal Kalimantan Timur. Seluruh produk dibuat
            tanpa pengawet buatan, mengandalkan teknik pembuatan yang menjaga kesegaran alami
            dari setiap bahan. Pendekatan ini menghasilkan cita rasa yang autentik dan berbeda
            dari kue kering produksi massal.
          </p>
        </section>

        {/* Bahan baku lokal */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa Bahan Baku Lokal Kalimantan Timur Penting untuk Kue Kering?
          </h2>
          <p className="leading-relaxed">
            Penggunaan bahan baku lokal memberikan beberapa keunggulan yang signifikan. Mentega,
            tepung, telur, dan bahan pendukung lainnya yang bersumber dari pemasok di sekitar
            Balikpapan memiliki rantai distribusi yang pendek. Rantai distribusi yang pendek
            berarti bahan tiba di dapur produksi dalam kondisi lebih segar dibandingkan bahan yang
            harus melalui perjalanan panjang dari pulau lain. Kesegaran bahan secara langsung
            mempengaruhi aroma, tekstur, dan rasa akhir kue kering. Selain itu, penggunaan bahan
            lokal mendukung ekonomi masyarakat Kalimantan Timur dan mengurangi jejak karbon akibat
            transportasi jarak jauh. {STORE_NAME} berkomitmen untuk terus menjalin kerja sama
            dengan pemasok lokal yang memenuhi standar kualitas kami.
          </p>
        </section>

        {/* Peran kue kering dalam budaya sosial */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Peran Kue Kering dalam Kehidupan Sosial Masyarakat Balikpapan?
          </h2>
          <p className="leading-relaxed">
            Balikpapan merupakan kota multikultural yang dihuni oleh masyarakat dari berbagai suku
            dan latar belakang budaya. Keragaman ini menjadikan kue kering sebagai makanan pemersatu
            yang hadir di hampir setiap acara sosial. Pada saat silaturahmi Lebaran, kue kering
            menjadi suguhan wajib di meja tamu rumah-rumah umat Muslim. Saat perayaan Natal,
            keluarga Kristen di Balikpapan menyajikan kue kering untuk menyambut tamu yang datang
            berkunjung. Komunitas Tionghoa di Balikpapan menyiapkan nastar dan kue kacang untuk
            merayakan Imlek. Arisan ibu-ibu, pengajian, dan acara RT juga selalu ditemani oleh
            toples kue kering di atas meja. Kue kering telah melampaui batas agama dan suku,
            menjadi bagian integral dari cara masyarakat Balikpapan menunjukkan keramahtamahan.
          </p>
        </section>

        {/* Peran dalam acara keagamaan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Kue Kering Berperan dalam Acara Keagamaan di Kalimantan Timur?
          </h2>
          <p className="mb-4 leading-relaxed">
            Tiga momen keagamaan utama di Kalimantan Timur menempatkan kue kering sebagai komponen
            penting dalam perayaan. Setiap momen memiliki preferensi produk yang berbeda berdasarkan
            tradisi dan makna simbolis.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <strong>Idul Fitri (Lebaran)</strong> -{' '}
              <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Nastar
              </Link>
              {' '}dan{' '}
              <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kastengel
              </Link>
              {' '}mendominasi meja tamu. Tradisi open house selama seminggu penuh membuat kebutuhan
              kue kering sangat tinggi. Baca lebih lanjut di halaman{' '}
              <Link href="/hampers-lebaran" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Hampers Lebaran
              </Link>
              .
            </li>
            <li>
              <strong>Natal</strong> -{' '}
              <Link href="/product/putri-salju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Putri Salju
              </Link>
              {' '}dan{' '}
              <Link href="/product/cookies-cokelat" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat
              </Link>
              {' '}menjadi pilihan populer. Tradisi bertukar hadiah menjadikan hampers kue kering
              sangat diminati. Detail ada di halaman{' '}
              <Link href="/hampers-natal" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Hampers Natal
              </Link>
              .
            </li>
            <li>
              <strong>Imlek</strong> -{' '}
              <Link href="/product/nastar-classic" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Nastar
              </Link>
              {' '}(nanas bermakna keberuntungan) dan{' '}
              <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kue Kacang
              </Link>
              {' '}(simbol umur panjang) paling diminati. Selengkapnya di halaman{' '}
              <Link href="/hampers-imlek" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Hampers Imlek
              </Link>
              .
            </li>
          </ul>
        </section>

        {/* Tradisional vs modern */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa Perbedaan Kue Kering Tradisional dan Modern di {STORE_NAME}?
          </h2>
          <p className="mb-4 leading-relaxed">
            {STORE_NAME} menawarkan perpaduan kue kering tradisional Indonesia dan kreasi modern.
            Perbedaan utama terletak pada asal resep, teknik pembuatan, dan bahan yang digunakan.
          </p>
          <h3 className="mb-2 font-semibold text-gray-900">
            Kue Kering Tradisional
          </h3>
          <p className="mb-4 leading-relaxed">
            Nastar, kastengel, putri salju, kue kacang, sagu keju, lidah kucing, dan semprit
            merupakan kue kering yang resepnya telah diwariskan dari generasi ke generasi di
            Indonesia. {STORE_NAME} mempertahankan karakter asli dari setiap kue kering tradisional
            ini sambil melakukan penyempurnaan pada kualitas bahan baku. Nastar kami menggunakan
            selai nanas dari buah nanas segar, bukan selai kemasan. Kastengel menggunakan keju
            cheddar yang dicampurkan langsung ke dalam adonan. Pendekatan ini menjaga esensi
            tradisional sekaligus meningkatkan kualitas rasa.
          </p>
          <h3 className="mb-2 font-semibold text-gray-900">
            Kreasi Modern
          </h3>
          <p className="leading-relaxed">
            <Link href="/product/cookies-cokelat" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Cookies Cokelat
            </Link>
            {' '}dan{' '}
            <Link href="/product/cookies-cokelat-vanila" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Cookies Cokelat &amp; Vanila
            </Link>
            {' '}merupakan kreasi modern yang mengadopsi teknik pembuatan cookies internasional
            dengan sentuhan lokal. Cokelat premium yang digunakan diolah dengan teknik khusus
            agar menghasilkan tekstur renyah di luar dan sedikit chewy di tengah. Varian ini
            menjawab permintaan generasi muda yang mencari kue kering dengan cita rasa kontemporer
            namun tetap berkualitas premium.
          </p>
        </section>

        {/* Identitas Balikpapan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa Balikpapan Menjadi Lokasi yang Tepat untuk Produksi Kue Kering?
          </h2>
          <p className="leading-relaxed">
            Balikpapan merupakan salah satu kota terbesar di Kalimantan Timur dengan akses
            infrastruktur yang baik untuk distribusi ke seluruh Indonesia. Pelabuhan dan bandara
            di Balikpapan memungkinkan pengiriman ke Jawa, Sumatera, Sulawesi, dan wilayah lainnya
            dengan jalur logistik yang efisien. Meskipun iklim tropis lembap di Balikpapan menjadi
            tantangan dalam penyimpanan kue kering, {STORE_NAME} mengatasi hal ini dengan teknik
            produksi yang meminimalkan kadar air dan pengemasan kedap udara yang menjaga kerenyahan.
            Berdiri sejak tahun 2020, kami telah memahami karakteristik iklim lokal dan
            menyesuaikan proses produksi agar menghasilkan kue kering yang tahan lama meskipun
            berada di lingkungan dengan kelembapan tinggi.
          </p>
        </section>

        {/* Komitmen tanpa pengawet */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa {STORE_NAME} Tidak Menggunakan Pengawet Buatan?
          </h2>
          <p className="leading-relaxed">
            Komitmen {STORE_NAME} untuk tidak menggunakan pengawet buatan berakar pada filosofi
            bahwa kue kering yang baik tidak memerlukan bahan tambahan selain bahan utamanya.
            Mentega, tepung, gula, telur, dan bahan alami lainnya sudah cukup untuk menghasilkan
            kue kering yang lezat dan tahan lama apabila diproses dengan teknik yang benar. Kadar
            air yang rendah dalam kue kering secara alami menghambat pertumbuhan mikroorganisme.
            Apabila disimpan dalam wadah kedap udara pada suhu ruang, kue kering kami bertahan
            selama 2 hingga 3 bulan tanpa bantuan pengawet. Pendekatan ini sejalan dengan
            kesadaran masyarakat Balikpapan yang semakin peduli terhadap makanan bersih dan sehat
            untuk keluarga.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Cicipi Kue Kering Khas Kalimantan Timur
          </h2>
          <p className="leading-relaxed">
            Jelajahi seluruh koleksi kue kering kami di halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering {STORE_NAME}
            </Link>
            . Apabila Anda ingin mengirim kue kering sebagai hadiah, baca panduan{' '}
            <Link href="/hampers" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hampers {STORE_NAME}
            </Link>
            . Untuk panduan penyimpanan agar kue kering tetap renyah di iklim Balikpapan, kunjungi{' '}
            <Link href="/panduan/cara-menyimpan-kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Cara Menyimpan Kue Kering
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
