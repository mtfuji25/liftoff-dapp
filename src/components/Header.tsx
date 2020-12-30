import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useConnectedWeb3Context } from 'contexts';

import Button from './Button';
import ConnectWalletModal from './ConnectWalletModal';

import Logo from '../assets/logo.png';
import Menu from '../assets/menu.svg';
import Close from '../assets/close.svg';
import { TYPE } from '../theme';

import { shortenAddress } from 'utils';
import { validNetworkId } from 'utils/networks';

interface Props {}

const StyledNavContainer = styled.nav`
  background-color: ${({ theme }) => theme.bg1};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 4rem;
  padding-right: 4rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
  `}
`;

const StyledNavList = styled.ul<{ open: boolean }>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-flow: column nowrap;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    margin-block-start: 0;
    height: 100vh;
    width: 100vw;
    padding-top: 3.5rem;
    background-color: ${({ theme }) => theme.bg2};
    transition: transform 0.3s ease-in-out;
    z-index: 90;
  `}

  @media (max-width: 768px) {
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  }
`;

const StyledNavListItem = styled.li`
  a {
    margin-right: 2rem;
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
  `}
`;

const StyledLogo = styled.img`
  width: 2rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  div {
    margin-left: 1rem;
  }
`;
const StyledButton = styled(Button)``;

const StyledMenu = styled.img`
  cursor: pointer;
  z-index: 100;
  width: 2rem;
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`display: block;`};
`;

const Header = (_props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalState] = useState(false);
  const context = useConnectedWeb3Context();
  const { account } = context;
  const isConnected = !!account;

  return (
    <>
      <StyledNavContainer>
        <StyledLink to="/">
          <StyledLogo src={Logo} alt="LID protocol logo" />
          <TYPE.LargeHeader fontWeight={400}>LIFTOFF</TYPE.LargeHeader>
        </StyledLink>
        {!isOpen ? (
          <StyledMenu src={Menu} onClick={() => setIsOpen(true)} />
        ) : (
          <StyledMenu src={Close} onClick={() => setIsOpen(false)} />
        )}
        <StyledNavList open={isOpen}>
          <StyledNavListItem onClick={() => setIsOpen(false)}>
            <StyledLink to="/">Launchpad</StyledLink>
          </StyledNavListItem>
          <StyledNavListItem onClick={() => setIsOpen(false)}>
            <StyledLink to="/rockets">Rockets</StyledLink>
          </StyledNavListItem>
          {isConnected ? (
            <StyledNavListItem>
              {shortenAddress(account || '')}
            </StyledNavListItem>
          ) : (
            <StyledNavListItem onClick={() => setIsOpen(false)}>
              <StyledButton onClick={() => setModalState(true)}>
                Connect wallet
              </StyledButton>
            </StyledNavListItem>
          )}
        </StyledNavList>
      </StyledNavContainer>
      <ConnectWalletModal
        onClose={() => setModalState(false)}
        visible={isModalOpen}
      />
    </>
  );
};

export default Header;
