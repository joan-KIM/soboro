import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon, {ICON_TYPE} from './common/Icon';
import backgroundImage from './../assets/info_background.png';

const Wrapper = styled.div`
  background-color: #FFD12D;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: 97%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  padding: 19px 11px;
  margin-bottom: 10px;
  animation: slideup 1s;

  @keyframes slideup {
    from {
      opacity: 0;
      margin-top: 100vh;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  &>svg {
    margin-right: 6px;
  }
`;

export default function Info({text, onClick}) {
  return (
    <Wrapper onClick={() => onClick?.()}>
      <Icon type={ICON_TYPE.INFO} />
      {text}
    </Wrapper>
  );
}

Info.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
