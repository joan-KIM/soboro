import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../components/common/Navigation';

export default function SearchFriendsPage() {
  return (
    <div>
      <h1>팔로우 검색/추가 페이지</h1>
      <Link to="/">뒤로가기</Link>
      <Navigation />
    </div>
  );
}
