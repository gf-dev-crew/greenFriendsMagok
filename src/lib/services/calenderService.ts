import { createServerSupabaseClient } from '@/lib/supabase/server';

let now = new Date().toISOString();
export async function getWeekCalenderNotice() {
    const supabase = await createServerSupabaseClient();
    const tableName = "notice"
    const columns = "notice_id, notice_title, calender_start_time, calender_end_time"
    const { data, error } = await supabase.from(tableName).select(columns).eq("calender_if_yn", true).gt("calender_end_time", now)

    console.log("calender data :: ", data)
}

export async function getWeekCalenderProgram() {
    const supabase = await createServerSupabaseClient();
    const tableName = "program"
    const columns = "program_id, program_name, apply_start_time, apply_end_time, program_start_time"

    const { data, error } = await supabase.from(tableName).select(columns).eq("calender_if_yn", true)

    console.log("getWeekCalenderProgram data :: ", data)
}

export async function getMonthCalenderNotice(month: number) {
    const supabase = await createServerSupabaseClient();
    const tableName = "notice"
    const columns = "*"
}

export async function getMonthCalenderProgram() {
    const supabase = await createServerSupabaseClient();
    const tableName = "program"
    const columns = "*"
}

