import React from 'react';
import ProfilePicture from '../ProfilePicture';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Info = styled.div`
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

const P = styled.p`
  padding: 0;
  margin: 0;
  color: #969696;
  font-size: 15px;
  font-weight: 400;
`;

export default function UserProfile({user, email, memory}) {
  return (
    <Info>
      {user && <ProfilePicture url={user?.photoUrl} border='0.8px solid #969696' size='56px' />}
      <Div>
        <Name>{user?.name}</Name>
        {email && <P>{user?.email}</P>}
        {memory && <P>함께한 추억 n개</P>}
      </Div>
    </Info>
  );
}

UserProfile.propTypes = {
  user: propTypes.object,
  email: propTypes.bool,
  memory: propTypes.bool,
};
