import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../components/Auth';
import SignUpInput from '../components/SignUpInput';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';

const Page = styled.div`
padding: 17px;
`;

export default function SignUpPage() {
  const {register, handleSubmit, reset} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Page>
      <h1>회원가입 페이지</h1>
      <Link to="/account/login">뒤로가기</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          name="username"
          label="사용자 이름"
          register={register}
          placeholder="영문 사용자 이름 입력"
          reset={reset}
        />
        <SignUpInput
          password
          name="password"
          label="비밀번호"
          register={register}
          placeholder="영문 사용자 이름 입력"
          reset={reset}
        />
        <input type="submit" value="확인" />
      </form>
      <Auth />
    </Page>
  );
}
