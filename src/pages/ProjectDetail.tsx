import React, { FC } from 'react';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import moment from 'moment';

import CopyRight from 'components/Copyright';
import Disclaimer from 'components/Disclaimer';
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

import { StyledBody, StyledContainer } from 'theme';

import {
  useProject,
  useInsurance,
  useProjectConfig,
  useIgniteInfo,
  useConnectedWeb3Context
} from 'contexts';

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

interface IProjectDetails {
  id: string;
}

const ProjectDetail: FC<IProjectDetails> = ({ id }) => {
  const { account, networkId } = useConnectedWeb3Context();
  const { project: tokenSale } = useProject(id);
  const { insurance: tokenInsurance } = useInsurance(id);
  const { projectConf } = useProjectConfig(tokenSale?.ipfsHash);
  const { igniteInfo } = useIgniteInfo(tokenSale?.id || '', account);

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

  const isInsuranceStarted = !!(tokenInsurance && tokenInsurance.isInitialized);

  return (
    <>
      {tokenSale && projectConf ? (
        <StyledBody color="bg3">
          <StyledContainer sWidth="85vw">
            <Detail
              isInsuranceStarted={isInsuranceStarted}
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
                tokenSaleId={tokenSale.id}
                tokenInsurance={tokenInsurance}
              />
            )}
          </StyledContainer>

          <Disclaimer color="#232628" />
          <CopyRight mt="1.375rem" />
        </StyledBody>
      ) : (
        <p>Loading...</p>
      )}
      <Footer noBackground={true} color="bg3" />
    </>
  );
};

export default ProjectDetail;
