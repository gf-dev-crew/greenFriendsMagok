// export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// export type Database = {
//   public: {
//     Tables: {
//       community: {
//         Row: {
//           author: string | null;
//           category: string | null;
//           content: string | null;
//           created_at: string;
//           id: number;
//           image: string | null;
//           title: string | null;
//         };
//         Insert: {
//           author?: string | null;
//           category?: string | null;
//           content?: string | null;
//           created_at?: string;
//           id?: number;
//           image?: string | null;
//           title?: string | null;
//         };
//         Update: {
//           author?: string | null;
//           category?: string | null;
//           content?: string | null;
//           created_at?: string;
//           id?: number;
//           image?: string | null;
//           title?: string | null;
//         };
//         Relationships: [];
//       };
//       'faq-move-in': {
//         Row: {
//           answer: string | null;
//           id: number;
//           question: string | null;
//         };
//         Insert: {
//           answer?: string | null;
//           id?: number;
//           question?: string | null;
//         };
//         Update: {
//           answer?: string | null;
//           id?: number;
//           question?: string | null;
//         };
//         Relationships: [];
//       };
//       'faq-room': {
//         Row: {
//           answer: string | null;
//           id: number;
//           question: string | null;
//         };
//         Insert: {
//           answer?: string | null;
//           id?: number;
//           question?: string | null;
//         };
//         Update: {
//           answer?: string | null;
//           id?: number;
//           question?: string | null;
//         };
//         Relationships: [];
//       };
//       'faq-site': {
//         Row: {
//           answer: string | null;
//           id: number;
//           question: string | null;
//         };
//         Insert: {
//           answer?: string | null;
//           id?: number;
//           question?: string | null;
//         };
//         Update: {
//           answer?: string | null;
//           id?: number;
//           question?: string | null;
//         };
//         Relationships: [];
//       };
//       'faqs-test': {
//         Row: {
//           answer: string;
//           id: number;
//           question: string;
//         };
//         Insert: {
//           answer: string;
//           id: number;
//           question: string;
//         };
//         Update: {
//           answer?: string;
//           id?: number;
//           question?: string;
//         };
//         Relationships: [];
//       };
//       notices: {
//         Row: {
//           author: string | null;
//           category: string | null;
//           content: string | null;
//           created_at: string;
//           fix: boolean | null;
//           id: number;
//           image: string | null;
//           title: string | null;
//         };
//         Insert: {
//           author?: string | null;
//           category?: string | null;
//           content?: string | null;
//           created_at?: string;
//           fix?: boolean | null;
//           id?: number;
//           image?: string | null;
//           title?: string | null;
//         };
//         Update: {
//           author?: string | null;
//           category?: string | null;
//           content?: string | null;
//           created_at?: string;
//           fix?: boolean | null;
//           id?: number;
//           image?: string | null;
//           title?: string | null;
//         };
//         Relationships: [];
//       };
//       user_info: {
//         Row: {
//           birth: string | null;
//           created_at: string;
//           email: string | null;
//           id: string;
//           name: string | null;
//           phone: string | null;
//         };
//         Insert: {
//           birth?: string | null;
//           created_at?: string;
//           email?: string | null;
//           id?: string;
//           name?: string | null;
//           phone?: string | null;
//         };
//         Update: {
//           birth?: string | null;
//           created_at?: string;
//           email?: string | null;
//           id?: string;
//           name?: string | null;
//           phone?: string | null;
//         };
//         Relationships: [
//           {
//             foreignKeyName: 'user-info_id_fkey';
//             columns: ['id'];
//             isOneToOne: true;
//             referencedRelation: 'users';
//             referencedColumns: ['id'];
//           },
//         ];
//       };
//     };
//     Views: {
//       [_ in never]: never;
//     };
//     Functions: {
//       [_ in never]: never;
//     };
//     Enums: {
//       [_ in never]: never;
//     };
//     CompositeTypes: {
//       [_ in never]: never;
//     };
//   };
// };

