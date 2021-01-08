import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Token, Fetcher, Route } from '@uniswap/sdk';

import { StyledTable } from 'pages/ProjectDetail';
import {
  TYPE,
  StyledRocketCard,
  ExternalLink,
  TBody,
  TData,
  TRow
} from 'theme';
import { shortenAddress } from 'utils';
import { getContractAddress } from 'utils/networks';

const Card = styled(StyledRocketCard)`
  padding: 0;
`;

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

const StyledButton = styled(ExternalLink)`
  font-family: 'Open Sans', sans-serif;
  padding: 0.7rem 2rem 0.7rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #2a7cea;
  color: #ffffff;
`;

const HeaderText = styled(TYPE.LargeHeader)``;

const StyledTData = styled(TData)(
  {
    width: '66%'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      width: '100%'
    })
);

interface IProps {
  deployed: string;
  networkId: number | undefined;
}

const TokenStats: FC<IProps> = ({ deployed, networkId }) => {
  const xEthAddress = getContractAddress(networkId || 3, 'xEth');
  const swapLink = `https://penguinswap.eth.link/#/swap?inputCurrency=${xEthAddress}&outputCurrency=${deployed}`;
  const [tokenPrice, setTokenPrice] = useState('0');

  useEffect(() => {
    if (!networkId) {
      return;
    }

    const getTokenPrice = async () => {
      const xEth = new Token(networkId, xEthAddress, 18);
      const token = new Token(networkId, deployed, 18);
      const pair = await Fetcher.fetchPairData(token, xEth);
      const route = new Route([pair], xEth);

      setTokenPrice(route.midPrice.invert().toSignificant(6));
    };

    getTokenPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkId]);

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
              <ExternalLink
                href={`https://${
                  networkId === 3 ? 'ropsten.' : ''
                }etherscan.com/address/${deployed}`}
              >
                {deployed}
              </ExternalLink>
            </StyledTData>
          </TRow>
          <TRow>
            <TData>
              <TYPE.Body>PenguinSwap Price</TYPE.Body>
            </TData>
            <StyledTData>
              <TYPE.Body>
                {tokenPrice === '0' ? 'XX.XX' : tokenPrice} xETH
              </TYPE.Body>
            </StyledTData>
          </TRow>
          <TRow>
            <TData>
              <TYPE.Body>PenguinSwap Link</TYPE.Body>
            </TData>
            <StyledTData>
              <ExternalLink
                href={swapLink}
              >{`penguinswap.eth.link/#/swap?inputCurrency=${shortenAddress(
                xEthAddress
              )}&outputCurrency=${shortenAddress(deployed)}`}</ExternalLink>
              <TYPE.Body color="primary1"></TYPE.Body>
            </StyledTData>
          </TRow>
        </TBody>
      </StyledTable>
      <CTA>
        <StyledButton href={swapLink}>Trade on PenguinSwap</StyledButton>
      </CTA>
    </Card>
  );
};

export default TokenStats;
