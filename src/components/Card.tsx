import styled from 'styled-components';
import { Box } from 'rebass';

const Card = styled(Box)<{
  padding?: string;
  border?: string;
  borderRadius?: string;
  marginBottom?: string;
}>`
  width: 100%;
  padding: 1rem;
  border: ${({ border }) => border};
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ borderRadius }) => borderRadius ?? '8px'};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

export default Card;
