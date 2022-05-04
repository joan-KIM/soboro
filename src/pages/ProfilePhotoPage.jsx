import React from 'react';
import {Link} from 'react-router-dom';
import ProfileUploader from '../components/ProfileUploader';

export default function ProfilePhotoPage() {
  return (
    <div>
      <h1>프로필 사진 추가 페이지</h1>
      <Link to="/">시작하기</Link>
      <ProfileUploader />
    </div>
  );
}
