import React, { useEffect, useState } from 'react';

import { Container, LoginButton, RegisterButton } from './styles';

export default function Navigation({ urlEvent }) {
  const [handleClick, useHandleClick] = useState({
    loginBtn: true,
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

  useEffect(() => {
    if (urlEvent.loginForm) {
      HandlerClickLogin();
    } else {
      HandlerClickRegister();
    }
  }, [urlEvent]);

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
