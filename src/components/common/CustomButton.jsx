import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  width: ${(props) => props.width ? props.width : 74}px;
  height: ${(props) => props.height ? props.height : 22}px;
  color: ${(props) => props.color ? props.color : 'black'};
  background: ${(props) => props.bgColor ? props.bgColor : '#FFD12D'};
  
  font-weight: 600;
  border-radius: 5px;
  outline: none;
  border: none;
  font-weight: 
`;

export default function CustomButton({
  color,
  value,
  width,
  height,
  bgColor,
  onClick,
}) {
  return (
    <Button
      type='button'
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      width={width}
      height={height}
    >
      {value}
    </Button>
  );
}

CustomButton.propTypes = {
  value: propTypes.string.isRequired,
  color: propTypes.string,
  bgColor: propTypes.string,
  width: propTypes.number,
  height: propTypes.number,
  onClick: propTypes.func.isRequired,
};
