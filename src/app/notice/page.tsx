import Title from '@/components/Title';
import SlideCategory from '@/components/SlideCategory';
import NoticeBoard from './_components/NoticeBoard';
import { getNotices } from './_lib/noticeService';

export default async function NoticesPage() {
  const initialNotices = await getNotices();

  return (
    <section>
      <Title title="Notice" href="/board" isMainPage={false} />
      <SlideCategory boardType="notice" />
      <NoticeBoard initialNotices={initialNotices} />
    </section>
  );
}
