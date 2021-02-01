import React from 'react';
import styled from 'styled-components';
import { Image } from 'rebass';

import FooterImage from '../assets/footer.png';
import FooterSimpleImage from '../assets/footer-simple.png';
import { Colors } from '../theme/styled';

interface Props {
  noBackground: any;
  isSimple: any;
}

const StyledFooter = styled.footer<{
  noBackground: keyof boolean;
  isSimple: keyof boolean;
}>`
  z-index: -1;
  position: relative;
  color: ${({ theme }) => theme.bg5};
  margin-top: -8vw;
`;

const Footer = (props: Props) => {
  return (
    <StyledFooter {...props}>
      {!props.noBackground && <Image src={props.isSimple ? FooterSimpleImage : FooterImage} width="100%" />}
    </StyledFooter>
  );
};

export default Footer;
