import styled from 'styled-components';

const Button = styled.button.attrs<
  { warning: boolean },
  { backgroundColor: string }
>(({ warning, theme }) => ({
  backgroundColor: warning ? theme.red1 : theme.primary1
}))`
  font-family: 'Open Sans', sans-serif;
  padding: 0.7rem 2rem 0.7rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.white};
`;

export default Button;
