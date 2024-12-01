import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function getFiles(fileTargetType: number, fileTargetId: number) {
    const supabase = await createServerSupabaseClient();
    const tableName = "file"
    const columns = "file_url"
    const { data, error } = await supabase.from(tableName).select(columns).eq('file_target_type', fileTargetType).eq('file_target_id', fileTargetId)

    if (error) {
        console.error(`서버: ${tableName}에서 ID ${fileTargetId}의 레코드를 가져오는 중 오류 발생:`, error);
        return null;
    }
    else {
        if (data && data.length > 0) {
            return data;
        } else {
            console.warn(`서버: ${tableName}에서 ${fileTargetId}에 해당하는 데이터가 없습니다.`);
            return null;
        }
    }
}