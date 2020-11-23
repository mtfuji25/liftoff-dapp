import React from 'react';
import styled from 'styled-components';

import { StyledTable } from '../pages/RocketDetail';
import Button from './button';
import Input from './input';
import { TYPE } from '../theme';

const FORM = styled.form`
  display: flex;
  padding: 1rem 0;
  align-items: center;
  button {
    margin: 0 1rem;
  }
`;

const StyledButton = styled(Button)``;

const Ignite = () => {
  return (
    <>
      <TYPE.Header>Ignite</TYPE.Header>
      <StyledTable cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td width="40%">
              <TYPE.Body>Total ETH Ignited</TYPE.Body>
            </td>
            <td width="60%">
              <TYPE.Body>135 ETH</TYPE.Body>
            </td>
          </tr>
        </tbody>
      </StyledTable>

      <TYPE.Header>Amount of ETH to ignite</TYPE.Header>
      <FORM>
        <Input placeholder="0" type="text" width="30%" />
        <StyledButton>Ignite</StyledButton>
        <TYPE.Small color="primary1">Your ETH ignited: 1.26 ETH</TYPE.Small>
      </FORM>
    </>
  );
};

export default Ignite;
