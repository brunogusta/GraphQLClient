import React, { useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import gql from 'graphql-tag';


import { Button } from '@material-ui/core';
import useStyles from '../../../../styles/customMaterialBtn'

import {
  Container,
  TableContainer,
  Table,
  ButtonContainer,
  ImgAvatar,
} from './styles';

const USERS_QUERY = gql`
  query {
    users {
      id
      avatar
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

  const [sendQuery, { data }] = useLazyQuery(USERS_QUERY, {
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

  const classes = useStyles()
  return (
    <Container>
      <ButtonContainer>
        <Button className={classes.root} color="secondary"variant='contained' disabled={error.haveError} onClick={handleSubmit}>
          LOAD USERS
        </Button>
        {error.haveError && <p>{error.errorMessage}</p>}
      </ButtonContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Perfil</th>
            </tr>
          </thead>
          {data ? (
            <tbody>
              {data.users.map(user => {
                console.log(user)
                return (
                  <>
                  <tr key={user.id}>
                    <td>{<ImgAvatar src={user.avatar} alt="avatar"/>}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.perfils[0].name}</td>
                  </tr>
                  <tr key={user.id}>
                    <td>{<ImgAvatar src={user.avatar} alt="avatar"/>}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.perfils[0].name}</td>
                  </tr>
                  <tr key={user.id}>
                    <td>{<ImgAvatar src={user.avatar} alt="avatar"/>}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.perfils[0].name}</td>
                  </tr>
                  <tr key={user.id}>
                    <td>{<ImgAvatar src={user.avatar} alt="avatar"/>}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.perfils[0].name}</td>
                  </tr>
                  <tr key={user.id}>
                    <td>{<ImgAvatar src={user.avatar} alt="avatar"/>}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.perfils[0].name}</td>
                  </tr>
                  </>
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
