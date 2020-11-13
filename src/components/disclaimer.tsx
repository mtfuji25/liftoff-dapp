import React from 'react';
import styled from 'styled-components';

interface Props {
  color: string;
}

const StyledDisclaimer = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  text-align: center;
  margin-top: 1rem;
`;

const StyledDisclaimerText = styled.span`
  width: 3rem;
  font-size: 0.8rem;
`;

export const Disclaimer = (props: Props) => (
  <StyledDisclaimer color={props.color}>
    <StyledDisclaimerText>
      LIFTOFF is an autonomous launchpad that anyone can use. Similar to
      Uniswap, anyone can create a token with any name, including fake versions
      of existing tokens. Please do your own research before joining a project.
    </StyledDisclaimerText>
  </StyledDisclaimer>
);
