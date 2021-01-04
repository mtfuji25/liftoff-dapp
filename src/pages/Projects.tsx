import React from 'react';
import styled from 'styled-components';

import { STab, STabList, STabPanel, STabs } from '../components/Tab';
import { Warning } from '../components/Warning';
import CardState from '../components/CardState';
import Footer from '../components/Footer';
import Disclaimer from '../components/Disclaimer';

import { useProjects } from 'contexts/useProjects';
import { ProjectKey } from 'utils/types';

import { StyledContainer, StyledBody, TYPE } from '../theme';

const Container = styled.div(
  {
    paddingTop: 63,
    width: '100%'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      paddingTop: 30
    })
);

const LayoutGrid = styled.div(
  {
    display: 'grid',
    gridGap: 70,
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  ({ theme }) => ({
    color: theme.black
  }),
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      color: theme.black,
      gridTemplateColumns: '1fr'
    })
);

interface ITabs {
  title: string;
  key: ProjectKey;
}

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const tabs: ITabs[] = [
    { title: 'COMING SOON', key: 'inactive' },
    { title: 'ACTIVE', key: 'active' },
    { title: 'COMPLETED', key: 'completed' }
  ];

  console.log(projects, loading, error);

  return (
    <>
      <StyledBody color="bg3">
        <StyledContainer sWidth="85vw">
          <Warning
            text="LIFTOFF is an autonomous launchpad that anyone can use. Similar to Uniswap, anyone can create a token with any name, including fake versions of existing tokens. Please do your own research before joining a project."
            ctaText="I understand"
          />
          <Container>
            <STabs
              selectedTabClassName="is-selected"
              selectedTabPanelClassName="is-selected"
            >
              <STabList>
                {tabs.map((tab) => (
                  <STab key={tab.title}>
                    <TYPE.Header color="black" fontWeight="normal">
                      {tab.title}
                    </TYPE.Header>
                  </STab>
                ))}
              </STabList>
              {tabs.map((tab) => (
                <STabPanel key={tab.key}>
                  {projects[tab.key].map((project) => (
                    <LayoutGrid key={project.id}>
                      <CardState type={tab.key} project={project} />
                    </LayoutGrid>
                  ))}
                </STabPanel>
              ))}
            </STabs>
          </Container>

          <Disclaimer color="#000000" />
        </StyledContainer>
      </StyledBody>
      <Footer
        noBackground={false}
        color="bg3"
        text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}
      />
    </>
  );
};

export default Projects;
