import React from 'react';
import styled from 'styled-components';

import { Colors } from '../theme/styled';

interface Props {
  color: any;
  backgroundColor: any;
}

const StyledDescription = styled.h1<{
  color: keyof Colors;
  backgroundColor: keyof Colors;
}>`
  background-color: ${({ backgroundColor, theme }) => (theme as any)[backgroundColor]};
  color: ${({ color, theme }) => (theme as any)[color]};
  text-align: center;
  margin-bottom: 30px;
  font-size:16px;
  font-weight:normal;
`;

const InfoStatement = (props: Props) => {
  return (
      <StyledDescription {...props}>
        The safest launchpad, guaranteed by Lid Protocol. 100% insurance for 1 week, permanently locked liquidity, and fair distribution. More info in the FAQ.
      </StyledDescription>
  );
};

export default InfoStatement;