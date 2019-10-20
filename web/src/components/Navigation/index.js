import React, { useState, useEffect } from 'react';

import { Container, AuthButton, UsersButton, PerfilsButton } from './styles';

export default function Navigation() {
  const [handleClick, useHandleClick] = useState({
    button: ''
  });

  const HandleStyleButton = name => {
    useHandleClick({
      button: name
    });
  };

  const SetAuth = name => {
    useHandleClick({
      button: name
    });
  };

  const SetPerfils = name => {
    useHandleClick({
      button: name
    });
  };

  const SetUsers = name => {
    useHandleClick({
      button: name
    });
  };

  const url = window.location.href;
  useEffect(() => {
    if (url.indexOf('users') !== -1) {
      return SetUsers('Users');
    } else if (url.indexOf('perfils') !== -1) {
      return SetPerfils('Perfils');
    } else {
      return SetAuth('Auth');
    }
  }, [url]);

  return (
    <Container>
      <AuthButton
        to="/"
        onClick={() => SetAuth('Auth')}
        handleClick={handleClick}
      >
        <i className="fas fa-fingerprint" />
        <p>AUTHENTICATION</p>
      </AuthButton>
      <UsersButton
        to="/users"
        onClick={() => SetUsers('Users')}
        handleClick={handleClick}
      >
        <i className="fas fa-users" />
        <p>USERS</p>
      </UsersButton>
      <PerfilsButton
        to="/perfils"
        onClick={() => SetPerfils('Perfils')}
        handleClick={handleClick}
      >
        <i className="fas fa-user-check" />
        <p>PERFILS</p>
      </PerfilsButton>
    </Container>
  );
}
