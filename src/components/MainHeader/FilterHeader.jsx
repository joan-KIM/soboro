import React from 'react';
import styled from 'styled-components';
import Icon, {ICON_TYPE} from '../common/Icon';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 17px;
  border-bottom: #C0C0C0 solid 0.2px;
`;

const Date = styled.div`
  font-size: 25px;
  font-weight: 700;
  line-height: 34px;
  margin-right: auto;
  
  &>svg{
    vertical-align: text-top;
    margin-left: 2px;
  }
`;

const Button = styled.button`
  padding: 5px 6px;
  border: none;
  border-radius: 5px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 600;
  margin-left: 6px;
  align-self: center;
`;

export default function FilterHeader() {
  return (
    <Header>
      <Date>
        2022년 06월
        <Icon type={ICON_TYPE.DOWN} />
      </Date>
      <Button>내 추억만 보기</Button>
      <Button>맴버 필터</Button>
    </Header>
  );
}
