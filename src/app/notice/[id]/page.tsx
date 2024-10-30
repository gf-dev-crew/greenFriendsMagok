import { BackButtonServer } from '@/components/_index';
import ReplyHeader from './_components/ReplyHeader';
import { getNoticeById } from '../../../lib/services/noticeService';
import { NoticeTable } from '@/lib/types/database';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import ReplyList from './_components/ReplyList';

export const revalidate = 60; // 60초마다 재검증

const exampleReplies = [
  {
    id: 1,
    author: '김철수',
    date: '2024-09-18 14:30',
    content: '정말 유익한 글이네요. 앞으로도 좋은 정보 많이 공유해주세요!',
  },
  {
    id: 2,
    author: '이영희',
    date: '2024-09-18 15:45',
    content: '저도 같은 생각입니다. 특히 세 번째 포인트가 인상 깊었어요.',
  },
  {
    id: 3,
    author: '박지성',
    date: '2024-09-19 09:10',
    content: '궁금한 점이 있는데요. 혹시 이 내용에 대해 추가 자료가 있을까요?',
  },
  {
    id: 4,
    author: '최민지',
    date: '2024-09-19 11:25',
    content: '글쓴이의 관점이 참신해서 새로운 시각을 얻었습니다. 감사합니다!',
  },
  {
    id: 5,
    author: '정태우',
    date: '2024-09-19 16:50',
    content: '이 주제에 대해 토론해보고 싶네요. 다들 어떻게 생각하시나요?',
  },
];

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  const notice: NoticeTable | null = await getNoticeById(parseInt(params.id));

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-2">
      <BackButtonServer className="mb-2" />
      <div className="pt-1 text-sm font-semibold text-secondary">{notice.category}</div>
      <h3 className="text-lg font-bold xs:text-xl">{notice.title}</h3>
      {/* 작성자 정보 + 해당 게시글 관련 버튼 */}
      <div className="flex justify-between border-b border-primary py-2">
        {/* 작성자 프로필, 작성자 닉네임, 작성시간 */}
        <div>
          <p className="center flex items-center justify-start text-sm font-semibold">{notice.author}</p>
          <p className="center flex items-center justify-center text-xs text-gray-500">
            {new Date(notice.created_at).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </p>
        </div>
        {/* 메뉴 */}
        <div className="flex items-center">
          <div className="inline-block">
            <button
              className="flex h-9 flex-col items-center justify-center pl-4"
              aria-label="게시글 메뉴 열기"
              aria-haspopup="true"
            >
              <span className="sr-only">게시글 메뉴</span>
              <div className="flex flex-col space-y-1">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-500"></span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-500"></span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-500"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="whitespace-pre-wrap py-2 text-14">
        {notice.image && (
          <Image
            src={notice.image}
            alt="공지사항 이미지"
            width={400}
            height={300}
            className="mb-4 h-auto w-full object-contain"
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3C/svg%3E"
            loading="eager"
          />
        )}
        <ReactMarkdown>{notice.content}</ReactMarkdown>
      </div>
      {/* <div className="mb-2 border-b border-primary py-1"></div> */}
      <ReplyHeader />
      <ReplyList replies={exampleReplies} />
    </div>
  );
}
