import React, {useRef} from 'react';
import ProfileUploader from '../components/ProfileUploader';
import Button from '../components/common/Button';
import {compress} from '../utils/compress';
import {useStorage} from '../hooks/useStorage';
import {getURL} from '../firebase/storage';
import {useUser} from '../hooks/useUser';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const Page = styled.div`
  padding: 17px;
  height: ${(props) => props.height}px;
  box-sizing: border-box;
`;

const P = styled.p`
  font-weight: 600;
  font-size: 23px;
  margin: 0;
  text-align: center;
  margin-top: 20px;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

export default function ProfilePhotoPage() {
  const {user, updatePhotoUrl} = useUser();
  const {upload} = useStorage(user?.uid);
  const ref = useRef();
  const navigate = useNavigate();

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
    await updatePhotoUrl(photoUrl);
    navigate('/');
  };

  return (
    <Page height={window.innerHeight}>
      <Form onSubmit={onSubmit}>
        <Wrapper>
          <ProfileUploader ref={ref} />
          <P>{user?.name}님 환영해요.<br/>
            프로필 사진을 등록한 후<br/>
            친구와의 추억을 공유해보세요.
          </P>
        </Wrapper>
        <Button type="submit" value="시작하기" />
      </Form>
    </Page>
  );
}
