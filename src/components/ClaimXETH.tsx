import React from 'react';
import styled from 'styled-components';
import { StyledRocketCard, TYPE } from '../theme';
import Button from './Button';

import { useConnectedWeb3Context, useContracts } from 'contexts';
import { TokenInsurance } from 'utils/types';

const Card = styled(StyledRocketCard)({
  backgroundColor: '#7289DA',
  color: '#ffffff'
});

const CTA = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2rem;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
`}
`;

const StyledButton = styled(Button)({
  backgroundColor: '#F3C44C'
});

interface IProps {
  tokenSaleId: string;
  tokenInsurance: Maybe<TokenInsurance>;
}

const ClaimXETH: React.FC<IProps> = ({ tokenSaleId, tokenInsurance }) => {
  const context = useConnectedWeb3Context();
  const { liftoffInsurance } = useContracts(context);

  const onClaimXEth = async () => {
    if (!liftoffInsurance) {
      return;
    }

    try {
      await liftoffInsurance.claim(tokenSaleId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <TYPE.LargeHeader>Claim xETH for Project Developers</TYPE.LargeHeader>
      {tokenInsurance?.hasBaseFeeClaimed && (
        <>
          <TYPE.Body>
            Time to next claim: 6 days 9 hrs 36 mins 46 sec (Devs only can claim
            once a week)
          </TYPE.Body>
          <TYPE.Body>Times left to claim: 10</TYPE.Body>
        </>
      )}

      <CTA>
        <StyledButton onClick={onClaimXEth}>
          {tokenInsurance?.hasBaseFeeClaimed ? 'Claim' : 'Claim Base Fee'}
        </StyledButton>

        {tokenInsurance?.hasBaseFeeClaimed && (
          <TYPE.Small color="white" fontWeight="bold">
            Current available to claim: 50 xETH
          </TYPE.Small>
        )}
      </CTA>
    </Card>
  );
};

export default ClaimXETH;