// type PublicSchema = Database[Extract<keyof Database, 'public'>];

// export type Tables<
//   PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
//         Database[PublicTableNameOrOptions['schema']]['Views'])
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
//       Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
//       Row: infer R;
//     }
//     ? R
//     : never
//   : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
//     ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
//         Row: infer R;
//       }
//       ? R
//       : never
//     : never;

// export type TablesInsert<
//   PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
//       Insert: infer I;
//     }
//     ? I
//     : never
//   : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
//     ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
//         Insert: infer I;
//       }
//       ? I
//       : never
//     : never;

// export type TablesUpdate<
//   PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
//       Update: infer U;
//     }
//     ? U
//     : never
//   : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
//     ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
//         Update: infer U;
//       }
//       ? U
//       : never
//     : never;

// export type Enums<
//   PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
//   EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
//     : never = never,
// > = PublicEnumNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
//   : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
//     ? PublicSchema['Enums'][PublicEnumNameOrOptions]
//     : never;






// ================================
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      applicant: {
        Row: {
          applicant_date: string
          applicant_id: number
          applicant_status: number
          attend: boolean
          create_user: string | null
          created_at: string
          member_id: number | null
          program_id: number | null
          update_user: string | null
          updated_at: string
        }
        Insert: {
          applicant_date?: string
          applicant_id?: number
          applicant_status: number
          attend?: boolean
          create_user?: string | null
          created_at?: string
          member_id?: number | null
          program_id?: number | null
          update_user?: string | null
          updated_at?: string
        }
        Update: {
          applicant_date?: string
          applicant_id?: number
          applicant_status?: number
          attend?: boolean
          create_user?: string | null
          created_at?: string
          member_id?: number | null
          program_id?: number | null
          update_user?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "z_applicant_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
          {
            foreignKeyName: "z_applicant_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "program"
            referencedColumns: ["program_id"]
          },
        ]
      }
      building: {
        Row: {
          building_id: number
          building_name: string | null
          building_type_cd: number | null
          create_user: string | null
          created_at: string
          entrance_pw: string | null
          udpated_at: string
          update_user: string | null
        }
        Insert: {
          building_id?: number
          building_name?: string | null
          building_type_cd?: number | null
          create_user?: string | null
          created_at?: string
          entrance_pw?: string | null
          udpated_at?: string
          update_user?: string | null
        }
        Update: {
          building_id?: number
          building_name?: string | null
          building_type_cd?: number | null
          create_user?: string | null
          created_at?: string
          entrance_pw?: string | null
          udpated_at?: string
          update_user?: string | null
        }
        Relationships: []
      }
      comment: {
        Row: {
          comment_class: number | null
          comment_id: number
          comment_image: string | null
          comment_order: number | null
          community_id: number
          create_user: string | null
          created_at: string
          group_num: number | null
          member_id: number
          update_user: string | null
          updated_at: string | null
          use_yn: string | null
        }
        Insert: {
          comment_class?: number | null
          comment_id?: number
          comment_image?: string | null
          comment_order?: number | null
          community_id: number
          create_user?: string | null
          created_at?: string
          group_num?: number | null
          member_id: number
          update_user?: string | null
          updated_at?: string | null
          use_yn?: string | null
        }
        Update: {
          comment_class?: number | null
          comment_id?: number
          comment_image?: string | null
          comment_order?: number | null
          community_id?: number
          create_user?: string | null
          created_at?: string
          group_num?: number | null
          member_id?: number
          update_user?: string | null
          updated_at?: string | null
          use_yn?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "z_comment_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "z_community"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "z_comment_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      comment_like: {
        Row: {
          comment_id: number
          like_id: number
          member_id: number
        }
        Insert: {
          comment_id: number
          like_id?: number
          member_id: number
        }
        Update: {
          comment_id?: number
          like_id?: number
          member_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "z_comment_like_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comment"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "z_comment_like_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      common_code: {
        Row: {
          code_desc: string | null
          code_id: number
          code_name: string
          create_user: string | null
          created_at: string
          update_user: string | null
          updated_at: string
          use_yn: string
        }
        Insert: {
          code_desc?: string | null
          code_id: number
          code_name: string
          create_user?: string | null
          created_at?: string
          update_user?: string | null
          updated_at?: string
          use_yn?: string
        }
        Update: {
          code_desc?: string | null
          code_id?: number
          code_name?: string
          create_user?: string | null
          created_at?: string
          update_user?: string | null
          updated_at?: string
          use_yn?: string
        }
        Relationships: []
      }
      common_code_detail: {
        Row: {
          code_detail_desc: string | null
          code_detail_id: number
          code_detail_name: string
          code_id: number
          create_user: string | null
          created_at: string
          sort_order: number | null
          update_user: string | null
          updated_at: string
          use_yn: string
        }
        Insert: {
          code_detail_desc?: string | null
          code_detail_id?: number
          code_detail_name?: string
          code_id: number
          create_user?: string | null
          created_at?: string
          sort_order?: number | null
          update_user?: string | null
          updated_at?: string
          use_yn?: string
        }
        Update: {
          code_detail_desc?: string | null
          code_detail_id?: number
          code_detail_name?: string
          code_id?: number
          create_user?: string | null
          created_at?: string
          sort_order?: number | null
          update_user?: string | null
          updated_at?: string
          use_yn?: string
        }
        Relationships: [
          {
            foreignKeyName: "z_common_code_detail_code_id_fkey"
            columns: ["code_id"]
            isOneToOne: false
            referencedRelation: "common_code"
            referencedColumns: ["code_id"]
          },
        ]
      }
      community: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          id: number
          image: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          id?: number
          image?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          id?: number
          image?: string | null
          title?: string | null
        }
        Relationships: []
      }
      community_content_scrap: {
        Row: {
          commuity_id: number | null
          community_content_scrap: number
          member_id: number | null
        }
        Insert: {
          commuity_id?: number | null
          community_content_scrap?: number
          member_id?: number | null
        }
        Update: {
          commuity_id?: number | null
          community_content_scrap?: number
          member_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "community_content_scrap_commuity_id_fkey"
            columns: ["commuity_id"]
            isOneToOne: false
            referencedRelation: "z_community"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_content_scrap_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      community_like: {
        Row: {
          community_id: number
          community_like_id: number
          member_id: number
        }
        Insert: {
          community_id: number
          community_like_id?: number
          member_id: number
        }
        Update: {
          community_id?: number
          community_like_id?: number
          member_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_like_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "z_community"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_like_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      community_scrap: {
        Row: {
          community_cd: number
          community_scrap_id: number
          member_id: number | null
        }
        Insert: {
          community_cd: number
          community_scrap_id?: number
          member_id?: number | null
        }
        Update: {
          community_cd?: number
          community_scrap_id?: number
          member_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "z_community_scrap_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      faq: {
        Row: {
          create_user: string | null
          created_at: string
          faq_content: string | null
          faq_id: number
          faq_image: string | null
          faq_title: string
          update_user: string | null
          updated_at: string
        }
        Insert: {
          create_user?: string | null
          created_at?: string
          faq_content?: string | null
          faq_id?: number
          faq_image?: string | null
          faq_title: string
          update_user?: string | null
          updated_at?: string
        }
        Update: {
          create_user?: string | null
          created_at?: string
          faq_content?: string | null
          faq_id?: number
          faq_image?: string | null
          faq_title?: string
          update_user?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      "faq-move-in": {
        Row: {
          answer: string | null
          id: number
          question: string | null
        }
        Insert: {
          answer?: string | null
          id?: number
          question?: string | null
        }
        Update: {
          answer?: string | null
          id?: number
          question?: string | null
        }
        Relationships: []
      }
      "faq-room": {
        Row: {
          answer: string | null
          id: number
          question: string | null
        }
        Insert: {
          answer?: string | null
          id?: number
          question?: string | null
        }
        Update: {
          answer?: string | null
          id?: number
          question?: string | null
        }
        Relationships: []
      }
      "faq-site": {
        Row: {
          answer: string | null
          id: number
          question: string | null
        }
        Insert: {
          answer?: string | null
          id?: number
          question?: string | null
        }
        Update: {
          answer?: string | null
          id?: number
          question?: string | null
        }
        Relationships: []
      }
      "faqs-test": {
        Row: {
          answer: string
          id: number
          question: string
        }
        Insert: {
          answer: string
          id: number
          question: string
        }
        Update: {
          answer?: string
          id?: number
          question?: string
        }
        Relationships: []
      }
      file: {
        Row: {
          create_user: string | null
          created_at: string
          display_order: number | null
          file_content_type: string | null
          file_id: number
          file_name: string | null
          file_size: number | null
          file_target_id: number
          file_target_type: number | null
          file_url: string | null
          update_user: string | null
          updated_at: string
        }
        Insert: {
          create_user?: string | null
          created_at?: string
          display_order?: number | null
          file_content_type?: string | null
          file_id?: number
          file_name?: string | null
          file_size?: number | null
          file_target_id?: number
          file_target_type?: number | null
          file_url?: string | null
          update_user?: string | null
          updated_at?: string
        }
        Update: {
          create_user?: string | null
          created_at?: string
          display_order?: number | null
          file_content_type?: string | null
          file_id?: number
          file_name?: string | null
          file_size?: number | null
          file_target_id?: number
          file_target_type?: number | null
          file_url?: string | null
          update_user?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      member: {
        Row: {
          create_user: string | null
          created_at: string
          member_address: string | null
          member_birth: string | null
          member_code: number | null
          member_email: string
          member_gender: string | null
          member_id: number
          member_name: string
          member_nick: string
          member_phonenum: string
          member_pw: string
          update_at: string
          update_user: string | null
        }
        Insert: {
          create_user?: string | null
          created_at?: string
          member_address?: string | null
          member_birth?: string | null
          member_code?: number | null
          member_email: string
          member_gender?: string | null
          member_id?: number
          member_name: string
          member_nick: string
          member_phonenum: string
          member_pw: string
          update_at?: string
          update_user?: string | null
        }
        Update: {
          create_user?: string | null
          created_at?: string
          member_address?: string | null
          member_birth?: string | null
          member_code?: number | null
          member_email?: string
          member_gender?: string | null
          member_id?: number
          member_name?: string
          member_nick?: string
          member_phonenum?: string
          member_pw?: string
          update_at?: string
          update_user?: string | null
        }
        Relationships: []
      }
      notice: {
        Row: {
          calender_end_time: string | null
          calender_if_yn: boolean | null
          calender_start_time: string | null
          category_cd: number | null
          create_user: string | null
          created_at: string
          fixed_yn: boolean | null
          member_id: number | null
          notice_content: string | null
          notice_id: number
          notice_image: string | null
          notice_title: string | null
          update_user: string | null
          updated_at: string | null
          view_count: number
        }
        Insert: {
          calender_end_time?: string | null
          calender_if_yn?: boolean | null
          calender_start_time?: string | null
          category_cd?: number | null
          create_user?: string | null
          created_at?: string
          fixed_yn?: boolean | null
          member_id?: number | null
          notice_content?: string | null
          notice_id?: number
          notice_image?: string | null
          notice_title?: string | null
          update_user?: string | null
          updated_at?: string | null
          view_count?: number
        }
        Update: {
          calender_end_time?: string | null
          calender_if_yn?: boolean | null
          calender_start_time?: string | null
          category_cd?: number | null
          create_user?: string | null
          created_at?: string
          fixed_yn?: boolean | null
          member_id?: number | null
          notice_content?: string | null
          notice_id?: number
          notice_image?: string | null
          notice_title?: string | null
          update_user?: string | null
          updated_at?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "z_notice_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      notice_like: {
        Row: {
          member_id: number
          notice_id: number | null
          notice_like_id: number
        }
        Insert: {
          member_id: number
          notice_id?: number | null
          notice_like_id?: number
        }
        Update: {
          member_id?: number
          notice_id?: number | null
          notice_like_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "z_notice_like_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
          {
            foreignKeyName: "z_notice_like_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: false
            referencedRelation: "notice"
            referencedColumns: ["notice_id"]
          },
        ]
      }
      notice_scrap: {
        Row: {
          member_id: number | null
          notice_id: number | null
          notice_scrap_id: number
        }
        Insert: {
          member_id?: number | null
          notice_id?: number | null
          notice_scrap_id?: number
        }
        Update: {
          member_id?: number | null
          notice_id?: number | null
          notice_scrap_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "z_notice_scrap_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
          {
            foreignKeyName: "z_notice_scrap_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: false
            referencedRelation: "notice"
            referencedColumns: ["notice_id"]
          },
        ]
      }
      notices: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          fix: boolean | null
          id: number
          image: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          fix?: boolean | null
          id?: number
          image?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          fix?: boolean | null
          id?: number
          image?: string | null
          title?: string | null
        }
        Relationships: []
      }
      program: {
        Row: {
          apply_cost: number | null
          apply_end_time: string | null
          apply_start_time: string
          banner_image: string | null
          calender_if_yn: boolean | null
          capacity: number | null
          create_user: string | null
          created_at: string
          place: string | null
          program_content: string
          program_id: number
          program_image: string | null
          program_name: string
          program_start_time: string
          program_type: number
          time_taken: number | null
          update_user: string | null
          updated_at: string
        }
        Insert: {
          apply_cost?: number | null
          apply_end_time?: string | null
          apply_start_time: string
          banner_image?: string | null
          calender_if_yn?: boolean | null
          capacity?: number | null
          create_user?: string | null
          created_at?: string
          place?: string | null
          program_content: string
          program_id?: number
          program_image?: string | null
          program_name: string
          program_start_time: string
          program_type: number
          time_taken?: number | null
          update_user?: string | null
          updated_at?: string
        }
        Update: {
          apply_cost?: number | null
          apply_end_time?: string | null
          apply_start_time?: string
          banner_image?: string | null
          calender_if_yn?: boolean | null
          capacity?: number | null
          create_user?: string | null
          created_at?: string
          place?: string | null
          program_content?: string
          program_id?: number
          program_image?: string | null
          program_name?: string
          program_start_time?: string
          program_type?: number
          time_taken?: number | null
          update_user?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      push_notification_logs: {
        Row: {
          create_user: string
          created_at: string
          id: number
          member_id: number
          message: string
          send_time: string | null
          status_cd: number
          update_user: string
          updated_at: string
        }
        Insert: {
          create_user: string
          created_at?: string
          id: number
          member_id: number
          message: string
          send_time?: string | null
          status_cd: number
          update_user: string
          updated_at?: string
        }
        Update: {
          create_user?: string
          created_at?: string
          id?: number
          member_id?: number
          message?: string
          send_time?: string | null
          status_cd?: number
          update_user?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "z_push_notification_logs_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      push_notification_retries: {
        Row: {
          create_user: string | null
          created_at: string
          id: number
          last_retry_time: string | null
          push_notification_id: number
          retry_count: number
          update_user: string | null
          updated_at: string
        }
        Insert: {
          create_user?: string | null
          created_at?: string
          id: number
          last_retry_time?: string | null
          push_notification_id: number
          retry_count: number
          update_user?: string | null
          updated_at?: string
        }
        Update: {
          create_user?: string | null
          created_at?: string
          id?: number
          last_retry_time?: string | null
          push_notification_id?: number
          retry_count?: number
          update_user?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_notification_retries_push_notification_id_fkey"
            columns: ["push_notification_id"]
            isOneToOne: false
            referencedRelation: "push_notification_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      push_notification_schedules: {
        Row: {
          create_user: string
          created_at: string
          id: number
          member_id: number
          message: string
          send_at: string
          status_cd: number
          update_user: string
          updated_at: string
        }
        Insert: {
          create_user: string
          created_at?: string
          id: number
          member_id: number
          message: string
          send_at: string
          status_cd: number
          update_user: string
          updated_at?: string
        }
        Update: {
          create_user?: string
          created_at?: string
          id?: number
          member_id?: number
          message?: string
          send_at?: string
          status_cd?: number
          update_user?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "z_push_notification_schedules_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          create_user: string
          created_at: string
          id: number
          member_id: number
          subscription: Json
          update_user: string
          updated_at: string
        }
        Insert: {
          create_user: string
          created_at?: string
          id: number
          member_id: number
          subscription: Json
          update_user: string
          updated_at?: string
        }
        Update: {
          create_user?: string
          created_at?: string
          id?: number
          member_id?: number
          subscription?: Json
          update_user?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "z_push_subscriptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      qna: {
        Row: {
          create_user: string | null
          created_at: string
          member_id: number | null
          qna_content: string | null
          qna_id: number
          qna_image: string | null
          qna_title: string | null
          update_user: string | null
          updated_at: string
        }
        Insert: {
          create_user?: string | null
          created_at?: string
          member_id?: number | null
          qna_content?: string | null
          qna_id?: number
          qna_image?: string | null
          qna_title?: string | null
          update_user?: string | null
          updated_at?: string
        }
        Update: {
          create_user?: string | null
          created_at?: string
          member_id?: number | null
          qna_content?: string | null
          qna_id?: number
          qna_image?: string | null
          qna_title?: string | null
          update_user?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "z_qna_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      qna_answer: {
        Row: {
          create_user: string | null
          created_at: string
          qna_answer_content: string | null
          qna_answer_id: number
          qna_answer_image: string | null
          qna_id: number | null
          update_user: string | null
          updated_at: string
        }
        Insert: {
          create_user?: string | null
          created_at?: string
          qna_answer_content?: string | null
          qna_answer_id?: number
          qna_answer_image?: string | null
          qna_id?: number | null
          update_user?: string | null
          updated_at?: string
        }
        Update: {
          create_user?: string | null
          created_at?: string
          qna_answer_content?: string | null
          qna_answer_id?: number
          qna_answer_image?: string | null
          qna_id?: number | null
          update_user?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "z_qna_answer_qna_id_fkey"
            columns: ["qna_id"]
            isOneToOne: false
            referencedRelation: "qna"
            referencedColumns: ["qna_id"]
          },
        ]
      }
      report: {
        Row: {
          create_user: string | null
          created_at: string
          member_id: number | null
          report_content: string
          report_id: number
          report_type: string
          reported_id: number
          status_cd: number
          update_user: string | null
          updated_at: string | null
        }
        Insert: {
          create_user?: string | null
          created_at?: string
          member_id?: number | null
          report_content: string
          report_id?: number
          report_type: string
          reported_id: number
          status_cd: number
          update_user?: string | null
          updated_at?: string | null
        }
        Update: {
          create_user?: string | null
          created_at?: string
          member_id?: number | null
          report_content?: string
          report_id?: number
          report_type?: string
          reported_id?: number
          status_cd?: number
          update_user?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "z_report_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
      user_info: {
        Row: {
          birth: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          birth?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          birth?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      z_community: {
        Row: {
          category_cd: number | null
          community_id: number
          community_image: string | null
          content: string | null
          create_user: string | null
          created_at: string
          like_count: number | null
          member_id: number
          title: string
          update_user: string | null
          updated_at: string
          view_count: number | null
        }
        Insert: {
          category_cd?: number | null
          community_id?: number
          community_image?: string | null
          content?: string | null
          create_user?: string | null
          created_at?: string
          like_count?: number | null
          member_id: number
          title: string
          update_user?: string | null
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          category_cd?: number | null
          community_id?: number
          community_image?: string | null
          content?: string | null
          create_user?: string | null
          created_at?: string
          like_count?: number | null
          member_id?: number
          title?: string
          update_user?: string | null
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "z_community_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["member_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
