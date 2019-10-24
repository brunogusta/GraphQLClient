import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  SearchButton,
  LabelInput,
  NameInput,
  IdInput,
  NameFilterInput,
  FilterContainer
} from './styles';

export default function Update() {
  const [handleInputEvents, useHandleInputEvents] = useState({
    selected: null,
    emptyInputs: false
  });

  const NoFieldProvided = () => {
    useHandleInputEvents({
      ...handleInputEvents,
      emptyInputs: true
    });

    setTimeout(() => Reset(), 2000);
  };

  const Reset = () => {
    useHandleInputEvents({
      ...handleInputEvents,
      emptyInputs: false
    });
  };

  const HandleSubmitValues = values => {
    if (values.id === values.nameFilter) {
      return NoFieldProvided();
    }

    const NewObject = {
      name: values.name,
      email: values.email
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
          id: '',
          nameFilter: '',
          name: '',
          label: ''
        }}
        onSubmit={values => HandleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          id: Yup.number().typeError('The id must be a number'),
          nameFilter: Yup.string(),
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
            <FilterContainer>
              <h3>Filter User</h3>
              <IdInput
                name="id"
                placeholder="ID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
              />
              {errors.id && touched.id && <TextError>{errors.id}</TextError>}
              <NameFilterInput
                name="nameFilter"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nameFilter}
              />
              {errors.nameFilter && touched.nameFilter && (
                <TextError>{errors.nameFilter}</TextError>
              )}
            </FilterContainer>
            <Form>
              <h3>Update User</h3>
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
              {handleInputEvents.emptyInputs && (
                <TextError>No filters provided</TextError>
              )}
              <SearchButton type="submit" onClick={handleSubmit}>
                <p>UPDATE</p>
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
