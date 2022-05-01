import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Icon, {ICON_TYPE} from '../components/common/Icon';
import LoginInput from '../components/LoginInput';
import {useForm} from 'react-hook-form';
import Button from '../components/common/Button';
import styled from 'styled-components';
import {useAuth} from '../hooks/useAuth';
import {errorMessage} from '../constants/error';

const Page = styled.div`
    padding: 20px;
`;

const Title = styled.p`
    font-weight: 700;
    font-size: 30px;
    margin: 83px 0 16px;
`;

const P = styled.p`
    color: #707070;
    margin-bottom: 93px;
`;

const Form = styled.form`
    div{
        margin-bottom: 19px;
    }
`;

export default function ResetPasswordPage() {
  const {register, resetField, handleSubmit} = useForm();
  const {resetPassword} = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({email}) => {
    const error = await resetPassword(email);
    if (error) {
      alert(errorMessage[error]);
    } else {
      alert('입력하신 이메일로 비밀번호 재설정 링크가 전송되었습니다.');
      navigate('/account/login');
    }
  };

  return (
    <Page>
      <Link to="/account/login"><Icon type={ICON_TYPE.CLOSE} size={24} /></Link>
      <Title>비밀번호 재설정</Title>
      <P>이메일 주소를 입력하면<br />해당 이메일로 비밀번호를 재설정 할 수 있습니다.</P>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          required
          name="email"
          register={register}
          resetField={resetField}
          placeholder="이메일 주소"
        />
        <Button type="submit" value="확인" />
      </Form>
    </Page>
  );
}
