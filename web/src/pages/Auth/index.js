import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, FormBox, NavBox } from './styles';

import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import { Types as LoginTypes } from '../../store/ducks/userLoged';

export default function Auth() {

  const dispatch = useDispatch();
  useEffect(() => {
    const loged = localStorage.getItem('loged');

    if (loged) {
      const userData = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        perfils: JSON.parse(localStorage.getItem('perfils'))
      };

      dispatch({
        type: LoginTypes.LOGIN_ACTION,
        payload: userData
      });
    }
  });

  return (
    <Container duration="1s">
      <NavBox>
        <Navigation />
      </NavBox>
      <FormBox>
        <Route exact path="/" component={LoginForm} />
        <Route path="/auth/login" component={LoginForm} />
        <Route path="/auth/register" component={RegisterForm} />
      </FormBox>
    </Container>
  );
}
