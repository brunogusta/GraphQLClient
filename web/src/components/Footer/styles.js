import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #464646;
  color: #ffffff;
  align-items: center;
  grid-area: footer;

  z-index: 10;
  p {
    margin-left: 5px;
    height: 10px;
    line-height: 10px;
  }
`;
