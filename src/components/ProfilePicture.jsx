import React from 'react';
import {useAuth} from '../hooks/useAuth';
import styled from 'styled-components';

const Div = styled.div`
    background: #FFFFFF;
    width: 111px;
    height: 111px;
    border-radius: 50%;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function ProfilePicture() {
  const {user} = useAuth();

  return (
    <Div>
      <Image src={user?.photoUrl} />
    </Div>
  );
}
