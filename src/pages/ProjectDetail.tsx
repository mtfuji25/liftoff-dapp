import React, { FC } from 'react';
import styled from 'styled-components';

import CopyRight from '../components/Copyright';
import Footer from '../components/Footer';
import TokenStats from '../components/TokenStats';
import TokenDetails from '../components/TokenDetails';

import { StyledBody, StyledContainer } from '../theme';
import ClaimReward from '../components/ClaimReward';
import Insurance from '../components/Insurance';
import Detail from '../components/Detail';
import ClaimxETH from '../components/ClaimXETH';

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

const ProjectDetail: FC = () => {
  return (
    <>
      <StyledBody color="bg3">
        <StyledContainer sWidth="85vw">
          <Detail />
          <TokenDetails />
          <ClaimReward />
          <TokenStats />
          <Insurance />
          <ClaimxETH />
        </StyledContainer>
        <CopyRight mt="1.375rem" />
      </StyledBody>
      <Footer
        noBackground={true}
        color="bg3"
        text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}
      />
    </>
  );
};

export default ProjectDetail;
