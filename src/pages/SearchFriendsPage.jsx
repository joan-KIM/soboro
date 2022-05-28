import React, {useState} from 'react';
import SearchBar from '../components/common/SearchBar';
import styled from 'styled-components';
import {findUserByName} from '../firebase/firestore';

const Page = styled.div`
  padding: 18px;
`;

const Div = styled.div`
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
  const [event, setEvent] = useState();
  const [user, setUser] = useState({});
  let name = '';

  const onClick = async (event) => {
    setEvent(event);
    const result = await findUserByName(name);
    setUser(result);
  };

  const getValue = (text) => {
    name = text;
  };

  return (
    <Page>
      <Div>
        <SearchBar placeholder='사용자 아이디를 검색해보세요' event={event} getValue={getValue} />
        <SearchBtn type='button' onClick={onClick}>검색</SearchBtn>
      </Div>
      <p>{user ? user.name : '해당 사용자가 없습니다.'}</p>
    </Page>
  );
}
