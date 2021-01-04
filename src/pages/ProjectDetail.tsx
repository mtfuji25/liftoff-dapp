import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import fleekStorage from '@fleekhq/fleek-storage-js';

import CopyRight from 'components/Copyright';
import Footer from 'components/Footer';
import TokenStats from 'components/TokenStats';
import TokenDetails from 'components/TokenDetails';

import { StyledBody, StyledContainer } from 'theme';
import ClaimReward from 'components/ClaimReward';
import Insurance from 'components/Insurance';
import Detail from 'components/Detail';
import ClaimxETH from 'components/ClaimXETH';

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

const ProjectDetail: FC = () => {
  const [projectData, setProjectData] = useState();
  const history = useHistory();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const project: string = history.location.pathname
          .split('/')[2]
          .toUpperCase();

        let { data } = await fleekStorage.get({
          apiKey: process.env.REACT_APP_FLEEK_API_KEY || '',
          apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || '',
          key: `lift/${project}/config.json`
        });

        let payload = JSON.parse(data);

        setProjectData({
          ...payload
        });
      } catch (error) {}
    };

    loadProject();
  }, [history.location.pathname]);
  return (
    <>
      {projectData ? (
        <StyledBody color="bg3">
          <StyledContainer sWidth="85vw">
            <Detail project={projectData} />
            <TokenDetails project={projectData} />
            <ClaimReward />
            <TokenStats />
            <Insurance />
            <ClaimxETH />
          </StyledContainer>
          <CopyRight mt="1.375rem" />
        </StyledBody>
      ) : (
        <p>Loading...</p>
      )}
      <Footer
        noBackground={true}
        color="bg3"
        text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}
      />
    </>
  );
};

export default ProjectDetail;
