import React from 'react';
import styled from 'styled-components';

type Props = {
  completed: number;
};

const Container = styled.div({
  height: 20,
  width: '100%',
  backgroundColor: '#e0e0de',
  borderRadius: 50
});

const Filler = styled.div(
  {
    height: '100%',
    borderRadius: 'inherit',
    textAlign: 'right'
  },
  ({ completed }: Props) => ({
    width: `${completed}%`
  }),
  ({ theme }) => ({
    backgroundColor: theme.blue1
  })
);

const Label = styled.label({
  padding: 5,
  color: 'white',
  fontWeight: 'bold'
});

export const ProgressBar = ({ completed }: Props) => (
  <Container>
    <Filler completed={completed}>
      <Label>{`${completed}%`}</Label>
    </Filler>
  </Container>
);
