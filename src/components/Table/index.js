import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';

function Table() {
  const expenses = useSelector((state) => state.wallet.expenses);

  return (
    <div className="table-container">
      <table className="wallet-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { id, value, description, currency, method, tag, exchangeRates } = expense;
            const exchangeRate = exchangeRates[currency] ? exchangeRates[currency] : { name: '', ask: 0 };
            const convertedValue = Number(value) * Number(exchangeRate.ask);

            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRate.name.split('/')[0] || currency }</td>
                <td>{ Number(exchangeRate.ask).toFixed(2) }</td>
                <td>{ convertedValue.toFixed(2) }</td>
                <td>Real</td>
                <td>
                  {/* Botões de edição e exclusão entrarão nas próximas fases */}
                  <button type="button" data-testid="edit-btn">Editar</button>
                  <button type="button" data-testid="delete-btn">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;