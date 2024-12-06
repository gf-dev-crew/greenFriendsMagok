import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ProgramRowInsert, ProgramRowUpdate } from '@/lib/types/databaseTypes';
import { getFiles } from './fileService';
import { pagenation } from '../utils/pagenation';
import { getFilteredCommonCodeId } from './commonCodeDetail';
import { handledError, handledUploadError } from '@/lib/utils/error';


type Program = {
    program_id: number;
    [key: string]: any; // 동적 속성 허용
};
let now = new Date().toISOString();
export async function getProgramBannerImage() {
    const supabase = await createServerSupabaseClient();
    const tableName = "program"
    const columns = "program_id, banner_image"
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

// 프로그램 전체 Select
export async function getPrograms(nowPage: number, isLast: boolean): Promise<{}> {
    const supabase = await createServerSupabaseClient();
    const tableName = 'program'
    const columns = '*'
    let query = supabase.from(tableName).select(columns).order('program_id', { ascending: false });
    const { count, error } = await supabase.from(tableName).select(columns, { count: 'exact' });
    if (count != null && count > 0) {
        return pagenation(nowPage, isLast, query, count, tableName)
    }
    if (error) {
        return handledError(error, tableName);
    }

    return [];
}

// 프로그램 카테고리 select
export async function getFilteredProgram(category: string, nowPage: number, isLast: boolean): Promise<{}> {
    const supabase = await createServerSupabaseClient();
    const tableName = 'program'
    const columns = '*'
    const code_detail_id = await getFilteredCommonCodeId(400, category) as number
    let query = supabase.from(tableName).select(columns).eq('program_type', code_detail_id).order('program_id', { ascending: false });
    const { count, error } = await supabase.from(tableName).select(columns, { count: 'exact' }).eq('program_type', code_detail_id)
    if (count != null && count > 0) {
        return pagenation(nowPage, isLast, query, count, tableName)
    }
    if (error) {
        return handledError(error, tableName);
    }
    return [];
}

// 프로그램 상세보기
export async function getIdProgram(program_id: number) {
    const supabase = await createServerSupabaseClient();
    const tableName = 'program'
    const columns = '*'
    const { data, error } = await supabase.from(tableName).select(columns).eq('program_id', program_id)

    if (error) {
        return handledError(error, tableName);
    }

    return data || [];
}

// 프로그램 Insert
export async function insertProgram(program: ProgramRowInsert) {
    const supabase = await createServerSupabaseClient();
    const program_image = program.program_image;
    const program_image_path = await uploadProgramImage(program_image);
    const banner_image = program.banner_image;
    const banner_image_path = await uploadProgramImage(banner_image);
    if (program_image_path && banner_image_path) {
        const { data, error } = await supabase.from('program').insert({
            ...program,
            program_image: program_image_path['path'],
            banner_image: banner_image_path['path'],
        })
    }
}

// 프로그램 Update
export async function updateProgram(program: ProgramRowUpdate) {
    const supabase = await createServerSupabaseClient();
    const program_image = program.program_image;
    const program_image_path = await uploadProgramImage(program_image);
    const banner_image = program.banner_image;
    const banner_image_path = await uploadProgramImage(banner_image);
    if (program_image_path && banner_image_path && program.program_id) {
        const { data, error } = await supabase.from('program').update({
            ...program,
            program_image: program_image_path['path'],
            banner_image: banner_image_path['path'],
            updated_at: new Date().toISOString()
        }).eq('program_id', program.program_id)
    }
}

// 프로그램 Delete
export async function deleteProgram(program_id: number) {
    const supabase = await createServerSupabaseClient();
    const response = await supabase.from('program').delete().eq('program_id', program_id);
}

// 프로그램 이미지 업로드
export async function uploadProgramImage(file: any) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.storage.from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${process.env.PROGRAM_BUCKET}`)
        .upload(file.name + crypto.randomUUID(), file, { upsert: true });

    if (error) {
        return handledUploadError(error, `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${process.env.PROGRAM_BUCKET}`);
    }
    console.log("upload Data :: ", data)
    return data;
}