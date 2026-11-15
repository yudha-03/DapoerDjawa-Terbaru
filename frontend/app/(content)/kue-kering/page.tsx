import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = 'Kue Kering Premium Balikpapan';
const pageDescription =
  `Koleksi lengkap kue kering ${STORE_NAME}: nastar, kastengel, cookies cokelat, lidah kucing, dan lainnya. Dibuat dari bahan baku lokal pilihan, tanpa pengawet buatan, diproduksi di Balikpapan.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/kue-kering' },
  openGraph: {
    title: `${pageTitle} | ${STORE_NAME}`,
    description: pageDescription,
    url: `${STORE_DOMAIN}/kue-kering`,
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

const products = [
  { name: 'Nastar Classic', slug: 'nastar-classic', category: 'nastar' },
  { name: 'Nastar Daun', slug: 'nastar-daun', category: 'nastar' },
  { name: 'Nastar Keranjang', slug: 'nastar-keranjang', category: 'nastar' },
  { name: 'Kastengel Keju', slug: 'kastengel-keju', category: 'kastengel' },
  { name: 'Cookies Cokelat', slug: 'cookies-cokelat', category: 'cookies' },
  { name: 'Cookies Cokelat & Vanila', slug: 'cookies-cokelat-vanila', category: 'cookies' },
  { name: 'Kue Kacang', slug: 'kue-kacang', category: 'tradisional' },
  { name: 'Sagu Keju', slug: 'sagu-keju', category: 'tradisional' },
  { name: 'Lidah Kucing', slug: 'lidah-kucing', category: 'tradisional' },
  { name: 'Semprit Bunga', slug: 'semprit-bunga', category: 'semprit' },
  { name: 'Semprit Panjang', slug: 'semprit-panjang', category: 'semprit' },
  { name: 'Putri Salju', slug: 'putri-salju', category: 'tradisional' },
] as const;

export default function KueKeringPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Apa Saja Kue Kering yang Tersedia di {STORE_NAME}?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Panduan lengkap koleksi kue kering buatan rumah dari Balikpapan
      </p>

      <div className="space-y-10 text-gray-700">
        {/* Intro / AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            {STORE_NAME} menyediakan 12 varian kue kering premium yang seluruhnya diproduksi secara
            rumahan di Perum BDS 2, Balikpapan. Setiap produk tersedia dalam kemasan 300 gram dan
            500 gram. Seluruh kue kering dibuat menggunakan bahan baku lokal berkualitas dan tanpa
            pengawet buatan, sehingga aman dikonsumsi oleh keluarga. Apabila disimpan dalam wadah
            kedap udara, kue kering kami bertahan selama 2 hingga 3 bulan.
          </p>
        </section>

        {/* Mengapa bahan baku lokal? */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa {STORE_NAME} Menggunakan Bahan Baku Lokal?
          </h2>
          <p className="leading-relaxed">
            Kami percaya bahwa bahan baku lokal Kalimantan Timur mampu menghasilkan kue kering
            dengan cita rasa autentik. Mentega, tepung, dan telur yang kami gunakan berasal dari
            pemasok terpercaya di sekitar Balikpapan. Pendekatan ini menjamin kesegaran bahan
            karena rantai distribusi yang pendek. Selain itu, tidak ada pengawet buatan yang
            ditambahkan ke dalam resep kami. Aroma dan rasa yang Anda nikmati murni berasal dari
            kualitas bahan dan teknik pembuatan yang konsisten.
          </p>
        </section>

        {/* Kategori Nastar */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa Saja Varian Nastar dari {STORE_NAME}?
          </h2>
          <p className="mb-4 leading-relaxed">
            Nastar merupakan kue kering paling populer di Indonesia, terutama saat Lebaran dan
            Natal. {STORE_NAME} menawarkan tiga varian nastar yang masing-masing memiliki karakter
            berbeda. Isian selai nanas dibuat dari nanas segar yang dimasak hingga kadar airnya
            rendah, menghasilkan tekstur padat namun lembut di dalam mulut.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            {products
              .filter((p) => p.category === 'nastar')
              .map((p) => (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`} className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                    {p.name}
                  </Link>
                  {p.slug === 'nastar-classic' && ' - bentuk bulat tradisional dengan taburan parutan keju di atas'}
                  {p.slug === 'nastar-daun' && ' - dicetak menyerupai bentuk daun untuk tampilan yang elegan'}
                  {p.slug === 'nastar-keranjang' && ' - dicetak dalam bentuk keranjang kecil yang unik'}
                </li>
              ))}
          </ul>
        </section>

        {/* Kastengel */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Rasa Kastengel Keju {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            <Link href="/product/kastengel-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kastengel Keju
            </Link>{' '}
            kami menggunakan keju cheddar berkualitas yang dicampurkan langsung ke dalam adonan,
            bukan sekadar taburan di permukaan. Hasilnya adalah kue kering dengan rasa keju yang
            merata di setiap gigitan. Teksturnya renyah di luar namun sedikit lumer ketika
            menyentuh lidah. Kastengel ini menjadi pilihan favorit bagi pecinta kue kering gurih.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Ada Berapa Jenis Cookies di {STORE_NAME}?
          </h2>
          <p className="mb-4 leading-relaxed">
            Kami memiliki dua varian cookies yang cocok bagi penggemar cokelat. Kedua varian
            menggunakan cokelat premium yang diolah dengan teknik tertentu agar menghasilkan
            tekstur renyah di bagian luar dan sedikit chewy di bagian tengah.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/product/cookies-cokelat" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat
              </Link>
              {' '}- full cokelat dengan intensitas rasa yang kuat
            </li>
            <li>
              <Link href="/product/cookies-cokelat-vanila" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Cookies Cokelat & Vanila
              </Link>
              {' '}- perpaduan cokelat dan vanila yang seimbang
            </li>
          </ul>
        </section>

        {/* Kue tradisional */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Kue Kering Tradisional Apa Saja yang Dijual?
          </h2>
          <p className="mb-4 leading-relaxed">
            Selain nastar dan cookies, {STORE_NAME} juga menyediakan kue kering tradisional yang
            sudah dikenal luas di berbagai daerah di Indonesia. Setiap jenis memiliki tekstur dan
            rasa khas yang berbeda.
          </p>
          <ul className="space-y-2 pl-5 list-disc leading-relaxed">
            <li>
              <Link href="/product/putri-salju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Putri Salju
              </Link>
              {' '}- lembut dan meleleh di mulut, dibalut gula halus
            </li>
            <li>
              <Link href="/product/kue-kacang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Kue Kacang
              </Link>
              {' '}- aroma kacang tanah sangrai yang harum dan renyah
            </li>
            <li>
              <Link href="/product/sagu-keju" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Sagu Keju
              </Link>
              {' '}- perpaduan tepung sagu dan keju yang lumer saat dimakan
            </li>
            <li>
              <Link href="/product/lidah-kucing" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
                Lidah Kucing
              </Link>
              {' '}- tipis, renyah, dan ringan dengan rasa mentega yang khas
            </li>
          </ul>
        </section>

        {/* Semprit */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa Perbedaan Semprit Bunga dan Semprit Panjang?
          </h2>
          <p className="leading-relaxed">
            Kedua varian semprit menggunakan resep dasar yang sama, namun berbeda pada bentuk
            cetakan.{' '}
            <Link href="/product/semprit-bunga" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Semprit Bunga
            </Link>
            {' '}dicetak dengan bentuk bunga yang cantik, cocok untuk suguhan di meja tamu. Sementara{' '}
            <Link href="/product/semprit-panjang" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Semprit Panjang
            </Link>
            {' '}memiliki bentuk memanjang menyerupai stik, memberikan sensasi renyah yang lebih
            panjang di setiap gigitan. Keduanya memiliki tekstur lembut yang meleleh saat dikunyah.
          </p>
        </section>

        {/* Kemasan */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Tersedia dalam Kemasan Berapa Gram?
          </h2>
          <p className="leading-relaxed">
            Seluruh produk {STORE_NAME} tersedia dalam dua pilihan kemasan: 300 gram dan 500 gram.
            Kemasan 300 gram cocok untuk konsumsi pribadi atau sebagai buah tangan ringan. Apabila
            Anda membutuhkan jumlah lebih banyak untuk acara keluarga atau hampers, kemasan 500
            gram menawarkan nilai yang lebih ekonomis. Setiap kemasan dirancang kedap udara untuk
            menjaga kerenyahan dan kesegaran kue kering selama penyimpanan.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Cara Memesan Kue Kering {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            Anda dapat memesan langsung melalui website kami. Pilih produk yang diinginkan,
            tentukan varian kemasan, dan lanjutkan ke pembayaran. Apabila Anda memiliki pertanyaan
            seputar produk atau pengiriman, silakan kunjungi halaman{' '}
            <Link href="/faq" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              FAQ
            </Link>
            {' '}atau{' '}
            <Link href="/contact" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Hubungi Kami
            </Link>
            . Untuk panduan penyimpanan agar kue kering tetap renyah, baca{' '}
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
