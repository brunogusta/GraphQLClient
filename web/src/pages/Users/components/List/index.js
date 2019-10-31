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
  const [SendQuery, { data, errors }] = useLazyQuery(USERS_QUERY, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onError: () => {
      console.log(errors);
    }
  });

  console.log(data);
  return (
    <Container>
      <ButtonContainer>
        <SearchButton onClick={SendQuery}>LOAD USERS</SearchButton>
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
                console.log(user);
                return (
                  <tr>
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
