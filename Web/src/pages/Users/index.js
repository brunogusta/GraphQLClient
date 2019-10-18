import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { Container, FormBox } from './styles';

import Navigation from './components/navigation';
import List from './components/List';

export default function Users() {
  const [handleClick, useHandleClick] = useState({
    button: ''
  });

  const url = window.location.href;
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
    if (url.indexOf('list') !== -1) {
      SetList();
    } else if (url.indexOf('search') !== -1) {
      SetSearch();
    } else if (url.indexOf('new') !== -1) {
      SetNew();
    } else if (url.indexOf('update') !== -1) {
      SetUpdate();
    } else if (url.indexOf('remove') !== -1) {
      SetDelete();
    } else {
      SetList();
    }
  }, [url]);

  return (
    <Container duration="1s">
      <Navigation urlEvent={handleClick} />
      <FormBox>
        <Route exact path="/users" component={List} />
        <Route path="/users/list" component={List} />
      </FormBox>
    </Container>
  );
}
