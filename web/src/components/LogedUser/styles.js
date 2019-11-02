import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  height: 100%;
  width: 100%;
  min-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  grid-area: logedUser;

  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 5px;
    align-items: center;
    border: 1px solid #ccc;
    height: 50%;
    padding: 20px;

    button {
      background-color: #e4336c;
      border-style: none;
      padding: 10px 20px;

      color: #fff;
      font-weight: bold;

      &:active {
        background-color: #af0038;
      }
    }
  }
`;

export const NoLogedUser = styled.div`
  display: none;
`;
