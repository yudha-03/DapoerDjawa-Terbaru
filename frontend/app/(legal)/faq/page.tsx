import type { Metadata } from 'next';

import { STORE_NAME } from '@/lib/store-defaults';
import { escapeJsonLd } from '@/lib/sanitize';
import { getFaqSchemaQuestions } from '@/lib/questions';
import FAQ from './components/FAQ';

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan Umum',
  description: `Temukan jawaban atas pertanyaan yang sering diajukan seputar produk, pemesanan, pengiriman, dan pembayaran di ${STORE_NAME}.`,
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  const faqQuestions = getFaqSchemaQuestions();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqQuestions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(faqJsonLd) }}
      />
      <FAQ />
    </>
  );
}
