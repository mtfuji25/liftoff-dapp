import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../components/Modal';
import { TYPE } from '../theme';
import { ReactComponent as EtherscanLinkIcon } from '../assets/svgs/etherscan-link-icon.svg';
import Button from './Button';
import { useConnectedWeb3Context } from 'contexts';
import { TxStatus } from 'utils/enums';

interface IProps {
  txStatus: TxStatus;
  txHash: string;
  onClose: () => void;
}

const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

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

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledButtonContainer = styled.p`
  text-align: center;
  margin-top: 0.3rem;
`;

const StyledButton = styled(Button)<{ isFailed: boolean }>`
  padding: 0.7rem 4rem;
  background: ${({ isFailed }) => (isFailed ? '#DE3636' : '#2A7CEA')};
`;

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

const TxModal = (props: IProps) => {
  const { txStatus, txHash, onClose } = props;
  const { networkId } = useConnectedWeb3Context();

  const getTitle = useCallback(() => {
    switch (txStatus) {
      case TxStatus.TX_ERROR:
        return 'Error';
      case TxStatus.TX_SENT:
        return 'Transaction Sent';
      case TxStatus.TX_SUCCESS:
        return 'Transaction Succeessful';    
      default:
        break;
    }
  }, [txStatus]);

  const getDescription = useCallback(() => {
    switch (txStatus) {
      case TxStatus.TX_ERROR:
        return 'Transaction Failed. Please try again.';
      case TxStatus.TX_SENT:
        return 'Your transaction was sent.';
      case TxStatus.TX_SUCCESS:
        return 'Your transaction successfully completed.';    
      default:
        break;
    }
  }, [txStatus]);

  const resetEverything = useCallback(() => {}, []);

  const onClickCloseButton = useCallback(() => {
    resetEverything(); // we need to do this or the states and functions will keep executing even when the modal is closed by the user
    onClose();
  }, [onClose, resetEverything]);

  const onViewEtherscan = useCallback(() => {
    window.open(`https://${
        networkId === 3 ? 'ropsten.' : ''
      }etherscan.io/tx/${txHash}`);
  }, [networkId, txHash]);

  return (
    <>
      <ModalWrapper
        disableBackdropClick={false}
        onRequestClose={onClickCloseButton}
        isOpen={!!txStatus}
      >
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <ContentWrapper>
          <TYPE.LargeHeader fontWeight="normal" color="#232628" mb="1rem">
            {getTitle()}
          </TYPE.LargeHeader>
          <div>
            <p>
              <TYPE.Header ml={2} fontWeight="normal" color="#232628">
                  {getDescription()}
              </TYPE.Header>
            </p>
            <p>
            <StyledLink onClick={onViewEtherscan}>
              <EtherscanLinkIcon />
              <TYPE.Header ml={2} fontWeight="normal" color="#B4B4B4">
                  View on Etherscan
              </TYPE.Header>
            </StyledLink>
            </p>
          </div>
        </ContentWrapper>
        <StyledButtonContainer>
          <StyledButton isFailed={txStatus === TxStatus.TX_ERROR} onClick={onClose}>{txStatus === TxStatus.TX_ERROR ? 'Dismiss' : 'OK'}</StyledButton>
        </StyledButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default TxModal;
