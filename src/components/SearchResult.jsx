import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import StateButton from '../components/common/StateButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const Div = styled.div`
  display: inline-block;
  padding-left: 13px;
`;

const Name = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 600;
  font-size: 15px;
`;

const Email = styled.p`
  padding: 0;
  margin: 0;
  color: #969696;
  font-size: 15px;
  font-weight: 400;
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 0.2px solid #969696;
`;

const Label = styled.div`
  width: 74px;
  height: 22px;
  background: #FFD12D;
  border-radius: 5px;
  margin-left: auto;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 22px;
`;

export default function SearchResult({result, dispatchFriendAction}) {
  return (
    <Wrapper>
      <Profile>
        <Image src={result?.photoUrl} />
        <Div>
          <Name>{result?.name}</Name>
          <Email>{result?.email}</Email>
        </Div>
      </Profile>
      {result.status === 'friend' ? <Label>친구</Label> :
      <StateButton friend={result} dispatchFriendAction={dispatchFriendAction} />
      }
    </Wrapper>
  );
};

SearchResult.propTypes = {
  result: propTypes.object,
  dispatchFriendAction: propTypes.func,
};
