import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background: #FFFFFF;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 11px 13px;
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin: 6px 0;
  display: flex;
  align-items: center;

  svg{
      margin-left: auto;
  }
`;

export default function BlockLevelButton({color, value, onClick, children}) {
  return (
    <Button color={color} onClick={onClick}>
      {value}
      {children}
    </Button>
  );
}

BlockLevelButton.propTypes = {
  color: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
