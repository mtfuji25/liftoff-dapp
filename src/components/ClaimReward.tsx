import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { TYPE } from '../theme';

const CTA = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `}
`;

const StyledButton = styled(Button)``;

const ClaimReward: FC = () => {
  return (
    <>
      <TYPE.Header>Claim Token Rewards</TYPE.Header>
      <CTA>
        <StyledButton>Claim</StyledButton>
        <TYPE.Small color="primary1">
          Current available to claim: 0.00 XYZ
        </TYPE.Small>
      </CTA>
    </>
  );
};

export default ClaimReward;
