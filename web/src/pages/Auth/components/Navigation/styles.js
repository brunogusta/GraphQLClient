import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e8e7e7;
  height: 100%;
`;

export const LoginButton = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100px;

  border-bottom: ${({ state }) =>
    state.loginBtn ? '3px solid #f38bd1' : null};

  p {
    color: ${({ state }) => (state.loginBtn ? '#464646' : '#ccc')};
    font-weight: bold;
  }

  &:hover {
    border-bottom: 3px solid #f38bd1;
  }
`;

export const RegisterButton = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100px;

  border-bottom: ${({ state }) =>
    state.registerBtn ? '3px solid #f38bd1' : null};

  p {
    color: ${({ state }) => (state.registerBtn ? '#464646' : '#ccc')};
    font-weight: bold;
  }

  &:hover {
    border-bottom: 3px solid #f38bd1;
  }
`;
