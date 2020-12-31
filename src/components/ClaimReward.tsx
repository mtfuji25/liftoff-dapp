import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { StyledRocketCard, TYPE } from '../theme';

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

const ClaimReward: FC = () => {
  return (
    <StyledRocketCard>
      <TYPE.Header>Claim Token Rewards</TYPE.Header>
      <CTA>
        <StyledButton>Claim</StyledButton>
        <TYPE.Small color="primary1">
          Current available to claim: 0.00 XYZ
        </TYPE.Small>
      </CTA>
    </StyledRocketCard>
  );
};

export default ClaimReward;
