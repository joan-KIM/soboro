import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Div = styled.div`
  background: #FFFFFF;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function ProfilePicture({url}) {
  return (
    <Div>
      <Image src={url} />
    </Div>
  );
}

ProfilePicture.propTypes = {
  url: propTypes.string,
};
