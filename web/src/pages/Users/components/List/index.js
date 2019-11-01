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
    usuarios {
      id
      nome
      email
      perfis {
        nome
      }
    }
  }
`;

export default function List() {
  const [handleErrors, useHandleErrors] = useState({
    haveError: false,
    errorMessage: ''
  });

  const SetError = message => {
    useHandleErrors({
      haveError: true,
      errorMessage: message
    });
  };

  const ResetErrors = () => {
    useHandleErrors({
      haveError: false,
      errorMessage: ''
    });
  };

  const [SendQuery, { data, errors }] = useLazyQuery(USERS_QUERY, {
    fetchPolicy: 'no-cache',
    onError: ({ graphQLErrors }) => {
      SetError(graphQLErrors[0].message);
    }
  });

  const HandleSubmit = () => {
    ResetErrors();
    SendQuery();
  };

  return (
    <Container>
      <ButtonContainer>
        <SearchButton disabled={handleErrors.haveError} onClick={HandleSubmit}>
          LOAD USERS
        </SearchButton>
        {handleErrors.haveError && <p>{handleErrors.errorMessage}</p>}
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
              {data.usuarios.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.perfis[0].nome}</td>
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
