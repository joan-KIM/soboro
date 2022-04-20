import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SignUpInput from '../components/SignUpInput';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import Icon, {ICON_TYPE} from '../components/common/Icon';
import CheckboxInput from '../components/common/CheckboxInput';
import {findUserByEmail, findUserByName} from '../firebase/firestore';
import {useAuth} from '../hooks/useAuth';
import Button from '../components/common/Button';

const Page = styled.div`
  padding: 17px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  padding: 31px 0 35px;
  margin: 0;
`;

const CheckList = styled.ul`
  list-style: none;
  margin: 62px 0 26px;
  padding: 0;
  color: #707070;
  font-size: 13px;

  li{
    padding: 3.5px 0;
  }
`;

const Form = styled.form`
  & > div{
    margin-bottom: 16px;
  }
`;

export default function SignUpPage() {
  const {register, handleSubmit, resetField, watch, trigger,
    formState: {errors, dirtyFields},
  } = useForm({mode: 'onBlur', reValidateMode: 'onBlur'});
  const privateChecked = watch('private');
  const shareChecked = watch('share');
  const recordChecked = watch('record');
  const password = watch('password');
  const navigate = useNavigate();
  const {signup} = useAuth();

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      const user = {
        name: data.username,
        email: data.email,
        password: data.password,
        birthday: data.birthday,
      };
      await signup(user);
      navigate('/account/login');
    }
  };

  return (
    <Page>
      <Link to="/account/login">
        <Icon type={ICON_TYPE.CLOSE} size={24} />
      </Link>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          required
          reset={resetField}
          name="username"
          label="사용자 이름"
          register={register}
          placeholder="영문 사용자 이름 입력"
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
          name="email"
          label="이메일"
          register={register}
          placeholder="abcde@gmail.com"
          reset={resetField}
          validate={{
            pattern: (v) => /^[^@]+@[^@]+$/.test(v) || '이메일 형식이 맞지 않습니다.',
            isUnique: async (v) => {
              const user = await findUserByEmail(v);
              if (user) {
                return '중복된 이메일 입니다.';
              }
              return true;
            },
          }}
          isDirty={dirtyFields.email}
          error={errors.email}
        />
        <SignUpInput
          password
          required
          name="password"
          label="비밀번호"
          register={register}
          placeholder="비밀번호 입력"
          reset={resetField}
          validate={{
            pattern: (v) => /^[\w\W]{8,}$/.test(v) || '8자 이상 입력하세요.',
          }}
          isDirty={dirtyFields.password}
          error={errors.password}
        />
        <SignUpInput
          password
          required
          name="confirmPassword"
          label="비밀번호 확인"
          register={register}
          placeholder="비밀번호 재입력"
          reset={resetField}
          validate={{
            confirm: (v) => password == v || '비밀번호가 일치하지 않습니다.',
          }}
          isDirty={dirtyFields.confirmPassword}
          error={errors.confirmPassword}
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
        <CheckList>
          <li key="private">
            <CheckboxInput
              required
              label="(필수) 개인정보 수집 및 이용 동의"
              register={register}
              name="private"
              checked={privateChecked}
            />
          </li>
          <li key="share">
            <CheckboxInput
              required
              label="(필수) 추억을 보낸 친구와 타임라인 공유하기"
              register={register}
              name="share"
              checked={shareChecked}
            />
          </li>
          <li key="record">
            <CheckboxInput
              required
              label="(필수) 성실하게 추억을 기록하고 나누기"
              register={register}
              name="record"
              checked={recordChecked}
            />
          </li>
        </CheckList>
        <Button type="submit" value="회원가입" />
      </Form>
    </Page>
  );
}
