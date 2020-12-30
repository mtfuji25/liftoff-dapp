import React, { useState } from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';
import { Button } from './button';

const WarningBox = styled.div(
  {
    borderRadius: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  ({ theme }) => ({
    border: `1px solid ${theme.red1}`
  })
);

const WarningCTA = styled(Button)(
  {
    padding: 10,
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  ({ theme }) => ({
    backgroundColor: theme.red1
  }),
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      alignSelf: 'flex-start'
    })
);

type Props = {
  text?: string;
  ctaText?: string;
  action?: () => void;
};

export const Warning = ({ ctaText, action, text }: Props) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  return !isClosed ? (
    <WarningBox>
      <TYPE.Body color="red">{text}</TYPE.Body>
      <WarningCTA onClick={() => setIsClosed(true)}>{ctaText}</WarningCTA>
    </WarningBox>
  ) : null;
};
