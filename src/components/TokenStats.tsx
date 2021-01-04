import React, { FC } from 'react';
import styled from 'styled-components';
import { shortenAddress } from 'utils';
import { StyledTable } from 'pages/ProjectDetail';
import {
  TYPE,
  StyledRocketCard,
  ExternalLink,
  TBody,
  TData,
  TRow
} from 'theme';
import Button from 'components/Button';

const Card = styled(StyledRocketCard)`
  padding: 0;
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `}
`;

const StyledButton = styled(Button)``;

const HeaderText = styled(TYPE.LargeHeader)`
  padding: 2rem 1rem;
`;

const StyledTData = styled(TData)({
  width: '66%'
});

const TokenStats: FC = () => {
  return (
    <Card>
      <HeaderText>Token Stats</HeaderText>
      <StyledTable cellSpacing={0} cellPadding={0}>
        <TBody>
          <TRow>
            <TData>
              <TYPE.Body>Contract Link</TYPE.Body>
            </TData>
            <StyledTData>
              <ExternalLink href="https://etherscan.com/address/0xa205D203543122dd142aE63bB0A5EA9A32FB14f41">
                {shortenAddress('0xa205D203543122dd142aE63bB0A5EA9A32FB14f41')}
              </ExternalLink>
            </StyledTData>
          </TRow>
          <TRow>
            <TData>
              <TYPE.Body>PenguinSwap Price</TYPE.Body>
            </TData>
            <StyledTData>
              <TYPE.Body>XX.XX</TYPE.Body>
            </StyledTData>
          </TRow>
          <TRow>
            <TData>
              <TYPE.Body>PenguinSwap Link</TYPE.Body>
            </TData>
            <StyledTData>
              <ExternalLink href="https://penguinswap.eth.link">
                penguinswap.eth.link
              </ExternalLink>
              <TYPE.Body color="primary1"></TYPE.Body>
            </StyledTData>
          </TRow>
        </TBody>
      </StyledTable>
      <CTA>
        <StyledButton>Trade on PenguinSwap</StyledButton>
      </CTA>
    </Card>
  );
};

export default TokenStats;
