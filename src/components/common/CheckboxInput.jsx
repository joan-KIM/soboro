import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import {ReactComponent as Checked} from '../../assets/checked.svg';
import {ReactComponent as Unchecked} from '../../assets/unchecked.svg';

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

const Checkbox = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 9px 0 6px;
  position: relative;

  svg{
    position: absolute;
  }
`;

export default function CheckboxInput({label, name, register, required, checked}) {
  return (
    <Label>
      <Input type="checkbox" {...register(name, {validate: (v) => !required || v})} />
      <Checkbox checked={checked}>
        {checked ? <Checked /> : <Unchecked />}
      </Checkbox>
      {label}
    </Label>
  );
}

CheckboxInput.propTypes = {
  label: propTypes.string,
  name: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
  required: propTypes.bool,
  checked: propTypes.bool,
};
