import React, { useEffect, useState } from 'react';

import { Container, LoginButton, RegisterButton } from './styles';

export default function Navigation() {
  const [event, setEvent] = useState({
    loginBtn: false,
    registerBtn: false
  });

  const handlerClickLogin = () => {
    setEvent({
      loginBtn: true,
      registerBtn: false
    });
  };
  const HandlerClickRegister = () => {
    setEvent({
      loginBtn: false,
      registerBtn: true
    });
  };

  const url = window.location.href;
  useEffect(() => {
    if (url.indexOf('login') !== -1) {
      handlerClickLogin();
    } else if (url.indexOf('register') !== -1) {
      HandlerClickRegister();
    } else {
      handlerClickLogin();
    }
  }, [url]);

  return (
    <Container>
      <RegisterButton
        to="/auth/register"
        onClick={() => HandlerClickRegister()}
        state={event}
      >
        <p>REGISTER</p>
      </RegisterButton>
      <LoginButton
        to="/auth/login"
        onClick={() => handlerClickLogin()}
        state={event}
      >
        <p>LOGIN</p>
      </LoginButton>
    </Container>
  );
}
