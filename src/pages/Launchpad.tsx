import React from 'react';
import styled from 'styled-components';
import CopyRight from '../components/copyright';
import { Button } from '../components/button';
import { Card } from '../components/card';
import { Disclaimer } from '../components/disclaimer';
import { Footer } from '../components/footer';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { StyledBody, TYPE } from '../theme';

interface Props {}

export const StyledContainer = styled.div<{ sWidth: keyof string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ sWidth }) => `${sWidth}px`};
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
  margin: 0.5rem 0;
`;

export const StyledButton = styled(Button)``;

export const Launchpad = (props: Props) => {
  return (
    <>
      <StyledBody color="bg2">
        <StyledContainer sWidth={800}>
          <TYPE.LargeHeader color="white">
            🕹Lunchpad for Developers
          </TYPE.LargeHeader>
          <TYPE.Header marginY="1.875rem" color="white">
            How it works?
          </TYPE.Header>
          <TYPE.Body color="white" textAlign="center" lineHeight="1.5rem">
            1. Register your project with this form.
            <br />
            2. Include a link to your working dapp that will use the created
            token.
            <br />
            3. Submit and pay the gas fee.
            <br />
            4. Liftoff will create your ERC20 token and your project's liftoff
            page.
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
                <Textarea placeholder="Text" />
              </StyledFormItem>
            </Card>
            <Card marginBottom="1rem">
              <StyledFormItem>
                <TYPE.Header color="black">Website Link</TYPE.Header>
                <Input
                  placeholder="https://website.com"
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
                  placeholder="https://website.com/dapp"
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
                  placeholder="https://website.com/whitepaper.pdf"
                  type="text"
                  hasError=""
                  isTouched=""
                  disabled={false}
                  onChange={(e: any) => {}}
                />
              </StyledFormItem>
            </Card>
            <Card marginBottom="1rem">
              <TYPE.Header color="black">Social Media Links</TYPE.Header>
              <StyledFormItem>
                <TYPE.Body color="black">Discord</TYPE.Body>
                <Input
                  placeholder="https://discord.gg/"
                  type="text"
                  hasError=""
                  isTouched=""
                  disabled={false}
                  onChange={(e: any) => {}}
                />
              </StyledFormItem>
              <StyledFormItem>
                <TYPE.Body color="black">Telegram</TYPE.Body>
                <Input
                  placeholder="https://t.me/"
                  type="text"
                  hasError=""
                  isTouched=""
                  disabled={false}
                  onChange={(e: any) => {}}
                />
              </StyledFormItem>
              <StyledFormItem>
                <TYPE.Body color="black">Twitter</TYPE.Body>
                <Input
                  placeholder="https://twitter.com/"
                  type="text"
                  hasError=""
                  isTouched=""
                  disabled={false}
                  onChange={(e: any) => {}}
                />
              </StyledFormItem>
              <StyledFormItem>
                <TYPE.Body color="black">Facebook</TYPE.Body>
                <Input
                  placeholder="https://facebook.com/"
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
                <TYPE.Header color="black">
                  LIFTOFF Launch Date & Time
                </TYPE.Header>
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
          <Disclaimer color="#b4b4b4" />

          <CopyRight mt="1.375rem" />
        </StyledContainer>
      </StyledBody>
      <Footer
        noBackground={false}
        color="bg2"
        text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}
      />
    </>
  );
};
