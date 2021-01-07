import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';

interface Props {
  date: number;
}

const CountdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 1rem;
  ${({ theme }) => ({
    backgroundColor: theme.bg2,
    color: theme.white
  })}
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 1rem;
    background-color: transparent;
    color: ${theme.black}
`}
${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 1rem;
    background-color: transparent;
    color: ${theme.black}
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
  padding: 0 0.5rem;
  ${({ theme }) =>
    theme.mediaWidth.upToSmall({
      padding: '0 0.75rem'
    })}
  ${({ theme }) =>
    theme.mediaWidth.upToMedium({
      padding: '0 0.8rem'
    })}
`;

const Countdown = ({ date }: Props) => {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setNewTime = () => {
    if (date) {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      const distanceToDate = date - currentTime > 0 ? date - currentTime : 0;

      let days = Math.floor(distanceToDate / (60 * 60 * 24));
      let hours = Math.floor((distanceToDate % (60 * 60 * 24)) / (60 * 60));
      let mins = Math.floor((distanceToDate % (60 * 60)) / 60);
      let secs = Math.floor(distanceToDate % 60);

      setState({ days: days, hours: hours, mins, secs });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 1000);

    return () => clearInterval(interval);
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
        <Time>:</Time>
      </TimeSection>
      <TimeSection>
        <Time>
          <TYPE.Header>{state.hours || '00'}</TYPE.Header>
        </Time>
        <TYPE.Small>HRS</TYPE.Small>
      </TimeSection>
      <TimeSection>
        <Time>:</Time>
      </TimeSection>
      <TimeSection>
        <Time>
          <TYPE.Header>{state.mins || '00'}</TYPE.Header>
        </Time>
        <TYPE.Small>MINS</TYPE.Small>
      </TimeSection>
      <TimeSection>
        <Time>:</Time>
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
