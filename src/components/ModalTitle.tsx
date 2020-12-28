import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button } from 'rebass';
import { ReactComponent as CloseIcon } from '../assets/svgs/close.svg';

interface Props extends HTMLAttributes<HTMLDivElement> {
  disableCloseButton?: boolean;
  onClick?: any;
  title: string;
}

const ModalTitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0;
`;

const ModalTitleText = styled.h2`
  color: ${(props) => props.theme.text4};
  font-size: 17px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 5px 0 5px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonClose = styled(Button)`
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
`;

class ModalTitle extends React.Component<Props> {
  public render = () => {
    const {
      disableCloseButton = false,
      onClick,
      title,
      ...restProps
    } = this.props;

    return (
      <ModalTitleWrapper {...restProps}>
        <ModalTitleText>{title}</ModalTitleText>
        <ButtonClose disabled={disableCloseButton} onClick={onClick}>
          <CloseIcon />
        </ButtonClose>
      </ModalTitleWrapper>
    );
  };
}

export default ModalTitle;
