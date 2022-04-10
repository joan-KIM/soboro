import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ReactComponent as Clear} from '../assets/member-close.svg';

const InputContainer = styled.div`
  background: ${(props) => props.error ?
    '#FCEFEE' :
    (props.confirm ?
      '#EEFFF5' :
      '#FAFAFA'
    )};
  border-radius: 8px;
  padding: 10px 13px;
  border: 1px solid ${(props) => props.error ?
    '#EC625C' :
    (props.confirm ?
      '#27AE60' :
      'none'
      )};

  &:focus-within{
    border: 1px solid #000000;
    background: #FAFAFA;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 10px;
  color: ${(props) => props.error ?
    '#EC625C' :
    (props.confirm ?
      '#27AE60' :
      '#676C76'
    )};

  &:focus-within{
    color: #676C76;
  }
`;

const InputGroup = styled.div`
  padding: 10px 0 6px;
  display: flex;

  svg{
    display: block;
    margin: auto;
    margin-right: 0;
    fill: ${(props) => props.error ?
    '#EC625C' :
    (props.confirm ?
      '#27AE60' :
      '#969696'
    )};
  }

  &:focus-within svg{
    fill: #969696;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  background: none;
  font-size: 17px;
  color: ${(props) => props.error ?
    '#EC625C' :
    (props.confirm ?
      '#27AE60' :
      '#000000'
    )};
  flex: 1;
  
  &::placeholder{
    color: #BEBFBF;
  }

  &:focus{
    color: #000000;
  }
`;

const Message = styled.p`
  color: #EC625C;
  font-size: 11px;
  margin: 4px 6px;
`;

export default function SignUpInput({
  name,
  label,
  reset,
  error,
  isDirty,
  register,
  password,
  required,
  validate,
  placeholder,
}) {
  return (
    <div>
      <InputContainer error={error} confirm={isDirty && !error} >
        <Label error={error} confirm={isDirty && !error}>
          {label}
          <InputGroup error={error} confirm={isDirty && !error}>
            <Input
              error={error}
              confirm={isDirty && !error}
              type={password ? 'password' : 'text'}
              placeholder={placeholder}
              {...register(name, {required, validate})}
            />
            <Clear
              onClick={() => reset({[name]: ''})}
              width="13"
              height="13"
            />
          </InputGroup>
        </Label>
      </InputContainer>
      {error && <Message>{error.type === 'required' ? '필수 입력항목 입니다' : error.message}</Message>}
    </div>
  );
}

SignUpInput.propTypes = {
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  isDirty: PropTypes.bool,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  password: PropTypes.bool,
  validate: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
};
