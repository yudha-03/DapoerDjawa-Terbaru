import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  { href: 'https://instagram.com/_dapoer_djawa', img: '/instagram.png', alt: 'Instagram DapoerDjawa' },
  { href: 'https://tiktok.com/@dapoer_djawa', img: '/tiktok.png', alt: 'TikTok DapoerDjawa' },
  { href: 'https://wa.me/62895383270632', img: '/wa.png', alt: 'WhatsApp DapoerDjawa' },
];

const footerLinks = [
  { href: '/kue-kering', label: 'Kue Kering' },
  { href: '/hampers', label: 'Hampers' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Hubungi Kami' },
  { href: '/delivery-balikpapan', label: 'Pengiriman' },
  { href: '/panduan/cara-menyimpan-kue-kering', label: 'Panduan Penyimpanan' },
  { href: '/terms-conditions', label: 'Syarat & Ketentuan' },
  { href: '/return-policy', label: 'Kebijakan Pengembalian' },
  { href: '/privacy-policy', label: 'Kebijakan Privasi' },
];

export const Footer = () => (
  <footer
    className="mt-auto w-full border-t border-gray-200 bg-gray-50 py-10 animate-[fadeIn_0.5s_ease-out_both]"
  >
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <p className="text-center text-sm text-gray-600 md:text-left">
            &copy; {new Date().getFullYear()} DapoerDjawa. Hak cipta dilindungi.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
            {footerLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs text-gray-500 transition-colors hover:text-black hover:underline py-2">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          {socialLinks.map(({ href, img, alt }) => (
            <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt} className="flex items-center justify-center p-2 rounded-full transition-transform hover:scale-105">
              <Image src={img} alt={alt} width={32} height={32} className="h-8 w-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
