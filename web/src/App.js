import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import './config/reactotronConfig';

import GlobalStyle from './styles/global';
import { Container } from './styles/components';
import Routes from './routes';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import LogedUser from './components/LogedUser';

import history from './routes/history';
import client from './config/apolloClient';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <ApolloProvider client={client}>
          <Container>
            <Header />
            <Navigation />
            <LogedUser />
            <Routes />
            <Footer />
          </Container>
          <GlobalStyle />
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
