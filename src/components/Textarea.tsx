import styled from 'styled-components';
import { Textarea as UnstyledTextarea } from '@rebass/forms';

const Textarea = styled(UnstyledTextarea)`
  width: 100%;
  resize: none;
  height: 5rem;
  outline: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
`;

export default Textarea;
