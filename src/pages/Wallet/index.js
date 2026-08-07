import React from 'react';
import Header from '../../components/Header';
import './index.css';

function Wallet() {
  return (
    <div className="wallet-page">
      <Header />
      <main className="wallet-main">
        {/* Aqui entrará o formulário de despesas e a tabela nas próximas fases */}
        <h2>Painel da Carteira</h2>
      </main>
    </div>
  );
}

Wallet.propTypes = {};

export default Wallet;