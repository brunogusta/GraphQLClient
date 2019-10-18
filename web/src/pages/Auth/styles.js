import styled, { keyframes } from 'styled-components';
import BaseAnimation from '../../utils/Animations/BaseAnimation';

const w = window.innerWidth;

const FadeInAnimation = keyframes`
from {
    top:30px;
    opacity: 0;
  }

  to {
    top: 0px;
    opacity: 1;
  }
`;

export const Container = styled(BaseAnimation)`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 10fr;
  grid-template-areas:
    'navigation navigation'
    'form results';

  padding: 10px 10px 0px 10px;

  animation-name: ${FadeInAnimation};
`;

export const FormBox = styled.div`
  display: flex;
  grid-area: form;
  justify-content: center;
  align-items: center;

  color: #333;
`;

export const Results = styled.div`
  display: flex;
  grid-area: results;
  justify-content: center;
  align-items: center;

  color: #333;
`;
