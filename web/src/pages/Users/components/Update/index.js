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
  EmailInput,
  NameInput,
  DropDawnInput,
  PassInput,
  GetPerfilsButton,
  IdInput,
  EmailFilterInput,
  FilterContainer
} from './styles';

export default function Update() {
  const [handleInputEvents, useHandleInputEvents] = useState({
    options: [{ label: 'Admin' }, { label: 'Comum' }],
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
    if (values.id === values.emailFilter) {
      return NoFieldProvided();
    }

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
          id: '',
          emailFilter: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          perfil: ''
        }}
        onSubmit={values => HandleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('The name is required'),
          email: Yup.string()
            .email('E-mail is not valid')
            .required('The e-mail is required'),
          password: Yup.string().required('The password is required'),
          id: Yup.number().typeError('The id must be a number'),
          emailFilter: Yup.string().email('The e-mail is not valid')
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
              <EmailFilterInput
                name="emailFilter"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailFilter}
              />
              {errors.emailFilter && touched.emailFilter && (
                <TextError>{errors.emailFilter}</TextError>
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
              <EmailInput
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
              <PassInput
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
              <DropDawnInput
                name="perfil"
                options={handleInputEvents.options}
                onChange={SetPerfil}
                placeholder="Chose the perfil"
                value={handleInputEvents.selected}
              />
              {handleInputEvents.emptyInputs && (
                <TextError>No filter provided</TextError>
              )}
              <GetPerfilsButton type="submit">LOAD PERFILS</GetPerfilsButton>
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
