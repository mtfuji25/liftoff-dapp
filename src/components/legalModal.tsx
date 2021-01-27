import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../components/Modal';
import { TYPE } from '../theme';
import Button from './Button';

interface IProps {
  isOpen: boolean;
  tokenTicker: string;
  onClose: () => void;
  onAccept: () => void;
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

const StyledButtonContainer = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  padding: 0.7rem 4rem;
  background: #2A7CEA;
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

const LegalModal = (props: IProps) => {
  const { isOpen, tokenTicker, onAccept, onClose } = props;

  const resetEverything = useCallback(() => {}, []);

  const onClickCloseButton = useCallback(() => {
    resetEverything(); // we need to do this or the states and functions will keep executing even when the modal is closed by the user
    onClose();
  }, [onClose, resetEverything]);

  return (
    <>
      <ModalWrapper
        disableBackdropClick={false}
        onRequestClose={onClickCloseButton}
        isOpen={isOpen}
      >
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <ContentWrapper>
          <TYPE.LargeHeader fontWeight="normal" color="#232628" mb="1rem">
            {""}
          </TYPE.LargeHeader>
          <div>
            <TYPE.Header mb={2} fontWeight="normal" color="#232628">
              I confirm hereby that I am not U.S. citizen/permanent resident/representing U.S. company or citizen/permanent resident/representing company of any jurisdiction where purchasing {tokenTicker} through igniting on Liftoff is illegal, restricted or requires special accreditation.
            </TYPE.Header>
          </div>
        </ContentWrapper>
        <StyledButtonContainer>
          <StyledButton
            onClick={onAccept}
          >
            Accept
          </StyledButton>
        </StyledButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default LegalModal;
