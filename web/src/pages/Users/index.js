import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { Container, FormBox } from './styles';

import Navigation from './components/navigation';
import List from './components/List';

export default function Users() {
  return (
    <Container duration="1s">
      <Navigation />
      <FormBox>
        <Route exact path="/users" component={List} />
        <Route path="/users/list" component={List} />
      </FormBox>
    </Container>
  );
}
