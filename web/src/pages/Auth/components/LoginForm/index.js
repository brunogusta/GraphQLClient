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
  mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      name
      email
      token
      perfils {
        name
      }
    }
  }
`;

export default function LoginForm() {
  const [userData, setUserData] = useState({
    inputData: {},
    requestData: {},
    errorMessage: '',
    loginSuccess: false,
    loginFail: false
  });

  const dispatch = useDispatch();
  const { email, password } = userData.inputData;
  const [sendMutation] = useMutation(LOGIN_QUERY, {
    variables: {
      email,
      password
    },
    onError: ({ graphQLErrors }) => {
      setUserData({
        ...userData,
        loginFail: true,
        loginSuccess: false,
        errorMessage: graphQLErrors[0].message
      });
    },
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      localStorage.setItem('name', login.name);
      localStorage.setItem('email', login.email);
      localStorage.setItem('perfils', JSON.stringify(login.perfils));
      localStorage.setItem('loged', 'true');

      setUserData({
        ...userData,
        loginFail: false,
        loginSuccess: true
      });

      dispatch({
        type: LoginTypes.LOGIN_ACTION,
        payload: login
      });
    }
  });

  const handleSubmitValues = ({ email, password }) => {
    setUserData({
      ...userData,
      inputData: {
        email,
        password
      }
    });

    sendMutation();
  };

  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          handleSubmitValues(values);
          actions.resetForm();
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('E-mail is not valid'),
          password: Yup.string().required('The password is required')
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
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <TextError>{errors.password}</TextError>
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
