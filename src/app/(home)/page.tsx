import React from 'react';
import Title from '@/components/Title';
import Carousel from './_components/Carousel';
import HeroSection from './_components/HeroSection';
import PreviewList from './_components/PreviewList';
import CalendarView from './_components/CalendarView';

import { getFaqs } from '@/lib/services/faqService';
import Accordion from '@/app/faq/_components/Accordion';
import SocialClub from './_components/SocialClub';

export const revalidate = 60; // 60초마다 재검증

export default async function Home() {
  const faq_site = await getFaqs({ tableName: 'faq-site' });
  const faq_move_in = await getFaqs({ tableName: 'faq-move-in' });
  const faq_room = await getFaqs({ tableName: 'faq-room' });

  return (
    <div>
      <Carousel />
      {/* <HeroSection /> */}
      <div className="px-4 pb-6 pt-4">
        <Title title="Calendar" href="/calendar" isMainPage={true} />
        <CalendarView />
        <Title title="Notice" href="/notice" isMainPage={true} />
        <PreviewList tableName="notices" />
        <Title title="Social Club" href="/socialclub" isMainPage={true} />
        <SocialClub />
        <Title title="고객센터" href="/customer-center" isMainPage={true} />
        {/* <Accordion faqs={faq_move_in} title={'생활 및 계약 관련'} />
        <Accordion faqs={faq_room} title={'ROOM'} />
        <Accordion faqs={faq_site} title={'사이트 안내사항'} /> */}
      </div>
    </div>
  );
}
