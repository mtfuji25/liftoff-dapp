import React from 'react';
import styled from 'styled-components';
import { StyledButton } from '../pages/Launchpad';
import { StyledTable } from '../pages/RocketDetail';
import { TYPE } from '../theme';
import { Input } from './input';

const FORM = styled.form`
  display: flex;
  align-items: center;
  button {
    margin: 0 1rem;
  }
`;

export const Ignite = () => {
  return (
    <>
      <TYPE.Header>Ignite</TYPE.Header>
      <StyledTable cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td>Total ETH Ignited</td>
            <td>135 ETH</td>
          </tr>
        </tbody>
      </StyledTable>

      <TYPE.Header>Amount of ETH to ignite</TYPE.Header>
      <FORM>
        <Input
          placeholder="XYZ"
          type="text"
          hasError=""
          isTouched=""
          disabled={false}
          onChange={(e: any) => {}}
        />
        <StyledButton>Claim</StyledButton>
        <TYPE.Small color="primary1">Your ETH ignited: 1.26 ETH</TYPE.Small>
      </FORM>
    </>
  );
};
