import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  width: 74px;
  height: 22px;
  color: ${(props) => props.color};
  background: ${(props) => props.bgColor};
  
  font-size: 12px;
  font-weight: 600;
  border-radius: 5px;
  outline: none;
  border: none;
  display: block;
  margin-left: auto;
`;

export default function BadgeButton({
  color,
  value,
  bgColor,
  onClick,
}) {
  return (
    <Button
      type='button'
      onClick={onClick}
      color={color}
      bgColor={bgColor}
    >
      {value}
    </Button>
  );
}

BadgeButton.propTypes = {
  value: propTypes.string.isRequired,
  color: propTypes.string,
  bgColor: propTypes.string,
  onClick: propTypes.func,
};
