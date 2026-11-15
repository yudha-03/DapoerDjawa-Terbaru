export interface MockProduct {
  id: string;
  nama_produk: string;
  deskripsi: string;
  slug: string;
  foto_2: string;
  created_at: string;
}

export interface MockVariant {
  id: string;
  produk_id: string;
  ukuran: string;
  price: number;
  img: string;
  foto_3: string | null;
  stok: number;
}

export interface MockBanner {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  promo_code: string;
  cta_text: string;
  link_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface MockReview {
  id: string;
  produk_id: string;
  user_id: string;
  rating: number;
  comment: string;
  nama_user: string;
  created_at: string;
}

export interface MockOrder {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  shipping_cost: number;
  tracking_number: string;
  shipping_courier: string;
  destination_address: string;
  created_at: string;
  items: Array<{
    name: string;
    variant: string;
    price: number;
    qty: number;
    img: string;
  }>;
}

export interface MockAddress {
  id: string;
  user_id: string;
  label: string;
  receiver_name: string;
  phone: string;
  full_address: string;
  area_id: string;
  is_primary: boolean;
}

export const MOCK_USER = null;

export const MOCK_ADDRESSES: MockAddress[] = [];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 'prod-01',
    nama_produk: 'Nastar Wisman Spesial',
    slug: 'nastar-wisman-spesial',
    deskripsi: 'Nastar premium dengan adonan butter Wijsman murni dan isian selai nanas segar pilihan khas DapoerDjawa. Tekstur renyah dan lumer di mulut.',
    foto_2: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'prod-02',
    nama_produk: 'Kastengel Keju Edam Asli',
    slug: 'kastengel-keju-edam-asli',
    deskripsi: 'Kastengel renyah dan gurih dengan kombinasi Keju Edam tua impor dan taburan cheddar melimpah. Renyah gurih di setiap gigitan.',
    foto_2: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-02T00:00:00Z',
  },
  {
    id: 'prod-03',
    nama_produk: 'Putri Salju Pandan Mede',
    slug: 'putri-salju-pandan-mede',
    deskripsi: 'Kue putri salju dengan aroma pandan wangi alami, kacang mede cincang gurih, serta balutan gula dingin mint yang menyegarkan.',
    foto_2: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-03T00:00:00Z',
  },
  {
    id: 'prod-04',
    nama_produk: 'Lidah Kucing Crispy Butter',
    slug: 'lidah-kucing-crispy-butter',
    deskripsi: 'Kue lidah kucing tipis, garing, dan super renyah dengan aroma susu dan butter yang harum menggoda selera.',
    foto_2: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-04T00:00:00Z',
  },
  {
    id: 'prod-05',
    nama_produk: 'Sagu Keju Lumer Premium',
    slug: 'sagu-keju-lumer-premium',
    deskripsi: 'Kue sagu keju klasik dengan santan segar dan keju panggang gurih. Begitu masuk mulut langsung lumer tanpa perlu dikunyah keras.',
    foto_2: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-05T00:00:00Z',
  },
  {
    id: 'prod-06',
    nama_produk: 'Choco Cashew Crunchy Cookies',
    slug: 'choco-cashew-crunchy-cookies',
    deskripsi: 'Kue cokelat dark couverture dengan potongan kacang mete panggang renyah, manis pas dan tidak bikin enek.',
    foto_2: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-06T00:00:00Z',
  },
  {
    id: 'prod-07',
    nama_produk: 'Semprit Dahlia Butter Jadul',
    slug: 'semprit-dahlia-butter-jadul',
    deskripsi: 'Kue semprit bunga dahlia klasik dengan hiasan choco chip di tengahnya. Resep warisan tempo dulu yang bikin nostalgia.',
    foto_2: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-07T00:00:00Z',
  },
  {
    id: 'prod-08',
    nama_produk: 'Hampers Sultan DapoerDjawa (Isi 4 Toples)',
    slug: 'hampers-sultan-dapoerdjawa',
    deskripsi: 'Paket hampers eksklusif isi 4 toples kue kering favorit (Nastar, Kastengel, Putri Salju, Sagu Keju) dibalut hardbox mewah dan kartu ucapan kustom.',
    foto_2: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-08T00:00:00Z',
  },
];

