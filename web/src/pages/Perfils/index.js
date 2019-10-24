import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { Container, FormBox } from './styles';

import Navigation from './components/Navigation';
import List from './components/List';

export default function Perfils() {
  return (
    <Container duration="1s">
      <Navigation />
      <FormBox>
        <Route exact path="/perfils" component={List} />
        <Route path="/perfils/list" component={List} />
      </FormBox>
    </Container>
  );
}
