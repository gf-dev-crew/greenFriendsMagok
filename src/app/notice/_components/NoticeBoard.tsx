'use client';

import { NoticeTable } from '@/lib/types/database';
import { useCategoryStore } from '@/lib/stores/categoryStore';
import { getFilteredNotices } from '@/app/notice/_lib/noticeService';
import { useEffect, useState } from 'react';
import NoticeItem from './NoticeItem';

// 공지사항 게시판 컴포넌트의 props 타입 정의
interface NoticeBoardProps {
  initialNotices: NoticeTable[];
}

export default function NoticeBoard({ initialNotices }: NoticeBoardProps) {
  // 상태 관리: 공지사항 목록, 로딩 상태, 에러 메시지
  const [notices, setNotices] = useState<NoticeTable[]>(initialNotices);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 스토어에서 선택된 카테고리 가져오기
  const { selectedCategory } = useCategoryStore();

  // 선택된 카테고리가 변경될 때마다 공지사항 필터링
  useEffect(() => {
    async function fetchFilteredNotices() {
      setIsLoading(true);
      setError(null);
      try {
        if (selectedCategory === '전체') {
          // '전체' 카테고리 선택 시 초기 공지사항 표시
          setNotices(initialNotices);
        } else {
          // 선택된 카테고리에 따라 공지사항 필터링
          const filteredNotices = await getFilteredNotices(selectedCategory);
          setNotices(filteredNotices);
        }
      } catch (error) {
        console.error('공지사항을 가져오는 중 오류 발생:', error);
        setError('공지사항을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchFilteredNotices();
  }, [selectedCategory, initialNotices]);

  // 로딩 중일 때 표시할 내용
  if (isLoading) {
    return (
      <div className="my-5 flex h-[300px] w-full justify-center">
        <p className="flex items-center justify-center text-xl font-bold text-tertiary">Loading 💫</p>
      </div>
    );
  }

  // 에러 발생 시 표시할 내용
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // 공지사항 목록 렌더링
  return (
    <div className="my-5 flex flex-col">
      {notices.length > 0 ? (
        notices.map((notice) => <NoticeItem key={notice.id} notice={notice} />)
      ) : (
        <div className="my-5 flex h-[300px] w-full justify-center">
          <p className="flex items-center justify-center text-xl font-bold text-secondary">
            현재 카테고리의 공지사항이 없습니다
          </p>
        </div>
      )}
    </div>
  );
}
