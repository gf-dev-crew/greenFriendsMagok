import { clientHelpers, serverHelpers } from '@/lib/supabase/helper';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { NoticeTable, S_NoticeTable } from '@/lib/types/databaseTypes';
import { Database } from '@/lib/types/types_db';
import { getFilteredCommonCodeId } from './commonCodeDetail';
import { getFiles } from './fileService';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

type Row<T extends TableName> = Tables[T]['Row'];


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

/*
  [eunseong.son]
  모든 공지사항을 가져오는 함수 (ServerComponent)
  페이지네이션 10개 고정
  고정여부 체크 / 최근 작성일 순서대로
  호출방법 : const S_initialNotices = await getS_Notices(nowPage, isLast);
*/
export async function getS_Notices(nowPage: number, isLast: boolean): Promise<{}> {
  const supabase = await createServerSupabaseClient();
  const tableName = 'notice'
  const columns = '*'
  let lastPage = 1
  let returnData = { data: [], count: 0, lastPage: 1 } as { data: any, count: number, lastPage: number }
  let query = supabase.from(tableName).select(columns).order('fixed_yn', { ascending: false }).order('created_at', { ascending: false });
  const { count, error } = await supabase.from(tableName).select(columns, { count: 'exact' }).order('fixed_yn', { ascending: false }).order('created_at', { ascending: false });
  if (nowPage == 1) { // 처음 데이터 호출 시
    if (count != null && count > 10) { // 데이터가 10개 이상 있을 시
      lastPage = Math.floor(count / 10) + 1
      const { data, error } = await query.range(0, 9);
      returnData.data = data
      returnData.count = count
      returnData.lastPage = lastPage
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return returnData || []
    } else { // 데이터가 10개 미만일 시
      const { data, error } = await query;
      returnData.data = data
      returnData.count = count ? count : 0
      returnData.lastPage = lastPage
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return returnData || []
    }
  }
  else if (nowPage > 1) { // 페이지 데이터 호출 시
    if (isLast) { // 마지막 페이지 일 때
      const { data, error } = await query.range(nowPage * 10 - 10, count ? count - 1 : 0);
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return data || []
    } else { // 마지막 페이지가 아닐 때
      const { data, error } = await query.range(nowPage * 10 - 10, nowPage * 10 - 1);
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return data || []
    }
  }
  if (error) {
    console.error(`서버: ${tableName}에서 데이터를 가져오는 중 오류 발생:`, error);
    return [];
  }
  return [];
}

/*
  [eunseong.son]
  해당 카테고리에 속하는 공지사항을 가져오는 함수 (ClientComponent)
  페이지네이션 10개 고정
  category : 알립니다 / 입주
  호출방법 : const S_filteredNotices= await getS_FilteredNotices('입주', 1, false);
*/
export async function getS_FilteredNotices(category: string, nowPage: number, isLast: boolean): Promise<{}> {
  const supabase = await createServerSupabaseClient();
  const tableName = "notice"
  const columns = "*"
  const code_detail_id = await getFilteredCommonCodeId(category) as number
  console.log("code ::", code_detail_id)
  let lastPage = 1
  let returnData = { data: [], count: 0, lastPage: 1 } as { data: any, count: number, lastPage: number }

  let query = supabase.from(tableName).select(columns, { count: 'exact' }).order('fixed_yn', { ascending: false }).order('created_at', { ascending: false });

  if (category !== '전체') {
    query = query.eq('category_cd', code_detail_id)
  }

  const { data, count, error } = await query;

  if (nowPage == 1) { // 처음 데이터 호출 시
    if (count != null && count > 10) { // 데이터가 10개 이상 있을 시
      lastPage = Math.floor(count / 10) + 1
      const { data, error } = await query.range(0, 9);
      returnData.data = data
      returnData.count = count
      returnData.lastPage = lastPage
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return returnData || []
    } else { // 데이터가 10개 미만일 시
      const { data, error } = await query;
      returnData.data = data
      returnData.count = count ? count : 0
      returnData.lastPage = lastPage
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return returnData || []
    }
  }
  else if (nowPage > 1) { // 페이지 데이터 호출 시
    if (isLast) { // 마지막 페이지 일 때
      const { data, error } = await query.range(nowPage * 10 - 10, count ? count - 1 : 0);
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return data || []
    } else { // 마지막 페이지가 아닐 때
      const { data, error } = await query.range(nowPage * 10 - 10, nowPage * 10 - 1);
      if (error) {
        return getErrorMessage(error, tableName);
      }
      return data || []
    }
  }
  if (error) {
    console.error(`서버: ${tableName}에서 데이터를 가져오는 중 오류 발생:`, error);
    return [];
  }
  return data || [];
}

/*
  [eunseong.son]
  특정 ID의 공지사항을 가져오는 함수 (ServerComponent)
  호출방법 : const S_noticeById = await getS_NoticeById(18);
*/
export async function getS_NoticeById(id: number): Promise<S_NoticeTable | null> {
  const supabase = await createServerSupabaseClient();
  const tableName = 'notice'
  const { data, error } = await supabase.from(tableName).select('*').eq('notice_id', id).single();
  const images = await getFiles(6, id)

  if (error) {
    console.error(`서버: ${tableName}에서 ID ${id}의 레코드를 가져오는 중 오류 발생:`, error);
    return null;
  }
  
  (data as any).images = images
  return data || [];
}

// // 최근 공지사항의 제목, ID, 생성일을 가져오는 함수 (ServerComponent)
// export async function getS_RecentNotices(
//   limit: number = 5,
// ): Promise<Pick<S_NoticeTable, 'id' | 'title' | 'created_at' | 'create_user'>[]> {
//   const supabase = await createServerSupabaseClient();
//   const { data, error } = await supabase
//     .from('notice')
//     .select('id, title, created_at, create_user')
//     .order('created_at', { ascending: false })
//     .limit(limit);

//   if (error) {
//     console.error('최근 공지사항을 가져오는 중 오류 발생:', error);
//     return [];
//   }

//   return data || [];
// }

function getErrorMessage(error: any, tableName: string): any[] {
  console.error(`서버: ${tableName}에서 데이터를 가져오는 중 오류 발생:`, error);
  return [];
}