import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Card } from '../components/card';
import { Disclaimer } from '../components/disclaimer';
import { Rocket, RocketData, rockets } from '../data';
import { TYPE } from '../theme';
import { StyledContainer } from './Launchpad';

interface Props {}

const StyledRocketCard = styled(Card)`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.black};
  padding: 2rem;
  margin: 0.5rem 0 !important;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    padding: 0.2rem;
  `}
`;

const StyledRocket = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

const StyledRocketItem = styled.div`
  ${({ theme }) => theme.mediaWidth.upToSmall`
  text-align: justify;
  padding: .5rem 1rem;
`}
`;

export const Rockets = (props: Props) => {
  return (
    <StyledContainer>
      {rockets.map((rocket: Rocket, index: number) => (
        <StyledRocket key={index}>
          <TYPE.Header>{rocket.title}</TYPE.Header>
          <TYPE.Body>{rocket.subtitle}</TYPE.Body>

          {rocket.data.map((rocketData: RocketData, index: number) => (
            <Fragment key={index}>
              <StyledRocketCard>
                <StyledRocketItem>
                  <TYPE.Body>{rocketData.title}</TYPE.Body>
                </StyledRocketItem>
                <StyledRocketItem>
                  <TYPE.Body>{rocketData.ticker}</TYPE.Body>
                </StyledRocketItem>
                <StyledRocketItem>
                  <TYPE.Body>{rocketData.website}</TYPE.Body>
                </StyledRocketItem>
                <StyledRocketItem>
                  <TYPE.Body>{rocketData.date}</TYPE.Body>
                </StyledRocketItem>
              </StyledRocketCard>
            </Fragment>
          ))}
        </StyledRocket>
      ))}

      <Disclaimer color="black" />
    </StyledContainer>
  );
};
