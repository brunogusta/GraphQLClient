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
  const [handleClick, useHandleClick] = useState({
    button: ''
  });

  const HandleStyleButton = name => {
    useHandleClick({
      button: name
    });
  };

  const url = window.location.href;
  useEffect(() => {
    const buttonName = StyleControl(url);
    HandleStyleButton(buttonName);
  }, [url]);

  return (
    <Container>
      <UsersButton
        to="/perfils/list"
        onClick={() => HandleStyleButton('List')}
        state={handleClick}
      >
        <p>LIST</p>
      </UsersButton>
      <SearchButton
        to="/perfils/search"
        onClick={() => HandleStyleButton('Search')}
        state={handleClick}
      >
        <p>SEARCH</p>
      </SearchButton>
      <NewUserButton
        to="/perfils/new"
        onClick={() => HandleStyleButton('New')}
        state={handleClick}
      >
        <p>NEW PERFIL</p>
      </NewUserButton>
      <UpdateButton
        to="/perfils/update"
        onClick={() => HandleStyleButton('Update')}
        state={handleClick}
      >
        <p>UPDATE</p>
      </UpdateButton>
      <RemoveButton
        to="/perfils/delete"
        onClick={() => HandleStyleButton('Delete')}
        state={handleClick}
      >
        <p>DELETE</p>
      </RemoveButton>
    </Container>
  );
}
