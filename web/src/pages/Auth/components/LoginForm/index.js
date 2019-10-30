import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  LoginButton
} from './styles';

import { Types as LoginTypes } from '../../../../store/ducks/userLoged';

const LOGIN_QUERY = gql`
  query($email: String!, $senha: String!) {
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
    requestData: {}
  });

  const dispatch = useDispatch();
  const DisplayUserLoged = data => {
    dispatch({
      type: LoginTypes.LOGIN_ACTION,
      payload: data
    });
  };

  const { email, senha } = userData.inputData;
  const [SendQuery, { data, errors, loading }] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      email,
      senha
    },
    errorPolicy: 'all',
    onError: error => {
      console.log(error);
    },
    onCompleted: ({ login }) => {
      console.log(login);
      localStorage.setItem('token', login.token);
      DisplayUserLoged(login);
    }
  });

  const HandleSubmitValues = ({ email, senha }) => {
    console.log('funciona');
    useUserData({
      ...userData,
      inputData: {
        email,
        senha
      }
    });

    SendQuery();
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
          senha: Yup.string().required('The senha is required')
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
      </ResultsContainer>
    </Container>
  );
}
