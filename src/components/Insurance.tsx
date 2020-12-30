import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { TYPE, StyledRocketCard } from '../theme';
import { Link } from 'react-router-dom';

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

const Flex = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
});

const StyledButton = styled(Button)``;

const Insurance: FC = () => {
  return (
    <StyledRocketCard>
      <Flex>
        <TYPE.LargeHeader>Insurance</TYPE.LargeHeader>
        <div
          data-multiline
          data-html={true}
          data-tip="<p>Liftoff Insurance allows you to redeem your tokens at the presale launch price. It's useful if the value of your tokens on Uniswap falls below the presale launch price. You can then deposit your tokens here, into the Insurance contract, and get your eth back minus a 2% fee. If enough of the Insurance is claimed in the first week, the Insurance contract will unwind the entire sale, so that all tokens can be redeemed for the original ETH.</p><p>After the first week, the Insurance availability falls, but is still available for 10 weeks. However, the sale cannot be unwound and if the Insurance fund is exhausted, no more claims can be made.</p>"
        >
          What is LIFTOFF Insurance
        </div>
      </Flex>
      <TYPE.Body>Redeem XYZ for orignial sale price with 2% fee.</TYPE.Body>
      <CTA>
        <StyledButton>Start Insurance</StyledButton>
      </CTA>
    </StyledRocketCard>
  );
};

export default Insurance;
