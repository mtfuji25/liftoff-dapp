import React from 'react';
import styled from 'styled-components';

import FooterImage from '../assets/footer.png';

interface Props {
  text: string;
}

const StyledFooter = styled.footer`
  background-image: url(${FooterImage});
  background-repeat: no-repeat;
  background-size: cover;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 2rem;
  color: ${({ theme }) => theme.bg5};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    height: 30vh;
  `}
`;

const StyledCopyrightText = styled.div`
  text-align: center;
`;

export const Footer = (props: Props) => {
  return (
    <StyledFooter>
      <StyledCopyrightText>{props.text}</StyledCopyrightText>
    </StyledFooter>
  );
};
