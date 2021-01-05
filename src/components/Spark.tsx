import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { StyledRocketCard, TYPE } from '../theme';
import { useConnectedWeb3Context, useContracts } from '../contexts';

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
  tokenSaleId: string;
}

const Spark: FC<IProps> = ({ tokenSaleId }) => {
  const context = useConnectedWeb3Context();
  const { liftoffEngine } = useContracts(context);

  const onClickSpark = async () => {
    if (!liftoffEngine) {
      return;
    }
    try {
      await liftoffEngine.spark(tokenSaleId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledRocketCard>
      <TYPE.LargeHeader>Spark Project</TYPE.LargeHeader>
      <CTA>
        <StyledButton onClick={onClickSpark}>Spark</StyledButton>
      </CTA>
    </StyledRocketCard>
  );
};

export default Spark;
