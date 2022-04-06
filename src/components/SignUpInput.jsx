import React from 'react';
import {TiDelete} from 'react-icons/ti';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = styled.div`
background: #FAFAFA;
border-radius: 8px;
padding: 10px 13px;
box-sizing: border-box;

label{
font-size: 10px;
color: #676C76;
display: block;
}

&:focus-within{
  border: 1px solid #000000;
  background: #FFFFFF;
}
`;

const InputGroup = styled.div`
padding: 10px 0 6px 0;
display: flex;


svg{
color: #969696;
font-size: 18px;
display: block;
margin: auto;
margin-right: 0;
}
`;

const Input = styled.input`
  outline: none;
  border: none;
  background: none;
  font-size: 17px;
  color: #BEBFBF;
  flex: 1;
  
  &::placeholder{
    color: #BEBFBF;
  }
`;

export default function SignUpInput({name, label, register, placeholder, reset, password, required, validate}) {
  return (
    <InputContainer>
      <label>
        {label}
        <InputGroup>
          <Input
            type={password ? 'password' : 'text'}
            placeholder={placeholder}
            {...register(name, {required, validate})}
          />
          <TiDelete onClick={() => reset({[name]: ''})} />
        </InputGroup>
      </label>
    </InputContainer>
  );
}

SignUpInput.propTypes = {
  required: PropTypes.bool,
  password: PropTypes.bool,
  validate: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};
