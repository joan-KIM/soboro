import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-left: 10px;
  padding-bottom: 5px;
  margin-bottom: 8px;
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  top: 5px;
  left: 0;
  width: 1px;
  height: calc(100% - 8px);
  background: #FFC700;
`;

const TopCircle = styled.div`
  position: absolute;
  top: 5px;
  left: -2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #FFC700;
`;
const BottomCircle = styled.div`
  position: absolute;
  bottom: 0;
  left: -2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #FFC700;
`;

const Date = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 15.6px;
  margin-bottom: 5px;
`;

export default function EventGroup({events}) {
  const [{date}] = events;
  return (
    <Wrapper>
      <TopCircle />
      <Line />
      <BottomCircle />

      <Date>{date}</Date>
      {events.map(({id, title, members, isPublic}) => <Event
        key={id}
        title={title}
        members={members}
        isPublic={isPublic}
      />)}
    </Wrapper>
  );
}

EventGroup.propTypes = {
  events: PropTypes.array.isRequired,
};
