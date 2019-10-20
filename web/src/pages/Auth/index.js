import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, FormBox, NavBox } from './styles';

import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

export default function Auth() {
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
