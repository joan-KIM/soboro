import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Btn = styled.input`
  border: none;
  background: #FFD12D;
  font-size: 17px;
  font-weight: 600;
  padding: 14px;
  border-radius: 38px;
  text-align: center;
  width: 100%;
  -webkit-appearance: none;
  color: #000000;

  &:disabled{
    background: #F0F0F0;
    color: #A3A3A3;
  }
`;

export default function RoundButton({type, value, disabled}) {
  return (
    <Btn type={type} value={value} disabled={disabled ? true : false} />
  );
}

RoundButton.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
