import React from 'react';
import styled from 'styled-components';
import { Input, InputProps } from '@rebass/forms';

interface Props extends InputProps {
  text: string;
}

const InputContainer = styled.div({}, ({ theme }) =>
  theme.mediaWidth.upToSmall({
    width: '100%'
  })
);

const WrappedInput = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});

const StyledInput = styled(Input)({
  // width: '100%'
});

const StyledText = styled.div(
  {
    position: 'absolute',
    right: 15
  },
  ({ theme }) => ({
    color: theme.grey
  })
);

const InputWithAddon = ({ text, ...restProps }: Props) => {
  return (
    <InputContainer>
      <WrappedInput>
        <StyledInput {...restProps} />
        {text && <StyledText>{text}</StyledText>}
      </WrappedInput>
    </InputContainer>
  );
};

export default InputWithAddon;
