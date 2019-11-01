import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, FormBox } from './styles';

import Navigation from './components/Navigation';
import List from './components/List';
import Search from './components/Search';
import New from './components/New';
import Delete from './components/Delete';
import Update from './components/Update';

import { Types as LoginTypes } from '../../store/ducks/userLoged';

export default function Perfils() {
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
        <Route exact path="/perfils" component={List} />
        <Route path="/perfils/list" component={List} />
        <Route path="/perfils/search" component={Search} />
        <Route path="/perfils/new" component={New} />
        <Route path="/perfils/delete" component={Delete} />
        <Route path="/perfils/update" component={Update} />
      </FormBox>
    </Container>
  );
}
