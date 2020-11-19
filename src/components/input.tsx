import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';

interface Props {
  type: string;
  onChange: (e: any) => any;
  disabled: boolean;
  placeholder: string;
  isTouched: any;
  hasError: any;
}

const InputContainer = styled.input<{ error: any }>`
  font-family: 'Open Sans', sans-serif;
  border: 1px solid #dadada;
  border-radius: 5px;
  height: 2.375rem;
  outline: none;
  padding: 0 1rem;
  width: 100%;
`;

const Input = ({
  type,
  onChange,
  disabled,
  placeholder,
  isTouched,
  hasError
}: Props) => {
  const error = isTouched && hasError;
  return (
    <>
      <InputContainer
        error={error}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <TYPE.Body color="red2">{error}</TYPE.Body>}
    </>
  );
};

export default Input;
