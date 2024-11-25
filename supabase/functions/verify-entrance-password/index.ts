import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// 요청 본문의 타입 정의
type RequestBody = {
  password: string;
};

// 응답 본문의 타입 정의
type ResponseBody = {
  isValid: boolean;
};

// CORS 헤더 타입 정의
type CorsHeaders = {
  'Access-Control-Allow-Origin': string;
  'Access-Control-Allow-Methods'?: string;
  'Access-Control-Allow-Headers'?: string;
  'Content-Type'?: string;
};

const CORRECT_PASSWORD = Deno.env.get('ENTRANCE_PASSWORD') as string;

serve(async (req: Request) => {
  // CORS 헤더 추가
  if (req.method === 'OPTIONS') {
    const corsHeaders: CorsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    };

    return new Response('ok', { headers: corsHeaders });
  }

  // 요청 본문을 RequestBody 타입으로 파싱
  const { password }: RequestBody = await req.json();

  const isValid: boolean = password === CORRECT_PASSWORD;

  // ResponseBody 타입의 객체를 JSON으로 변환하여 응답
  const responseBody: ResponseBody = { isValid };

  const responseHeaders: CorsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return new Response(JSON.stringify(responseBody), {
    headers: responseHeaders,
  });
});
