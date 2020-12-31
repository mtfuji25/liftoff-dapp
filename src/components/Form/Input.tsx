import React, { Fragment } from 'react';
import styled from 'styled-components';
// import { AutoColumn, AutoRow } from '../Layout';

import {
  FormGroup,
  Input as InputContainer,
  Label,
  Message
} from './components';

type Props = {
  label: string;
  errorMessage?: string;
};

const StyledRow = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  margin: '0.1rem 0'
});

export const Input = ({ label, errorMessage, ...rest }: Props) => {
  return (
    <FormGroup>
      <StyledRow>
        {label && <Label>{label}</Label>}
        {/* <AutoColumn> */}
        <InputContainer {...rest} />
        {/* </AutoColumn> */}
        <Fragment></Fragment>
        <Message></Message> {/* Intentionally left empty */}
        {errorMessage && <Message>{errorMessage}</Message>}
      </StyledRow>
    </FormGroup>
  );
};
