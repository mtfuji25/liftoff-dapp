import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { BigNumber, utils } from 'ethers';

import { StyledRocketCard, TYPE } from '../theme';
import Button from './Button';

import { useConnectedWeb3Context, useContracts } from 'contexts';
import { TokenInsurance } from 'utils/types';
import { getLiftoffSettings } from 'utils/networks';

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
  networkId: number | undefined;
  tokenSaleId: string;
  tokenInsurance: Maybe<TokenInsurance>;
}

const ClaimXETH: React.FC<IProps> = ({
  networkId,
  tokenSaleId,
  tokenInsurance
}) => {
  const context = useConnectedWeb3Context();
  const { liftoffInsurance } = useContracts(context);
  const setting = getLiftoffSettings(networkId);

  const currentTime = moment().unix();
  const cycles =
    tokenInsurance && tokenInsurance.startTime
      ? Math.floor(
          (currentTime - tokenInsurance.startTime) / setting.insurancePeriod
        )
      : 0;
  const leftCycles = cycles > 10 ? 0 : 10 - cycles;

  let claimable = '0';
  if (
    tokenInsurance &&
    tokenInsurance.totalIgnited &&
    tokenInsurance.redeemedXEth &&
    tokenInsurance.claimedXEth
  ) {
    console.log(tokenInsurance);
    const totalFinalClaim = BigNumber.from(tokenInsurance.totalIgnited)
      .sub(BigNumber.from(tokenInsurance.claimedXEth))
      .sub(BigNumber.from(tokenInsurance.redeemedXEth));
    const totalMaxClaim = totalFinalClaim
      .mul(BigNumber.from(cycles))
      .div(BigNumber.from('10'));
    const max = totalMaxClaim.gt(totalFinalClaim)
      ? totalFinalClaim
      : totalMaxClaim;

    claimable = max
      .mul(BigNumber.from(setting.projectDevBP))
      .div(BigNumber.from('10000'))
      .toString();

    console.log(claimable);
  }

  const onClaimXEth = async () => {
    if (!liftoffInsurance) {
      return;
    }

    try {
      await liftoffInsurance.claim(tokenSaleId);
    } catch (error) {
      alert(error.message || error);
      console.log(error);
    }
  };

  return (
    <Card>
      <TYPE.LargeHeader>Claim xETH for Project Developers</TYPE.LargeHeader>
      {tokenInsurance?.hasBaseFeeClaimed && (
        <>
          {false && (
            <TYPE.Body>
              Time to next claim: 6 days 9 hrs 36 mins 46 sec (Devs only can
              claim once a week)
            </TYPE.Body>
          )}
          <TYPE.Body>Times left to claim: {leftCycles}</TYPE.Body>
        </>
      )}

      <CTA>
        <StyledButton onClick={onClaimXEth}>
          {tokenInsurance?.hasBaseFeeClaimed ? 'Claim' : 'Claim Base Fee'}
        </StyledButton>

        {tokenInsurance?.hasBaseFeeClaimed && (
          <TYPE.Small color="white" fontWeight="bold">
            Current available to claim:{' '}
            {utils.formatEther(claimable).toString()} xETH
          </TYPE.Small>
        )}
      </CTA>
    </Card>
  );
};

export default ClaimXETH;
