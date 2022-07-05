import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import Icon, {ICON_TYPE} from './Icon';

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 0.2px solid #C0C0C0;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
`;

export default function Header({title, option}) {
  const navigate = useNavigate();
  return (
    <Head>
      <Icon type={ICON_TYPE.BACK} size={24} onClick={() => navigate(-1)} />
      <Title>{title}</Title>
      {option}
    </Head>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  option: PropTypes.element,
};
