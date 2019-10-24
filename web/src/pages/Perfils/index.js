import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { Container, FormBox } from './styles';

import Navigation from './components/Navigation';
import List from './components/List';
import Search from './components/Search';
import New from './components/New';
import Delete from './components/Delete';
import Update from './components/Update';

export default function Perfils() {
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
