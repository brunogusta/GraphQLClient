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
  EmailInput,
  NameInput,
  DropDawnInput,
  PassInput,
  GetPerfilsButton
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
            <SearchTitle>
              <h3>New user</h3>
            </SearchTitle>
            <Form>
              <NameInput
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
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
              <GetPerfilsButton type="submit">LOAD PERFILS</GetPerfilsButton>
              <SearchButton type="submit" onClick={handleSubmit}>
                <p>CREATE NEW USER</p>
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
