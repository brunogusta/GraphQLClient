import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Results, FormBox } from './styles';

import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

export default function Auth(props) {
  const [urlEvent, useUrlEvent] = useState({
    loginForm: true,
    registerForm: false
  });

  const LoadLogin = () => {
    useUrlEvent({
      loginForm: true,
      registerForm: false
    });
  };

  const LoadRegister = () => {
    useUrlEvent({
      loginForm: false,
      registerForm: true
    });
  };

  const url = window.location.href;
  useEffect(() => {
    if (url.indexOf('login') !== -1) {
      LoadLogin();
    } else if (url.indexOf('register') !== -1) {
      LoadRegister();
    } else {
      LoadLogin();
    }
  }, [url]);

  return (
    <Container duration="1s">
      <Navigation urlEvent={urlEvent} />
      <FormBox>
        <Route exact path="/" component={LoginForm} />
        <Route path="/auth/login" component={LoginForm} />
        <Route path="/auth/register" component={RegisterForm} />
      </FormBox>
      <Results>RESULTS</Results>
    </Container>
  );
}
