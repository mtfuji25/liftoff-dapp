import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Box, Flex } from 'rebass';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { utils } from 'ethers';

import CopyRight from '../components/Copyright';
import Button from '../components/Button';
import Card from '../components/Card';
import Disclaimer from '../components/Disclaimer';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Spinner from '../components/Spinner';
import { StyledBody, StyledContainer, TYPE } from '../theme';
// import IMG_UPLOAD from '../assets/upload.png';

import {
  useConnectedWeb3Context,
  useContracts,
  useWalletModal
} from '../contexts';

const StyledButton = styled(Button)`
  cursor: pointer !important;
`;

// const AddFileButton = styled.label`
//   display: flex;
//   align-items: center;
//   color: ${({ theme }) => theme.primary1};
//   border: ${({ theme }) => `1px solid ${theme.border}`};
//   border-radius: 5px;
//   background: none;
//   padding: 0.5rem 1rem;
//   width: fit-content;

//   > input {
//     width: 0;
//     height: 0;
//     padding: 0;
//   }
// `;

interface ILaunchPadInput {
  projectName: string;
  tokenTicker: string;
  projectDescription: string;
  websiteLink: string;
  whitepaperLink: string;
  dappLink: string;
  discord: string;
  telegram: string;
  twitter: string;
  facebook: string;
  date: string;
  time: string;
  softCap: string;
  hardCap: string;
  totalSupply: string;
  logo: FileList;
  openGraph: FileList;
}

