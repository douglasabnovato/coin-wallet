import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';  
import { saveEmail } from '../../actions';  

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // Validações simples
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isButtonDisabled = !(isEmailValid && isPasswordValid);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. Salva o email no Redux
    dispatch(saveEmail(email));
    // 2. Muda a rota para a carteira
    history.push('/carteira');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="email-input"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button type="submit" disabled={ isButtonDisabled }>
        Entrar
      </button>
    </form>
  );
}

export default Login;