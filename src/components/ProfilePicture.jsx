import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Div = styled.div`
    background: #FFFFFF;
    width: ${(props) => props.size ? props.size : '110px'};
    height: ${(props) => props.size ? props.size : '110px'};
    border-radius: 50%;
    overflow: hidden;
    border: ${(props) => props.border ? props.border : 'none'};
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function ProfilePicture({url, border, size}) {
  return (
    <Div border={border} size={size}>
      <Image src={url} />
    </Div>
  );
}

ProfilePicture.propTypes = {
  url: propTypes.string,
  border: propTypes.string,
  size: propTypes.number,
};
