import React, { FC } from 'react';
import { BigNumber } from 'ethers';
import styled from 'styled-components';
import Button from './Button';
import { StyledRocketCard, TYPE } from '../theme';
import { useConnectedWeb3Context, useContracts, useTxModal } from '../contexts';

import { TokenSale, Ignitor } from 'utils/types';
import { formatBigNumber } from 'utils';
import TxModal from './TxModal';

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

const StyledButton = styled(Button)``;

interface IProps {
  tokenSale: TokenSale;
  igniteInfo: Maybe<Ignitor>;
}

const ClaimReward: FC<IProps> = ({ igniteInfo, tokenSale }) => {
  const [{ txStatus, txHash }, updateTxStatus, toggleTxModal, onClose] = useTxModal();
  const context = useConnectedWeb3Context();
  const { liftoffEngine } = useContracts(context);
  const { account } = context;

  const reward = BigNumber.from(igniteInfo ? igniteInfo.ignited : '0')
    .mul(BigNumber.from(tokenSale.rewardSupply))
    .div(BigNumber.from(tokenSale.totalIgnited));

  const onClaimReward = async () => {
    if (!liftoffEngine || !account) {
      return;
    }
    try {
      const txHash = await liftoffEngine.claimReward(tokenSale.id, account);
      await toggleTxModal(liftoffEngine.provider, txHash);
    } catch (error) {
      console.log(error);
      updateTxStatus(1);
    }
  };

  return (
    <>
      <StyledRocketCard>
        <TYPE.LargeHeader>Claim Token Rewards</TYPE.LargeHeader>
        <CTA>
          <StyledButton onClick={onClaimReward}>Claim</StyledButton>
          <TYPE.Small color="primary1">
            Current available to claim: {formatBigNumber(reward, 18)}{' '}
            {tokenSale.symbol}
          </TYPE.Small>
        </CTA>
      </StyledRocketCard>
      <TxModal
        txStatus={txStatus}
        txHash={txHash}
        onClose={onClose}
      />
    </>
  );
};

export default ClaimReward;
