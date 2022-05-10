import React from 'react';
import {NavLink} from 'react-router-dom';
import Icon, {ICON_TYPE} from './Icon';
import styled from 'styled-components';

const Nav = styled.ul`
  width: 100%;
  height: 49px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  position: fixed;
  bottom: 0;
`;

const List = styled.li`
  width: 25%;

  a{
    display: flex;
    justify-content: center;
  }

  .active svg{
    display: block;
    fill: #FFD12D;
  }
`;

export default function Navigation() {
  return (
    <Nav>
      <List>
        <NavLink to="/profile"><Icon type={ICON_TYPE.PROFILE} size={38} /></NavLink>
      </List>
      <List>
        <NavLink to="/"><Icon type={ICON_TYPE.HOME} size={32} /></NavLink>
      </List>
      <List>
        <NavLink to="/event/create"><Icon type={ICON_TYPE.UPLOAD} size={32} /></NavLink>
      </List>
      <List>
        <NavLink to="/friends/search"><Icon type={ICON_TYPE.USER_PLUS} size={32} /></NavLink>
      </List>
    </Nav>
  );
}
