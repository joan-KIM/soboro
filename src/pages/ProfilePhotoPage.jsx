import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import ProfileUploader from '../components/ProfileUploader';
import {useAuth} from '../hooks/useAuth';
import Button from '../components/common/Button';
import {compress} from '../utils/compress';
import {useStorage} from '../hooks/useStorage';
import {getURL} from '../firebase/storage';

export default function ProfilePhotoPage() {
  const {register, handleSubmit} = useForm();
  const {user} = useAuth();
  const {upload} = useStorage(user?.uid);
  const [url, setPhotoUrl] = useState();

  const onSubmit = async ({profile}) => {
    const [file] = profile;
    // 유저에 프로필 이미지를 설정한다는 것
    // 1. storage에 이미지를 저장
    // 2. 유저 db(firestore)에 이미지 주소를 저장

    let photoUrl = '';
    // file이 있는 경우
    if (file) {
      const compressedFile = await compress(file, 120, 120);
      photoUrl = await upload(compressedFile);
    } else {
      // 기본이미지중 랜덤으로 하나 선택
      const n = Math.ceil(Math.random() * 7);
      photoUrl = await getURL('default_image', n+'.png');
    }
    setPhotoUrl(photoUrl);
    // 유저 db에 프로필 url 업데이트
  };

  return (
    <div>
      <h1>프로필 사진 추가 페이지</h1>
      <img src={url} alt="프로필 사진" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileUploader name="profile" register={register} />
        <Button type="submit" value="시작하기" />
      </form>
    </div>
  );
}
