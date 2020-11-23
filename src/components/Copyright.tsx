import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps } from 'rebass';
import { TYPE } from '../theme';

const StyledText = styled(Box)`
  color: ${({ theme }) => theme.text3};
  text-align: center;
`;

const CopyRight = (props: BoxProps) => (
  <StyledText {...props}>
    <TYPE.Body fontWeight={400}>
      © 2020 Liquidity Dividends Protocol. All rights reserved.
    </TYPE.Body>
  </StyledText>
);

export default CopyRight;
