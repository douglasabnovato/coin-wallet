/* Rotas: login em "/" e carteira em "/carteira" */
import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { iniciarMedicao, registrarRota } from './utils/medicao';
import Wallet from './pages/Wallet/index';
import Login from './pages/Login/index';

function App() {
  const { pathname } = useLocation();

  /* Conta cada rota no GoatCounter, só no site publicado (decisão D5) */
  useEffect(() => {
    iniciarMedicao();
    registrarRota(pathname);
  }, [pathname]);

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
