import React from 'react';
import styled from 'styled-components';

interface Props {
  children: any;
}

const StyledCardContainer = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  margin-bottom: 1rem;
`;

const StyledCardBody = styled.div`
  padding: 1rem;
`;

export const StyledCardTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const StyledCardLabel = styled.label`
  font-weight: 400;
`;

export const StyledCardText = styled.h5``;

export const Card = (props: Props) => (
  <StyledCardContainer>
    <StyledCardBody>{props.children} </StyledCardBody>
  </StyledCardContainer>
);
