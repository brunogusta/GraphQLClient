import React, { useState, useEffect } from 'react';
import { useLazyQuery } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Container,
  SearchButton,
  TableContainer,
  Table,
  ButtonContainer
} from './styles';

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      perfils {
        name
      }
    }
  }
`;

export default function List() {
  const [error, setErrors] = useState({
    haveError: false,
    errorMessage: ''
  });

  const [sendQuery, { data, errors }] = useLazyQuery(USERS_QUERY, {
    fetchPolicy: 'no-cache',
    onError: ({ graphQLErrors }) => {
      setErrors({
        haveError: true,
        errorMessage: graphQLErrors[0].message
      });
    }
  });

  const handleSubmit = () => {
    setErrors({
      haveError: false,
      errorMessage: ''
    });
    sendQuery();
  };

  return (
    <Container>
      <ButtonContainer>
        <SearchButton disabled={error.haveError} onClick={handleSubmit}>
          LOAD USERS
        </SearchButton>
        {error.haveError && <p>{error.errorMessage}</p>}
      </ButtonContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Perfil</th>
            </tr>
          </thead>
          {data ? (
            <tbody>
              {data.users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.perfils[0].name}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
}
