import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10vh 8vh 77vh 5vh;
  grid-template-areas:
    'header'
    'nav'
    'inputs'
    'footer';
`;
