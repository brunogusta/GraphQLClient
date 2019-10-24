import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Form,
  FormContainer,
  SearchTitle,
  ResultsContainer,
  TextError,
  SearchButton,
  NameInput,
  LabelInput
} from './styles';

export default function NewForm() {
  const [handleInputEvents, useHandleInputEvents] = useState({
    options: [{ label: 'Admin' }, { label: 'Comum' }],
    selected: null
  });

  const HandleSubmitValues = values => {
    const { label } = handleInputEvents.selected;

    const NewObject = {
      name: values.name,
      email: values.email,
      perfil: label
    };
  };

  const SetPerfil = value => {
    useHandleInputEvents({
      ...handleInputEvents,
      selected: value
    });
  };

  return (
    <Container duration="1s">
      <Formik
        initialValues={{
          name: '',
          label: ''
        }}
        onSubmit={values => HandleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('The name is required'),
          label: Yup.string().required('The label is required')
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
            <SearchTitle>
              <h3>New perfil</h3>
            </SearchTitle>
            <Form>
              <NameInput
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <TextError>{errors.name}</TextError>
              )}
              <LabelInput
                name="label"
                placeholder="Label"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
              />
              {errors.label && touched.label && (
                <TextError>{errors.label}</TextError>
              )}
              <SearchButton type="submit" onClick={handleSubmit}>
                <p>CREATE NEW PERFIL</p>
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
