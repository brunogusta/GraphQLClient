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

  const HandleSubmitValues = ({ id, name }) => {
    if (id === name) {
      return NoFieldProvided();
    }
  };

  return (
    <Container duration="1s">
      <Formik
        initialValues={{ id: '', name: '' }}
        onSubmit={values => HandleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          id: Yup.number().typeError('ID must be a number'),
          name: Yup.string()
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
              <h3>Search perfil</h3>
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
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <TextError>{errors.name}</TextError>
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
