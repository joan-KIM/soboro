import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export default function ProfilePage() {
  const {logout} = useAuth();
  return (
    <div>
      <h1>마이페이지</h1>
      <Link to="/">뒤로가기</Link>
      <ul>
        <li>
          <Link to="/profile/edit">마이페이지 수정</Link>
        </li>
        <li>
          <Link to="/friends/list">팔로우 목록</Link>
        </li>
        <button onClick={() => logout()}>로그아웃</button>
      </ul>
    </div>
  );
}
