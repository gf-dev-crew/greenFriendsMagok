/* 기본 타입 */
export interface BaseRecord {
  id: number;
  created_at: string;
}

/* 공지사항 태그 타입 */
export type NoticeTag = '알림' | '공식' | 'Event' | '기타' | '전체';

/* 공지사항 게시글 타입 */
export interface NoticeTable extends BaseRecord {
  title: string;
  content: string;
  author: string;
  category: NoticeTag;
  image?: string;
}

/* Forum 게시글 타입 */
export interface ForumPostTable extends BaseRecord {
  title: string;
  content: string;
  author: string;
}

/* FAQ 타입 */
export interface FAQTable {
  id: number;
  question: string;
  answer: string;
}

/* 테이블 이름 정의 */
export type TableName = 'notices' | 'forum_posts' | 'faqs';

/* 테이블별 레코드 타입 */
export type RecordType<T extends TableName> = T extends 'notices'
  ? NoticeTable
  : T extends 'forum_posts'
    ? ForumPostTable
    : never;
