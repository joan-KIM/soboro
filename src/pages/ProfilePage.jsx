import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import styled from 'styled-components';

const Page = styled.div`
  background: #E5E5E5;
  height: 100vh;
`;

const Header = styled.div`
  background: #FFFFFF;
  width: 100vw;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  a, a:visited{
    text-decoration: none;
    color: black;
    font-weight: 600;
    display: block;
    position: absolute;
    right: 22px;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

export default function ProfilePage() {
  const {user} = useAuth();
  return (
    <Page>
      <Header>
        <Title>프로필</Title>
        <Link to="/profile/edit">수정</Link>
      </Header>
      <div>
        프로필 컴포넌트
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <div>
          친구/추억
        </div>
      </div>
    </Page>
  );
}
