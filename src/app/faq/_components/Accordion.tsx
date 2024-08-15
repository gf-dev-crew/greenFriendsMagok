'use client';

import { useState } from 'react';
import { FAQTable } from '@/lib/types/database';
import AccordionItem from './AccordionItem';

interface FaqProps {
  faqs: FAQTable[];
  title: string;
}

export default function Accordion({ faqs, title }: FaqProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null); // 현재 열려있는 FAQ의 ID를 저장. 아무것도 열려있지 않으면 null

  // FAQ 항목을 토글하는 함수
  const toggleAccordion = (id: number) => {
    setOpenFaqId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col divide-y divide-black">
      <div className="flex flex-col py-3">
        <span className="text-xl font-bold">{title}</span>
      </div>
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          faq={faq}
          isOpen={openFaqId === faq.id}
          toggleAccordion={() => toggleAccordion(faq.id)}
        />
      ))}
    </div>
  );
}
