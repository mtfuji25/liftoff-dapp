import React from 'react';
import Modal from 'react-modal';
import { withTheme } from 'styled-components';

import ModalTitle from './ModalTitle';

interface Props extends React.ComponentProps<typeof Modal> {
  children: React.ReactNode;
  disableBackdropClick?: boolean;
  theme?: any;
  title?: string;
}

const ModalContainer: React.FC<Props> = (props) => {
  const {
    children,
    disableBackdropClick,
    onRequestClose,
    theme,
    title,
    ...restProps
  } = props;
  const { modalStyle } = theme;

  React.useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Modal
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={!disableBackdropClick}
      style={modalStyle}
      {...restProps}
    >
      {title ? (
        <ModalTitle
          disableCloseButton={disableBackdropClick}
          onClick={onRequestClose}
          title={title}
        />
      ) : null}
      {children}
    </Modal>
  );
};

export const ModalWrapper = withTheme(ModalContainer);
