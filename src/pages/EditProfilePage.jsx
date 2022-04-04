import React from 'react';
import {Link} from 'react-router-dom';

export default function EditProfilePage() {
  return (
    <div>
      <h1>마이페이지 수정</h1>
      <Link to="/profile">뒤로가기</Link>
    </div>
  );
}
