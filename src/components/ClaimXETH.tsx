import React from 'react';
import styled from 'styled-components';
import { StyledRocketCard, TYPE } from '../theme';
import Button from './Button';

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

const ClaimxETH = () => {
  return (
    <Card>
      <TYPE.LargeHeader>Claim xETH for Project Developers</TYPE.LargeHeader>
      <TYPE.Body>
        Time to next claim: 6 days 9 hrs 36 mins 46 sec (Devs only can claim
        once a week)
      </TYPE.Body>
      <TYPE.Body>Times left to claim: 10</TYPE.Body>
      <CTA>
        <StyledButton>Claim</StyledButton>
        <TYPE.Small color="white" fontWeight="bold">
          Current available to claim: 50 xETH
        </TYPE.Small>
      </CTA>
    </Card>
  );
};

export default ClaimxETH;
