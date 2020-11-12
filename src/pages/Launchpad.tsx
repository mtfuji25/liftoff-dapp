import React from 'react';
import styled from 'styled-components';

interface Props {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledText = styled.span``;
const StyledList = styled.ol``;
const StyledListItem = styled.li``;

export const Launchpad = (props: Props) => {
  return (
    <StyledContainer>
      <StyledText>🕹Luanchpad for Developers</StyledText>
      <StyledText>How it works</StyledText>
      <StyledList>
        <StyledListItem>
          <StyledText>Register your project with this form</StyledText>
        </StyledListItem>
        <StyledListItem>
          <StyledText>
            Include a link to your working dapp that will use the created token.
          </StyledText>
        </StyledListItem>
        <StyledListItem>
          <StyledText>Submit and pay the gas fee.</StyledText>
        </StyledListItem>
        <StyledListItem>
          <StyledText>
            Liftoff will create your ERC20 token and your project's liftoff
            page.
          </StyledText>
        </StyledListItem>
      </StyledList>
    </StyledContainer>
  );
};
