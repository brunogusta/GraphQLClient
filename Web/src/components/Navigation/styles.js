import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  background-color: #f38bd1;
  justify-content: center;
  align-items: center;
  grid-area: nav;
`;

export const NavButton = styled(Link)`
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 20px;
  height: 100%;
  width: 150px;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  p {
    font-size: 13px;
    margin-top: 3px;
    font-weight: bold;
  }

  :hover {
    border-bottom: 2px solid #fff;
  }
`;
