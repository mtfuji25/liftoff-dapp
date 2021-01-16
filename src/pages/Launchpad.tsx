import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Box, Flex } from 'rebass';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { utils } from 'ethers';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

import { LaunchpadSchema } from 'data/launch.schema';
import { Timezones } from 'data/timezones';

import CopyRight from 'components/Copyright';
import Button from 'components/Button';
import Card from 'components/Card';
import Disclaimer from 'components/Disclaimer';
import InfoStatement from 'components/InfoStatement';
import Footer from 'components/Footer';
import Input from 'components/Input';
import Select from 'components/Select';
import Textarea from 'components/Textarea';
import Spinner from 'components/Spinner';
import { StyledBody, StyledContainer, TYPE } from 'theme';

import {
  useConnectedWeb3Context,
  useContracts,
  useProjects,
  useWalletModal
} from '../contexts';
import { getLiftoffSettings } from 'utils/networks';
import { useHistory } from 'react-router-dom';

const ipfsInfura = require('ipfs-http-client')({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

const StyledButton = styled(Button)`
  cursor: pointer !important;
`;

const DateFlex = styled(Flex)(
  {
    justifyContent: 'space-between'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      flexDirection: 'column'
    })
);

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
  timezone: string;
  softCap: string;
  hardCap: string;
  totalSupply: string;
  logo: FileList;
}

