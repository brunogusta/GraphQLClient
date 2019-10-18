import React, { useEffect, useState } from 'react';

import {
  Container,
  UsersButton,
  SearchButton,
  UpdateButton,
  RemoveButton,
  NewUserButton
} from './styles';

export default function Navigation({ urlEvent }) {
  const [handleClick, useHandleClick] = useState({
    button: ''
  });

  const SetList = () => {
    useHandleClick({
      button: 'List'
    });
  };
  const SetSearch = () => {
    useHandleClick({
      button: 'Search'
    });
  };
  const SetNew = () => {
    useHandleClick({
      button: 'New'
    });
  };
  const SetUpdate = () => {
    useHandleClick({
      button: 'Update'
    });
  };
  const SetDelete = () => {
    useHandleClick({
      button: 'Delete'
    });
  };

  useEffect(() => {
    if (urlEvent.button === 'List') {
      SetList();
    } else if (urlEvent.button === 'Search') {
      SetSearch();
    } else if (urlEvent.button === 'New') {
      SetNew();
    } else if (urlEvent.button === 'Update') {
      SetUpdate();
    } else if (urlEvent.button === 'Delete') {
      SetDelete();
    } else {
      SetList();
    }
  }, [urlEvent]);

  return (
    <Container>
      <UsersButton
        to="/users/list"
        onClick={() => SetList()}
        state={handleClick}
      >
        <p>LIST</p>
      </UsersButton>
      <SearchButton
        to="/users/search"
        onClick={() => SetSearch()}
        state={handleClick}
      >
        <p>SEARCH</p>
      </SearchButton>
      <NewUserButton
        to="/users/new"
        onClick={() => SetNew()}
        state={handleClick}
      >
        <p>NEW USER</p>
      </NewUserButton>
      <UpdateButton
        to="/users/update"
        onClick={() => SetUpdate()}
        state={handleClick}
      >
        <p>UPDATE</p>
      </UpdateButton>
      <RemoveButton
        to="/users/remove"
        onClick={() => SetDelete()}
        state={handleClick}
      >
        <p>REMOVE</p>
      </RemoveButton>
    </Container>
  );
}
