import React from 'react';
import SearchBar from '../components/common/SearchBar';
import styled from 'styled-components';

const Page = styled.div`
  padding: 18px;
`;

const Div = styled.div`
  // background: yellow;
  display: flex;
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

export default function SearchFriendsPage() {
  return (
    <Page>
      <Div>
        <SearchBar placeholder='사용자 아이디를 검색해보세요' />
        <SearchBtn type='button'>검색</SearchBtn>
      </Div>
    </Page>
  );
}
