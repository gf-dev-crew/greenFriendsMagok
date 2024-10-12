import { clientHelpers, serverHelpers } from '@/lib/supabase/helper';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NoticeTable } from '@/lib/types/databaseTypes';

// 모든 공지사항을 가져오는 함수 (ServerComponent)
export async function getNotices(): Promise<NoticeTable[]> {
  return serverHelpers.fetchAllFromTable('notices');
}

// 특정 ID의 공지사항을 가져오는 함수 (ServerComponent)
export async function getNoticeById(id: number): Promise<NoticeTable | null> {
  return serverHelpers.fetchOneFromTable('notices', id);
}

// 해당 카테고리에 속하는 공지사항을 가져오는 함수 (ClientComponent)
export async function getFilteredNotices(category: string): Promise<NoticeTable[]> {
  return clientHelpers.fetchFilteredFromTable('notices', category);
}

// 최근 공지사항의 제목, ID, 생성일을 가져오는 함수 (ServerComponent)
export async function getRecentNotices(
  limit: number = 5,
): Promise<Pick<NoticeTable, 'id' | 'title' | 'created_at' | 'author'>[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('notices')
    .select('id, title, created_at, author')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('최근 공지사항을 가져오는 중 오류 발생:', error);
    return [];
  }

  return data || [];
}
