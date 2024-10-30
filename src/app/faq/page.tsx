import Title from '@/components/Title';
import { getFaqs } from '../../lib/services/faqService';
import Accordion from './_components/Accordion';

export default async function FAQ() {
  const faq_site = await getFaqs({ tableName: 'faq-site' });
  const faq_move_in = await getFaqs({ tableName: 'faq-move-in' });
  const faq_room = await getFaqs({ tableName: 'faq-room' });

  return (
    <section className="px-4 pb-6 pt-4">
      <Title title="FAQ" href="/faq" isMainPage={false} />
      <Accordion faqs={faq_move_in} title={'생활 및 계약 관련'} />
      <Accordion faqs={faq_room} title={'ROOM'} />
      <Accordion faqs={faq_site} title={'사이트 안내사항'} />
    </section>
  );
}
