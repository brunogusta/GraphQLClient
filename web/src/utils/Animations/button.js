import styled from 'styled-components';

export const SendButton = styled.button`
  position: relative;
  color: rgba(255, 255, 255, 1);

  background-color: #f38bd1;
  font-weight: bold;
  font-size: 25px;
  display: block;
  padding: 5px;
  border: 0;
  border-width: 1px;
  border-radius: 8px;
  box-shadow: 0px 9px 2px #ff4bc4, 0px 9px 25px rgba(0, 0, 0, 0.7);
  text-align: center;
  transition: all 0.1s ease;

  &:active {
    box-shadow: 0px 3px 2px #ff4bc4, 0px 3px 6px rgba(0, 0, 0, 0.9);
    position: relative;
    top: 6px;
  }
`;
