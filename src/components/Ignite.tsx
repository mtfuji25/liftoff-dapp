import React, { useState } from 'react';
import styled from 'styled-components';
import { utils } from 'ethers';
import Button from './Button';
import InputWithAddon from './InputAddon';
import { TYPE, StyledRocketCard, ExternalLink } from '../theme';
import { useConnectedWeb3Context, useContracts, useTxModal } from '../contexts';
import { Ignitor } from 'utils/types';
import { TxStatus } from 'utils/enums';
import LegalModal from './legalModal';

const Flex = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-start;
  `}
  button {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 1rem 0 0 0;
    `}
  }
`;

const StyledButton = styled(Button)`
  margin-left: 1.25rem;
`;

const StyledInput = styled(InputWithAddon)({}, ({ theme }) =>
  theme.mediaWidth.upToSmall({})
);

interface IProps {
  tokenSaleId: string;
  igniteInfo: Maybe<Ignitor>;
  tokenTicker: string;
}

const Ignite: React.FC<IProps> = ({ tokenSaleId, igniteInfo, tokenTicker }) => {
  const [, updateTxStatus, toggleTxModal] = useTxModal();
  const context = useConnectedWeb3Context();
  const { liftoffEngine } = useContracts(context);
  const { account } = context

  const [amount, setAmount] = useState('0');
  const [isModalOpen, setModalOpen] = useState(false);

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const onClickIgnite = () => {
    setModalOpen(true);
  };

  const onClickUndoIgnite = async () => {
    if (!liftoffEngine) {
      return;
    }

    try {
      const txHash = await liftoffEngine.undoIgnite(tokenSaleId);
      await toggleTxModal(liftoffEngine.provider, txHash);
    } catch (error) {
      console.log(error);
      updateTxStatus(TxStatus.TX_ERROR);
    }
  };

  const onModalClose = () => {
    setModalOpen(false);
  }

  const onModalAccept = async () => {
    setModalOpen(false);
    if (!amount || amount === '0' || !liftoffEngine || !account) {
      return;
    }
    try {
      const txHash = await liftoffEngine.igniteEth(tokenSaleId, amount);
      // const txHash = await liftoffEngine.ignite(tokenSaleId, account, amount);
      await toggleTxModal(liftoffEngine.provider, txHash);
    } catch (error) {
      console.log(error);
      updateTxStatus(TxStatus.TX_ERROR);
    }
  }

  return (
    <>
      <StyledRocketCard>
        <TYPE.LargeHeader mb="1rem">Ignite</TYPE.LargeHeader>
        <TYPE.Body lineHeight="1.5rem">
          Ignite to add ETH to the sale, so you can claim tokens at the end.
          Full refund if softcap isn’t hit. <br />
          It automatically converts ETH to xETH.{' '}
          <ExternalLink href="https://xlock.eth.link/">
            Learn about xETH
          </ExternalLink>
        </TYPE.Body>
        <TYPE.Header mt="1.375rem">Amount of ETH to ignite</TYPE.Header>
        <Flex>
          <StyledInput
            placeholder="0"
            type="text"
            text="ETH"
            value={amount}
            onChange={(event) => onChangeAmount(event)}
          />
          <StyledButton onClick={onClickIgnite}>Ignite</StyledButton>
          <StyledButton onClick={onClickUndoIgnite}>UndoIgnite</StyledButton>
          <TYPE.Small
            color="primary1"
            ml={[0, 0, '1.875rem']}
            mt={['1rem', '1rem', 0]}
          >
            Your ETH ignited:{' '}
            {igniteInfo ? utils.formatEther(igniteInfo.ignited) : 0} ETH
          </TYPE.Small>
        </Flex>
      </StyledRocketCard>
      <LegalModal
        isOpen={isModalOpen}
        tokenTicker={tokenTicker}
        onAccept={onModalAccept}
        onClose={onModalClose}
       />
    </>
  );
};

export default Ignite;
