import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/button';
import { Card, StyledCardLabel } from '../components/card';
import { Disclaimer } from '../components/disclaimer';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';

interface Props {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTitle = styled.span`
  font-weight: 400;
`;
const StyledText = styled.span`
  font-size: 0.8rem;
`;
const StyledList = styled.ol``;
const StyledListItem = styled.li``;

const StyledForm = styled.div`
  width: 40rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `}
`;

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const StyledButton = styled(Button)``;

export const Launchpad = (props: Props) => {
  return (
    <StyledContainer>
      <StyledTitle>🕹Luanchpad for Developers</StyledTitle>
      <StyledTitle>How it works</StyledTitle>
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

      <StyledForm>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>Project Name</StyledCardLabel>
            <Input
              placeholder="Liquidity Dividends Protocol"
              type="text"
              hasError=""
              isTouched=""
              disabled={false}
              onChange={(e: any) => {}}
            />
          </StyledFormItem>
        </Card>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>Token ticker</StyledCardLabel>
            <Input
              placeholder="XYZ"
              type="text"
              hasError=""
              isTouched=""
              disabled={false}
              onChange={(e: any) => {}}
            />
          </StyledFormItem>
        </Card>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>Project Description</StyledCardLabel>
            <Textarea />
          </StyledFormItem>
        </Card>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>Website Link</StyledCardLabel>
            <Input
              placeholder="XYZ"
              type="text"
              hasError=""
              isTouched=""
              disabled={false}
              onChange={(e: any) => {}}
            />
          </StyledFormItem>
        </Card>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>dApp Link</StyledCardLabel>
            <Input
              placeholder="XYZ"
              type="text"
              hasError=""
              isTouched=""
              disabled={false}
              onChange={(e: any) => {}}
            />
          </StyledFormItem>
        </Card>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>Whitepaper Link</StyledCardLabel>
            <Input
              placeholder="XYZ"
              type="text"
              hasError=""
              isTouched=""
              disabled={false}
              onChange={(e: any) => {}}
            />
          </StyledFormItem>
        </Card>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>Social Media Links</StyledCardLabel>
            <Input
              placeholder="XYZ"
              type="text"
              hasError=""
              isTouched=""
              disabled={false}
              onChange={(e: any) => {}}
            />
          </StyledFormItem>
        </Card>
        <Card>
          <StyledFormItem>
            <StyledCardLabel>LIFTOFF Launch Date & Time</StyledCardLabel>
            <Input
              placeholder="XYZ"
              type="text"
              hasError=""
              isTouched=""
              disabled={false}
              onChange={(e: any) => {}}
            />
          </StyledFormItem>
        </Card>

        <StyledButton>Launch</StyledButton>
        <Disclaimer color="#ffffff" />
      </StyledForm>
    </StyledContainer>
  );
};
