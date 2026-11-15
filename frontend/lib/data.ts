export interface Product {
  id: string;
  nama_produk: string;
  slug: string;
  deskripsi: string;
  foto_2: string;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  produk_id: string;
  ukuran: string;
  price: number;
  img: string;
  foto_3: string | null;
  stok: number;
}

export interface Banner {
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

export interface Review {
  id: string;
  produk_id?: string;
  varian_id: string;
  user_id: string;
  user_name: string;
  nama_user?: string;
  rating: number;
  comment: string;
  reply?: string | null;
  created_at: string;
}

export interface OrderItem {
  name: string;
  variant: string;
  price: number;
  qty: number;
  img: string;
}

export interface Order {
  id: string;
  user_id: string;
  customer_name: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_cost: number;
  tracking_number: string | null;
  shipping_courier: string;
  destination_address: string;
  created_at: string;
  items: OrderItem[];
}

export interface PromoCode {
  id: string;
  code: string;
  discount_percent: number;
  max_discount: number;
  min_purchase: number;
  is_active: boolean;
}

export interface ShippingArea {
  id: string;
  name: string;
  postal_code: string;
  city_name: string;
  province_name: string;
}

export interface ShippingRate {
  courier_name: string;
  courier_service_name: string;
  price: number;
  duration: string;
  service_type: string;
  type: string;
}

export interface UserProfile {
  id: string;
  nama_user: string;
  email: string;
  role: 'owner' | 'admin' | 'customer';
  phone: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  receiver_name: string;
  phone: string;
  full_address: string;
  area_id: string;
  is_primary: boolean;
}

// -------------------------------------------------------------
// DATASET UTAMA TOKO (PURE CLIENT-SIDE)
// -------------------------------------------------------------

export const DEFAULT_USER: UserProfile = {
  id: '',
  nama_user: '',
  email: '',
  role: 'customer',
  phone: '',
};

export const DEFAULT_ADDRESSES: Address[] = [];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    nama_produk: 'Nastar Wisman Spesial',
    slug: 'nastar-wisman-spesial',
    deskripsi: 'Nastar premium dengan butter Wijsman murni dan isian selai nanas segar asam manis khas DapoerDjawa. Tekstur renyah di luar dan lumer di mulut.',
    foto_2: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'prod-02',
    nama_produk: 'Kastengel Keju Edam Asli',
    slug: 'kastengel-keju-edam-asli',
    deskripsi: 'Kastengel renyah dan gurih dengan kombinasi Keju Edam tua asli dan taburan keju cheddar panggang yang melimpah.',
    foto_2: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-02T00:00:00Z',
  },
  {
    id: 'prod-03',
    nama_produk: 'Putri Salju Pandan Mede',
    slug: 'putri-salju-pandan-mede',
    deskripsi: 'Kue putri salju beraroma pandan alami dengan cincangan kacang mede gurih dan balutan gula halus dingin yang segar.',
    foto_2: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-03T00:00:00Z',
  },
  {
    id: 'prod-04',
    nama_produk: 'Lidah Kucing Crispy Butter',
    slug: 'lidah-kucing-crispy-butter',
    deskripsi: 'Kue lidah kucing tipis, garing, dan super renyah dengan aroma susu dan mentega berkualitas tinggi.',
    foto_2: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-04T00:00:00Z',
  },
  {
    id: 'prod-05',
    nama_produk: 'Sagu Keju Lumer Premium',
    slug: 'sagu-keju-lumer-premium',
    deskripsi: 'Kue sagu keju klasik dengan santan kental dan keju gurih. Langsung lumer seketika saat menyentuh lidah.',
    foto_2: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-05T00:00:00Z',
  },
  {
    id: 'prod-06',
    nama_produk: 'Choco Cashew Crunchy Cookies',
    slug: 'choco-cashew-crunchy-cookies',
    deskripsi: 'Kue cokelat dark couverture lezat bertabur kacang mete renyah panggang, manis pas dan tidak enek.',
    foto_2: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-06T00:00:00Z',
  },
  {
    id: 'prod-07',
    nama_produk: 'Semprit Dahlia Butter Jadul',
    slug: 'semprit-dahlia-butter-jadul',
    deskripsi: 'Kue semprit bunga dahlia klasik dengan hiasan choco chip di puncaknya. Cita rasa nostalgia keluarga.',
    foto_2: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-07T00:00:00Z',
  },
  {
    id: 'prod-08',
    nama_produk: 'Hampers Sultan DapoerDjawa',
    slug: 'hampers-sultan-dapoerdjawa',
    deskripsi: 'Paket hampers eksklusif isi 4 toples kue kering pilihan dalam hardbox mewah berhias pita satin dan kartu ucapan kustom.',
    foto_2: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-01-08T00:00:00Z',
  },
];

