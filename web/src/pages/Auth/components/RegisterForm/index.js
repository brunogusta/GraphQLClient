import React, { useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as Yup from 'yup';

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  RegisterButton,
  ResponseTextError,
  ResponseTextSuccess
} from './styles';

const REGISTER_MUTATION = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    registerUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      perfils {
        name
      }
    }
  }
`;

export default function RegisterForm() {
  const [requestData, setRequestData] = useState({
    perfilData: {},
    registerSuccess: false,
    registerError: false,
    errorMessage: ''
  });

  const { name, email, password } = requestData.perfilData;
  const [sendMutation] = useMutation(REGISTER_MUTATION, {
    variables: {
      name,
      email,
      password
    },
    onError: ({ graphQLErrors }) => {
      setRequestData({
        ...requestData,
        registerError: true,
        errorMessage: graphQLErrors[0].message,
        RegisterSuccess: false
      });
    },
    onCompleted: data => {
      setRequestData({
        ...requestData,
        registerSuccess: true,
        registerError: false
      });
    }
  });

  const handleSubmitValues = values => {
    setRequestData({
      perfilData: {
        name: values.name,
        email: values.email,
        password: values.password
      }
    });

    sendMutation();
  };

  return (
    <Container>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={(values, actions) => {
          handleSubmitValues(values);
          actions.resetForm();
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('The name is required'),
          email: Yup.string()
            .email('E-mail is not valid')
            .required('The e-mail is required'),
          password: Yup.string().required('The password is required'),
          confirmPassword: Yup.string().test(
            '',
            'The password is diferent',
            function test(value) {
              return this.parent.password === value;
            }
          )
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
              <h3>Register</h3>
            </div>
            <Form>
              <input
                type="input"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <TextError>{errors.name}</TextError>
              )}
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
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <TextError>{errors.confirmPassword}</TextError>
              )}
              <RegisterButton type="submit" onClick={handleSubmit}>
                <p>SIGN UP</p>
              </RegisterButton>
            </Form>
          </FormContainer>
        )}
      />
      {}
      <ResultsContainer>
        <div>
          <h3>Results</h3>
        </div>

        {requestData.registerError && (
          <ResponseTextError registerError={requestData.registerError}>
            <p>{requestData.errorMessage}</p>
          </ResponseTextError>
        )}

        {requestData.registerSuccess && (
          <ResponseTextSuccess registerSuccess={requestData.registerSuccess}>
            <p>User successfully registered!</p>
          </ResponseTextSuccess>
        )}
      </ResultsContainer>
    </Container>
  );
}
