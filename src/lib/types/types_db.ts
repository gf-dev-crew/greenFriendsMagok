export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      community: {
        Row: {
          author: string | null;
          category: string | null;
          content: string | null;
          created_at: string;
          id: number;
          image: string | null;
          title: string | null;
        };
        Insert: {
          author?: string | null;
          category?: string | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          title?: string | null;
        };
        Update: {
          author?: string | null;
          category?: string | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      'faq-move-in': {
        Row: {
          answer: string | null;
          id: number;
          question: string | null;
        };
        Insert: {
          answer?: string | null;
          id?: number;
          question?: string | null;
        };
        Update: {
          answer?: string | null;
          id?: number;
          question?: string | null;
        };
        Relationships: [];
      };
      'faq-room': {
        Row: {
          answer: string | null;
          id: number;
          question: string | null;
        };
        Insert: {
          answer?: string | null;
          id?: number;
          question?: string | null;
        };
        Update: {
          answer?: string | null;
          id?: number;
          question?: string | null;
        };
        Relationships: [];
      };
      'faq-site': {
        Row: {
          answer: string | null;
          id: number;
          question: string | null;
        };
        Insert: {
          answer?: string | null;
          id?: number;
          question?: string | null;
        };
        Update: {
          answer?: string | null;
          id?: number;
          question?: string | null;
        };
        Relationships: [];
      };
      'faqs-test': {
        Row: {
          answer: string;
          id: number;
          question: string;
        };
        Insert: {
          answer: string;
          id: number;
          question: string;
        };
        Update: {
          answer?: string;
          id?: number;
          question?: string;
        };
        Relationships: [];
      };
      notices: {
        Row: {
          author: string | null;
          category: string | null;
          content: string | null;
          created_at: string;
          fix: boolean | null;
          id: number;
          image: string | null;
          title: string | null;
        };
        Insert: {
          author?: string | null;
          category?: string | null;
          content?: string | null;
          created_at?: string;
          fix?: boolean | null;
          id?: number;
          image?: string | null;
          title?: string | null;
        };
        Update: {
          author?: string | null;
          category?: string | null;
          content?: string | null;
          created_at?: string;
          fix?: boolean | null;
          id?: number;
          image?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      user_info: {
        Row: {
          birth: string | null;
          created_at: string;
          email: string | null;
          id: string;
          name: string | null;
          phone: string | null;
        };
        Insert: {
          birth?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
          phone?: string | null;
        };
        Update: {
          birth?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user-info_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
