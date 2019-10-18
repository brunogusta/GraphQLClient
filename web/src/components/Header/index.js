import React from 'react';

import { Container } from './styles';

import Logo from '../../assets/images/logo.png';

export default function Header() {
  return (
    <Container>
      <p>
        <strong>GRAPHQL</strong>
        CLIENT
      </p>
      <img src={Logo} />
    </Container>
  );
}
