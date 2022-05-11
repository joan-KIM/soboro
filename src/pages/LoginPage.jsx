import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {ReactComponent as Logo} from '../assets/logo.svg';
import RoundButton from '../components/common/RoundButton';
import {useAuth} from '../hooks/useAuth';
import {errorMessage} from '../constants/error';

const Page = styled.div`
  padding: 21px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 39px;
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Suez One', serif;
  font-size: 30px;
`;

const Form = styled.form`
  text-align: center;
  
  div{
    margin-bottom: 11px;
  }
  
  input[type="submit"]{
    margin-top: 5px;
    margin-bottom: 11px;
  }

  input[type="button"]{
    margin-bottom: 16px;
  }

  a{
    text-decoration: none;
    color: #707070;
    font-size: 15px;
  }
`;


export default function LoginPage() {
  const {resetField, register, handleSubmit} = useForm();
  const {login} = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({email, password}) => {
    const error = await login(email, password);
    if (error) {
      alert(errorMessage[error]);
    } else {
      navigate('/');
    }
  };

  return (
    <Page>
      <Div>
        <Logo width="93" height="87" />
        <Title>Soboro</Title>
      </Div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          required
          name="email"
          register={register}
          resetField={resetField}
          placeholder="이메일 주소"
        />
        <LoginInput
          required
          password
          name="password"
          register={register}
          resetField={resetField}
          placeholder="비밀번호"
        />
        <RoundButton type="submit" value="로그인" />
        <Link to="/account/signup"><RoundButton type="button" value="회원가입" /></Link>
        <Link to="/account/resetpassword">비밀번호를 잊으셨나요?</Link>
      </Form>
    </Page>
  );
}

