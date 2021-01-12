import React, { FC } from 'react';
import { utils } from 'ethers';
import styled from 'styled-components';
import Button from './Button';
import { StyledRocketCard, TYPE } from '../theme';
import { useConnectedWeb3Context, useContracts, useTxModal } from '../contexts';
import { TxStatus } from 'utils/enums';

const CTA = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
  `}
`;

const StyledButton = styled(Button)``;

interface IProps {
  amount: string;
  tokenSaleId: string;
}

const ClaimRefund: FC<IProps> = ({ amount, tokenSaleId }) => {
  const [, updateTxStatus, toggleTxModal] = useTxModal();
  const context = useConnectedWeb3Context();
  const { liftoffEngine } = useContracts(context);
  const { account } = context;

  const onClaimRefund = async () => {
    if (!liftoffEngine || !account) {
      return;
    }
    try {
      const txHash = await liftoffEngine.claimRefund(tokenSaleId, account);
      await toggleTxModal(liftoffEngine.provider, txHash);
    } catch (error) {
      console.log(error);
      updateTxStatus(TxStatus.TX_ERROR);
    }
  };

  return (
    <>
      <StyledRocketCard>
        <TYPE.LargeHeader>Claim Refund</TYPE.LargeHeader>
        <CTA>
          <StyledButton onClick={onClaimRefund}>Claim Refund</StyledButton>
          <TYPE.Small color="primary1">
            Claim Refund: {utils.formatEther(amount)} ETH
          </TYPE.Small>
        </CTA>
      </StyledRocketCard>
    </>
  );
};

export default ClaimRefund;
