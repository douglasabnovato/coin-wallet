import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';

function Header() {
  const email = useSelector((state) => state.user.email);
  const expenses = useSelector((state) => state.wallet.expenses);

  // Calcula o valor total convertido de todas as despesas
  const totalExpenses = expenses.reduce((acc, curr) => {
    const { value, currency, exchangeRates } = curr;
    const askRate = exchangeRates[currency] ? exchangeRates[currency].ask : 0;
    return acc + Number(value) * Number(askRate);
  }, 0);

  return (
    <header className="wallet-header">
      <div className="header-logo-container">
        <h2>TrybeWallet</h2>
      </div>
      <div className="header-info-container">
        {/* 1. Email do usuário */}
        <span data-testid="email-field">
          Email: {email}
        </span>

        <div className="expenses-container">
          <span>Despesa Total: R$ </span>

          {/* 2. Valor total das despesas */}
          <span data-testid="total-field">
            {totalExpenses.toFixed(2)}
          </span>

          {/* 3. Moeda de conversão */}
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;