import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows:
    minmax(60px, 10vh)
    minmax(70px, 10vh)
    minmax(60px, 10vh)
    minmax(400px, 79vh)
    minmax(30px, 3vh);
  grid-template-areas:
    'header'
    'nav'
    'logedUser'
    'inputs'
    'footer';
`;


