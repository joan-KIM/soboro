import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import SignUpInput from '../components/SignUpInput';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {ReactComponent as Close} from '../assets/close.svg';
import {ReactComponent as CheckMark} from '../assets/check.svg';

const Page = styled.div`
  padding: 17px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  padding: 31px 0 35px;
  margin: 0;
`;

const Submit = styled.input`
  border: none;
  background: #FFD12D;
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  border-radius: 38px;
  text-align: center;
  width: 100%;
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

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

const Checkbox = styled.div`
  width: 9px;
  height: 9px;
  margin: 0 9px 0 6px;
  border: 1px solid ${(props) => props.checked ? '#27AE60' : '#707070'};
  border-radius: 50%;
  box-sizing: border-box;
  background: ${(props) => props.checked ? '#27AE60' : 'none'};
  position: relative;

  svg{
    position: absolute;
    top:1.5px;
    visibility: ${(props) => props.checked ? 'visible' : 'hidden'};
  }
`;


export default function SignUpPage() {
  const {register, handleSubmit, reset, formState: {errors, dirtyFields}} = useForm({mode: 'onBlur'});
  const [checked, setChecked] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Page>
      <Link to="/account/login"><Close width="24" height="24" /></Link>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          required
          reset={reset}
          name="username"
          label="사용자 이름"
          register={register}
          placeholder="영문 사용자 이름 입력"
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
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
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
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
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
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
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
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
          reset={reset}
          validate={{
            minLength: (v) => v.length > 6 || '최소 6자 이상 입력해주세요.',
          }}
          isDirty={dirtyFields.birthday}
          error={errors.birthday}
        />
        <CheckList>
          <li>
            <Label>
              <Input type="checkbox" checked={checked} onClick={(e) => setChecked(!checked)} />
              <Checkbox checked={checked}>
                <CheckMark />
              </Checkbox>
              (필수) 개인정보 수집 및 이용 동의
            </Label>
          </li>
          <li>
            <Label>
              <Input type="checkbox" checked={checked} onClick={(e) => setChecked(!checked)} />
              <Checkbox checked={checked}>
                <CheckMark />
              </Checkbox>
              (필수) 추억을 보낸 친구와 타임라인 공유하기
            </Label>
          </li>
          <li>
            <Label>
              <Input type="checkbox" checked={checked} onClick={(e) => setChecked(!checked)} />
              <Checkbox checked={checked}>
                <CheckMark />
              </Checkbox>
              (필수) 성실하게 추억을 기록하고 나누기
            </Label>
          </li>
        </CheckList>
        <Submit type="submit" value="회원가입" />
      </Form>
    </Page>
  );
}
