import React from 'react';
import Auth from '../components/Auth';
import {Link} from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components';

const Page = styled.div`
  padding: 21px;
`;

export default function LoginPage() {
  return (
    <Page>
      <h1>로그인 페이지</h1>
      <Link to="/account/signup">회원가입 페이지로 이동</Link>
      <LoginInput placeholder="이메일 주소" />
      <Auth />
    </Page>
  );
}
