import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  SearchButton,
  UserDataBox,
  RequestTextError
} from './styles';

const DELETE_MUTATION = gql`
  mutation($id: Int, $emailFilter: String) {
    removeUser(filter: { id: $id, email: $emailFilter }) {
      id
      name
      email
      perfils {
        name
        label
      }
    }
  }
`;

export default function Delete() {
  const [error, setError] = useState({
    emptyInputs: false,
    floatNumber: false,
    errorMessage: ''
  });

  const [inputData, setInputData] = useState({
    data: {},
    isLoaded: false
  });

  const noFieldProvided = () => {
    setError({
      emptyInputs: true
    });

    setTimeout(() => reset(), 2000);
  };

  const reset = () => {
    setError({
      emptyInputs: false
    });
  };

  const resetResult = () => {
    setInputData({ ...inputData, isLoaded: false });
    setError({
      ...error,
      userNotFound: false,
      errorMessage: '',
      noAdm: false
    });
  };
  const { id, emailFilter } = inputData.data;
  const [sendDeleteMutation, { data }] = useMutation(DELETE_MUTATION, {
    variables: {
      id,
      emailFilter
    },
    fetchPolicy: 'no-cache',
    onError: ({ graphQLErrors }) => {
      setError({
        ...error,
        errorMessage: graphQLErrors[0].message
      });
    },
    onCompleted: data => {
      if (data.removeUser === null) {
        setError({
          ...error,
          errorMessage: 'No users found with this filter'
        });

        return;
      }

      setInputData({ ...inputData, isLoaded: true });
    }
  });

  const handleSubmitValues = async ({ id, emailFilter }) => {
    resetResult();
    if (id === emailFilter) {
      return noFieldProvided();
    }

    if (!Number.isInteger(parseInt(id)) && id !== '') {
      setError({
        ...error,
        floatNumber: true
      });

      setTimeout(() => reset(), 2000);
      return;
    }

    if (id === '') {
      id = 0;
    }

    const input = {
      id: parseInt(id),
      emailFilter
    };

    await setInputData({
      ...inputData,
      isLoaded: false,
      data: input
    });

    sendDeleteMutation();
  };

  return (
    <Container duration="1s">
      <Formik
        initialValues={{ id: '', emailFilter: '' }}
        onSubmit={values => handleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          id: Yup.number().typeError('ID must be a number'),
          emailFilter: Yup.string().email('E-mail is not valid')
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
              <h3>Delete</h3>
            </div>
            <Form>
              <input
                name="id"
                placeholder="ID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
              />
              {errors.id && touched.id && <TextError>{errors.id}</TextError>}
              <input
                type="email"
                name="emailFilter"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <TextError>{errors.email}</TextError>
              )}
              {error.emptyInputs && (
                <TextError>{'No fields provided'}</TextError>
              )}
              {error.floatNumber && (
                <TextError>{'ID must by an integer number'}</TextError>
              )}
              <SearchButton type="submit" onClick={handleSubmit}>
                <p>DELETE</p>
              </SearchButton>
            </Form>
          </FormContainer>
        )}
      />
      <ResultsContainer>
        <div>
          <h3>Results</h3>
        </div>
        {error.errorMessage && (
          <RequestTextError>
            <p>{error.errorMessage}</p>
          </RequestTextError>
        )}
        {inputData.isLoaded && !error.errorMessage && (
          <UserDataBox>
            <p>
              The user <strong>{data.removeUser.name}</strong> has ben deleted.
            </p>
          </UserDataBox>
        )}
      </ResultsContainer>
    </Container>
  );
}
