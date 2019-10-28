import { put } from 'redux-saga/effects';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Creators as RegisterActions } from '../ducks/userRegister';

export function* RegisterUser(userData) {
  const REGISTER_QUERRY = gql`
    {
      query {
        usuarios {
          nome
          email
          perfis {
            nome
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(REGISTER_QUERRY);

  console.log(data);
}
