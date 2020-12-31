import React, { FC } from 'react';
import styled from 'styled-components';
import { StyledTable } from '../pages/ProjectDetail';
import { TYPE, StyledRocketCard, ExternalLink } from '../theme';
import Button from './Button';

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
    <StyledRocketCard>
      <TYPE.Header>Token Stats</TYPE.Header>
      <StyledTable cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td width="40%">
              <TYPE.Body>Contract Link</TYPE.Body>
            </td>
            <td width="60%">
              <ExternalLink href="https://etherscan.com/address/0xa205D203543122dd142aE63bB0A5EA9A32FB14f41">
                0xa205D203543122dd142aE63bB0A5EA9A32FB14f41
              </ExternalLink>
            </td>
          </tr>
          <tr>
            <td width="40%">
              <TYPE.Body>PenguinSwap Price</TYPE.Body>
            </td>
            <td width="60%">
              <TYPE.Body>XX.XX</TYPE.Body>
            </td>
          </tr>
          <tr>
            <td width="40%">
              <TYPE.Body>PenguinSwap Link</TYPE.Body>
            </td>
            <td width="60%">
              <ExternalLink href="https://penguinswap.eth.link">
                penguinswap.eth.link
              </ExternalLink>
              <TYPE.Body color="primary1"></TYPE.Body>
            </td>
          </tr>
        </tbody>
      </StyledTable>
      <CTA>
        <StyledButton>Trade on PenguinSwap</StyledButton>
      </CTA>
    </StyledRocketCard>
  );
};

export default TokenStats;
