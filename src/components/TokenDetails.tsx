import React from 'react';
import styled from 'styled-components';
import { utils, BigNumber } from 'ethers';
import { TokenSale } from 'utils/types';

import Card from './Card';
import { ProgressBar } from './ProgressBar';

import { StyledRocketCard, TYPE } from '../theme';

const CardGrid = styled.div(
  {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  ({ theme }) =>
    theme.mediaWidth.upToExtraSmall({
      gridTemplateColumns: '1fr'
    })
);

const StyledCard = styled(Card)({
  border: '2px solid #CFD6E2',
  marginTop: 10
});

const ProgressStatus = styled.div({
  padding: '1rem 0'
});

type Props = {
  tokenSale: TokenSale;
};

const TokenDetails = ({ tokenSale }: Props) => {
  const percent = BigNumber.from(tokenSale.totalIgnited)
    .mul(BigNumber.from('100'))
    .div(BigNumber.from(tokenSale.hardCap))
    .toNumber();

  return (
    <StyledRocketCard>
      <TYPE.LargeHeader>Token Details</TYPE.LargeHeader>
      <ProgressStatus>
        <ProgressBar completed={percent} />
      </ProgressStatus>
      <CardGrid>
        <StyledCard>
          <TYPE.Body color="blue1">SOFTCAP</TYPE.Body>
          <TYPE.Header>{utils.formatEther(tokenSale.softCap)} xETH</TYPE.Header>
        </StyledCard>
        <StyledCard>
          <TYPE.Body color="blue1">TOTAL IGNITED</TYPE.Body>
          <TYPE.Header>
            {utils.formatEther(tokenSale.totalIgnited)} xETH
          </TYPE.Header>
        </StyledCard>
        <StyledCard>
          <TYPE.Body color="blue1">HARDCAP</TYPE.Body>
          <TYPE.Header>{utils.formatEther(tokenSale.hardCap)} xETH</TYPE.Header>
        </StyledCard>
      </CardGrid>
    </StyledRocketCard>
  );
};

export default TokenDetails;
