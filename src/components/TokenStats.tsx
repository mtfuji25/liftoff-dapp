import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { StyledTable } from '../pages/ProjectDetail';
import { TYPE } from '../theme';

const CTA = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `}
`;

const StyledButton = styled(Button)``;

const TokenStats: FC = () => {
  return (
    <>
      <TYPE.Header>Token Stats</TYPE.Header>
      <StyledTable cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td width="40%">
              <TYPE.Body>Ticker</TYPE.Body>
            </td>
            <td width="60%">
              <TYPE.Body>XYZ</TYPE.Body>
            </td>
          </tr>
        </tbody>
      </StyledTable>

      <TYPE.Header>Claim Token Rewards</TYPE.Header>
      <CTA>
        <StyledButton>Claim</StyledButton>
        <TYPE.Small color="primary1">
          Current available to claim: 0.00 XYZ
        </TYPE.Small>
      </CTA>
    </>
  );
};

export default TokenStats;
