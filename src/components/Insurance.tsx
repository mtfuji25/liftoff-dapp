import React, { FC } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Button from 'components/Button';
import { TYPE, StyledRocketCard } from 'theme';
import InputWithAddon from 'components/InputAddon';

import { TokenInsurance } from 'utils/types';

const CTA = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `}
`;

const RowFlex = styled.div(
  {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      flexDirection: 'column',
      padding: '10px 0'
    })
);

const Redeem = styled.div({
  marginTop: 20
});

const FlexWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      flexDirection: 'column',
      padding: '10px 0'
    })
);

const StyledButton = styled(Button)`
  padding: 0.5rem;
`;

const RedeemButton = styled(StyledButton)(
  {
    margin: '0 1rem'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      margin: 0
    })
);

interface IProps {
  tokenInsurance: Maybe<TokenInsurance>;
}

const Insurance: FC<IProps> = ({ tokenInsurance }) => {
  const isInsuranceStarted = !!(tokenInsurance && tokenInsurance.isInitialized);

  return (
    <StyledRocketCard>
      <RowFlex>
        <TYPE.LargeHeader>Insurance</TYPE.LargeHeader>
        <TYPE.Body data-tip data-for="insurance" color="primary1">
          What is LIFTOFF Insurance
        </TYPE.Body>
      </RowFlex>
      <TYPE.Body>Redeem XYZ for orignial sale price with 2% fee.</TYPE.Body>
      {/* Redeem insurance */}
      {isInsuranceStarted && (
        <TYPE.Body color="blue1">Percentage remaining: 100%</TYPE.Body>
      )}
      {isInsuranceStarted && (
        <TYPE.Body fontWeight="bold" marginBottom="0.5rem" marginTop="1rem">
          Approve the insurance contract to redeem your tokens
        </TYPE.Body>
      )}
      <CTA>
        <StyledButton>Start Insurance</StyledButton>
      </CTA>
      {isInsuranceStarted && (
        <Redeem>
          <TYPE.Body fontWeight="bold">Amount of XYZ to Redeem</TYPE.Body>
          <FlexWrap>
            <InputWithAddon placeholder="0" text="xETH" />
            <RedeemButton>Redeem</RedeemButton>

            <TYPE.Body color="blue1">
              You will get 0.00 xETH (Current xETH Balance: 0.00)
            </TYPE.Body>
          </FlexWrap>
        </Redeem>
      )}

      <ReactTooltip id="insurance">
        <p>
          Liftoff Insurance allows you to redeem your tokens at the presale
          launch price. It's useful if the <br /> value of your tokens on
          Uniswap falls below the presale launch price. You can then deposit
          your
          <br /> tokens here, into the Insurance contract, and get your eth back
          minus a 2% fee. If enough of the <br /> Insurance is claimed in the
          first week, the Insurance contract will unwind the entire sale, so
          that <br /> all tokens can be redeemed for the original ETH.
        </p>
        <p>
          After the first week, the Insurance availability falls, but is still
          available for 10 weeks. However, the <br /> sale cannot be unwound and
          if the Insurance fund is exhausted, no more claims can be made.
        </p>
      </ReactTooltip>
    </StyledRocketCard>
  );
};

export default Insurance;
