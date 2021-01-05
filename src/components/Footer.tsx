import React from 'react';
import styled from 'styled-components';
import { Image } from 'rebass';

import FooterImage from '../assets/footer.png';
import { Colors } from '../theme/styled';

interface Props {
  color: any;
  noBackground: any;
}

const StyledFooter = styled.footer<{
  color: keyof Colors;
  noBackground: keyof boolean;
}>`
  z-index: -1;
  position: relative;
  background-color: ${({ color, theme }) => (theme as any)[color]};
  color: ${({ theme }) => theme.bg5};
`;

const Footer = (props: Props) => {
  return (
    <StyledFooter {...props}>
      {!props.noBackground && <Image src={FooterImage} marginTop="-20%" />}
    </StyledFooter>
  );
};

export default Footer;
