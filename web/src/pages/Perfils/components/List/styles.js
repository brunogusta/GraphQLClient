import styled, { keyframes } from 'styled-components';
import { SendButton } from '../../../../utils/Animations/button';
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
  height: 100%;
  padding: 15px 0px 0px 0px;

  animation-name: ${FadeInAnimation};
  position: relative;
`;

export const SearchButton = styled(SendButton)`
  height: 5vh;
  min-height: 40px;
  width: 150px;
  padding: 1px;
  font-weight: bold;
  font-size: 13px;
`;

export const ButtonContainer = styled.div`
  width: 98vw;
  margin: auto;
`;

export const TableContainer = styled.div`
  position: relative;
  margin-top: 10px;
  width: 100%;
  max-height: 90%;
  overflow-y: auto;

  tbody {
    height: auto;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin: auto;

  td:nth-child(1),
  th:nth-child(1) {
    width: 33vw;
  }
  td:nth-child(2),
  th:nth-child(2) {
    width: 33vw;
  }
  td:nth-child(3),
  th:nth-child(3) {
    width: 32vw;
  }

  th,
  td {
    padding: 10px 0px;
    text-align: left;
  }

  thead {
    background-color: #fff;
    position: fixed;

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
    overflow: auto;
    margin-top: 40px;
  }
`;
