import styled from 'styled-components'

export const Button = styled.button.attrs<{ warning: boolean }, { backgroundColor: string }>(({ warning, theme }) => ({
    backgroundColor: warning ? theme.blue1 : theme.primary1
  }))`
    padding: 0.7rem 2rem 0.7rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    border: none;
    outline: none;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ theme }) => theme.white};
  `