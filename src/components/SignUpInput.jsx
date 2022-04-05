import React, {useState} from 'react';
import {TiDelete} from 'react-icons/ti';
import styled from 'styled-components';

const InputContainer = styled.div`
background: #FAFAFA;
border-radius: 8px;
padding: 10px 13px;

label{
font-size: 10px;
color: #676C76;
display: block;
}
`;

const InputGroup = styled.div`
padding: 10px 0 6px 0;
display: flex;

input{
outline: none;
border: none;
background: none;
font-size: 17px;
color: #BEBFBF;
}

input::placeholder{
color: #BEBFBF;
}

svg{
color: #969696;
font-size: 18px;
display: block;
margin: auto;
margin-right: 0;
}
`;

export default function SignUpInput() {
  const [text, setText] = useState('');

  function changeHandler(text) {
    setText(text);
  }

  function clickHandler(e) {
    setText('');
  }

  return (
    <InputContainer>
      <label>사용자 이름</label>
      <InputGroup>
        <input
          type='text'
          placeholder='영문 사용자 이름 입력'
          value={text}
          onChange={(e) => changeHandler(e.target.value)}
        />
        <TiDelete onClick={clickHandler} />
      </InputGroup>
    </InputContainer>
  );
}
