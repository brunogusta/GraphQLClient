import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  LoginButton,
  ResponseTextError,
  ResponseTextSuccess
} from './styles';

import { Types as LoginTypes } from '../../../../store/ducks/userLoged';

const LOGIN_QUERY = gql`
  mutation($email: String!, $senha: String!) {
    login(dados: { email: $email, senha: $senha }) {
      id
      nome
      email
      token
      perfis {
        nome
      }
    }
  }
`;

export default function LoginForm(props) {
  const [userData, useUserData] = useState({
    inputData: {},
    requestData: {},
    errorMessage: '',
    loginSuccess: false,
    loginFail: false
  });

  const dispatch = useDispatch();
  const DisplayUserLoged = data => {
    dispatch({
      type: LoginTypes.LOGIN_ACTION,
      payload: data
    });
  };

  const SetError = error => {
    useUserData({
      ...userData,
      loginFail: true,
      loginSuccess: false,
      errorMessage: error
    });
  };

  const SetSuccess = error => {
    useUserData({
      ...userData,
      loginFail: false,
      loginSuccess: true
    });
  };

  const { email, senha } = userData.inputData;
  const [SendMutation, { data, errors, loading }] = useMutation(LOGIN_QUERY, {
    variables: {
      email,
      senha
    },
    errorPolicy: 'all',
    onError: ({ graphQLErrors }) => {
      SetError(graphQLErrors[0].message);
    },
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      SetSuccess();
      DisplayUserLoged(login);
    }
  });

  const HandleSubmitValues = ({ email, senha }) => {
    useUserData({
      ...userData,
      inputData: {
        email,
        senha
      }
    });

    SendMutation();
  };

  return (
    <Container>
      <Formik
        initialValues={{ email: '', senha: '' }}
        onSubmit={(values, actions) => {
          HandleSubmitValues(values);
          actions.resetForm();
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('E-mail is not valid'),
          senha: Yup.string().required('The password is required')
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
              <h3>Login</h3>
            </div>
            <Form>
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
              <input
                type="password"
                name="senha"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.senha}
              />
              {errors.senha && touched.senha && (
                <TextError>{errors.senha}</TextError>
              )}
              <LoginButton type="submit" onClick={handleSubmit}>
                <p>SING IN</p>
              </LoginButton>
            </Form>
          </FormContainer>
        )}
      />
      <ResultsContainer>
        <div>
          <h3>Results</h3>
        </div>

        {userData.loginFail && (
          <ResponseTextError loginError={userData.loginFail}>
            <p>{userData.errorMessage}</p>
          </ResponseTextError>
        )}
        {userData.loginSuccess && (
          <ResponseTextSuccess loginSuccess={userData.loginSuccess}>
            <p>Successful login</p>
          </ResponseTextSuccess>
        )}
      </ResultsContainer>
    </Container>
  );
}
