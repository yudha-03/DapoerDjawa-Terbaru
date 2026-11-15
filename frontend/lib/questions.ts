export type QuestionSource = 'harvest' | 'fanout' | 'interview' | 'existing';

export interface SiteQuestion {
  id: string;
  question: string;
  answer: string;
  source: QuestionSource;
  category: string;
  routes: string[];
  inFaqSchema: boolean;
  gbpSeed: boolean;
}

export const QUESTIONS: SiteQuestion[] = [
  // === Produk ===
  {
    id: 'bahan-produk',
    question: 'Produk DapoerDjawa terbuat dari bahan apa?',
    answer:
      'Semua produk DapoerDjawa dibuat dari bahan baku lokal berkualitas tinggi. Kami menggunakan bahan alami tanpa pengawet buatan untuk menjaga cita rasa autentik kue kering tradisional.',
    source: 'existing',
    category: 'Produk',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'masa-simpan',
    question: 'Berapa lama masa simpan produk?',
    answer:
      'Produk kue kering kami memiliki masa simpan sekitar 2-3 bulan dalam kemasan tertutup rapat. Pastikan menyimpan di tempat yang sejuk, kering, dan terhindar dari sinar matahari langsung.',
    source: 'existing',
    category: 'Produk',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'ukuran-varian',
    question: 'Apakah produk tersedia dalam berbagai ukuran?',
    answer:
      'Ya, setiap produk tersedia dalam dua varian ukuran: 300 gram dan 500 gram. Anda bisa memilih sesuai kebutuhan saat checkout.',
    source: 'existing',
    category: 'Produk',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  // === Pemesanan ===
  {
    id: 'cara-memesan',
    question: 'Bagaimana cara memesan produk?',
    answer:
      'Pilih produk yang diinginkan, tambahkan ke keranjang, lalu lanjutkan ke checkout. Isi data pengiriman, pilih kurir, dan lakukan pembayaran melalui metode yang tersedia.',
    source: 'existing',
    category: 'Pemesanan',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'batal-pesanan',
    question: 'Apakah bisa membatalkan pesanan?',
    answer:
      'Pesanan yang belum dibayar (status Draft/Pending) bisa langsung dibatalkan dari halaman Riwayat Belanja. Apabila pesanan sudah dibayar, Anda bisa mengajukan permintaan pembatalan yang akan ditinjau oleh admin kami.',
    source: 'existing',
    category: 'Pemesanan',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  {
    id: 'kode-promo',
    question: 'Apakah ada kode promo?',
    answer:
      'Ya, kami sesekali memberikan kode promo melalui media sosial resmi kami. Masukkan kode promo saat checkout untuk mendapatkan potongan harga.',
    source: 'existing',
    category: 'Pemesanan',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  // === Pengiriman ===
  {
    id: 'estimasi-pengiriman',
    question: 'Berapa lama estimasi pengiriman?',
    answer:
      'Estimasi pengiriman tergantung lokasi tujuan dan kurir yang dipilih. Umumnya pengiriman memakan waktu 2-5 hari kerja untuk wilayah Pulau Jawa dan 5-10 hari kerja untuk luar Pulau Jawa.',
    source: 'existing',
    category: 'Pengiriman',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'lacak-pesanan',
    question: 'Bagaimana cara melacak pesanan?',
    answer:
      'Setelah pesanan dikirim, Anda bisa melacak paket melalui halaman Detail Pesanan di Riwayat Belanja. Klik tombol "Lacak Paket" untuk melihat status pengiriman secara real-time.',
    source: 'existing',
    category: 'Pengiriman',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  {
    id: 'pilih-kurir',
    question: 'Apakah bisa memilih kurir pengiriman?',
    answer:
      'Ya, saat checkout kami menampilkan beberapa pilihan kurir beserta estimasi biaya dan waktu pengiriman. Anda bebas memilih kurir yang paling sesuai.',
    source: 'existing',
    category: 'Pengiriman',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  // === Pembayaran ===
  {
    id: 'metode-pembayaran',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'Kami menerima pembayaran melalui berbagai metode yang disediakan oleh Midtrans, termasuk transfer bank (BCA, BNI, BRI, Mandiri), e-wallet (GoPay, ShopeePay, DANA), kartu kredit/debit, dan gerai retail (Alfamart, Indomaret).',
    source: 'existing',
    category: 'Pembayaran',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'keamanan-pembayaran',
    question: 'Apakah pembayaran saya aman?',
    answer:
      'Sangat aman. Pembayaran diproses melalui Midtrans yang telah tersertifikasi PCI-DSS. DapoerDjawa tidak menyimpan data kartu kredit atau debit Anda.',
    source: 'existing',
    category: 'Pembayaran',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  {
    id: 'pembayaran-gagal',
    question: 'Bagaimana apabila pembayaran gagal?',
    answer:
      'Apabila pembayaran gagal, pesanan Anda tetap tersimpan dengan status Pending. Anda bisa mencoba kembali melalui tombol "Bayar" di halaman Riwayat Belanja.',
    source: 'existing',
    category: 'Pembayaran',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  // === Akun ===
  {
    id: 'cara-daftar',
    question: 'Bagaimana cara mendaftar akun?',
    answer:
      'Anda bisa mendaftar menggunakan email dan password, atau langsung login dengan akun Google. Apabila menggunakan email, Anda perlu memverifikasi melalui kode OTP yang dikirimkan ke email.',
    source: 'existing',
    category: 'Akun',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  {
    id: 'ubah-password',
    question: 'Bagaimana cara mengubah kata sandi?',
    answer:
      'Buka halaman Profil, lalu klik tombol "Ubah Kata Sandi". Masukkan kata sandi baru minimal 8 karakter, lalu simpan perubahan.',
    source: 'existing',
    category: 'Akun',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  {
    id: 'privasi-data',
    question: 'Apakah data pribadi saya aman?',
    answer:
      'Kami sangat menjaga privasi data Anda sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Nomor 27 Tahun 2022. Selengkapnya bisa dibaca di halaman Kebijakan Privasi kami.',
    source: 'existing',
    category: 'Akun',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
  // === Buying Intent (harvest + fanout) ===
  {
    id: 'kirim-luar-kota',
    question: 'Apakah DapoerDjawa melayani pengiriman luar kota Balikpapan?',
    answer:
      'Ya, kami melayani pengiriman ke seluruh Indonesia melalui Biteship. Saat checkout, sistem otomatis menghitung ongkos kirim berdasarkan alamat tujuan. Pengiriman dalam Balikpapan umumnya 1-2 hari, luar Kalimantan 3-7 hari kerja tergantung kurir yang dipilih.',
    source: 'harvest',
    category: 'Pengiriman',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'minimum-order',
    question: 'Apakah ada minimum pemesanan?',
    answer:
      'Tidak ada minimum order. Anda bisa memesan mulai dari 1 toples. Setiap produk tersedia dalam kemasan 300 gram dan 500 gram.',
    source: 'harvest',
    category: 'Pemesanan',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'hampers-kustomisasi',
    question: 'Apakah bisa pesan hampers atau paket kustomisasi?',
    answer:
      'Saat ini DapoerDjawa belum menyediakan layanan hampers kustomisasi melalui website. Namun, Anda bisa memesan beberapa produk sekaligus dan sistem kami akan memberikan rekomendasi bundling otomatis berdasarkan pola belanja pelanggan lain.',
    source: 'fanout',
    category: 'Pemesanan',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'packing-aman',
    question: 'Bagaimana pengemasan produk untuk pengiriman?',
    answer:
      'Semua produk dikemas dalam toples kedap udara, kemudian dibungkus bubble wrap dan dimasukkan ke dalam kardus. Pengemasan dirancang agar kue kering tetap utuh dan renyah saat sampai tujuan.',
    source: 'fanout',
    category: 'Pengiriman',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'pesan-lebaran',
    question: 'Kapan sebaiknya memesan kue kering untuk Lebaran?',
    answer:
      'Kami menyarankan memesan minimal 2-3 minggu sebelum Lebaran. Menjelang hari raya, permintaan meningkat dan beberapa varian bisa kehabisan stok. Pesan lebih awal untuk memastikan ketersediaan produk favorit Anda.',
    source: 'harvest',
    category: 'Pemesanan',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'halal',
    question: 'Apakah produk DapoerDjawa halal?',
    answer:
      'Semua produk DapoerDjawa dibuat dari bahan baku halal. Kami menggunakan mentega, tepung, gula, selai, dan keju yang tersedia di pasaran lokal Balikpapan. Proses pembuatan dilakukan di dapur rumahan yang bersih dan higienis.',
    source: 'harvest',
    category: 'Produk',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: true,
  },
  {
    id: 'rekomendasi-bundling',
    question: 'Apa itu rekomendasi bundling di DapoerDjawa?',
    answer:
      'DapoerDjawa menggunakan algoritma FP-Growth untuk menganalisis pola belanja pelanggan. Saat Anda melihat produk atau keranjang belanja, sistem otomatis menampilkan produk yang sering dibeli bersamaan, lengkap dengan persentase kepercayaan (confidence), sehingga memudahkan Anda menemukan kombinasi kue kering yang cocok.',
    source: 'fanout',
    category: 'Produk',
    routes: ['/faq'],
    inFaqSchema: true,
    gbpSeed: false,
  },
];

/** Group questions by category */
export function getQuestionsByCategory() {
  const categories = new Map<string, SiteQuestion[]>();
  for (const q of QUESTIONS) {
    const list = categories.get(q.category) ?? [];
    list.push(q);
    categories.set(q.category, list);
  }
  return Array.from(categories.entries()).map(([category, items]) => ({ category, items }));
}

/** Get questions for FAQPage schema */
export function getFaqSchemaQuestions() {
  return QUESTIONS.filter((q) => q.inFaqSchema);
}
