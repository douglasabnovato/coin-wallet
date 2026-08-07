import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { saveEmail } from '../../actions';
import Logo from '../../images/logo.png';
import './index.css';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickLogin = (values) => {
    const { email } = values;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email('email inválido')
      .required('O email é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('A senha é obrigatória'),
  });

  return (
    <div className="container">
      <div className="image-logo">
        <img src={ Logo } width="100%" alt="Logo da Trybe" />
      </div>
      <Formik
        initialValues={ { email: '', password: '' } }
        onSubmit={ handleClickLogin }
        validationSchema={ validationsLogin }
      >
        {({ isValid, dirty }) => (
          <Form className="login-form">
            <div className="login-form-group">
              <Field
                name="email"
                type="email"
                className="form-field-email"
                placeholder="Email"
                data-testid="email-input"
              />
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>
            <div className="form-group">
              <Field
                name="password"
                type="password"
                className="form-field-password"
                placeholder="Senha"
                data-testid="password-input"
              />
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>
            <button
              className="button"
              type="submit"
              disabled={ !isValid || !dirty }
            >
              Entrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;