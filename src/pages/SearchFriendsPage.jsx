import React from 'react';
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

const P = styled.p`
  text-align: center;
`;

export default function SearchFriendsPage() {
  const {register, handleSubmit, formState: {isSubmitted}} = useForm();
  const {searchFriend, searchResult} = useFriends();

  const onSubmit = async (data) => {
    await searchFriend(data.search);
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
      { isSubmitted ?
        (searchResult ?
          <Main>
            <Profile user={searchResult} email />
            <StateButton friend={searchResult} />
          </Main> :
          <P>해당 아이디의 사용자가 없습니다.</P>) :
      undefined
      }
    </Page>
  );
};

