import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 13px 18px;
  border-bottom: 0.2px solid #C0C0C0;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
`;

export default function EventForm({title, children}) {
  return (
    <Form>
      <Title>{title}</Title>
      {children}
    </Form>
  );
}

EventForm.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};
