import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

import { Container } from './styles/components';

import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';

import history from './routes/history';

function App() {
  return (
    <BrowserRouter history={history}>
      <Container>
        <Header />
        <Navigation />
        <Routes />
        <Footer />
      </Container>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
