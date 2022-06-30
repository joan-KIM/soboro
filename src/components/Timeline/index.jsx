import React from 'react';
import Info from '../Info';
import styled from 'styled-components';
import {useTimeline} from '../../hooks/useTimeline';
import {useUser} from '../../hooks/useUser';
import EventGroup from './EventGroup';

const Wrapper = styled.div`
  margin: 12px 19px;
`;

export default function Timeline() {
  const {user} = useUser();
  const {timeline, groupByDate} = useTimeline(user);
  console.log(timeline);
  return (
    <Wrapper>
      {!user?.friend?.list?.length && <Info text="새로운 친구를 추가해보세요" />}
      {!timeline.length && <Info text="친구와 함께한 추억을 등록해보세요" />}
      {groupByDate(timeline).map((events) => <EventGroup key={events[0].date} events={events} />)}
    </Wrapper>
  );
}
