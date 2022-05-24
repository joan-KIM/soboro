import React, {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import ProfilePictureEditor from '../components/ProfilePictureEditor';
import SignUpInput from '../components/SignUpInput';
import {findUserByName} from '../firebase/firestore';
import {useUser} from '../hooks/useUser';
import {useStorage} from '../hooks/useStorage';
import {compress} from '../utils/compress';

const Page = styled.div`
  background: #F4F4F4;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  background: #FFFFFF;
  width: 100vw;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;

  a, a:visited{
    text-decoration: none;
    color: black;
    font-weight: 600;
    display: block;
    position: absolute;
    left: 22px;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const SaveBtn = styled.button`
  position: absolute;
  right: 22px;
  border: none;
  background none;
  font-weight: 600;
  padding: 0;
  font-size: 16px;
  color: #4886FF;
`;

const Main = styled.main`
  height: 100%;
  padding: 16px;
`;

const Form = styled.form`
  & > div{
    margin-bottom: 14px;
  }

  & > div:first-child{
    margin: 12px auto 26px;
  }
`;

export default function EditProfilePage() {
  const {user, updateProfile} = useUser();
  const {register, handleSubmit, resetField,
    formState: {errors, dirtyFields, isValid}} = useForm({
    mode: 'onBlur', reValidateMode: 'onBlur',
    defaultValues: {
      username: user?.name,
      birthday: user?.birthday,
    },
  });
  const {upload} = useStorage(user?.uid);
  const ref = useRef();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const [file] = ref.current.files;
    let url = '';

    if (file) {
      const compressedFile = await compress(file, 200, 200);
      url = await upload(compressedFile);
    } else {
      url = user.photoUrl;
    };

    const editedProfile = {
      ...user,
      name: data.username,
      birthday: data.birthday,
      photoUrl: url,
    };

    if (isValid) {
      await updateProfile(editedProfile);
      navigate('/profile');
    }
  };

  return (
    <Page>
      <Header>
        <Link to="/profile">취소</Link>
        <Title>프로필</Title>
        <SaveBtn type="submit" form="editedProfile">완료</SaveBtn>
      </Header>

      <Main>
        <Form onSubmit={handleSubmit(onSubmit)} id="editedProfile">
          <ProfilePictureEditor ref={ref} />
          <SignUpInput
            required
            reset={resetField}
            name="username"
            label="사용자 이름"
            placeholder="영문 사용자 이름 입력"
            register={register}
            validate={{
              pattern: (v) => /^[a-z0-9._]{5,20}$/.test(v) || '5~20자의 영문 소문자, 숫자와 특수기호(_),(.)만 사용 가능합니다.',
              isUnique: async (v) => {
                const existUser = await findUserByName(v);
                if (v !== user.name && existUser) {
                  return '중복된 사용자 이름 입니다.';
                }
                return true;
              },
            }}
            isDirty={dirtyFields.username}
            error={errors.username}
          />
          <SignUpInput
            required
            name="birthday"
            label="생년월일"
            register={register}
            placeholder="숫자 6자리 입력"
            reset={resetField}
            validate={{
              pattern: (v) => /^\d{2}(0[1-9]|1[0-2])([1-2][0-9]|3[0-1]|0[1-9])$/.test(v) || '생일 형식이 맞지 않습니다.',
            }}
            isDirty={dirtyFields.birthday}
            error={errors.birthday}
          />
        </Form>
      </Main>
    </Page>
  );
}
