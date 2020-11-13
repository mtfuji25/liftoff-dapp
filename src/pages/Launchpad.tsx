import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';

interface Props {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: auto;
`;

export const Launchpad = (props: Props) => {
  return (
    <StyledContainer>
      <TYPE.LargeHeader color="white">
        🕹Luanchpad for Developers
      </TYPE.LargeHeader>
      <TYPE.Header marginY="1.875rem" color="white">
        How it works
      </TYPE.Header>
      <TYPE.Body color="white" textAlign="center" lineHeight="1.5rem">
        1. Register your project with this form.
        <br />
        2. Include a link to your working dapp that will use the created token.
        <br />
        3. Submit and pay the gas fee.
        <br />
        4. Liftoff will create your ERC20 token and your project's liftoff page.
      </TYPE.Body>
      <TYPE.Body color="white" textAlign="center"></TYPE.Body>
    </StyledContainer>
  );
};
