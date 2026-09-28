/* Login local: e-mail válido e senha com 6+ caracteres liberam a carteira (identificação no próprio navegador, sem servidor) */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEmail } from '../../actions';
import './index.css';

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isButtonDisabled = !(isValidEmail(email) && password.length >= 6);

  /* Guarda o e-mail e abre a carteira */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveEmail(email.trim()));
    navigate('/carteira');
  };

  return (
    <main className="container">
      <form onSubmit={ handleSubmit }>
        <h1 className="login-title">Coin Wallet</h1>
        <label htmlFor="login-email" className="sr-only">E-mail</label>
        <input id="login-email" type="email" autoComplete="email" className="form-field-email" data-testid="email-input" placeholder="E-mail" value={ email } onChange={ (e) => setEmail(e.target.value) } />
        <label htmlFor="login-password" className="sr-only">Senha</label>
        <input id="login-password" type="password" autoComplete="current-password" className="form-field-password" data-testid="password-input" placeholder="Senha (mínimo 6 caracteres)" value={ password } onChange={ (e) => setPassword(e.target.value) } />
        <button type="submit" disabled={ isButtonDisabled }>Entrar</button>
        <p className="login-note">Seus dados ficam só neste navegador.</p>
      </form>
    </main>
  );
}

export default Login;
/* Fim de Login/index.js */
