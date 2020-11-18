import React from 'react';
import styled from 'styled-components';

import FooterImage from '../assets/footer.png';
import { Colors } from '../theme/styled';

interface Props {
  text: string;
  color: any;
  noBackground: any;
}

const StyledFooter = styled.footer<{
  color: keyof Colors;
  noBackground: keyof boolean;
}>`
  height: ${({ noBackground }) => (noBackground ? '0' : '60vh')};
  display: flex;
  background: ${({ noBackground }) =>
    noBackground
      ? 'none'
      : `url(${FooterImage}) center center fixed no-repeat`};
  background-color: ${({ color, theme }) => (theme as any)[color]};
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem;
  color: ${({ theme }) => theme.bg5};
`;

const StyledCopyrightText = styled.div`
  text-align: center;
`;

export const Footer = (props: Props) => {
  return (
    <StyledFooter {...props}>
      <StyledCopyrightText>{props.text}</StyledCopyrightText>
    </StyledFooter>
  );
};
