import React from 'react';
import { withApollo } from 'react-apollo';
import { useSelector, useDispatch } from 'react-redux';

import { Types as LoginTypes } from '../../store/ducks/userLoged';

import { Container, NoLogedUser } from './styles';

import history from '../../routes/history';

function LogedUser(props) {
  const { isLoged, userData } = useSelector(state => state.userLoged);

  const dispatch = useDispatch();
  const LogOut = () => {
    localStorage.clear();
    props.client.resetStore();

    dispatch({
      type: LoginTypes.LOGOUT_ACTION
    });

    window.location.reload(false);

    history.push('/');
  };

  if (isLoged) {
    return (
      <Container>
        <div>
          <p>Name: {userData.name}</p>
          <p>E-mail: {userData.email}</p>
          <p>Perfil(s): {userData.perfils.map(perfil => perfil.name)}</p>
          <button onClick={LogOut}>EXIT</button>
        </div>
      </Container>
    );
  } else {
    return <NoLogedUser />;
  }
}

export default withApollo(LogedUser);
