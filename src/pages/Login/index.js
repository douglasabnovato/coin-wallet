import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';  
import { saveEmail } from '../../actions';  
import './index.css'; // Importa a estilização que deixará o Login maravilhoso

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // Validações exigidas pelos testes (Email formato válido + Senha >= 6 caracteres)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isButtonDisabled = !(isEmailValid && isPasswordValid);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  return (
    <div className="container">
      <form onSubmit={ handleSubmit }>
        {/* Adicione sua logo aqui se desejar: <img src={logo} className="image-logo" /> */}
        <input
          type="text"
          className="form-field-email"
          data-testid="email-input"
          placeholder="E-mail"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          className="form-field-password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button 
          type="submit" 
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;