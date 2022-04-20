// Auth

// 이메일 형식 오류
export const INVALID_EMAIL = 'Firebase: Error (auth/invalid-email).';
// 비밀번호 입력 안함
export const INTERNAL_ERROR = 'Firebase: Error (auth/internal-error).';
// 이메일 틀림
export const USER_NOT_FOUND = 'Firebase: Error (auth/user-not-found).';
// 비밀번호 틀림
export const WRONG_PASSWORD = 'Firebase: Error (auth/wrong-password).';

export const errorMessage = {
  [INVALID_EMAIL]: '이메일 형식이 올바르지 않습니다.',
  [INTERNAL_ERROR]: '이메일/비밀번호 항목은 필수 입력값입니다.',
  [USER_NOT_FOUND]: '이메일 또는 비밀번호가 일치하지 않습니다.',
  [WRONG_PASSWORD]: '이메일 또는 비밀번호가 일치하지 않습니다.',
};
