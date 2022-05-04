import React from 'react';
import {useForm} from 'react-hook-form';
import ProfileUploader from '../components/ProfileUploader';
import {useAuth} from '../hooks/useAuth';
import {uploadFile} from '../firebase/storage';
import Button from '../components/common/Button';
import {compress} from '../utils/compress';

export default function ProfilePhotoPage() {
  const {register, handleSubmit} = useForm();
  const {user} = useAuth();

  const onSubmit = async ({profile}) => {
    const [file] = profile;
    // 유저에 프로필 이미지를 설정한다는 것
    // 1. storage에 이미지를 저장
    // 2. 유저 db(firestore)에 이미지 주소를 저장

    // let photoUrl = '';
    // file이 있는 경우
    if (file) {
      const compressedFile = await compress(file, 120, 120);
      uploadFile(user.uid, compressedFile);
    } else {
      // 기본이미지중 랜덤으로 하나 선택
    }

    // 유저 db에 프로필 url 업데이트
  };

  return (
    <div>
      <h1>프로필 사진 추가 페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileUploader name="profile" register={register} />
        <Button type="submit" value="시작하기" />
      </form>
    </div>
  );
}
