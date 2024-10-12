import React from 'react';
import Title from '@/components/Title';
import Overview from './_components/Overview';
import HeroSection from './_components/HeroSection';
import PreviewList from './_components/PreviewList';
import SpaceDesign from './_components/SpaceDesign';

import { getFaqs } from '@/app/faq/_lib/faqService';
import Accordion from '@/app/faq/_components/Accordion';

export const revalidate = 60; // 60초마다 재검증

export default async function Home() {
  const faq_site = await getFaqs({ tableName: 'faq-site' });
  const faq_move_in = await getFaqs({ tableName: 'faq-move-in' });
  const faq_room = await getFaqs({ tableName: 'faq-room' });

  return (
    <div>
      <HeroSection />
      <div className="px-4 pb-6 pt-4">
        <Overview />
        <SpaceDesign />
        <Title title="Notice" href="/notice" isMainPage={true} />
        <PreviewList tableName="notices" />
        <Title title="FAQ" href="/faq" isMainPage={true} />
        <Accordion faqs={faq_move_in} title={'생활 및 계약 관련'} />
        <Accordion faqs={faq_room} title={'ROOM'} />
        <Accordion faqs={faq_site} title={'사이트 안내사항'} />
      </div>
    </div>
  );
}
