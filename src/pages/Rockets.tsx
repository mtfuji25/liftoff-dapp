import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CopyRight from '../components/copyright';
import { Card } from '../components/card';
import { Countdown } from '../components/countdown';
import { Disclaimer } from '../components/disclaimer';
import { Footer } from '../components/footer';
import { Rocket, RocketData, rockets } from '../data';
import { StyledBody, TYPE } from '../theme';
import { StyledContainer } from './Launchpad';

interface Props {}

export const StyledRocketCard = styled(Card)`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.black};
  padding: 2rem;
  margin: 0.5rem 0 !important;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    padding: 1rem;
  `}
`;

const Header = styled.div`
  padding: 1rem 0;
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
    <>
      <StyledBody color="bg3">
        <StyledContainer sWidth={800}>
          {rockets.map((rocket: Rocket, index: number) => (
            <StyledRocket key={index}>
              <Header>
                <TYPE.Header color="bg1">{rocket.title}</TYPE.Header>
                <TYPE.Body color="bg1">{rocket.subtitle}</TYPE.Body>
              </Header>
              {rocket.data.map(
                (rocketData: RocketData, rocketDataIndex: number) => (
                  <Fragment key={rocketDataIndex}>
                    <StyledRocketCard>
                      <StyledRocketItem>
                        <Link to={`rockets/${index}`}>
                          <TYPE.Body>{rocketData.title}</TYPE.Body>
                        </Link>
                      </StyledRocketItem>
                      <StyledRocketItem>
                        <TYPE.Body color="text3" fontWeight="400">
                          {rocketData.ticker}
                        </TYPE.Body>
                      </StyledRocketItem>
                      <StyledRocketItem>
                        <TYPE.Body color="text3" fontWeight="400">
                          {rocketData.website}
                        </TYPE.Body>
                      </StyledRocketItem>
                      <StyledRocketItem>
                        <Countdown date={rocketData.date} />
                      </StyledRocketItem>
                    </StyledRocketCard>
                  </Fragment>
                )
              )}
            </StyledRocket>
          ))}

          <Disclaimer color="black" />

          <CopyRight mt="1.375rem" />
        </StyledContainer>
      </StyledBody>

      <Footer
        color="bg3"
        noBackground={false}
        text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}
      />
    </>
  );
};
