import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useMutation, useLazyQuery } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Container,
  Form,
  FormContainer,
  SearchTitle,
  ResultsContainer,
  TextError,
  NewUserButton,
  EmailInput,
  NameInput,
  DropDawnInput,
  PassInput,
  GetPerfilsButton
} from './styles';

const PERFIL_QUERY = gql`
  query {
    perfis {
      nome
    }
  }
`;

const NEW_USER = gql`
  mutation(
    $nome: String!
    $email: String!
    $senha: String!
    $perfis: [PerfilFiltro]
  ) {
    novoUsuario(
      dados: { nome: $nome, email: $email, senha: $senha, perfis: $perfis }
    ) {
      nome
      email
      perfis {
        nome
      }
    }
  }
`;

export default function NewForm() {
  const [handleInputEvents, useHandleInputEvents] = useState({
    options: [],
    selected: null,
    data: {}
  });

  const SetPerfil = value => {
    useHandleInputEvents({
      ...handleInputEvents,
      selected: value
    });
  };

  const LoadPerfils = options => {
    useHandleInputEvents({
      ...handleInputEvents,
      options
    });
  };

  const [SendPerfilsQuery] = useLazyQuery(PERFIL_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      const FormatedOptions = data.perfis.map(perfil => {
        const labels = {
          label: perfil.nome
        };

        return labels;
      });

      LoadPerfils(FormatedOptions);
    }
  });

  const { nome, email, senha, perfis } = handleInputEvents.data;
  console.log(nome);
  const [SendNewUserMutation] = useMutation(NEW_USER, {
    variables: {
      nome,
      email,
      senha,
      perfis
    },
    fetchPolicy: 'no-cache',
    onError: ({ graphQLErrors }) => {
      console.log(graphQLErrors);
    },
    onCompleted: data => {
      console.log(data);
    }
  });

  const HandleSubmitValues = async values => {
    let labels = [];

    const label = handleInputEvents.selected;

    const formatedPerfil = () => {
      if (label) {
        labels.push(label);

        const options = labels.map(value => ({
          nome: value.label
        }));

        return options;
      } else return null;
    };

    const data = {
      nome: values.name,
      email: values.email,
      senha: values.password,
      perfis: formatedPerfil()
    };

    console.log(data);
    await useHandleInputEvents({
      ...handleInputEvents,
      data
    });

    SendNewUserMutation();
  };
  return (
    <Container duration="1s">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        onSubmit={(values, actions) => {
          HandleSubmitValues(values);
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
            <SearchTitle>
              <h3>New user</h3>
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
              <GetPerfilsButton onClick={SendPerfilsQuery} type="submit">
                LOAD PERFILS
              </GetPerfilsButton>
              <NewUserButton
                type="submit"
                onClick={() => HandleSubmitValues(values)}
              >
                <p>CREATE NEW USER</p>
              </NewUserButton>
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
