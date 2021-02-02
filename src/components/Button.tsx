import styled from 'styled-components';

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  padding: 0.7rem 2rem 0.7rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background: linear-gradient(90deg, rgba(249,55,206,1) 0%, rgba(144,44,233,1) 100%);
  color: ${({ theme }) => theme.white};
`;

export default Button;
