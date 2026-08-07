import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, editExpense } from '../../actions';
import './index.css';

function Table() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (id) => {
    dispatch(editExpense(id));
  };

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
              <tr key={id}>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{exchangeRate.name.split('/')[0] || currency}</td>
                <td>{Number(exchangeRate.ask).toFixed(2)}</td>
                <td>{convertedValue.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  {/* 9. Botão de Editar */}
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={() => handleEdit(id)}
                  >
                    Editar
                  </button>

                  {/* 10. Botão de Excluir */}
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={() => handleDelete(id)}
                  >
                    Excluir
                  </button>
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