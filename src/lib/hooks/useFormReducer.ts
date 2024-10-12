import { TFormState, TFormAction } from '@/lib/types/formType';

export default function useFormReducer(state: TFormState, action: TFormAction) {
  switch (action.type) {
    /* 이메일 상태 업데이트 */
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    /* 이메일 유효성 검사 */
    case 'VALIDATE_EMAIL': {
      const email = state.email.trim();
      const isValid =
        email === '' || /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i.test(email);
      return {
        ...state,
        valids: {
          ...state.valids,
          email: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          email: isValid ? null : '이메일 형식을 확인해주세요',
        },
      };
    }
    /* 이메일 중복 확인 */
    case 'EMAIL_DUPLICATION':
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          email: action.payload,
        },
      };
    /* 비밀번호 상태 업데이트 */
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    /* 비밀번호 유효성 검사 */
    case 'VALIDATE_PASSWORD': {
      const password = state.password.trim();
      const isValidLength = password.length >= 8 && password.length <= 16;
      const isValidComplexity = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(password);
      const isValid = password === '' || (isValidLength && isValidComplexity);
      return {
        ...state,
        valids: {
          ...state.valids,
          password: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          password: isValid ? null : '8~16자의 영문자와 숫자를 포함해 주세요.',
        },
      };
    }
    /* 비밀번호 확인 상태 업데이트 */
    case 'UPDATE_CONFIRM_PASSWORD':
      return {
        ...state,
        confirmPassword: action.payload,
      };
    /* 비밀번호 확인 유효성 검사 */
    case 'VALIDATE_CONFIRM_PASSWORD': {
      const isFieldEmpty = state.confirmPassword.trim() === '';
      const isPasswordMatch = state.confirmPassword === state.password;
      const isValid = isFieldEmpty || isPasswordMatch;

      return {
        ...state,
        valids: {
          ...state.valids,
          confirmPassword: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          confirmPassword: isValid || isFieldEmpty ? null : '비밀번호가 일치하지 않습니다.',
        },
      };
    }
    /* 닉네임 상태 업데이트 */
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      };

    /* 닉네임 유효성 검사 */
    case 'VALIDATE_NAME': {
      const name = state.name.trim();
      const koreanRegex = /^[가-힣]{2,8}$/;
      const englishRegex = /^[a-zA-Z]{2,12}$/;
      const koreanMixedRegex = /^(?=.*[가-힣])(?=.*\d)[가-힣\d]{2,12}$/;
      const englishMixedRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{2,12}$/;

      const isValidKorean = koreanRegex.test(name);
      const isValidEnglish = englishRegex.test(name);
      const isValidKoreanMixed = koreanMixedRegex.test(name);
      const isValidEnglishMixed = englishMixedRegex.test(name);

      const isValid = name === '' || isValidKorean || isValidEnglish || isValidKoreanMixed || isValidEnglishMixed;

      let errorMessage = '';
      if (!isValid) {
        if (name.length < 2) {
          errorMessage = '닉네임은 2글자 이상이어야 합니다.';
        } else if (name.length > 12) {
          errorMessage = '닉네임은 12글자 이하여야 합니다.';
        } else if (/^[0-9]+$/.test(name)) {
          errorMessage = '숫자로만 이루어진 닉네임은 사용할 수 없습니다.';
        } else if (/[^가-힣a-zA-Z0-9]/.test(name)) {
          errorMessage = '특수문자는 사용할 수 없습니다.';
        } else {
          errorMessage = '사용할 수 없는 닉네임입니다.';
        }
      }

      return {
        ...state,
        valids: {
          ...state.valids,
          name: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          name: isValid ? null : errorMessage,
        },
      };
    }

    /* 휴대폰 번호 상태 업데이트 */
    case 'UPDATE_PHONE':
      return {
        ...state,
        phone: action.payload,
      };

    /* 휴대폰 번호 유효성 검사 */
    case 'VALIDATE_PHONE': {
      const phone = state.phone.trim();
      const isValid = phone === '' || /^010\d{8}$/.test(phone);
      return {
        ...state,
        valids: {
          ...state.valids,
          phone: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          phone: isValid ? null : '올바른 휴대폰 번호를 입력해주세요',
        },
      };
    }

    /* 호수(birth로 표현) 상태 업데이트 */
    case 'UPDATE_BIRTH':
      return {
        ...state,
        birth: action.payload,
      };

    /* 호수(birth로 표현) 유효성 검사 */
    case 'VALIDATE_BIRTH': {
      const birth = state.birth.trim();

      // 유효한 호수 범위를 정의하는 함수
      const isValidRange = (num: number) => {
        const floor = Math.floor(num / 100);
        const room = num % 100;
        return floor >= 3 && floor <= 14 && room >= 1 && room <= 20;
      };

      // 숫자로 변환 가능하고 유효한 범위 내에 있는지 확인
      const isValid = /^\d{3,4}$/.test(birth) && isValidRange(parseInt(birth));

      return {
        ...state,
        valids: {
          ...state.valids,
          birth: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          birth: isValid ? null : '거주중인 올바른 호수를 입력해주세요.',
        },
      };
    }

    default:
      return state;
  }
}
