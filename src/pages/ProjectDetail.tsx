import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import CopyRight from 'components/Copyright';
import Footer from 'components/Footer';
import TokenStats from 'components/TokenStats';
import TokenDetails from 'components/TokenDetails';

import { StyledBody, StyledContainer } from 'theme';
import ClaimReward from 'components/ClaimReward';
import Insurance from 'components/Insurance';
import Detail from 'components/Detail';
import ClaimxETH from 'components/ClaimXETH';

import { useProject, useProjectConfig } from 'contexts';

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

interface IProjectDetails {
  id: string;
}

const ProjectDetail: FC<IProjectDetails> = ({ id }) => {
  console.log(id);

  useEffect(() => {
    console.log('==id', id);
  }, [id]);

  const { project } = useProject(id);
  const { projectConf } = useProjectConfig(project?.ipfsHash);

  return (
    <>
      {project && projectConf ? (
        <StyledBody color="bg3">
          <StyledContainer sWidth="85vw">
            <Detail date={project.startTime} projectConfig={projectConf} />
            <TokenDetails project={project} />
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
