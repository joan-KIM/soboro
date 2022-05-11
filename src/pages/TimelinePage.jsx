import React from 'react';
import {Link} from 'react-router-dom';
// import {useAuth} from '../hooks/useAuth';
// import {useTimeline} from '../hooks/useTimeline';

export default function TimelinePage() {
  // const {user} = useAuth();
  // const {timeline} = useTimeline(user);
  // console.log(timeline);

  return (
    <div>
      <h1>타임라인 페이지</h1>
      <ul>
        <li>
          <Link to="/search">이벤트 검색하기</Link>
        </li>
        <li>
          <Link to="/event">이벤트 상세</Link>
        </li>
        <li>
          <Link to="/notifications">알림 페이지</Link>
        </li>
      </ul>
    </div>
  );
}