const Launchpad: FC = () => {
  const [loading, setLoading] = useState(false);
  const context = useConnectedWeb3Context();
  const [, toggleModal] = useWalletModal();
  const { liftoffRegistration } = useContracts(context);
  const settings = getLiftoffSettings(context.networkId || 1);

  const { control, errors, register, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(LaunchpadSchema)
  });

  const convertFormToConfig = (data: ILaunchPadInput, logoUrl: string) => {
    const config: {
      [key: string]: string;
    } = {};
    (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
      if (key === 'logo') {
        config[key] = logoUrl;
      } else {
        config[key] = data[key];
      }
    });

    return config;
  };
  const now = moment().unix();

  // earliest possible launch time(now + minTimeToLaunch + 5 mins)
  const earliestLaunchTime = moment(
    (now + settings.minTimeToLaunch + 5 * 60) * 1000
  ).format('YYYY-MM-DD hh:mm');

  const defaultDate = earliestLaunchTime.split(' ')[0];
  const defaultTime = earliestLaunchTime.split(' ')[1];

  const utcOffset = moment().utcOffset() / 60;
  const defaultTimezone = Timezones.find((zone) => zone.offset === utcOffset)
    ?.text;

  const history = useHistory();
  const { refetch } = useProjects();

  const onSubmit = async (data: ILaunchPadInput) => {
    try {
      if (typeof context.networkId === 'undefined') {
        toggleModal(true);
      } else {
        if (loading) {
          return;
        }
        const offset = Timezones.find((zone) => zone.text === data.timezone)
          ?.offset;

        if (offset === undefined) {
          throw new Error(`Invalid Timezone`);
        }

        const offsetAbs = Math.abs(offset);
        const startTime = moment(
          `${data.date} ${data.time} ${offset >= 0 ? '+' : '-'}${
            offsetAbs >= 10 ? offsetAbs.toString() : `0${offsetAbs}`
          }00`,
          'YYYY-MM-DD HH:mm Z'
        ).unix();

        const currentTime = moment().unix();
        if (
          startTime < currentTime + settings.minTimeToLaunch ||
          startTime > currentTime + settings.maxTimeToLaunch
        ) {
          throw new Error(
            `Not allowed to launch before minLaunchTime & after maxLaunchTime`
          );
        }

        const baseKey = `liftoff-rockets/${data.tokenTicker}`;

        setLoading(true);

        let configHash = '';

        try {
          // upload images
          const logo = await fleekStorage.upload({
            apiKey: process.env.REACT_APP_FLEEK_API_KEY || 'api-key',
            apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || 'api-secret',
            key: `${baseKey}/logo.${data.logo[0].name.split('.').pop()}`,
            data: data.logo[0]
          });

          // upload json
          const configJson = JSON.stringify(
            convertFormToConfig(data, 'https://ipfs.io/ipfs/' + logo.hash)
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
          configHash = config.hash;
        } catch (error) {
          //Use ipfsInfura instead, since fleek is down.
          // upload images
          console.log('Fleek down. Trying ipfsInfura...');
          const logo = await ipfsInfura.add(data.logo[0]);
          console.log('logo link:', 'https://ipfs.io/ipfs/' + logo.cid.string);
          // upload json
          const configJson = JSON.stringify(
            convertFormToConfig(data, 'https://ipfs.io/ipfs/' + logo.cid.string)
          );
          const configBlob = new Blob([new TextEncoder().encode(configJson)], {
            type: 'application/json;charset=utf-8'
          });
          const config = await ipfsInfura.add(configBlob);
          console.log(
            'config link:',
            'https://ipfs.io/ipfs/' + config.cid.string
          );
          configHash = config.cid.string;
        }
        if (liftoffRegistration && configHash !== '') {
          await liftoffRegistration.registerProject(
            configHash,
            startTime.toString(),
            utils.parseEther(data.softCap.toString()).toString(),
            utils.parseEther(data.hardCap.toString()).toString(),
            utils.parseEther(data.totalSupply.toString()).toString(),
            data.projectName,
            data.tokenTicker
          );
          await refetch();
          history.push(`/projects`);
          setLoading(false);
        }
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
          <InfoStatement noBackground={false} color="bg2" />
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
            4. LIFTOFF will create your ERC20 token and your project's LIFTOFF
            page.
          </TYPE.Body>
          <Box width="100%" mt="2.5rem">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={loading}>
                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Project Name
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="projectName"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="Your Project Name"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({ required: 'Project Name is required' })}
                      />
                    )}
                  />
                  {errors.projectName && (
                    <TYPE.Small color="red1">
                      {errors.projectName.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Token ticker
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="tokenTicker"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="XYZ"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({ required: 'Token ticker is required' })}
                      />
                    )}
                  />
                  {errors.tokenTicker && (
                    <TYPE.Small color="red1">
                      {errors.tokenTicker.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Project Description
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="projectDescription"
                    render={({ onChange, onBlur, value, name }) => (
                      <Textarea
                        placeholder="Text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Project description is required'
                        })}
                      />
                    )}
                  />
                  {errors.projectDescription && (
                    <TYPE.Small color="red1">
                      {errors.projectDescription.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <Flex alignItems="center" mb="1.25rem">
                    <TYPE.Header color="black" mr=".875rem">
                      Logo
                    </TYPE.Header>
                    <TYPE.Body color="black">
                      (Image format: png, jpg, svg)
                    </TYPE.Body>
                  </Flex>
                  <Input
                    name="logo"
                    type="file"
                    accept="image/*"
                    ref={register}
                  />
                  {errors.logo && (
                    <TYPE.Small color="red1">{errors.logo.message}</TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Website Link
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="websiteLink"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://website.com"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Website URL is required'
                        })}
                      />
                    )}
                  />
                  {errors.websiteLink && (
                    <TYPE.Small color="red1">
                      {errors.websiteLink.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    dApp Link
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="dappLink"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://website.com/dapp"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'DApp URL is required'
                        })}
                      />
                    )}
                  />
                  {errors.dappLink && (
                    <TYPE.Small color="red1">
                      {errors.dappLink.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Whitepaper Link
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="whitepaperLink"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://website.com/whitepaper.pdf"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Whitepaper URL is required'
                        })}
                      />
                    )}
                  />
                  {errors.whitepaperLink && (
                    <TYPE.Small color="red1">
                      {errors.whitepaperLink.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    LIFTOFF Launch Date & Time
                  </TYPE.Header>
                  <DateFlex>
                    <Box>
                      <TYPE.Body color="black" mt="0.5rem" mb="0.5rem">
                        Date
                      </TYPE.Body>
                      <Controller
                        control={control}
                        name="date"
                        defaultValue={defaultDate}
                        render={({ onChange, onBlur, value, name }) => (
                          <Input
                            placeholder="mm/dd/yyyy"
                            type="date"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            ref={register}
                          />
                        )}
                      />
                      {errors.date && (
                        <TYPE.Small color="red1">
                          {errors.date.message}
                        </TYPE.Small>
                      )}
                    </Box>
                    <Box>
                      <TYPE.Body color="black" mt="0.5rem" mb="0.5rem">
                        Timezone
                      </TYPE.Body>
                      <Controller
                        control={control}
                        name="timezone"
                        defaultValue={defaultTimezone}
                        render={({ onChange, onBlur, value, name }) => (
                          <Select
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            ref={register}
                          >
                            {Timezones.map((timezone, index) => (
                              <option key={index} value={timezone.text}>
                                {timezone.text}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.timezone && (
                        <TYPE.Small color="red1">
                          {errors.timezone.message}
                        </TYPE.Small>
                      )}
                    </Box>
                  </DateFlex>
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Time
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="time"
                    defaultValue={defaultTime}
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="00:00 AM"
                        type="time"
                        value={value}
                        onChange={onChange}
                        name={name}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Time is required'
                        })}
                      />
                    )}
                  />
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Soft & Hard Cap / TotalSupply
                  </TYPE.Header>
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Soft Cap
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="softCap"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="100"
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Softcap is required'
                        })}
                      />
                    )}
                  />
                  {errors.softCap && (
                    <TYPE.Small color="red1">
                      {errors.softCap.message}
                    </TYPE.Small>
                  )}
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Hard Cap
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="hardCap"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="1000"
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Hardcap is required'
                        })}
                      />
                    )}
                  />
                  {errors.hardCap && (
                    <TYPE.Small color="red1">
                      {errors.hardCap.message}
                    </TYPE.Small>
                  )}
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Total Supply
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="totalSupply"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="100000"
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Total Supply is required'
                        })}
                      />
                    )}
                  />
                  {errors.totalSupply && (
                    <TYPE.Small color="red1">
                      {errors.totalSupply.message}
                    </TYPE.Small>
                  )}
                </Card>

                <StyledButton type="submit">Launch</StyledButton>
              </fieldset>
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
