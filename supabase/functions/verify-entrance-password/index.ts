import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// supabase 대시보드에 있는 환경변수
const CORRECT_PASSWORD = Deno.env.get('ENTRANCE_PASSWORD');

// HTTP 요청을 처리하는 비동기 함수를 'serve' 함수에 전달
serve(async (req) => {
  // CORS 헤더 추가
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*', // 모든 출처 허용 (개발 환경용), 프로덕션에서는 특정 도메인으로 제한해야 함
        'Access-Control-Allow-Methods': 'POST', // POST 메서드만 허용
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', // 허용되는 헤더들을 지정
      },
    });
  }

  // 요청 본문에서 JSON을 파싱하여 password 필드를 추출
  const { password } = await req.json();

  // 입력된 비밀번호와 환경 변수에 저장된 올바른 비밀번호를 비교
  const isValid = password === CORRECT_PASSWORD;

  // 비밀번호의 유효성 여부를 JSON 형식으로 응답
  return new Response(JSON.stringify({ isValid }), {
    headers: {
      'Content-Type': 'application/json', // 응답이 JSON 형식임을 명시
      'Access-Control-Allow-Origin': '*', // 모든 출처 허용 (개발 환경용), 프로덕션에서는 특정 도메인으로 제한해야 함
    },
  });
});