export const MOCK_VARIANTS: MockVariant[] = [
  // Nastar
  { id: 'var-01-1', produk_id: 'prod-01', ukuran: 'Toples 250g', price: 65000, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 45 },
  { id: 'var-01-2', produk_id: 'prod-01', ukuran: 'Toples 500g', price: 120000, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 30 },
  // Kastengel
  { id: 'var-02-1', produk_id: 'prod-02', ukuran: 'Toples 250g', price: 75000, img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 50 },
  { id: 'var-02-2', produk_id: 'prod-02', ukuran: 'Toples 500g', price: 140000, img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 25 },
  // Putri Salju
  { id: 'var-03-1', produk_id: 'prod-03', ukuran: 'Toples 250g', price: 60000, img: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 40 },
  { id: 'var-03-2', produk_id: 'prod-03', ukuran: 'Toples 500g', price: 110000, img: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 20 },
  // Lidah Kucing
  { id: 'var-04-1', produk_id: 'prod-04', ukuran: 'Toples 250g', price: 55000, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 35 },
  { id: 'var-04-2', produk_id: 'prod-04', ukuran: 'Toples 500g', price: 100000, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 15 },
  // Sagu Keju
  { id: 'var-05-1', produk_id: 'prod-05', ukuran: 'Toples 250g', price: 55000, img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 60 },
  { id: 'var-05-2', produk_id: 'prod-05', ukuran: 'Toples 500g', price: 105000, img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 30 },
  // Choco Cashew
  { id: 'var-06-1', produk_id: 'prod-06', ukuran: 'Toples 250g', price: 65000, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 40 },
  { id: 'var-06-2', produk_id: 'prod-06', ukuran: 'Toples 500g', price: 125000, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 20 },
  // Semprit
  { id: 'var-07-1', produk_id: 'prod-07', ukuran: 'Toples 250g', price: 50000, img: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 50 },
  { id: 'var-07-2', produk_id: 'prod-07', ukuran: 'Toples 500g', price: 95000, img: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 25 },
  // Hampers
  { id: 'var-08-1', produk_id: 'prod-08', ukuran: 'Box Eksklusif 4 Varian', price: 295000, img: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 15 },
];

export const MOCK_BANNERS: MockBanner[] = [
  {
    id: 'ban-01',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1600&q=80',
    title: 'Kelezatan Kue Kering Tradisional Premium',
    subtitle: 'Dibuat dengan 100% Butter Wijsman pilihan dan bahan bermutu tinggi khas Balikpapan.',
    promo_code: 'DAPOER10',
    cta_text: 'Lihat Semua Menu',
    link_url: '/#products',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'ban-02',
    image_url: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1600&q=80',
    title: 'Hampers Spesial Hari Raya & Momen Berharga',
    subtitle: 'Kirimkan kehangatan rasa untuk keluarga dan kerabat dengan kemasan box premium eksklusif.',
    promo_code: 'LEBARANHEMAT',
    cta_text: 'Pesan Hampers',
    link_url: '/hampers',
    is_active: true,
    sort_order: 2,
  },
];

export const MOCK_REVIEWS: MockReview[] = [];

export const MOCK_PROMOS = [
  { id: 'pro-01', code: 'DAPOER10', discount_percent: 10, max_discount: 25000, min_purchase: 50000, is_active: true },
  { id: 'pro-02', code: 'GRATISONGKIR', discount_percent: 100, max_discount: 15000, min_purchase: 100000, is_active: true },
  { id: 'pro-03', code: 'LEBARANHEMAT', discount_percent: 15, max_discount: 50000, min_purchase: 200000, is_active: true },
];

export const MOCK_ORDERS: MockOrder[] = [];

