import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';

const Card = styled(Box)<{
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: 100%;
  padding: 1.5rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius ?? '8px'};
`;

export default Card;
