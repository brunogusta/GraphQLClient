import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  grid-area: navigation;
  background-color: #e8e7e7;
`;

export const UsersButton = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100px;

  border-bottom: ${({ state }) =>
    state.button === 'List' ? '3px solid #f38bd1' : null};

  p {
    color: ${({ state }) => (state.button === 'List' ? '#464646' : '#ccc')};
    font-weight: bold;
  }

  :hover {
    border-bottom: 3px solid #f38bd1;
  }
`;

export const SearchButton = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100px;

  border-bottom: ${({ state }) =>
    state.button === 'Search' ? '3px solid #f38bd1' : null};

  p {
    color: ${({ state }) => (state.button === 'Search' ? '#464646' : '#ccc')};
    font-weight: bold;
  }

  :hover {
    border-bottom: 3px solid #f38bd1;
  }
`;
export const NewUserButton = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100px;

  border-bottom: ${({ state }) =>
    state.button === 'New' ? '3px solid #f38bd1' : null};

  p {
    color: ${({ state }) => (state.button === 'New' ? '#464646' : '#ccc')};
    font-weight: bold;
  }

  :hover {
    border-bottom: 3px solid #f38bd1;
  }
`;
export const UpdateButton = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100px;

  border-bottom: ${({ state }) =>
    state.button === 'Update' ? '3px solid #f38bd1' : null};

  p {
    color: ${({ state }) => (state.button === 'Update' ? '#464646' : '#ccc')};
    font-weight: bold;
  }

  :hover {
    border-bottom: 3px solid #f38bd1;
  }
`;
export const RemoveButton = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100px;

  border-bottom: ${({ state }) =>
    state.button === 'Delete' ? '3px solid #f38bd1' : null};

  p {
    color: ${({ state }) => (state.button === 'Delete' ? '#464646' : '#ccc')};
    font-weight: bold;
  }

  :hover {
    border-bottom: 3px solid #f38bd1;
  }
`;
