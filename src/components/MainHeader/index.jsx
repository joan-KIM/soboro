import React from 'react';
import Icon, {ICON_TYPE} from '../common/Icon';
import styled from 'styled-components';
import FilterHeader from './FilterHeader';

const CommonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 17px 2px;
`;

export default function MainHeader() {
  return (
    <header>
      <CommonHeader>
        <Icon type={ICON_TYPE.NOTIFICATION} size={24} />
        <Icon type={ICON_TYPE.SEARCH} size={24} />
      </CommonHeader>
      <FilterHeader />
    </header>
  );
}
