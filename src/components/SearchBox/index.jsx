import React from 'react';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Form = styled.form`
  display: flex;
  margin-bottom: 22px;
`;

const SearchBtn = styled.button`
  background: none;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: black;
  padding: 0;
  padding-left: 10px;
`;

export default function SearchBox({register, placeholder, onSubmit}) {
  return (
    <Form onSubmit={onSubmit}>
      <SearchBar
        register={register}
        placeholder={placeholder}
      />
      <SearchBtn type='submit'>검색</SearchBtn>
    </Form>
  );
};

SearchBox.propTypes = {
  register: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
};

