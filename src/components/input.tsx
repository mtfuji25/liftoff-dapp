import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Error } from './text';

interface Props {
  type: string;
  onChange: (e: any) => any;
  disabled: boolean;
  placeholder: string;
  isTouched: any;
  hasError: any;
}

const InputContainer = styled.input<{ error: any }>`
  border: 1px solid #dadada;
  border-radius: 0.5rem;
  height: 2rem;
  outline: none;
  padding: 0 1rem;
  margin: 0.5rem 0;
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
      {error && <Error>{error}</Error>}
    </>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export { Input };
