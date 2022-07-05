import React from 'react';
import Icon, {ICON_TYPE} from './common/Icon';
import EventForm from './EventForm';
import styled from 'styled-components';

const Title = styled.div`
  & svg{
    vertical-align: top;
    margin-right: 5px;
  }
`;

export default function DateInput() {
  return (
    <EventForm title={<Title><Icon type={ICON_TYPE.CALENDAR} size={18} />2022.06.22 수요일</Title>}>

    </EventForm>
  );
}
