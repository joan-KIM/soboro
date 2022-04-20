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
`;

export default function Button({type, value}) {
  return (
    <Btn type={type} value={value} />
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
