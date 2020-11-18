import React from 'react';
import styled from 'styled-components';
import { StyledButton } from '../pages/Launchpad';
import { StyledTable } from '../pages/RocketDetail';
import { TYPE } from '../theme';

const CTA = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `}
`;

export const TokenStats = () => {
  return (
    <>
      <TYPE.Header>Token Stats</TYPE.Header>
      <StyledTable cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td>Ticker</td>
            <td>XYZ</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>www.website.com</td>
          </tr>
          <tr>
            <td>dApp</td>
            <td>www.website.com/dapp</td>
          </tr>
          <tr>
            <td>Ticker</td>
            <td>XYZ</td>
          </tr>
        </tbody>
      </StyledTable>

      <TYPE.Body>Claim Token Rewards</TYPE.Body>
      <CTA>
        <StyledButton>Claim</StyledButton>
        <TYPE.Small color="primary1">
          Current available to claim: 0.00 XYZ
        </TYPE.Small>
      </CTA>
    </>
  );
};
