import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';

import CopyRight from '../components/Copyright';
import Card from '../components/Card';
import Countdown from '../components/Countdown';
import Footer from '../components/Footer';
import Ignite from '../components/Ignite';
import Button from '../components/Button';
import TokenStats from '../components/TokenStats';
import Avatar from '../components/Avatar';
import TokenDetails from '../components/TokenDetails';

import { StyledBody, StyledContainer, TYPE } from '../theme';

const StyledButton = styled(Button)`
  height: fit-content;
`;

const StyledRocketCard = styled(Card)`
  display: flex;
  color: ${({ theme }) => theme.black};
  padding: 2rem;
  flex-direction: column;
  margin: 0.5rem 0 !important;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 2rem 1rem;
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

const StyledDescription = styled.div`
  max-width: 600px;
`;

const StyledTitle = styled(TYPE.Header)({
  paddingLeft: 4
});

const StatusBadge = styled.div(
  {
    borderRadius: 20,
    textAlign: 'center',
    padding: '0.5rem 1rem',
    margin: 5,
    alignSelf: 'center'
  },
  ({ theme }) => ({
    backgroundColor: theme.blue1,
    color: theme.white
  })
);

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

const RocketDetail: FC = () => {
  return (
    <>
      <StyledBody color="bg3">
        <StyledContainer sWidth={1000}>
          <StyledRocketCard>
            <StyledRocketDetailHead>
              <Flex
                flexDirection={['column', 'row']}
                alignItems={['flex-start', 'center']}
              >
                <Flex alignItems="center" mr={['0', '1rem']} mb={['1rem', '0']}>
                  <Avatar size="4.375rem" />
                  <TYPE.Header ml="2.25rem">[Project Name]</TYPE.Header>
                </Flex>

                <StyledButton>Spark</StyledButton>
              </Flex>

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
                <TYPE.Body>
                  Project description Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </TYPE.Body>
              </StyledDescription>
            </StyledRocketDetailBody>
          </StyledRocketCard>
          <StyledRocketCard>
            <TokenDetails />
          </StyledRocketCard>
          <StyledRocketCard>
            <Ignite />
          </StyledRocketCard>
          <StyledRocketCard>
            <TokenStats />
          </StyledRocketCard>
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

export default RocketDetail;
