import Title from '@/components/Title';
import SlideCategory from '@/components/SlideCategory';

export default async function CommunityPage() {
  // const initialNotices = await getNotices();

  return (
    <section>
      <Title title="Community" href="/community" isMainPage={false} />
      <SlideCategory boardType="community" />
      {/* <NoticeBoard initialNotices={initialNotices} /> */}
    </section>
  );
}
