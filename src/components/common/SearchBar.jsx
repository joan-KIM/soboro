import React from 'react';
import Icon, {ICON_TYPE} from './Icon';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Div = styled.div`
  background: #F0F0F0;
  padding: 7px 9.5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Input = styled.input`
  flex:1;
  margin-left: 8px;
  border: none;
  outline: none;
  background: none;
  font-size: 14px;
  padding: 0;

  &::placeholder{
    color: #636363;
  }
`;

export default function SearchBar({placeholder}) {
  return (
    <Div>
      <Icon type={ICON_TYPE.SEARCH} size={19} />
      <Input type='text' placeholder={placeholder} />
    </Div>
  );
}

SearchBar.propTypes = {
  placeholder: propTypes.string,
};
