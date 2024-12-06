import { clientHelpers, serverHelpers } from '@/lib/supabase/helper';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { NoticeTable, NoticeRow, NoticeRowInsert, NoticeRowUpdate } from '@/lib/types/databaseTypes';
import { Database } from '@/lib/types/types_db';
import { getFilteredCommonCodeId } from './commonCodeDetail';
import { getFiles } from './fileService';
import { pagenation } from '../utils/pagenation';
import { handledError, handledUploadError } from '@/lib/utils/error';

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
  호출방법 : const initialNotices = await getNotices(nowPage, isLast);
*/
export async function getNotice(nowPage: number, isLast: boolean): Promise<{}> {
  const supabase = await createServerSupabaseClient();
  const tableName = 'notice'
  const columns = '*'
  let query = supabase.from(tableName).select(columns).order('fixed_yn', { ascending: false }).order('created_at', { ascending: false });
  const { count, error } = await supabase.from(tableName).select(columns, { count: 'exact' }).order('fixed_yn', { ascending: false }).order('created_at', { ascending: false });
  if (count != null && count > 0) {
    return pagenation(nowPage, isLast, query, count, tableName)
  }
  if (error) {
    return handledError(error, tableName);
  }
  return [];
}

/*
  [eunseong.son]
  해당 카테고리에 속하는 공지사항을 가져오는 함수 (ClientComponent)
  페이지네이션 10개 고정
  category : 알립니다 / 입주
  호출방법 : const filteredNotices= await getFilteredNotices('입주', 1, false);
*/
export async function getFilteredNotice(category: string, nowPage: number, isLast: boolean): Promise<{}> {
  const supabase = await createServerSupabaseClient();
  const tableName = "notice"
  const columns = "*"
  const code_detail_id = await getFilteredCommonCodeId(200, category) as number
  console.log("code ::", code_detail_id)

  let query = supabase.from(tableName).select(columns, { count: 'exact' }).order('fixed_yn', { ascending: false }).order('created_at', { ascending: false });

  if (category !== '전체') {
    query = query.eq('category_cd', code_detail_id)
  }
  const { data, count, error } = await query;
  if (count != null && count > 0) {
    return pagenation(nowPage, isLast, query, count, tableName)
  }
  if (error) {
    return handledError(error, tableName);
  }
  return data || [];
}

/*
  [eunseong.son]
  특정 ID의 공지사항을 가져오는 함수 (ServerComponent)
  호출방법 : const noticeById = await getNoticeById(18);
*/
// export async function getNoticeById(id: number): Promise<NoticeRow | null> {
//   const supabase = await createServerSupabaseClient();
//   const tableName = 'notice'
//   const { data, error } = await supabase.from(tableName).select('*').eq('notice_id', id).single();
//   const images = await getFiles(6, id)

//   if (error) {
//     return handledError(error, tableName);
//   }

//   (data as any).images = images
//   return data || [];
// }

// 공지사항 Insert
export async function insertNotice(notice: NoticeRowInsert) {
  const supabase = await createServerSupabaseClient();
  const tableName = 'notice'
  const notice_image = notice.notice_image
  const notice_image_path = await uploadNoticeImage(notice_image)
  if (notice_image_path) {
    const { data, error } = await supabase.from(tableName).insert({
      ...notice,
      notice_image: notice_image_path,
    });
  }
}

// 공지사항 Update
export async function updateNotice(notice: NoticeRowUpdate) {
  const supabase = await createServerSupabaseClient();
  const tableName = 'notice'
  const notice_image = notice.notice_image
  const notice_image_path = await uploadNoticeImage(notice_image)
  if (notice_image_path && notice.notice_id) {
    const { data, error } = await supabase.from(tableName).update({
      ...notice,
      notice_image: notice_image_path,
      updated_at: new Date().toISOString()
    }).eq('notice_id', notice.notice_id);
  }
}

// 공지사항 Delete
export async function deleteNotice(notice_id: number) {
  const supabase = await createServerSupabaseClient();
  const tableName = 'notice'
  const response = await supabase.from(tableName).delete().eq('notice_id', notice_id);
}

// 공지사항 이미지 업로드
export async function uploadNoticeImage(file: any) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage.from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${process.env.NOTICE_BUCKET}`)
    .upload(file.name + crypto.randomUUID(), file, { upsert: true });

  if (error) {
    return handledUploadError(error, `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${process.env.NOTICE_BUCKET}`);
  }
  console.log("upload Data :: ", data)
  return data;
}

// // 최근 공지사항의 제목, ID, 생성일을 가져오는 함수 (ServerComponent)
// export async function getS_RecentNotices(
//   limit: number = 5,
// ): Promise<Pick<NoticeRow, 'id' | 'title' | 'created_at' | 'create_user'>[]> {
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
