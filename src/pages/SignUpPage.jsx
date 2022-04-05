import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../components/Auth';
import SignUpInput from '../components/SignUpInput';
import styled from 'styled-components';

const Page = styled.div`
padding: 17px;
`;

export default function SignUpPage() {
  return (
    <Page>
      <h1>회원가입 페이지</h1>
      <Link to="/account/login">뒤로가기</Link>
      <SignUpInput />
      <Auth />
    </Page>
  );
}
