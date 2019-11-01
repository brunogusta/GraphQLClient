import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useLazyQuery } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  SearchButton,
  UserDataBox,
  PerfilBox,
  RequestTextError
} from './styles';

const USER_QUERY = gql`
  query($id: Int, $email: String) {
    usuario(filtro: { id: $id, email: $email }) {
      id
      nome
      email
      perfis {
        nome
        rotulo
      }
    }
  }
`;

export default function Search() {
  const [handleError, useHandleError] = useState({
    emptyInputs: false,
    floatNumber: false,
    userNotFound: false,
    noAdm: false,
    errorMessage: ''
  });

  const [inputData, useInputData] = useState({
    id: '',
    email: '',
    loadResult: false
  });

  const NoAdmin = message => {
    useHandleError({
      ...handleError,
      noAdm: true,
      errorMessage: message
    });
  };

  //Errors Handlers
  const NoFieldProvided = () => {
    useHandleError({
      ...handleError,
      emptyInputs: true
    });

    setTimeout(() => Reset(), 2000);
  };

  const ValidateInt = () => {
    useHandleError({
      ...handleError,
      floatNumber: true
    });

    setTimeout(() => Reset(), 2000);
  };

  const UserNotFound = () => {
    useHandleError({
      ...handleError,
      userNotFound: true
    });
  };

  const Reset = () => {
    useHandleError({
      ...handleError,
      emptyInputs: false,
      floatNumber: false
    });
  };

  const ResetResult = () => {
    useInputData({ ...inputData, loadResult: false });
    useHandleError({
      ...handleError,
      userNotFound: false,
      errorMessage: '',
      noAdm: false
    });
  };

  const HandleSubmitValues = ({ id, email }) => {
    if (id === email) {
      return NoFieldProvided();
    }

    if (!Number.isInteger(id) && id !== '') {
      return ValidateInt();
    }

    ResetResult();

    HandleQuery(id, email);
  };

  const HandleQuery = (id, email) => {
    if (id === '') {
      id = 0;
    }

    useInputData({
      id,
      email
    });

    SendQuery();
  };

  const LoadResult = () => {
    useInputData({ ...inputData, loadResult: true });
  };

  const { id, email } = inputData;
  const [SendQuery, { errors, data }] = useLazyQuery(USER_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      id,
      email
    },
    onError: ({ graphQLErrors }) => {
      NoAdmin(graphQLErrors[0].message);
    },
    onCompleted: () => {
      if (data.usuario === null) {
        UserNotFound();
      }

      LoadResult();
    }
  });

  return (
    <Container duration="1s">
      <Formik
        initialValues={{ id: '', email: '' }}
        onSubmit={values => HandleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          id: Yup.number().typeError('ID must be a number'),
          email: Yup.string().email('E-mail is not valid')
        })}
        render={({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <FormContainer>
            <div>
              <h3>Search</h3>
            </div>
            <Form>
              <input
                type="number"
                name="id"
                placeholder="ID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
              />
              {errors.id && touched.id && <TextError>{errors.id}</TextError>}
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <TextError>{errors.email}</TextError>
              )}
              {handleError.emptyInputs && (
                <TextError>{'No fields provided'}</TextError>
              )}
              {handleError.floatNumber && (
                <TextError>{'ID must by an integer number'}</TextError>
              )}
              <SearchButton type="submit" onClick={handleSubmit}>
                <p>SEARCH</p>
              </SearchButton>
            </Form>
          </FormContainer>
        )}
      />
      <ResultsContainer>
        <div>
          <h3>Result</h3>
        </div>
        {handleError.userNotFound && (
          <RequestTextError>
            <p>No user found</p>
          </RequestTextError>
        )}
        {handleError.noAdm && (
          <RequestTextError>
            <p>{handleError.errorMessage}</p>
          </RequestTextError>
        )}
        {inputData.loadResult && !handleError.userNotFound && (
          <UserDataBox>
            <p>ID: {data.usuario.id}</p>
            <p>Name: {data.usuario.nome}</p>
            <p>E-mail: {data.usuario.email}</p>
            <PerfilBox>
              <p>Perfil(s):</p>
              {data.usuario.perfis.map(perfil => (
                <div key={Math.random()}>
                  <p>Name: {perfil.nome}</p>
                  <p>Label: {perfil.rotulo}</p>
                </div>
              ))}
            </PerfilBox>
          </UserDataBox>
        )}
      </ResultsContainer>
    </Container>
  );
}
