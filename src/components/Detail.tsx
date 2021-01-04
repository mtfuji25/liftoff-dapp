import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import {
  StyledRocketCard,
  TYPE,
  StatusBadge,
  ExternalLink,
  TBody,
  TRow,
  TData
} from 'theme';
import Avatar from 'components/Avatar';
import Countdown from 'components/Countdown';
import DiscordIcon from '../assets/pngs/discord.png';
import TelegramIcon from '../assets/pngs/telegram.png';
import TwitterIcon from '../assets/pngs/twitter.png';
import FacebookIcon from '../assets/pngs/facebook.png';

const Card = styled(StyledRocketCard)`
  padding: 0;
`;

const StyledRocketDetailHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
`;
const StyledCountdown = styled.div`
  align-items: center;
  display: flex;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 1rem;
    flex-direction: column;
  align-items: flex-start;
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

export const StyledTable = styled.table``;

const StyledFlex = styled.div(
  {
    display: 'flex',
    width: 140,
    justifyContent: 'space-between'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      width: '100%'
    })
);

const WrappedFlex = styled.div(
  {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      flexDirection: 'column',
      alignItems: 'flex-start'
    })
);

const StyledTData = styled(TData)(
  {
    justifyContent: 'space-between'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      width: '45%'
    })
);

const SmallText = styled(TYPE.Small)(
  {
    marginLeft: '1rem'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      margin: 0
    })
);

const StyledImage = styled.img({
  width: 20,
  height: 20
});

type Props = {
  project: any;
};
const Detail = ({ project }: Props) => {
  return (
    <>
      {project ? (
        <Card>
          <StyledRocketDetailHead>
            <Flex
              flexDirection={['column', 'row']}
              alignItems={['flex-start', 'center']}
            >
              <Flex alignItems="center" mr={['0', '1rem']} mb={['1rem', '0']}>
                <Avatar size="4.375rem" />
                <TYPE.LargeHeader ml="1.25rem">
                  {project.projectName}
                </TYPE.LargeHeader>
              </Flex>

              <StatusBadge color="blue1">Coming Soon</StatusBadge>
            </Flex>

            <StyledCountdown>
              <span>Launch in:</span>
              <Countdown date={project.date} />
            </StyledCountdown>
          </StyledRocketDetailHead>
          <StyledRocketDetailBody>
            <StyledTable cellSpacing={0} cellPadding={0}>
              <TBody>
                <TRow>
                  <TData width="20%">
                    <TYPE.Body>Ticker</TYPE.Body>
                  </TData>
                  <TData width="20%">
                    <TYPE.Body>{project.tokenTicker}</TYPE.Body>
                  </TData>
                </TRow>
                <TRow>
                  <TData width="20%">
                    <TYPE.Body>Total Supply</TYPE.Body>
                  </TData>
                  <StyledTData>
                    <TYPE.Body>
                      {project.totalSupply} {project.tokenTicker}
                    </TYPE.Body>
                  </StyledTData>
                </TRow>
                <TRow>
                  <TData width="20%">
                    <TYPE.Body>Website</TYPE.Body>
                  </TData>
                  <StyledTData>
                    <WrappedFlex>
                      <ExternalLink href={project.websiteLink}>
                        {project.websiteLink}
                      </ExternalLink>
                      <SmallText color="red">
                        *Verify by checking site for link to this LIFTOFF launch
                        page
                      </SmallText>
                    </WrappedFlex>
                  </StyledTData>
                </TRow>
                <TRow>
                  <TData width="20%">
                    <TYPE.Body>dApp</TYPE.Body>
                  </TData>
                  <StyledTData>
                    <ExternalLink href={project.dappLink}>
                      {project.dappLink}
                    </ExternalLink>
                  </StyledTData>
                </TRow>
                <TRow>
                  <TData width="20%">
                    <TYPE.Body>Whitepaper</TYPE.Body>
                  </TData>
                  <StyledTData>
                    <ExternalLink href={project.whitepaperLink}>
                      Click to view
                    </ExternalLink>
                  </StyledTData>
                </TRow>
                <TRow>
                  <TData width="20%">
                    <TYPE.Body>Launch Date</TYPE.Body>
                  </TData>
                  <StyledTData>
                    <TYPE.Body>
                      {project.date} {project.time} PST
                    </TYPE.Body>
                  </StyledTData>
                </TRow>
                <TRow>
                  <TData width="20%">
                    <TYPE.Body>Social Media</TYPE.Body>
                  </TData>
                  <StyledTData width="40%">
                    <StyledFlex>
                      <ExternalLink href={project.discord}>
                        <StyledImage src={DiscordIcon} alt="Liftoff Discord" />
                      </ExternalLink>
                      <ExternalLink href={project.telegram}>
                        <StyledImage
                          src={TelegramIcon}
                          alt="Liftoff Telegram"
                        />
                      </ExternalLink>
                      <ExternalLink href={project.twitter}>
                        <StyledImage src={TwitterIcon} alt="Liftoff Twitter" />
                      </ExternalLink>
                      <ExternalLink href={project.facebook}>
                        <StyledImage
                          src={FacebookIcon}
                          alt="Liftoff Facebook"
                        />
                      </ExternalLink>
                    </StyledFlex>
                  </StyledTData>
                </TRow>
              </TBody>
            </StyledTable>
            <StyledDescription>
              <TYPE.Body>{project.description}</TYPE.Body>
            </StyledDescription>
          </StyledRocketDetailBody>
        </Card>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Detail;
