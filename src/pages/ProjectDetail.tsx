import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import moment from 'moment';

import { isVerified } from 'utils';

import CopyRight from 'components/Copyright';
import Disclaimer from 'components/Disclaimer';
import { Warning } from '../components/Warning';
import InfoStatement from 'components/InfoStatement';
import Footer from 'components/Footer';
import TokenStats from 'components/TokenStats';
import TokenDetails from 'components/TokenDetails';
import Ignite from 'components/Ignite';
import Spark from 'components/Spark';
import ClaimRefund from 'components/ClaimRefund';
import ClaimReward from 'components/ClaimReward';
import Insurance from 'components/Insurance';
import Detail from 'components/Detail';
import ClaimXETH from 'components/ClaimXETH';

import { StyledBody, StyledContainer as UnstyledContainer } from 'theme';

import {
  useWalletModal,
  useProject,
  useInsurance,
  useProjectConfig,
  useIgniteInfo,
  useConnectedWeb3Context
} from 'contexts';

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

const StyledContainer = styled(UnstyledContainer)({}, ({ theme }) =>
  theme.mediaWidth.upToExtraSmall({
    maxWidth: '100vw !important'
  })
);
interface IProjectDetails {
  id: string;
}

const ProjectDetail: FC<IProjectDetails> = ({ id }) => {
  const { account, networkId } = useConnectedWeb3Context();
  const { project: tokenSale } = useProject(id);
  const { insurance: tokenInsurance } = useInsurance(id);
  const { projectConf } = useProjectConfig(tokenSale?.ipfsHash);
  const { igniteInfo } = useIgniteInfo(tokenSale?.id || '', account);
  const [, toggleModal] = useWalletModal();

  const currentTime = moment().unix();

  let isIgniting = false;
  let isRefunding = false;
  let isSparkReady = false;
  let isClaimable = false;
  if (tokenSale) {
    isIgniting =
      tokenSale.startTime < currentTime &&
      tokenSale.endTime > currentTime &&
      BigNumber.from(tokenSale.totalIgnited).lt(
        BigNumber.from(tokenSale.hardCap)
      );
    isRefunding =
      currentTime > tokenSale.endTime &&
      BigNumber.from(tokenSale.totalIgnited).lt(
        BigNumber.from(tokenSale.softCap)
      );
    isSparkReady =
      !tokenSale.isSparked &&
      (BigNumber.from(tokenSale.totalIgnited).gte(
        BigNumber.from(tokenSale.hardCap)
      ) ||
        (currentTime > tokenSale.endTime &&
          BigNumber.from(tokenSale.totalIgnited).gte(
            BigNumber.from(tokenSale.softCap)
          )));
    isClaimable =
      tokenSale.isSparked && !!(igniteInfo && !igniteInfo.hasClaimed);
  }

  useEffect(() => {
    if (!networkId) {
      toggleModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkId]);

  return (
    <>
      {networkId && tokenSale && projectConf ? (
        <StyledBody color="bg3">
          <StyledContainer sWidth="90vw">
            <InfoStatement backgroundColor="bg3" color="bg2" />
            {!isVerified(tokenSale) && (
              <Warning
                text="LIFTOFF is an autonomous launchpad that anyone can use. Similar to Uniswap, anyone can create a token with any name, including fake versions of existing tokens. Please do your own research before joining a project."
                ctaText="I understand"
              />
            )}
            <Detail
              networkId={networkId}
              tokenInsurance={tokenInsurance}
              tokenSale={tokenSale}
              projectConfig={projectConf}
            />
            <TokenDetails tokenSale={tokenSale} />
            {isIgniting && (
              <Ignite tokenSaleId={tokenSale.id} igniteInfo={igniteInfo} />
            )}
            {isSparkReady && <Spark tokenSaleId={tokenSale.id} />}
            {isClaimable && (
              <ClaimReward tokenSale={tokenSale} igniteInfo={igniteInfo} />
            )}
            {isRefunding && (
              <ClaimRefund
                tokenSaleId={tokenSale.id}
                amount={igniteInfo ? igniteInfo.ignited : '0'}
              />
            )}
            {tokenSale.isSparked && (
              <TokenStats deployed={tokenSale.deployed} networkId={networkId} />
            )}
            {tokenSale.isSparked && (
              <Insurance
                tokenInsurance={tokenInsurance}
                symbol={tokenSale.symbol}
                tokenSaleId={tokenSale.id}
              />
            )}
            {tokenSale.isSparked && (
              <ClaimXETH
                networkId={networkId}
                tokenSaleId={tokenSale.id}
                tokenInsurance={tokenInsurance}
              />
            )}
          </StyledContainer>

          {!isVerified(tokenSale) && (
            <Disclaimer color="#232628" />
          )}
          <CopyRight mt="1.375rem" />
        </StyledBody>
      ) : networkId ? (
        <p>Loading...</p>
      ) : (
        <p>Please connect to your wallets</p>
      )}
      <Footer noBackground={true} color="bg3" />
    </>
  );
};

export default ProjectDetail;
