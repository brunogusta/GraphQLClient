import React, { useState } from 'react';
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

export default function LoginForm() {
  const [handleError, useHandleError] = useState({
    emptyInputs: false
  });

  const NoFieldProvided = () => {
    useHandleError({
      emptyInputs: true
    });

    setTimeout(() => Reset(), 2000);
  };

  const Reset = () => {
    useHandleError({
      emptyInputs: false
    });
  };

  const HandleSubmitValues = ({ name, email }) => {
    if (email === name) {
      return NoFieldProvided();
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={values => HandleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          name: Yup.string(),
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
              {handleError.emptyInputs && (
                <TextError>{'Inform your name or email'}</TextError>
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
