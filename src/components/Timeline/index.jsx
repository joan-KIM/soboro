import React from 'react';
import Info from '../Info';
import styled from 'styled-components';
import {useTimeline} from '../../hooks/useTimeline';
import {useUser} from '../../hooks/useUser';
import Event from './Event';

const Wrapper = styled.div`
  margin: 12px 19px;
`;

export default function Timeline() {
  const {user} = useUser();
  const {timeline} = useTimeline(user);
  console.log(timeline);
  return (
    <Wrapper>
      <Info text="새로운 친구를 추가해보세요" />
      <Info text="친구와 함께한 추억을 등록해보세요" />
      {timeline.map(({id, title, members, isPublic}) => <Event
        key={id}
        title={title}
        members={members}
        isPublic={isPublic}
      />)}
    </Wrapper>
  );
}
