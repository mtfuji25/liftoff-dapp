import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

export const Label = styled.label`
  padding: 0.5em;
  // width: 100px;
  display: block;
`;

export const Input = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  padding: 12px 16px;
  border-radius: 12px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1};
  font-size: 16px;
  margin-right: 1rem;
  // border: 1px solid ${({ theme }) => theme.bg3};
  ::placeholder {
    color: ${({ theme }) => theme.text1};
    font-size: 14px;
  }
  @media screen and (max-width: 640px) {
    ::placeholder {
      font-size: 1rem;
    }
  }
`;

export const Message = styled.small`
  padding: 0.25em;
  color: ${({ theme }) => theme.red1};
  display: block;
`;
export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
`;
