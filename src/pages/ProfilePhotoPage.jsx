import React, {useState, useRef} from 'react';
import ProfileUploader from '../components/ProfileUploader';
import Button from '../components/common/Button';
import {compress} from '../utils/compress';
import {useStorage} from '../hooks/useStorage';
import {getURL} from '../firebase/storage';
import {useUser} from '../hooks/useUser';

export default function ProfilePhotoPage() {
  const {user, updatePhotoUrl} = useUser();
  const {upload} = useStorage(user?.uid);
  const [url, setPhotoUrl] = useState();
  const ref = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    // 유저에 프로필 이미지를 설정한다는 것
    // 1. storage에 이미지를 저장
    // 2. 유저 db(firestore)에 이미지 주소를 저장
    const [file] = ref.current.files;
    let photoUrl = '';
    // file이 있는 경우
    if (file) {
      const compressedFile = await compress(file, 200, 200);
      photoUrl = await upload(compressedFile);
    } else {
      // 기본이미지중 랜덤으로 하나 선택
      const n = Math.ceil(Math.random() * 7);
      photoUrl = await getURL('default_image', n+'.png');
    }
    // 유저 db에 프로필 url 업데이트
    setPhotoUrl(photoUrl);
    updatePhotoUrl(photoUrl);
  };

  return (
    <div>
      <h1>프로필 사진 추가 페이지</h1>
      <img src={url} alt="프로필 사진" width={111} height={111} style={{borderRadius: '50%'}} />
      <form onSubmit={onSubmit}>
        <ProfileUploader ref={ref} />
        <Button type="submit" value="시작하기" />
      </form>
    </div>
  );
}
