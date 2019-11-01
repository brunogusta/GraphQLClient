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
  display: grid;
  height: 100%;
  position: relative;

  grid-template-columns: minmax(440px, 1fr) minmax(440px, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 'formik result';
  column-gap: 15px;

  animation-name: ${FadeInAnimation};
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

  &:active {
    background-color: #d741a6;
  }
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

export const ResponseTextError = styled.div`
  display: flex;
  background-color: ${loginError => (loginError ? '#ea003f' : null)};
  align-items: center;
  padding: 10px !important;
  border-radius: 10px;
  border-bottom: none !important;
  margin-top: 20px;

  p {
    font-weight: bold;
    color: #fff;
    width: 100%;
  }
`;

export const ResponseTextSuccess = styled.div`
  background-color: ${loginSuccess => (loginSuccess ? '#5EA222' : null)};
  padding: 10px !important;
  border-radius: 10px;
  border-bottom: none !important;
  margin-top: 20px;

  p {
    font-weight: bold;
    color: #fff;
    width: 100%;
  }
`;
