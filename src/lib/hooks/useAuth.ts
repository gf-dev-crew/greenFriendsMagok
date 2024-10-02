import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function useAuth() {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  const verifyEntrancePassword = async (password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-entrance-password', {
        body: { password },
      });

      if (error) throw error;
      return data.isValid;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  return { verifyEntrancePassword };
}
