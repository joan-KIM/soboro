import React, {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ProfilePictureEditor from '../components/ProfilePictureEditor';
import SignUpInput from '../components/SignUpInput';
import {findUserByName} from '../firebase/firestore';
import {useUser} from '../hooks/useUser';

const Page = styled.div`
  background: #F4F4F4;
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
  height: 100vh;
  padding: 16px;
`;

const Form = styled.form`
  & > div{
    margin-bottom: 14px;
  }
`;

export default function EditProfilePage() {
  const {register, handleSubmit, resetField,
    formState: {errors, dirtyFields}} = useForm({mode: 'onBlur', reValidateMode: 'onBlur'});
  const {user} = useUser();
  const ref = useRef();
  console.log(user);
  const onSubmit = () => {

  };

  return (
    <Page>
      <Header>
        <Link to="/profile">취소</Link>
        <Title>프로필</Title>
        <SaveBtn type="button">완료</SaveBtn>
      </Header>

      <Main>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                const user = await findUserByName(v);
                if (user) {
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
