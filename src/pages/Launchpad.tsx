import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Flex, Image } from 'rebass';
import CopyRight from '../components/copyright';
import Button from '../components/button';
import Card from '../components/card';
import Disclaimer from '../components/disclaimer';
import Footer from '../components/footer';
import Input from '../components/input';
import Textarea from '../components/textarea';
import { StyledBody, StyledContainer, TYPE } from '../theme';
import IMG_UPLOAD from '../assets/upload.png';

const StyledButton = styled(Button)``;

const AddFileButton = styled(Button)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary1};
  border: ${({ theme }) => `1px solid ${theme.border}`};
  background: none;
  padding: 0.5rem 1rem;
  margin: 0;
`;

const Launchpad: FC = () => {
  return (
    <>
      <StyledBody color="bg2">
        <StyledContainer sWidth={800}>
          <TYPE.LargeHeader color="white" textAlign="center">
            🕹Launchpad for Developers
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
          <Box width="100%" mt="2.5rem">
            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                Project Name
              </TYPE.Header>
              <Input placeholder="Liquidity Dividends Protocol" type="text" />
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                Token ticker
              </TYPE.Header>
              <Input placeholder="XYZ" type="text" />
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                Project Description
              </TYPE.Header>
              <Textarea placeholder="Text" />
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <Flex alignItems="center" mb="1.25rem">
                <TYPE.Header color="black" mr=".875rem">
                  Logo
                </TYPE.Header>
                <TYPE.Body color="black">
                  (Image format: png, jpg, svg)
                </TYPE.Body>
              </Flex>

              <AddFileButton>
                <Image src={IMG_UPLOAD}></Image>
                <TYPE.Body ml="1rem">Add file</TYPE.Body>
              </AddFileButton>
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <Flex alignItems="center" mb="1.25rem">
                <TYPE.Header color="black" mr=".875rem">
                  Open Graph Image
                </TYPE.Header>
                <TYPE.Body color="black">
                  (Image size: 1200 x 627 pixels)
                </TYPE.Body>
              </Flex>

              <AddFileButton>
                <Image src={IMG_UPLOAD}></Image>
                <TYPE.Body ml="1rem">Add file</TYPE.Body>
              </AddFileButton>
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                Website Link
              </TYPE.Header>
              <Input placeholder="https://website.com" type="text" />
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                dApp Link
              </TYPE.Header>
              <Input placeholder="https://website.com/dapp" type="text" />
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                Whitepaper Link
              </TYPE.Header>
              <Input
                placeholder="https://website.com/whitepaper.pdf"
                type="text"
              />
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                Social Media Links
              </TYPE.Header>
              <TYPE.Body color="black" mb="0.5rem">
                Discord
              </TYPE.Body>
              <Input placeholder="https://discord.gg/" type="text" />
              <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                Telegram
              </TYPE.Body>
              <Input placeholder="https://t.me/" type="text" />
              <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                Twitter
              </TYPE.Body>
              <Input placeholder="https://twitter.com/" type="text" />
              <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                Facebook
              </TYPE.Body>
              <Input placeholder="https://facebook.com/" type="text" />
            </Card>

            <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
              <TYPE.Header color="black" mb="1.25rem">
                LIFTOFF Launch Date & Time
              </TYPE.Header>
              <Input placeholder="XYZ" type="text" />
            </Card>

            <StyledButton>Launch</StyledButton>
            <Disclaimer color="#b4b4b4" />
            <CopyRight mt="1.375rem" />
          </Box>
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

export default Launchpad;
