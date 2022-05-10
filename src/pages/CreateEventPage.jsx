import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Store from '../components/Store';

export default function CreateEventPage() {
  return (
    <div>
      <h1>이벤트 등록 페이지</h1>
      <Link to="/">뒤로가기</Link>
      <Store />
      <Navigation />
    </div>
  );
}
