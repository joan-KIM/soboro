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

export default function LoginInput({placeholder}) {
  return (
    <Div>
      <Input type="text" placeholder={placeholder} />
      <Icon type={ICON_TYPE.CLEAR} size={13} />
    </Div>
  );
}

LoginInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
