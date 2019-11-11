import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Users from '../pages/Users';
import Auth from '../pages/Auth';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/auth" component={Auth} />
    <Route path="/users" component={Users} />
  </Switch>
);

export default Routes;
