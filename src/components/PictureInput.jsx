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

export default function PictureInput() {
  return (
    <EventForm title={<Title><Icon type={ICON_TYPE.PICTURE} size={18} />사진</Title>}>

    </EventForm>
  );
}
