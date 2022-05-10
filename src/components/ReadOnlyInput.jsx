import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
    background: #FFFFFF;
    border-radius: 8px;
    padding: 10px 13px;
    margin-bottom: 14px;
`;

const Label = styled.label`
    font-size: 10px;
`;

const P = styled.p`
    margin: 10px 0 7px;
    font-size: 17px;
    font-weight: 500;
`;

export default function ReadOnlyInput({label, content}) {
  return (
    <Div>
      <Label>{label}</Label>
      <P>{content}</P>
    </Div>
  );
}

ReadOnlyInput.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string,
};
