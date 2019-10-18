import React from 'react';

import { Container, NavButton } from './styles';

export default function Navigation() {
  return (
    <Container>
      <NavButton to="/">
        <i className="fas fa-fingerprint" />
        <p>AUTHENTICATION</p>
      </NavButton>
      <NavButton to="/users">
        <i className="fas fa-users" />
        <p>USERS</p>
      </NavButton>
      <NavButton to="/perfils">
        <i className="fas fa-user-check" />
        <p>PERFILS</p>
      </NavButton>
    </Container>
  );
}
