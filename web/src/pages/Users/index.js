import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { Container, FormBox } from './styles';

import Navigation from './components/Navigation';
import List from './components/List';
import Search from './components/Search';
import New from './components/New';

export default function Users() {
  return (
    <Container duration="1s">
      <Navigation />
      <FormBox>
        <Route exact path="/users" component={List} />
        <Route path="/users/list" component={List} />
        <Route path="/users/search" component={Search} />
        <Route path="/users/new" component={New} />
      </FormBox>
    </Container>
  );
}