export const VARIANTS: ProductVariant[] = [
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
  { id: 'var-08-1', produk_id: 'prod-08', ukuran: 'Box Eksklusif 4 Toples', price: 295000, img: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&q=80', foto_3: null, stok: 15 },
];

export const HERO_BANNERS: Banner[] = [
  {
    id: 'ban-01',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1600&q=80',
    title: 'Kue Kering Premium Butter Wijsman',
    subtitle: 'Rasa autentik resep warisan keluarga khas Balikpapan yang renyah dan lumer di mulut.',
    promo_code: 'DAPOER10',
    cta_text: 'Pesan Sekarang',
    link_url: '/#shop',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'ban-02',
    image_url: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1600&q=80',
    title: 'Hampers Spesial Hari Raya & Hajatan',
    subtitle: 'Kemasan eksklusif hardbox mewah dengan ucapan hangat untuk orang terkasih.',
    promo_code: 'LEBARANHEMAT',
    cta_text: 'Lihat Hampers',
    link_url: '/hampers',
    is_active: true,
    sort_order: 2,
  },
];

export const REVIEWS: Review[] = [];

export const PROMO_CODES: PromoCode[] = [
  { id: 'pro-01', code: 'DAPOER10', discount_percent: 10, max_discount: 25000, min_purchase: 50000, is_active: true },
  { id: 'pro-02', code: 'GRATISONGKIR', discount_percent: 100, max_discount: 15000, min_purchase: 100000, is_active: true },
  { id: 'pro-03', code: 'LEBARANHEMAT', discount_percent: 15, max_discount: 50000, min_purchase: 200000, is_active: true },
];

export const SHIPPING_AREAS: ShippingArea[] = [
  { id: 'area-bpn-01', name: 'Balikpapan Kota', postal_code: '76111', city_name: 'Balikpapan', province_name: 'Kalimantan Timur' },
  { id: 'area-bpn-02', name: 'Balikpapan Selatan', postal_code: '76114', city_name: 'Balikpapan', province_name: 'Kalimantan Timur' },
  { id: 'area-bpn-03', name: 'Balikpapan Utara', postal_code: '76125', city_name: 'Balikpapan', province_name: 'Kalimantan Timur' },
  { id: 'area-bpn-04', name: 'Balikpapan Tengah', postal_code: '76121', city_name: 'Balikpapan', province_name: 'Kalimantan Timur' },
  { id: 'area-bpn-05', name: 'Balikpapan Barat', postal_code: '76131', city_name: 'Balikpapan', province_name: 'Kalimantan Timur' },
  { id: 'area-bpn-06', name: 'Balikpapan Timur', postal_code: '76117', city_name: 'Balikpapan', province_name: 'Kalimantan Timur' },
  { id: 'area-smd-01', name: 'Samarinda Kota', postal_code: '75111', city_name: 'Samarinda', province_name: 'Kalimantan Timur' },
];

export const SHIPPING_RATES: ShippingRate[] = [
  { courier_name: 'JNE', courier_service_name: 'Reguler (REG)', price: 18000, duration: '1-2 hari', service_type: 'standard', type: 'jne' },
  { courier_name: 'J&T', courier_service_name: 'EZ Standard', price: 19000, duration: '1-2 hari', service_type: 'standard', type: 'jnt' },
  { courier_name: 'SiCepat', courier_service_name: 'BEST Express', price: 22000, duration: '1 hari', service_type: 'express', type: 'sicepat' },
  { courier_name: 'Grab / GoSend', courier_service_name: 'Instant Delivery Balikpapan', price: 15000, duration: '2-3 jam', service_type: 'instant', type: 'instant' },
];

export const INITIAL_ORDERS: Order[] = [];

export const DASHBOARD_STATS = {
  total_revenue: 0,
  total_orders: 0,
  total_customers: 0,
  average_order_value: 0,
  popular_products: [],
  monthly_sales: [],
};
