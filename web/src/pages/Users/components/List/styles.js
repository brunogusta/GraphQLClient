import styled, { keyframes } from 'styled-components';
import BaseAnimation from '../../../../utils/Animations/baseAnimation';




const FadeInAnimation = keyframes`
  from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
`;

export const Container = styled(BaseAnimation)`
  display: grid;
  position: relative;
  grid-template-columns: minmax(600px, 1fr);
  grid-template-rows: 60px minmax(300px, 45vh);
  grid-template-areas:
    'button'
    'list';

  padding: 10px 0px;

  animation-name: ${FadeInAnimation};
`;


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-width: 600px;
  margin: auto;
  grid-area: button;

  p {
    margin-left: 10px;
    color: #c1003e;
    font-weight: bold;
  }
`;

export const TableContainer = styled.div`
  grid-area: list;
  overflow-y: auto;
  tbody {
    height: auto;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;

  td:nth-child(1),
  th:nth-child(1) {
    width: 20vw;
    min-width: 150px;
  }

  td:nth-child(2),
  th:nth-child(2) {
    width: 20vw;
    min-width: 200px;
  }

  td:nth-child(3),
  th:nth-child(3) {
    width: 20vw;
    min-width: 200px;
  }

  td:nth-child(4),
  th:nth-child(4) {
    width: 20vw;
    min-width: 200px;
  }

  td:nth-child(5),
  th:nth-child(5) {
    width: 20vw;
    min-width: 200px;
  }

  th,
  td {
    padding: 5px 0px;
    text-align: left;
  }

  tbody {
    tr {
        &:hover {
          background-color: #FBBAE6;
      }
    }
  }

  thead {
    background-color: #fff;

    th {
      border-bottom: 2px solid #ddd;
    }
    tr {
      display: block;
      position: relative;
    }
  }

  tbody {
    display: block;
    width: 100%;
    height: 100%;
    margin-top: 10px;
  }
`;


export const ImgAvatar = styled.img`
  height: 20%;
  box-shadow: 3px 6px 6px grey;
  `




