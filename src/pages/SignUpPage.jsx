import React from 'react';
import {Link} from 'react-router-dom';
import SignUpInput from '../components/SignUpInput';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {ReactComponent as Close} from '../assets/close.svg';

const Page = styled.div`
  padding: 17px;
`;

export default function SignUpPage() {
  const {register, handleSubmit, reset, formState: {errors, dirtyFields}} = useForm({mode: 'onBlur'});

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Page>
      <Link to="/account/login"><Close /></Link>
      <p>회원가입</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          required
          reset={reset}
          name="username"
          label="사용자 이름"
          register={register}
          placeholder="영문 사용자 이름 입력"
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
          }}
          isDirty={dirtyFields.username}
          error={errors.username}
        />
        <SignUpInput
          required
          name="email"
          label="이메일"
          register={register}
          placeholder="abcde@gmail.com"
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
          }}
          isDirty={dirtyFields.email}
          error={errors.email}
        />
        <SignUpInput
          password
          required
          name="password"
          label="비밀번호"
          register={register}
          placeholder="비밀번호 입력"
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
          }}
          isDirty={dirtyFields.password}
          error={errors.password}
        />
        <SignUpInput
          password
          required
          name="confirmPassword"
          label="비밀번호 확인"
          register={register}
          placeholder="비밀번호 재입력"
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
          }}
          isDirty={dirtyFields.confirmPassword}
          error={errors.confirmPassword}
        />
        <SignUpInput
          required
          name="birthday"
          label="생년월일"
          register={register}
          placeholder="숫자 6자리 입력"
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
          }}
          isDirty={dirtyFields.birthday}
          error={errors.birthday}
        />
        <ul>
          <li>
            <label>
              <input type="checkbox" />
              (필수) 개인정보 수집 및 이용 동의
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              (필수) 추억을 보낸 친구와 타임라인 공유하기
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              (필수) 성실하게 추억을 기록하고 나누기
            </label>
          </li>
        </ul>
        <input type="submit" value="확인" />
      </form>
    </Page>
  );
}
