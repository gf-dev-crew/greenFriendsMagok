import { createServerSupabaseClient } from '@/lib/supabase-server';
import { FAQTable } from '@/lib/types/database';

export async function getFaqs({ tableName }: { tableName: string }): Promise<FAQTable[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from(tableName).select('*').order('id', { ascending: true });

  if (error) {
    console.error('FAQ에서 데이터를 가져오는 중 오류 발생:', error);
    return [];
  }

  return data as FAQTable[];
}
