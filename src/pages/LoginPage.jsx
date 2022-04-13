import React from 'react';
import Auth from '../components/Auth';
import {Link} from 'react-router-dom';

export default function LoginPage() {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <Link to="/account/signup">회원가입 페이지로 이동</Link>
      <Auth />
    </div>
  );
}
