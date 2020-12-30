import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';

interface Props {
  color: string;
}

const StyledDisclaimer = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  text-align: center;
  width: 100%;
  max-width: 644px;
  margin: auto;
  margin-top: 4rem;
`;

const Disclaimer = (props: Props) => (
  <StyledDisclaimer color={props.color}>
    <TYPE.Header fontWeight={400}>
      LIFTOFF is an autonomous launchpad that anyone can use. Similar to
      Uniswap, anyone can create a token with any name, including fake versions
      of existing tokens. Please do your own research before joining a project.
    </TYPE.Header>
  </StyledDisclaimer>
);

export default Disclaimer;
