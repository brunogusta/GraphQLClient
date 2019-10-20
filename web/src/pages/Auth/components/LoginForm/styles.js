import styled from 'styled-components';

import { SendButton } from '../../../../utils/Animations/button';

export const Container = styled.div`
  display: grid;
  height: 100%;

  grid-template-columns: repeat(2, min(440px)) 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'formik result';
  column-gap: 15px;
`;

export const FormContainer = styled.div`
  display: flex;
  grid-area: formik;
  flex-direction: column;
  height: 100%;

  padding: 10px 0px 0px 0px;

  div:first-child {
    border-bottom: 2px solid #b1b1b1;
    padding-bottom: 3px;

    h3 {
      color: #464646;
    }
  }
`;

export const Form = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  input {
    margin-top: 5vh;
    width: 100%;
    border: none;
    border-bottom: 2px solid #f38bd1;
    font-size: 17px;
  }
`;

export const LoginButton = styled(SendButton)`
  margin-top: 30px;
`;

export const ResultsContainer = styled.div`
  grid-area: result;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 0px 0px;

  div {
    border-bottom: 2px solid #b1b1b1;
    padding-bottom: 3px;

    h3 {
      color: #464646;
    }
  }
`;

export const TextError = styled.p`
  font-weight: 100;
  color: #ea003f;
`;
