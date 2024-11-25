import Title from '@/components/Title';
import SlideCategory from '@/components/SlideCategory';
import NoticeBoard from './_components/NoticeBoard';
import { getNotices, getS_Notices } from '../../lib/services/noticeService';

export default async function NoticesPage() {
  const initialNotices = await getNotices();
  const S_initialNotices = await getS_Notices();
  
  return (
    <section>
      <Title title="Notice" href="/notice" isMainPage={false} />
      <SlideCategory boardType="notice" />
      <NoticeBoard initialNotices={initialNotices} />
    </section>
  );
}
