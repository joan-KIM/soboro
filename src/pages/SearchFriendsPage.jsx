import React from 'react';
import SearchBar from '../components/common/SearchBar';
import styled from 'styled-components';

const Page = styled.div`
  padding: 18px;
`;

export default function SearchFriendsPage() {
  return (
    <Page>
      <SearchBar placeholder='사용자 아이디를 검색해보세요' />
    </Page>
  );
}
