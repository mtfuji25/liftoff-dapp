import styled from 'styled-components';
import { Select as UnstyledSelect } from '@rebass/forms';

const Select = styled(UnstyledSelect)`
  border-radius: 5px;
  outline: none;
  height: 2.375rem;
  padding: 0 1rem;
  border: 1px solid #dadada !important;
  color: #000000 !important;
`;

export default Select;
