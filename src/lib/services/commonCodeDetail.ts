import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function getFilteredCommonCodeId(codeDetailName: string) {
    const supabase = await createServerSupabaseClient();
    const tableName = "common_code_detail"
    const columns = "code_detail_id"
    const { data, error } = await supabase.from(tableName).select(columns).eq('code_detail_name', codeDetailName)
    if (error) {
        console.error(`서버: ${tableName}에서 ID ${codeDetailName}의 레코드를 가져오는 중 오류 발생:`, error);
        return null;
    }
    else {
        if (data && data.length > 0 && data[0].code_detail_id !== undefined) {
            return data[0].code_detail_id;
        } else {
            console.warn(`서버: ${tableName}에서 ${codeDetailName}에 해당하는 데이터가 없습니다.`);
            return null;
        }
    }
}