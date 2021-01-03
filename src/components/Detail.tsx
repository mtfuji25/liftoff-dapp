import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import { StyledRocketCard, TYPE, StatusBadge, ExternalLink } from '../theme';
import Avatar from './Avatar';
import Countdown from './Countdown';
import { ReactComponent as DiscordIcon } from '../assets/svgs/discord.svg';
import { ReactComponent as TelegramIcon } from '../assets/svgs/telegram.svg';
import { ReactComponent as TwitterIcon } from '../assets/svgs/twitter.svg';
import { ReactComponent as FacebookIcon } from '../assets/svgs/facebook.svg';

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

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

type Props = {
  project: any;
};
const Detail = ({ project }: Props) => {
  return (
    <>
      {project ? (
        <StyledRocketCard>
          <StyledRocketDetailHead>
            <Flex
              flexDirection={['column', 'row']}
              alignItems={['flex-start', 'center']}
            >
              <Flex alignItems="center" mr={['0', '1rem']} mb={['1rem', '0']}>
                <Avatar size="4.375rem" />
                <TYPE.Header ml="1.25rem">{project.projectName}</TYPE.Header>
              </Flex>

              <StatusBadge>Coming Soon</StatusBadge>
            </Flex>

            <StyledCountdown>
              <span>Launch in:</span>
              <Countdown date={project.date} />
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
                    <TYPE.Body>{project.tokenTicker}</TYPE.Body>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <TYPE.Body>Total Supply</TYPE.Body>
                  </td>
                  <td width="60%">
                    <TYPE.Body>
                      {project.totalSupply} {project.tokenTicker}
                    </TYPE.Body>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <TYPE.Body>Website</TYPE.Body>
                  </td>
                  <td width="60%">
                    <ExternalLink href={project.websiteLink}>
                      {project.websiteLink}
                    </ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <TYPE.Body>dApp</TYPE.Body>
                  </td>
                  <td width="60%">
                    <ExternalLink href={project.dappLink}>
                      {project.dappLink}
                    </ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <TYPE.Body>Whitepaper</TYPE.Body>
                  </td>
                  <td width="60%">
                    <ExternalLink href={project.whitepaperLink}>
                      Click to view
                    </ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <TYPE.Body>Launch Date</TYPE.Body>
                  </td>
                  <td width="60%">
                    <TYPE.Body>
                      {project.date} {project.time} PST
                    </TYPE.Body>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <TYPE.Body>Social Media</TYPE.Body>
                  </td>
                  <td width="60%">
                    <Flex
                      width="20%"
                      justifyContent="space-around"
                      flexDirection="row"
                    >
                      <ExternalLink href={project.discord}>
                        <DiscordIcon />
                      </ExternalLink>
                      <ExternalLink href={project.telegram}>
                        <TelegramIcon />
                      </ExternalLink>
                      <ExternalLink href={project.twitter}>
                        <TwitterIcon />
                      </ExternalLink>
                      <ExternalLink href={project.facebook}>
                        <FacebookIcon />
                      </ExternalLink>
                    </Flex>
                  </td>
                </tr>
              </tbody>
            </StyledTable>
            <StyledDescription>
              <TYPE.Body>{project.description}</TYPE.Body>
            </StyledDescription>
          </StyledRocketDetailBody>
        </StyledRocketCard>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Detail;
