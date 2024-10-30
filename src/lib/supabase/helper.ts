import { createBrowserSupabaseClient } from './client';
import { createServerSupabaseClient } from './server';
import { Database } from '@/lib/types/types_db';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

type Row<T extends TableName> = Tables[T]['Row'];

/* 클라이언트 측 헬퍼 함수들 */
export const clientHelpers = {
  // 모든 행을 가져오는 함수
  async fetchAllFromTable<T extends TableName>(tableName: T, columns: string = '*'): Promise<Row<T>[]> {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.from(tableName).select(columns).order('created_at', { ascending: false });

    if (error) {
      console.error(`클라이언트: ${tableName}에서 데이터를 가져오는 중 오류 발생:`, error);
      return [];
    }

    // 타입 단언을 사용하여 타입 에러 해결 (추후 수정 필요)
    return (data as unknown as Row<T>[]) || [];
  },

  // 단일 행을 가져오는 함수
  async fetchOneFromTable<T extends TableName>(tableName: T, id: number): Promise<Row<T> | null> {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();

    if (error) {
      console.error(`클라이언트: ${tableName}에서 ID ${id}의 레코드를 가져오는 중 오류 발생:`, error);
      return null;
    }

    return data as Row<T>;
  },

  // 필터링된 데이터를 가져오는 함수
  async fetchFilteredFromTable<T extends TableName>(
    tableName: T,
    category: string,
    columns: string = '*',
  ): Promise<Row<T>[]> {
    const supabase = createBrowserSupabaseClient();
    let query = supabase.from(tableName).select(columns).order('created_at', { ascending: false });

    if (category !== '전체') {
      query = query.ilike('category', `%${category}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`클라이언트: ${tableName}에서 데이터 가져오기 오류:`, error);
      return [];
    }

    return (data as unknown as Row<T>[]) || [];
  },
};

/* 서버 측 헬퍼 함수들 */
export const serverHelpers = {
  // 서버 측에서 모든 행을 가져오는 함수
  async fetchAllFromTable<T extends TableName>(tableName: T, columns: string = '*'): Promise<Row<T>[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from(tableName).select(columns).order('created_at', { ascending: false });

    if (error) {
      console.error(`서버: ${tableName}에서 데이터를 가져오는 중 오류 발생:`, error);
      return [];
    }

    return (data as unknown as Row<T>[]) || [];
  },

  // 서버 측에서 단일 행을 가져오는 함수
  async fetchOneFromTable<T extends TableName>(tableName: T, id: number): Promise<Row<T> | null> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();

    if (error) {
      console.error(`서버: ${tableName}에서 ID ${id}의 레코드를 가져오는 중 오류 발생:`, error);
      return null;
    }

    return (data as unknown as Row<T>) || null;
  },
};
