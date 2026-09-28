/* Cabeçalho da carteira: e-mail, total convertido em BRL e sair */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { totalBRL } from '../../utils/money';
import './index.css';

function Header() {
  const email = useSelector((state) => state.user.email);
  const expenses = useSelector((state) => state.wallet.expenses);

  return (
    <header className="wallet-header">
      <div className="header-logo-container">
        <h1>Coin Wallet</h1>
      </div>
      <div className="header-info-container">
        <span data-testid="email-field">Email: {email || 'não informado'}</span>
        <div className="expenses-container" aria-live="polite">
          <span>Despesa Total: R$ </span>
          <span data-testid="total-field">{totalBRL(expenses)}</span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
        <Link to="/" className="header-exit">Sair</Link>
      </div>
    </header>
  );
}

export default Header;
/* Fim de Header/index.js */
