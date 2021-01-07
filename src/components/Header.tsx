import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useConnectedWeb3Context, useWalletModal } from '../contexts';

import Button from './Button';

import Logo from '../assets/logo.png';
import Menu from '../assets/menu.svg';
import Close from '../assets/close.svg';
import { TYPE } from '../theme';

import { shortenAddress } from '../utils';

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

const StyledNavListItem = styled.li<{ onClick: any }>`
  a {
    margin-right: 2rem;
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
  ${({ onClick }) => ({
    cursor: onClick ? 'pointer' : 'default'
  })}
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

const ActiveNetwork = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM14.2929 7.29289L9 12.5858L6.70711 10.2929L5.29289 11.7071L9 15.4142L15.7071 8.70711L14.2929 7.29289Z"
      fill="#1ECC59"
    />
  </svg>
);

const InActiveNetwork = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2C8.87499 2 6.92199 2.73647 5.38231 3.9681L18.0319 16.6177ZM16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 8.87499 2.73647 6.92199 3.9681 5.38231L16.6177 18.0319Z"
      fill="#DE3636"
    />
  </svg>
);

const Header = (_props: Props) => {
  const [, toggleModal] = useWalletModal();
  const [isOpen, setIsOpen] = useState(false);
  const context = useConnectedWeb3Context();
  const { account } = context;
  const isConnected = !!account;

  const disconnect = useCallback(() => {}, []);

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
            <StyledLink to="/projects">Projects</StyledLink>
          </StyledNavListItem>
          {isConnected ? (
            <StyledNavListItem onClick={disconnect}>
              {shortenAddress(account || '')}
            </StyledNavListItem>
          ) : (
            <StyledNavListItem onClick={() => setIsOpen(false)}>
              <StyledButton onClick={() => toggleModal(true)}>
                Connect wallet
              </StyledButton>
            </StyledNavListItem>
          )}
        </StyledNavList>
      </StyledNavContainer>
    </>
  );
};

export default Header;
