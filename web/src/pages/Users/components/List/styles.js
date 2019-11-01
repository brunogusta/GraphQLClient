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
  padding: 10px 0px 0px 0px;

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
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  &:active {
    background-color: ${props => (props.disabled ? '' : '#d741a6')};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 96vw;
  margin: auto;

  p {
    margin-left: 10px;
    color: #c1003e;
    font-weight: bold;
  }
`;

export const TableContainer = styled.div`
  position: relative;
  margin-top: 10px;
  width: 100%;
  overflow-y: auto;

  max-height: 48vh;
  min-height: 44vh;

  tbody {
    height: auto;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin: auto;

  td:nth-child(1),
  th:nth-child(1) {
    width: 25vw;
  }
  td:nth-child(2),
  th:nth-child(2) {
    width: 25vw;
  }
  td:nth-child(3),
  th:nth-child(3) {
    width: 25vw;
  }
  td:nth-child(4),
  th:nth-child(4) {
    width: 20vw;
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
    height: 100%;
    margin-top: 40px;
  }
`;
