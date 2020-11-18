import React from 'react';
import styled from 'styled-components';
import { StyledButton } from '../pages/Launchpad';
import { StyledTable } from '../pages/RocketDetail';
import { TYPE } from '../theme';

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
        <StyledButton>Claim</StyledButton>
        <TYPE.Small color="primary1">Your ETH ignited: 1.26 ETH</TYPE.Small>
      </FORM>
    </>
  );
};
