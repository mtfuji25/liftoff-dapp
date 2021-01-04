import React from 'react';
import styled from 'styled-components';
import { Input } from '@rebass/forms';

type Props = {
  text: string;
  placeholder?: string;
};

const InputContainer = styled.div({});

const WrappedInput = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});

const StyledInput = styled(Input)({
  width: '100%'
});

const StyledText = styled.div(
  {
    position: 'absolute',
    right: 10
  },
  ({ theme }) => ({
    color: theme.grey
  })
);

const InputWithAddon = ({ text, placeholder }: Props) => {
  return (
    <InputContainer>
      <WrappedInput>
        <StyledInput placeholder={placeholder} />
        {text && <StyledText>{text}</StyledText>}
      </WrappedInput>
    </InputContainer>
  );
};

export default InputWithAddon;
