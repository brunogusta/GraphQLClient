import React, { useEffect, useState } from 'react';

import {
  Container,
  UsersButton,
  SearchButton,
  UpdateButton,
  RemoveButton,
  NewUserButton
} from './styles';

import StyleControl from '../../../../utils/functions/PerfilsStyleControl';

export default function Navigation() {
  const [event, setEvent] = useState({
    button: ''
  });

  const handleStyleButton = name => {
    setEvent({
      button: name
    });
  };

  const url = window.location.href;
  useEffect(() => {
    const buttonName = StyleControl(url);
    handleStyleButton(buttonName);
  }, [url]);

  return (
    <Container>
      <UsersButton
        to="/users/list"
        onClick={() => handleStyleButton('List')}
        state={event}
      >
        <p>LIST</p>
      </UsersButton>
      <SearchButton
        to="/users/search"
        onClick={() => handleStyleButton('Search')}
        state={event}
      >
        <p>SEARCH</p>
      </SearchButton>
      <NewUserButton
        to="/users/new"
        onClick={() => handleStyleButton('New')}
        state={event}
      >
        <p>NEW USER</p>
      </NewUserButton>
      <UpdateButton
        to="/users/update"
        onClick={() => handleStyleButton('Update')}
        state={event}
      >
        <p>UPDATE</p>
      </UpdateButton>
      <RemoveButton
        to="/users/delete"
        onClick={() => handleStyleButton('Delete')}
        state={event}
      >
        <p>DELETE</p>
      </RemoveButton>
    </Container>
  );
}
