'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { getQuestionsByCategory } from '@/lib/questions';

const faqCategories = getQuestionsByCategory();

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

  return (
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Pertanyaan Umum (FAQ)</h1>
          <p className="mb-8 border-b border-gray-100 pb-8 text-sm text-gray-500">
            Temukan jawaban atas pertanyaan yang sering diajukan seputar DapoerDjawa.
          </p>
          <div className="space-y-8">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="mb-4 text-lg font-bold text-gray-900">{cat.category}</h2>
                <div className="space-y-2">
                  {cat.items.map((item, idx) => {
                    const key = `${cat.category}-${idx}`;
                    const isOpen = openIndex === key;
                    return (
                      <div key={key} className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                        <button
                          id={`faq-btn-${key}`}
                          onClick={() => toggleItem(key)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${key}`}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                        >
                          <span>{item.question}</span>
                          <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                          id={`faq-panel-${key}`}
                          role="region"
                          aria-labelledby={`faq-btn-${key}`}
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                          <div className="overflow-hidden">
                            <p className="px-5 pb-4 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
