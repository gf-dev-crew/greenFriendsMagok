import { z } from 'zod';

/* 회원가입 폼의 유효성 검사 스키마 */
export const signupSchema = z
  .object({
    entrancepassword: z.string().min(1, { message: '공동현관 비밀번호를 입력해주세요.' }),
    username: z
      .string()
      .min(2, { message: '사용자 이름은 2글자 이상이어야 합니다.' })
      .max(100, { message: '사용자 이름은 100글자 이하여야 합니다.' }),
    phoneNumber: z.string().regex(/^01[0-1, 7][0-9]{7,8}$/, {
      message: '유효한 휴대폰 번호를 입력해주세요.',
    }),
    email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: '녹색친구들 마곡 이용약관에 동의해야 합니다.',
    }),
    agreeToPrivacyPolicy: z.boolean().refine((val) => val === true, {
      message: '개인정보 수집 및 이용에 동의해야 합니다.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
