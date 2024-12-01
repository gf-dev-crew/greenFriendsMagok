import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getFiles } from './fileService';


type Program = {
    program_id: number;
    [key: string]: any; // 동적 속성 허용
};
let now = new Date().toISOString();
export async function getBanner() {
    const supabase = await createServerSupabaseClient();
    const tableName = "program"
    const columns = "program_id"
    const { data, error } = await supabase.from(tableName).select(columns).gt("program_start_time", now)

    if (error) {
        console.error(`서버: ${tableName}에서 ID 메인배너의 레코드를 가져오는 중 오류 발생:`, error);
        return null;
    }

    if (data) {
        for (const program of data as Program[]) {
            const bannerImage = await getFiles(7, program.program_id);
            program.bannerImage = bannerImage ? bannerImage[0] : "";
        }
        console.log(data);
        return data || [];
    }
}