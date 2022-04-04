import React from 'react';
import {Link} from 'react-router-dom';

export default function EditEventPage() {
  return (
    <div>
      <h1>이벤트 수정 페이지</h1>
      <Link to="/event">뒤로가기</Link>
    </div>
  );
}
