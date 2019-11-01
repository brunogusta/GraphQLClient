import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import { Container, FormBox } from './styles';

import Navigation from './components/Navigation';
import List from './components/List';
import Search from './components/Search';
import New from './components/New';
import Update from './components/Update';
import Delete from './components/Delete';

import { Types as LoginTypes } from '../../store/ducks/userLoged';

export default function Users() {
  const dispatch = useDispatch();
  const LoadUser = userData => {
    dispatch({
      type: LoginTypes.LOGIN_ACTION,
      payload: userData
    });
  };

  useEffect(() => {
    const loged = localStorage.getItem('loged');

    if (loged) {
      const userData = {
        nome: localStorage.getItem('nome'),
        email: localStorage.getItem('email'),
        perfis: JSON.parse(localStorage.getItem('perfis'))
      };

      LoadUser(userData);
    }
  }, []);

  return (
    <Container duration="1s">
      <Navigation />
      <FormBox>
        <Route exact path="/users" component={List} />
        <Route path="/users/list" component={List} />
        <Route path="/users/search" component={Search} />
        <Route path="/users/new" component={New} />
        <Route path="/users/update" component={Update} />
        <Route path="/users/delete" component={Delete} />
      </FormBox>
    </Container>
  );
}
