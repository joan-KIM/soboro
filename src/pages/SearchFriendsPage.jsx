import React, {useState} from 'react';
import SearchBar from '../components/common/SearchBar';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import Profile from '../components/common/Profile';
import {useFriends} from '../hooks/useFriends';
import StateButton from '../components/common/StateButton';

const Page = styled.div`
  padding: 18px;
`;

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

const Main = styled.main`
  display: flex;
  align-items: center;
`;

export default function SearchFriendsPage() {
  const {register, handleSubmit} = useForm();
  const {searchFriend} = useFriends();
  const [user, setUser] = useState();

  const onSubmit = async (data) => {
    const result = await searchFriend(data.search);
    setUser(result);
  };

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SearchBar
          required
          name='search'
          register={register}
          placeholder='사용자 아이디를 검색해보세요'
        />
        <SearchBtn type='submit' >검색</SearchBtn>
      </Form>
      <Main>
        { user && <Profile user={user} email /> }
        { user && <StateButton user={user} />}
      </Main>
    </Page>
  );
};

