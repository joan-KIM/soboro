import React from 'react';
import Info from '../Info';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 12px 19px;
`;

export default function Timeline() {
  return (
    <Wrapper>
      <Info text="새로운 친구를 추가해보세요" />
      <Info text="친구와 함께한 추억을 등록해보세요" />
    </Wrapper>
  );
}
