import React from 'react';
import Icon, {ICON_TYPE} from './common/Icon';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  background: #FAFAFA;
  padding: 22px 13px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-size: 15px;

  svg{
    fill: #969696;
  }

  &:focus-within{
    background: #FFFFFF;
    border: 1px solid #000000;
  }

  &:focus-within svg{
    fill: #000000;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  background: none;
  flex: 1;

  &::placeholder{
    color: #969696;
  }
`;

export default function LoginInput({name, required, register, resetField, password, placeholder}) {
  return (
    <Div>
      <Input
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        {...register(name, {required})}
      />
      <Icon type={ICON_TYPE.CLEAR} size={13} onClick={() => resetField(name)} />
    </Div>
  );
}

LoginInput.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  register: PropTypes.func.isRequired,
  password: PropTypes.bool,
  resetField: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
