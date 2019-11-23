import styled, { keyframes } from 'styled-components';
import BaseAnimation from '../../utils/Animations/baseAnimation';

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
  grid-template-columns: 1fr;
  grid-template-rows: minmax(60px, 1fr) minmax(300px, 10fr);
  grid-template-areas:
    'navigation'
    'form';

  padding: 10px 20px 0px 20px;

  animation-name: ${FadeInAnimation};
`;

export const FormBox = styled.div`
  grid-area: form;

  color: #333;
`;
