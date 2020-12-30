import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { TYPE, StyledRocketCard } from '../theme';
import { Link } from 'react-router-dom';

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

const Flex = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
});

const StyledButton = styled(Button)``;

const Insurance: FC = () => {
  return (
    <StyledRocketCard>
      <Flex>
        <TYPE.LargeHeader>Insurance</TYPE.LargeHeader>
        <Link to="/">What is LIFTOFF Insurance</Link>
      </Flex>
      <TYPE.Body>Redeem XYZ for orignial sale price with 2% fee.</TYPE.Body>
      <CTA>
        <StyledButton>Start Insurance</StyledButton>
      </CTA>
    </StyledRocketCard>
  );
};

export default Insurance;
