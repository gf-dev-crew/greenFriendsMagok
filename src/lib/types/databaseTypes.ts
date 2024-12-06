import { Database } from './types_db';

export type NoticeTable = Database['public']['Tables']['notices']['Row'];

// notice
export type NoticeRow = Database['public']['Tables']['notice']['Row'];
export type NoticeRowInsert = Database['public']['Tables']['notice']['Insert'];
export type NoticeRowUpdate = Database['public']['Tables']['notice']['Update'];


// program
export type ProgramRow = Database['public']['Tables']['program']['Row'];
export type ProgramRowInsert = Database['public']['Tables']['program']['Insert'];
export type ProgramRowUpdate = Database['public']['Tables']['program']['Update'];