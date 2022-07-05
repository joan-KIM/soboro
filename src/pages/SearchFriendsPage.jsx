import React from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {useFriends} from '../hooks/useFriends';
import SearchBox from '../components/SearchBox';
import SearchResult from '../components/SearchResult';

const Page = styled.div`
  padding: 18px;
`;

const P = styled.p`
  text-align: center;
`;

export default function SearchFriendsPage() {
  const {register, handleSubmit, formState: {isSubmitted}} = useForm();
  const {searchFriend, searchResult, dispatchFriendAction} = useFriends();

  const onSubmit = async (data) => await searchFriend(data.search);

  return (
    <Page>
      <SearchBox
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        placeholder='사용자 아이디를 검색해보세요'
      />
      { isSubmitted &&
        (searchResult.uid ?
          <SearchResult result={searchResult} dispatchFriendAction={dispatchFriendAction} /> :
          <P>해당 아이디의 사용자가 없습니다.</P>)
      }
    </Page>
  );
};

