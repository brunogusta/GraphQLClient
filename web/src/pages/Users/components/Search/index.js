import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { useLazyQuery } from "react-apollo";
import gql from "graphql-tag";

import { Button } from "@material-ui/core";
import useStyles from "../../../../styles/customMaterialBtn";

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  UserDataBox,
  PerfilBox,
  RequestTextError
} from "./styles";

const USER_QUERY = gql`
  query($id: Int, $email: String) {
    user(filter: { id: $id, email: $email }) {
      id
      name
      email
      perfils {
        name
        label
      }
    }
  }
`;

export default function Search() {
  const [error, setError] = useState({
    emptyInputs: false,
    floatNumber: false,
    userNotFound: false,
    noAdm: false,
    errorMessage: "",
    disableBtn: false
  });

  const [inputData, setInputData] = useState({
    id: "",
    email: "",
    loadResult: false
  });

  //Errors Handlers
  const noFieldProvided = () => {
    setError({
      ...error,
      emptyInputs: true
    });

    setTimeout(() => reset(), 2000);
  };

  const validateInt = () => {
    setError({
      ...error,
      floatNumber: true
    });

    setTimeout(() => reset(), 2000);
  };

  const reset = () => {
    setError({
      ...error,
      emptyInputs: false,
      floatNumber: false
    });
  };

  const resetResult = () => {
    setInputData({ ...inputData, loadResult: false });
    setError({
      ...error,
      userNotFound: false,
      errorMessage: "",
      noAdm: false
    });
  };

  const handleSubmitValues = ({ id, email }) => {
    if (id === email) {
      return noFieldProvided();
    }

    if (!Number.isInteger(id) && id !== "") {
      return validateInt();
    }

    resetResult();
    handleQuery(id, email);
  };

  const handleQuery = (id, email) => {
    if (id === "") {
      id = 0;
    }

    setInputData({
      id,
      email
    });

    sendQuery();
  };

  const { id, email } = inputData;
  const [sendQuery, { data }] = useLazyQuery(USER_QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      id,
      email
    },
    onError: ({ graphQLErrors }) => {
      setError({
        ...error,
        noAdm: true,
        errorMessage: graphQLErrors[0].message,
        disableBtn: true
      });
    },
    onCompleted: () => {
      if (data.user === null) {
        setError({
          ...error,
          userNotFound: true
        });
      }

      setInputData({ ...inputData, loadResult: true });
    }
  });

  const classes = useStyles();
  return (
    <Container duration="1s">
      <Formik
        initialValues={{ id: "", email: "" }}
        onSubmit={values => handleSubmitValues(values)}
        validationSchema={Yup.object().shape({
          id: Yup.number().typeError("ID must be a number"),
          email: Yup.string().email("E-mail is not valid")
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
              {error.emptyInputs && (
                <TextError>{"No fields provided"}</TextError>
              )}
              <input
                type="number"
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
              {error.floatNumber && (
                <TextError>{"ID must by an integer number"}</TextError>
              )}
              <Button
                className={classes.root}
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={error.disableBtn}
              >
                <p>SEARCH</p>
              </Button>
            </Form>
          </FormContainer>
        )}
      />
      <ResultsContainer>
        <div>
          <h3>Result</h3>
        </div>
        {error.userNotFound && (
          <RequestTextError>
            <p>No user found</p>
          </RequestTextError>
        )}
        {error.noAdm && (
          <RequestTextError>
            <p>{error.errorMessage}</p>
          </RequestTextError>
        )}
        {inputData.loadResult && !error.userNotFound && (
          <UserDataBox>
            <p>ID: {data.user.id}</p>
            <p>Name: {data.user.name}</p>
            <p>E-mail: {data.user.email}</p>
            <PerfilBox>
              <p>Perfil(s):</p>
              {data.user.perfils.map(perfil => (
                <div key={Math.random()}>
                  <p>Name: {perfil.name}</p>
                  <p>Label: {perfil.label}</p>
                </div>
              ))}
            </PerfilBox>
          </UserDataBox>
        )}
      </ResultsContainer>
    </Container>
  );
}
