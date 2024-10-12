'use client';

import React from 'react';
import { supabase } from '@/lib/supabase';
import { useReducer } from 'react';
import { TFormState, TFormInput } from '@/lib/types/formType';
import { useFormReducer } from '@/lib/hooks/_index';
import Button from '@/components/Button';
import InputField from '@/components/InputField';

const initialFormState: TFormState = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: '',
  birth: '',
  valids: {
    email: true,
    password: true,
    confirmPassword: true,
    name: true,
    phone: true,
    birth: true,
  },
  errorMessages: {
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    phone: null,
    birth: null,
  },
};

export default function SignUpForm() {
  const [state, dispatch] = useReducer(useFormReducer, initialFormState);

  /* 각 Input 함수 */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_EMAIL', payload: e.target.value });
    dispatch({ type: 'VALIDATE_EMAIL' });
  };

  const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value });
    dispatch({ type: 'VALIDATE_PASSWORD' });
    dispatch({ type: 'VALIDATE_CONFIRM_PASSWORD' });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_CONFIRM_PASSWORD', payload: e.target.value });
    dispatch({ type: 'VALIDATE_CONFIRM_PASSWORD' });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_NAME', payload: e.target.value });
    dispatch({ type: 'VALIDATE_NAME' });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_PHONE', payload: e.target.value });
    dispatch({ type: 'VALIDATE_PHONE' });
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_BIRTH', payload: e.target.value });
    dispatch({ type: 'VALIDATE_BIRTH' });
  };

  /* 이메일 포커스 잃었을 때 함수 */
  // const checkEmailDuplicationOnBlur = async () => {
  //   // 1. 이메일 유효성 검사
  //   dispatch({ type: 'VALIDATE_EMAIL' });
  //   // 2. 유효성 검사에 통과한 경우에만 이메일 중복 확인 요청
  //   if (state.valids.email && state.email.trim()) {
  //     const isDuplicated = await checkEmailDuplication(state.email);
  //     console.log(isDuplicated);
  //     if (!isDuplicated) {
  //       dispatch({
  //         type: 'EMAIL_DUPLICATION',
  //         payload: '중복된 이메일입니다.',
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, phone, birth } = state;
    const {
      valids: {
        email: validEmail,
        password: validPassword,
        confirmPassword: validConfirmPassword,
        name: validName,
        phone: validPhone,
        birth: validBirth,
      },
    } = state;

    // 공백 체크 및 포커스 로직
    const firstEmptyInput = Object.keys(state.valids).find((key) => {
      const value = state[key as TFormInput];
      return value === null || value === undefined || value === '';
    });
    if (firstEmptyInput) {
      const inputRef = document.getElementById(firstEmptyInput);
      if (inputRef) inputRef.focus();
      return;
    }

    // 유효성 검사 및 포커스 로직
    const isValidForm = validEmail && validPassword && validConfirmPassword && validName && validPhone && validBirth;
    if (!isValidForm) {
      const firstInvalidInput = Object.keys(state.valids).find((key) => !state.valids[key as TFormInput]);
      if (firstInvalidInput) {
        const inputRef = document.getElementById(firstInvalidInput);
        if (inputRef) inputRef.focus();
      }
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, phone, birth },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          alert('이미 가입된 이메일입니다.');
          dispatch({
            type: 'EMAIL_DUPLICATION',
            payload: '중복된 이메일입니다.',
          });
        } else {
          alert('회원가입에 실패하였습니다.');
          console.error('회원가입 오류:', error.message);
        }
        return;
      }

      if (data.user) {
        alert('회원가입이 정상적으로 처리되었습니다');
        console.log('회원가입이 정상적으로 처리되었습니다.', data.user);
        // 여기에 회원가입 성공 후 추가 로직 (예: 로그인 페이지로 리다이렉트 등)
      }
    } catch (error) {
      console.error('회원가입 처리 중 오류가 발생했습니다:', error);
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col">
      {/* 이메일 주소 */}
      <InputField
        label="로그인에 사용할 이메일 주소를 입력해주세요"
        id="email"
        type="email"
        placeholder="example@magok.co.kr"
        errorMessage={state.errorMessages.email}
        invalid={!state.valids.email}
        onChange={handleEmailChange}
        // onBlur={checkEmailDuplicationOnBlur}
        value={state.email}
      />
      {/* 비밀번호 */}
      <InputField
        label="사용할 비밀번호를 입력해주세요"
        id="password"
        type="password"
        placeholder="8~16자의 영문자, 숫자"
        errorMessage={state.errorMessages.password}
        invalid={!state.valids.password}
        onChange={handlePassWordChange}
        value={state.password}
      />
      {/* 비밀번호 확인 */}
      <InputField
        label="비밀번호 확인"
        id="confirmPassword"
        type="password"
        placeholder="비밀번호 재입력"
        errorMessage={state.errorMessages.confirmPassword}
        invalid={!state.valids.confirmPassword}
        onChange={handleConfirmPasswordChange}
        value={state.confirmPassword}
      />
      {/* 닉네임 */}
      <InputField
        label="사용할 닉네임을 입력해주세요"
        id="name"
        type="text"
        placeholder="특수문자가 포함되어있지 않은 닉네임"
        errorMessage={state.errorMessages.name}
        invalid={!state.valids.name}
        onChange={handleNameChange}
        value={state.name}
      />
      {/* 휴대폰 번호 */}
      <InputField
        label="휴대폰 번호를 입력해주세요"
        id="phone"
        type="tel"
        placeholder="휴대폰 번호('-' 제외)"
        errorMessage={state.errorMessages.phone}
        invalid={!state.valids.phone}
        onChange={handlePhoneChange}
        value={state.phone}
      />
      {/* 배정받은 호수 */}
      <InputField
        label="(선택사항) 거주중인 호수를 숫자만 입력해주세요"
        id="birth"
        type="text"
        placeholder="예) 1501호일 경우 1501"
        errorMessage={state.errorMessages.birth}
        invalid={!state.valids.birth}
        onChange={handleBirthChange}
        value={state.birth}
      />

      {/* 회원가입 완료 버튼 */}
      <Button className="mt-[20px] w-full bg-tertiary" label="회원가입 완료" type="submit"></Button>
    </form>
  );
}
