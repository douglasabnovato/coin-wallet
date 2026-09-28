/* Rotas: login em "/" e carteira em "/carteira" */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Wallet from './pages/Wallet/index';
import Login from './pages/Login/index';

function App() {
  return (
    <Routes>
      <Route path="/carteira" element={ <Wallet /> } />
      <Route path="/" element={ <Login /> } />
      <Route path="*" element={ <main className="not-found"><p>Página não encontrada.</p><Link to="/">Voltar ao login</Link></main> } />
    </Routes>
  );
}

export default App;
/* Fim de App.js */