const Launchpad: FC = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const context = useConnectedWeb3Context();
  const [, toggleModal] = useWalletModal();
  const { liftoffRegistration } = useContracts(context);

  const convertFormToConfig = (
    data: ILaunchPadInput,
    logoUrl: string,
    openGraphUrl: string
  ) => {
    const config: {
      [key: string]: string;
    } = {};
    (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
      if (key === 'logo') {
        config[key] = logoUrl;
      } else if (key === 'openGraph') {
        config[key] = openGraphUrl;
      } else {
        config[key] = data[key];
      }
    });

    return config;
  };

  const onSubmit = async (data: ILaunchPadInput) => {
    try {
      if (typeof context.networkId === 'undefined') {
        toggleModal(true);
      } else {
        if (loading) {
          return;
        }
        setLoading(true);

        const startTime = Math.round(
          new Date(`${data.date} ${data.time}:00 UTC`).getTime() / 1000
        );

        const baseKey = `liftoff-rockets/${data.tokenTicker}`;

        // upload images
        const logo = await fleekStorage.upload({
          apiKey: process.env.REACT_APP_FLEEK_API_KEY || 'api-key',
          apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || 'api-secret',
          key: `${baseKey}/logo.png`,
          data: data.logo[0]
        });

        const openGraph = await fleekStorage.upload({
          apiKey: process.env.REACT_APP_FLEEK_API_KEY || 'api-key',
          apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || 'api-secret',
          key: `${baseKey}/open-graph.png`,
          data: data.logo[0]
        });

        // upload json
        const configJson = JSON.stringify(
          convertFormToConfig(data, logo.publicUrl, openGraph.publicUrl)
        );
        const configBlob = new Blob([new TextEncoder().encode(configJson)], {
          type: 'application/json;charset=utf-8'
        });

        const config = await fleekStorage.upload({
          apiKey: process.env.REACT_APP_FLEEK_API_KEY || 'api-key',
          apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || 'api-secret',
          key: `${baseKey}/config.json`,
          data: configBlob
        });

        if (liftoffRegistration) {
          await liftoffRegistration.registerProject(
            config.hash,
            startTime,
            utils.parseEther(data.softCap).toString(),
            utils.parseEther(data.hardCap).toString(),
            utils.parseEther(data.totalSupply).toString(),
            data.projectName,
            data.tokenTicker
          );
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      alert(error.message || error);

      setLoading(false);
    }
  };

  return (
    <>
      <StyledBody color="bg2">
        <StyledContainer sWidth="800px">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  Project Name
                </TYPE.Header>
                <Input
                  name="projectName"
                  placeholder="Liquidity Dividends Protocol"
                  type="text"
                  ref={register({ required: true })}
                />
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  Token ticker
                </TYPE.Header>
                <Input
                  name="tokenTicker"
                  placeholder="XYZ"
                  type="text"
                  ref={register({ required: true })}
                />
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  Project Description
                </TYPE.Header>
                <Textarea
                  name="projectDescription"
                  placeholder="Text"
                  ref={register({ required: true })}
                />
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

                {/* <AddFileButton>
                  <Image src={IMG_UPLOAD}></Image>
                  <TYPE.Body ml="1rem">Add file</TYPE.Body> */}
                <Input
                  name="logo"
                  type="file"
                  accept="image/x-png"
                  ref={register({ required: true })}
                />
                {/* </AddFileButton> */}
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

                {/* <AddFileButton> */}
                {/* <Image src={IMG_UPLOAD}></Image>
                  <TYPE.Body ml="1rem">Add file</TYPE.Body> */}
                <Input
                  name="openGraph"
                  type="file"
                  accept="image/x-png"
                  ref={register({ required: true })}
                />
                {/* </AddFileButton> */}
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  Website Link
                </TYPE.Header>
                <Input
                  name="websiteLink"
                  placeholder="https://website.com"
                  type="text"
                  ref={register}
                  required
                />
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  dApp Link
                </TYPE.Header>
                <Input
                  name="dappLink"
                  placeholder="https://website.com/dapp"
                  type="text"
                  ref={register({ required: true })}
                />
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  Whitepaper Link
                </TYPE.Header>
                <Input
                  name="whitepaperLink"
                  placeholder="https://website.com/whitepaper.pdf"
                  type="text"
                  ref={register({ required: true })}
                />
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  Social Media Links
                </TYPE.Header>
                <TYPE.Body color="black" mb="0.5rem">
                  Discord
                </TYPE.Body>
                <Input
                  name="discord"
                  placeholder="https://discord.gg/"
                  type="text"
                  ref={register}
                />

                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Telegram
                </TYPE.Body>
                <Input
                  name="telegram"
                  placeholder="https://t.me/"
                  type="text"
                  ref={register}
                />

                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Twitter
                </TYPE.Body>
                <Input
                  name="twitter"
                  placeholder="https://twitter.com/"
                  type="text"
                  ref={register}
                />

                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Facebook
                </TYPE.Body>
                <Input
                  name="facebook"
                  placeholder="https://facebook.com/"
                  type="text"
                  ref={register}
                />
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  LIFTOFF Launch Date & Time
                </TYPE.Header>
                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Date (GMT)
                </TYPE.Body>
                <Input
                  name="date"
                  placeholder="mm/dd/yyyy"
                  type="date"
                  ref={register({ required: true })}
                />
                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Time (GMT)
                </TYPE.Body>
                <Input
                  name="time"
                  placeholder="00:00 AM"
                  type="time"
                  ref={register({ required: true })}
                />
              </Card>

              <Card marginBottom="1rem" paddingX="1.375rem" paddingY="1.875rem">
                <TYPE.Header color="black" mb="1.25rem">
                  Soft & Hard Cap / TotalSupply
                </TYPE.Header>
                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Soft Cap
                </TYPE.Body>
                <Input
                  name="softCap"
                  placeholder="100"
                  type="text"
                  ref={register({ required: true })}
                />
                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Hard Cap
                </TYPE.Body>
                <Input
                  name="hardCap"
                  placeholder="1000"
                  type="text"
                  ref={register({ required: true })}
                />
                <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                  Total Supply
                </TYPE.Body>
                <Input
                  name="totalSupply"
                  placeholder="100000"
                  type="text"
                  ref={register({ required: true })}
                />
              </Card>

              <StyledButton type="submit">Launch</StyledButton>
            </form>
            <Disclaimer color="#b4b4b4" />
            <CopyRight mt="1.375rem" />
          </Box>
          <Spinner loading={loading} />
        </StyledContainer>
      </StyledBody>
      <Footer noBackground={false} color="bg2" />
    </>
  );
};

export default Launchpad;
