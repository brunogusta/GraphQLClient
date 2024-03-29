import { createGlobalStyle } from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }


  html, body, #root {
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: 'Montserrat', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
