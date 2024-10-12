'use client';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { SignupFormData, signupSchema } from '@/lib/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function SignUpRegularForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = () => {
    // 회원가입 제출 폼 로직
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 px-4">
      {/* 이메일 입력 필드 */}
      <div className="flex items-center justify-between gap-6">
        <FormInput
          label="로그인에 사용할 이메일 주소를 입력해주세요"
          name="email"
          register={register}
          error={errors.email}
          placeholder="test@test.com"
          width="w-3/4"
        />
        <Button
          label="인증하기"
          type="button"
          // onClick={}]
          className="border-none bg-primary text-sm font-bold text-white"
        />
      </div>
      {/* 인증번호 확인 필드 */}
      <div className="flex items-center justify-between gap-6">
        <FormInput
          label="이메일로 전송된 인증코드를 입력해주세요"
          name="verificationCode"
          register={register}
          error={errors.verificationCode}
          placeholder="000000"
          width="w-3/4"
        />
        <Button
          label="인증완료"
          type="button"
          // onClick={}
          className="border-none bg-primary text-sm font-bold text-white"
        />
      </div>
    </form>
  );
}
