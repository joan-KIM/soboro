import React from 'react';
import {Link} from 'react-router-dom';

export default function ProfilePage() {
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
      </ul>
    </div>
  );
}
