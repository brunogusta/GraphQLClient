import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Results, FormBox } from './styles';

import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

export default function Auth(props) {
  return (
    <Container duration="1s">
      <Navigation />
      <FormBox>
        <Route exact path="/" component={LoginForm} />
        <Route path="/auth/login" component={LoginForm} />
        <Route path="/auth/register" component={RegisterForm} />
      </FormBox>
      <Results>RESULTS</Results>
    </Container>
  );
}
