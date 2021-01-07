import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'rebass';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ReactComponent as MetaMaskIcon } from 'assets/svgs/metamask-color.svg';
import { ReactComponent as WalletConnectIcon } from 'assets/svgs/wallet-connect.svg';
import { ModalWrapper } from '../components/Modal';
import { STORAGE_KEY_CONNECTOR } from '../config/constants';
import connectors from '../utils/connectors';
import { ConnectorNames } from '../utils/enums';
import { TYPE } from '../theme';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
}

const ButtonStyled = styled(Button)({
  width: '100%',
  backgroundColor: 'transparent !important',
  border: '1px solid #dadada !important',
  display: 'flex !important',
  flexDirection: 'row',
  padding: '0.8rem 4rem !important',
  alignItems: 'center',
  margin: '10px 0 !important',
  cursor: 'pointer'
});

const CloseButton = styled.div(
  {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer'
  },
  ({ theme }) => ({
    color: theme.black
  })
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8333 5.34166L14.6583 4.16666L10 8.82499L5.34167 4.16666L4.16667 5.34166L8.82501 9.99999L4.16667 14.6583L5.34167 15.8333L10 11.175L14.6583 15.8333L15.8333 14.6583L11.175 9.99999L15.8333 5.34166Z"
      fill="black"
    />
  </svg>
);

const ConnectButton = (props: ButtonProps) => {
  const { disabled, icon, onClick, text } = props;

  return (
    <ButtonStyled disabled={disabled} onClick={onClick}>
      {icon}
      <TYPE.Header ml={2} fontWeight="normal" color="black">
        {text}
      </TYPE.Header>
    </ButtonStyled>
  );
};

const ConnectWalletModal = (props: IProps) => {
  const context = useWeb3React();
  const { onClose } = props;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === context.connector) {
      setActivatingConnector(undefined);
      onClose();
    }
    // eslint-disable-next-line
  }, [activatingConnector, context.connector]);

  if (context.error) {
    localStorage.removeItem(STORAGE_KEY_CONNECTOR);
    context.deactivate();
    onClose();
  }

  const isMetamaskEnabled = 'ethereum' in window || 'web3' in window;
  const onClickWallet = (wallet: ConnectorNames) => {
    const currentConnector = connectors[wallet];
    if (wallet === ConnectorNames.Injected) {
      setActivatingConnector(currentConnector);
    }
    if (wallet === ConnectorNames.WalletConnect) {
      setActivatingConnector(currentConnector);
    }

    if (wallet) {
      if (
        currentConnector instanceof WalletConnectConnector &&
        currentConnector.walletConnectProvider?.wc?.uri
      ) {
        currentConnector.walletConnectProvider = undefined;
      }
      context.activate(currentConnector);
      localStorage.setItem(STORAGE_KEY_CONNECTOR, wallet);
    }
  };

  const resetEverything = useCallback(() => {}, []);

  const onClickCloseButton = useCallback(() => {
    resetEverything(); // we need to do this or the states and functions will keep executing even when the modal is closed by the user
    onClose();
  }, [onClose, resetEverything]);

  const isConnectingToWallet = !!activatingConnector;
  let connectingText = `Connecting to wallet`;
  const connectingToMetamask = activatingConnector === connectors.injected;
  const connectingToWalletConnect =
    activatingConnector === connectors.walletconnect;
  if (connectingToMetamask) {
    connectingText = 'Waiting for Approval on Metamask';
  }
  if (connectingToWalletConnect) {
    connectingText = 'Opening QR for Wallet Connect';
  }

  const disableMetamask: boolean = !isMetamaskEnabled || false;
  const disableWalletConnect = false;

  return (
    <>
      <ModalWrapper
        disableBackdropClick={isConnectingToWallet}
        onRequestClose={onClickCloseButton}
        isOpen={!context.account && props.visible}
      >
        <CloseButton onClick={props.onClose}>
          <CloseIcon />
        </CloseButton>
        <ContentWrapper>
          <TYPE.LargeHeader fontWeight="normal" color="#232628" mb="1rem">
            {connectingToMetamask ? 'Connecting...' : 'Connect a wallet'}
          </TYPE.LargeHeader>
          <div>
            {isConnectingToWallet ? (
              <>
                {/* <CircularProgress /> */}
                <TYPE.Body>{connectingText}</TYPE.Body>
              </>
            ) : (
              <>
                <ConnectButton
                  disabled={disableMetamask}
                  icon={<MetaMaskIcon />}
                  onClick={() => {
                    onClickWallet(ConnectorNames.Injected);
                  }}
                  text="Metamask"
                />
                <ConnectButton
                  disabled={disableWalletConnect}
                  icon={<WalletConnectIcon />}
                  onClick={() => {
                    onClickWallet(ConnectorNames.WalletConnect);
                  }}
                  text="Wallet Connect"
                />
                <ConnectButton
                  disabled={disableWalletConnect}
                  icon={<WalletConnectIcon />}
                  onClick={() => {
                    onClickWallet(ConnectorNames.WalletLink);
                  }}
                  text="Wallet Link"
                />
              </>
            )}
          </div>
        </ContentWrapper>
      </ModalWrapper>
    </>
  );
};

export default ConnectWalletModal;
