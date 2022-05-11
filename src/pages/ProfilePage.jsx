import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import styled from 'styled-components';
import ProfilePicture from '../components/ProfilePicture';
import {useFriends} from '../hooks/useFriends';
import {useTimeline} from '../hooks/useTimeline';
import ReadOnlyInput from '../components/ReadOnlyInput';
import BlockLevelButton from '../components/common/BlockLevelButton';
import Icon, {ICON_TYPE} from '../components/common/Icon';

const Page = styled.div`
  background: #E5E5E5;
`;

const Header = styled.div`
  background: #FFFFFF;
  width: 100vw;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;

  a, a:visited{
    text-decoration: none;
    color: black;
    font-weight: 600;
    display: block;
    position: absolute;
    right: 22px;
  }
`;

const Main = styled.main`
  padding: 0 16px 60px;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const Id = styled.p`
  font-family: 'Suez One', serif;
  font-size: 30px;
  margin: 0;
  margin-top: 10px;
`;

const Email = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #5E5E5E;
  margin: 3px 0;
`;

const Span = styled.span`
  font-size: 13px;
  color: #5E5E5E;
`;

const P = styled.p`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  line-height: 90%;
`;

const Line = styled.div`
  height: 27px;
  border-left: 0.5px solid #BDBDBD;
  margin: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 0 24px;
`;

const Div = styled.div`
  margin: 26px 0;
`;

export default function ProfilePage() {
  const {user, logout} = useAuth();
  const friends = useFriends();
  const {timelineWithMe} = useTimeline();
  const navigate = useNavigate();
  let birthday = '';

  if (user) {
    const bday = user.birthday;
    birthday = bday.slice(0, 2) + '.' + bday.slice(2, 4) + '.' + bday.slice(4);
  }

  return (
    <Page>
      <Header>
        <Title>프로필</Title>
        <Link to="/profile/edit">수정</Link>
      </Header>

      <Main>
        <View>
          <ProfilePicture />
          <Id>{user?.name}</Id>
          <Email>{user?.email}</Email>
          <Wrapper>
            <div>
              <P>{friends.length}</P>
              <Span>친구</Span>
            </div>
            <Line />
            <div>
              <P>{timelineWithMe.length}</P>
              <Span>추억</Span>
            </div>
          </Wrapper>
        </View>

        <ReadOnlyInput label="사용자 이름" content={user?.name} />
        <ReadOnlyInput label="이메일 주소" content={user?.email} />
        <ReadOnlyInput label="생년월일" content={birthday} />

        <Div>
          <BlockLevelButton value="친구" color="#4886FF" onClick={() => navigate('/friends/list')}>
            <Icon type={ICON_TYPE.FORWARD} color="#707070" />
          </BlockLevelButton>
        </Div>
        <BlockLevelButton value="로그아웃" color="#4886FF" onClick={logout} />
        <BlockLevelButton value="회원탈퇴" color="#FF5065" />
      </Main>
    </Page>
  );
}
