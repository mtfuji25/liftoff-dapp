import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';

interface Props {
  date: string;
}

const CountdownWrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 1rem;
`}
`;
const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Time = styled.div`
  margin: 0;
  font-weight: 800;
  padding: 0 1rem;
`;

const Countdown = ({ date }: Props) => {
  const [countdownDate] = useState(new Date(date).getTime());
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  });

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let mins = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      setState({ days: days, hours: hours, mins, secs });
    }
  };

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, [setNewTime]);

  return (
    <CountdownWrapper>
      <TimeSection>
        <Time>
          <TYPE.Header>{state.days || '00'}</TYPE.Header>
        </Time>
        <TYPE.Small>DAYS</TYPE.Small>
      </TimeSection>
      <TimeSection>
        <Time>
          <TYPE.Header>{state.hours || '00'}</TYPE.Header>
        </Time>
        <TYPE.Small>HRS</TYPE.Small>
      </TimeSection>
      <TimeSection>
        <Time>
          <TYPE.Header>{state.mins || '00'}</TYPE.Header>
        </Time>
        <TYPE.Small>MINS</TYPE.Small>
      </TimeSection>
      <TimeSection>
        <Time>
          <TYPE.Header>{state.secs || '00'}</TYPE.Header>
        </Time>
        <TYPE.Small>SECS</TYPE.Small>
      </TimeSection>
    </CountdownWrapper>
  );
};

export default Countdown;
