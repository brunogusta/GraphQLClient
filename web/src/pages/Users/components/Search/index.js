import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  SearchButton
} from './styles';

export default function Search() {
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

  const HandleSubmitValues = ({ id, email }) => {
    if (id === email) {
      return NoFieldProvided();
    }
  };

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
                type="input"
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
              <SearchButton type="submit" onClick={handleSubmit}>
                <p>SEARCH</p>
              </SearchButton>
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
