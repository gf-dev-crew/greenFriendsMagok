'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/FormInput';
import { SignupFormData, signupSchema } from '@/lib/schemas/authSchema';
import { useAuth } from '@/lib/hooks/useAuth';
import Button from '@/components/Button';
import cn from '@/lib/utils/cn';
import { useRouter } from 'next/navigation';

export default function CertificationForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태 관리하는 state
  const { verifyEntrancePassword } = useAuth();
  const router = useRouter();

  // react-hook-form의 useForm 훅 설정
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  // 약관 동의 체크박스 상태 감시
  const agreeToTerms = watch('agreeToTerms');
  const agreeToPrivacyPolicy = watch('agreeToPrivacyPolicy');
  const isAllAgreed = agreeToTerms && agreeToPrivacyPolicy;

  // 비밀번호 검증 처리 함수
  const handleVerification = async () => {
    const enteredPassword = getValues('entrancepassword');
    const isValid = await verifyEntrancePassword(enteredPassword);
    setIsAuthenticated(isValid);
    alert(isValid ? '입주민 인증에 성공했습니다!' : '입주민 인증에 실패했습니다. 비밀번호를 다시 확인해주세요.');
  };

  return (
    <div className="my-20 flex flex-col gap-10 px-4">
      {/* 입주민 인증을 위한 비밀번호 입력 필드 */}
      <div className="flex items-center justify-between gap-6">
        <FormInput
          label="(입주민 인증 절차) 녹색친구들 마곡 공동현관 비밀번호"
          name="entrancepassword"
          register={register}
          error={errors.entrancepassword}
          placeholder="예) 공동현관 비밀번호를 입력해주세요"
          width="w-3/4" // 너비를 3/4로 지정
        />
        <Button
          label="인증하기"
          type="button"
          onClick={handleVerification}
          className="border-none bg-primary text-sm font-bold text-white"
        />
      </div>

      {/* 인증 성공 시 표시될 추가 폼 요소들 */}
      {isAuthenticated && (
        <>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">서비스 이용약관에 동의해주세요.</h3>
            <FormInput
              label="[필수] 이용약관에 동의"
              name="agreeToTerms"
              register={register}
              error={errors.agreeToTerms}
              isCheckbox={true}
            />
            <FormInput
              label="[필수] 개인정보 수집 및 이용 동의"
              name="agreeToPrivacyPolicy"
              register={register}
              error={errors.agreeToPrivacyPolicy}
              isCheckbox={true}
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button
              label="카카오로 3초만에 시작하기"
              type="button"
              onClick={() => {
                if (isAllAgreed) {
                  router.push('/signup/kakao');
                }
              }}
              className={cn(
                'h-[50px] w-full border-none font-bold text-black transition-colors duration-300',
                isAllAgreed ? 'bg-[#FEE602] hover:bg-[#FDD800]' : 'cursor-not-allowed bg-[#FEE602]/50',
              )}
              disabled={!isAllAgreed}
            />
            <Button
              label="이메일로 회원가입"
              type="button"
              onClick={() => {
                if (isAllAgreed) {
                  router.push('/signup/regular');
                }
              }}
              className={cn(
                'h-[50px] w-full border-none font-bold text-white transition-colors duration-300',
                isAllAgreed ? 'bg-primary hover:bg-black' : 'cursor-not-allowed bg-primary/50',
              )}
              disabled={!isAllAgreed}
            />
          </div>
        </>
      )}
    </div>
  );
}
