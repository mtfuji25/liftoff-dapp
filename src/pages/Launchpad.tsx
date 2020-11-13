import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/button';
import { Card } from '../components/card';
import { Disclaimer } from '../components/disclaimer';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { TYPE } from '../theme';

interface Props {}

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: auto;
`;

const StyledForm = styled.div`
  width: 40rem;
  margin-top: 3.5rem;
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

      <StyledForm>
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">Project Name</TYPE.Header>
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
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">Token ticker</TYPE.Header>
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
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">Project Description</TYPE.Header>
            <Textarea />
          </StyledFormItem>
        </Card>
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">Website Link</TYPE.Header>
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
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">dApp Link</TYPE.Header>
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
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">Whitepaper Link</TYPE.Header>
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
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">Social Media Links</TYPE.Header>
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
        <Card marginBottom="1rem">
          <StyledFormItem>
            <TYPE.Header color="black">LIFTOFF Launch Date & Time</TYPE.Header>
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
      </StyledForm>
      <Disclaimer color="#ffffff" />
    </StyledContainer>
  );
};
