import React from 'react';
import Header from '../components/common/Header';
import styled from 'styled-components';
import EventInput from '../components/EventInput';
import DateInput from '../components/DateInput';
import PictureInput from '../components/PictureInput';
import MemberInput from '../components/MemberInput';

const Complete = styled.div`
  color: #4886FF;
  font-weight: 600;
`;

export default function CreateEventPage() {
  return (
    <div>
      <Header title="새 추억" option={<Complete onClick={() => console.log('hi')}>완료</Complete>} />
      <MemberInput />
      <EventInput />
      <DateInput />
      <PictureInput />
    </div>
  );
}
