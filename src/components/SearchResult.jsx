import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import StateButton from '../components/common/StateButton';
import {useUser} from '../hooks/useUser';

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

const P = styled.p`
  text-align: center;
`;
export default function SearchResult({result, dispatchFriendAction}) {
  const {user} = useUser();

  const onClick = (action) => {
    dispatchFriendAction(result.uid, action);
  };

  return (
    <div>
      { result.uid ?
      <Wrapper>
        <Profile>
          <Image src={result?.photoUrl} />
          <Div>
            <Name>{result?.name}</Name>
            <Email>{result?.email}</Email>
          </Div>
        </Profile>
        { user.uid !== result.uid && <StateButton status={result.status} onClick={onClick} /> }
      </Wrapper> :
      <P>해당 아이디의 사용자가 없습니다.</P>
      }
    </div>
  );
};

SearchResult.propTypes = {
  result: propTypes.object,
  dispatchFriendAction: propTypes.func,
};
