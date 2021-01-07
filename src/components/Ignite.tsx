import React, { useState } from 'react';
import styled from 'styled-components';
import { utils } from 'ethers';
import Button from './Button';
import InputWithAddon from './InputAddon';
import { TYPE, StyledRocketCard, ExternalLink } from '../theme';
import { useConnectedWeb3Context, useContracts } from '../contexts';
import { Ignitor } from 'utils/types';

const Flex = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-start;
  `}
  button {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 1rem 0;
    `}
  }
`;

const StyledButton = styled(Button)`
  margin-left: 1.25rem;
  margin-right: 1.825rem;
`;

const StyledInput = styled(InputWithAddon)({}, ({ theme }) =>
  theme.mediaWidth.upToSmall({})
);

interface IProps {
  tokenSaleId: string;
  igniteInfo: Maybe<Ignitor>;
}

const Ignite: React.FC<IProps> = ({ tokenSaleId, igniteInfo }) => {
  const context = useConnectedWeb3Context();
  const { liftoffEngine } = useContracts(context);

  const [amount, setAmount] = useState('0');

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const onClickIgnite = async () => {
    if (!amount || amount === '0' || !liftoffEngine) {
      return;
    }
    try {
      await liftoffEngine.igniteEth(tokenSaleId, amount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledRocketCard>
      <TYPE.LargeHeader mb="1rem">Ignite</TYPE.LargeHeader>
      <TYPE.Body lineHeight="1.5rem">
        Ignite to add ETH to the sale, so you can claim tokens at the end. Full
        refund if softcap isn’t hit. <br />
        It automatically converts ETH to xETH.{' '}
        <ExternalLink href="#">Learn about xETH</ExternalLink>
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
        <TYPE.Small color="primary1">
          Your ETH ignited:{' '}
          {igniteInfo ? utils.formatEther(igniteInfo.ignited) : 0} ETH
        </TYPE.Small>
      </Flex>
    </StyledRocketCard>
  );
};

export default Ignite;
