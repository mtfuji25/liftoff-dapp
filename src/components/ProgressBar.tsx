import React from 'react';
import styled from 'styled-components';

type Props = {
  completed: number;
  softPercent: number;
};

const Container = styled.div`
  height: 25px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg7};
  border-radius: 50px;
  position: relative;
`;

const Filler = styled.div<{ completed: number }>`
  height: 100%;
  border-radius: inherit;
  text-align: right;
  width: ${({ completed }) => `${completed}%`};
  background-color: ${({ theme }) => theme.blue1};
`;

const Label = styled.label`
  position: absolute;
  left: 50%;
  top: 2px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text6};
`;

const SoftCapMarker = styled.div<{ percent: number }>`
  position: absolute;
  left: ${({ percent }) => `${percent}%`};
  top: 2px;
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.bg7};
`;

export const ProgressBar = ({ completed, softPercent }: Props) => (
  <Container>
    <Filler completed={completed} />
    <Label>{`${completed}%`}</Label>
    <SoftCapMarker percent={softPercent} />
  </Container>
);
