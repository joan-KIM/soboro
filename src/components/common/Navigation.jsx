import React from 'react';
import {Link} from 'react-router-dom';
import Icon, {ICON_TYPE} from './Icon';
import styled from 'styled-components';

const Nav = styled.ul`
  width: 100%;
  height: 49px;
  // background: yellow;
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const List = styled.li`
  width: 25%;

  a{
    display: flex;
    justify-content: center;
  }

  svg{
    display: block;
  }
`;

export default function Navigation() {
  return (
    <Nav>
      <List>
        <Link to="/profile"><Icon type={ICON_TYPE.PROFILE} size={38} /></Link>
      </List>
      <List>
        <Link to="/"><Icon type={ICON_TYPE.HOME} size={32} /></Link>
      </List>
      <List>
        <Link to="/event/create"><Icon type={ICON_TYPE.UPLOAD} size={32} /></Link>
      </List>
      <List>
        <Link to="/friends/search"><Icon type={ICON_TYPE.USER_PLUS} size={32} /></Link>
      </List>
    </Nav>
  );
}
