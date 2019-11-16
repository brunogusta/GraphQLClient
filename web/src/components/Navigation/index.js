import React, { useState, useEffect } from 'react';

import { Container, AuthButton, UsersButton } from './styles';

export default function Navigation() {
  const [event, setEvent] = useState({
    button: ''
  });



  const setAuth = name => {
    setEvent({
      button: name
    });
  };


  const setUsers = name => {
    setEvent({
      button: name
    });
  };

  const url = window.location.href;
  useEffect(() => {
    if (url.indexOf('users') !== -1) {
      return setUsers('Users');
    } else {
      return setAuth('Auth');
    }
  }, [url]);

  return (
    <Container>
      <AuthButton
        to="/"
        onClick={() => setAuth('Auth')}
        event={event}
      >
        <i className="fas fa-fingerprint" />
        <p>AUTHENTICATION</p>
      </AuthButton>
      <UsersButton
        to="/users"
        onClick={() => setUsers('Users')}
        event={event}
      >
        <i className="fas fa-users" />
        <p>USERS</p>
      </UsersButton>
    </Container>
  );
}
