import React from 'react';
import {Link} from 'react-router-dom';

export default function EventPage() {
  return (
    <div>
      <h1>이벤트 상세보기 페이지</h1>
      <Link to="/">뒤로가기</Link> <br />
      <Link to="/event/edit">이벤트 수정하기</Link>
    </div>
  );
}
