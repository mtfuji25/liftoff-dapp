import React from 'react';
import styled from 'styled-components';

import { Card } from '../components/card';
import { Countdown } from '../components/countdown';
import { Footer } from '../components/footer';
import { Ignite } from '../components/ignite';
import { TokenStats } from '../components/token_stats';
import { StyledBody, TYPE } from '../theme';
import { StyledContainer, StyledButton } from './Launchpad';

interface Props {}

const StyledRocketCard = styled(Card)`
  display: flex;
  color: ${({ theme }) => theme.black};
  padding: 2rem;
  flex-direction: column;
  margin: 0.5rem 0 !important;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 2rem;
  `}
`;

const StyledRocketDetailHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
`;
const AvatarWithTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `};
  button {
    margin-left: 2rem;
  }
`;
const StyledCountdown = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 1rem;
    flex-direction: column;
    justify-content: center;
  `}
  span {
    margin-right: 1rem;
  }
`;

const StyledRocketDetailBody = styled.div``;

const StyledDescription = styled.div``;

const StyledSpan = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.bg1};
`;

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

export const RocketDetail = (props: Props) => {
  return (
    <>
      <StyledBody color="bg3">
        <StyledContainer sWidth={1000}>
          <StyledRocketCard>
            <StyledRocketDetailHead>
              <AvatarWithTitle>
                <TYPE.Header>[Project Name]</TYPE.Header>{' '}
                <StyledButton>Spark</StyledButton>
              </AvatarWithTitle>
              <StyledCountdown>
                <span>Launch in:</span>
                <Countdown date="01/01/2021" />
              </StyledCountdown>
            </StyledRocketDetailHead>
            <StyledRocketDetailBody>
              <StyledTable cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td width="40%">
                      <TYPE.Body>Ticker</TYPE.Body>
                    </td>
                    <td width="60%">
                      <TYPE.Body>XYZ</TYPE.Body>
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
              <StyledDescription>
                <StyledSpan>
                  Project description Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </StyledSpan>
              </StyledDescription>
            </StyledRocketDetailBody>
          </StyledRocketCard>
          <StyledRocketCard>
            <Ignite />
          </StyledRocketCard>
          <StyledRocketCard>
            <TokenStats />
          </StyledRocketCard>
        </StyledContainer>
      </StyledBody>
      <Footer
        noBackground={true}
        color="bg3"
        text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}
      />
    </>
  );
};
