import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #FAFAFA;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  padding: 9px 8px 10px 12px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 18px;
  font-size: 18px;
  font-weight: 700;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Profiles = styled.div`
  margin-left: 6px;
  vertical-align: top;
`;

const Profile = styled.img`
  width: 24px;
  height: 24px;
  margin-left: -6px;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
`;

const More = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: -6px;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
  text-align: center;
  line-height: 24px;
  vertical-align: top;
  font-size: 12px;
  background: #FFD12D;
`;

const Public = styled.div`
  font-size: 9px;
  color: #646464;
`;

export default function Event({title, members, isPublic}) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Detail>
        <Profiles>
          {members.slice(0, 6).map(({uid, photoUrl}) => <Profile key={uid} src={photoUrl} />)}
          {members.length > 1 && <More>{members.length - 1}</More>}
        </Profiles>
        <Public>
          {isPublic ? '전체 공개' : '멤버 공개'}
        </Public>
      </Detail>
    </Wrapper>
  );
}

Event.propTypes = {
  title: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
};
