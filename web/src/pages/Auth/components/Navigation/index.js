import React, { useEffect, useState } from 'react';

import { Container, LoginButton, RegisterButton } from './styles';

export default function Navigation() {
  const [handleClick, useHandleClick] = useState({
    loginBtn: false,
    registerBtn: false
  });

  const HandlerClickLogin = () => {
    useHandleClick({
      loginBtn: true,
      registerBtn: false
    });
  };
  const HandlerClickRegister = () => {
    useHandleClick({
      loginBtn: false,
      registerBtn: true
    });
  };

  const url = window.location.href;
  useEffect(() => {
    if (url.indexOf('login') !== -1) {
      HandlerClickLogin();
    } else if (url.indexOf('register') !== -1) {
      HandlerClickRegister();
    } else {
      HandlerClickLogin();
    }
  }, [url]);

  return (
    <Container>
      <RegisterButton
        to="/auth/register"
        onClick={() => HandlerClickRegister()}
        state={handleClick}
      >
        <p>REGISTER</p>
      </RegisterButton>
      <LoginButton
        to="/auth/login"
        onClick={() => HandlerClickLogin()}
        state={handleClick}
      >
        <p>LOGIN</p>
      </LoginButton>
    </Container>
  );
}
