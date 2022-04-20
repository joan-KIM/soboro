import React from 'react';
import Auth from '../components/Auth';
import {Link} from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';

const Page = styled.div`
  padding: 21px;
`;

export default function LoginPage() {
  const {resetField, register} = useForm();

  return (
    <Page>
      <h1>로그인 페이지</h1>
      <Link to="/account/signup">회원가입 페이지로 이동</Link>
      <LoginInput
        required
        name="email"
        register={register}
        resetField={resetField}
        placeholder="이메일 주소"
      />
      <LoginInput
        required
        password
        name="password"
        register={register}
        resetField={resetField}
        placeholder="비밀번호"
      />
      <Auth />
    </Page>
  );
}
