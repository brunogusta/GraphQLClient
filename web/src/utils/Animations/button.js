import styled from 'styled-components';

export const SendButton = styled.button`
  position: relative;
  color: rgba(255, 255, 255, 1);

  background-color: #f38bd1;
  font-weight: bold;
  font-size: 25px;
  display: block;
  padding: 5px;
  border: none;
  border-radius: 8px;

  &:active {
    background-color: #d741a6;
  }
`;
