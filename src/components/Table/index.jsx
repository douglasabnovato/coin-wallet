/* Tabela de despesas com conversão pela cotação do momento do cadastro, edição e exclusão */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, editExpense } from '../../actions';
import { convertedBRL, rateOf } from '../../utils/money';
import './index.css';

function Table() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  /* Exclui a despesa (o requisito pede exclusão imediata, sem diálogo) */
  const handleDelete = (expense) => dispatch(deleteExpense(expense.id));

  if (!expenses.length) return <p className="table-empty">Nenhuma despesa cadastrada ainda. Use o formulário acima.</p>;

  return (
    <div className="table-container">
      <table className="wallet-table">
        <caption className="sr-only">Despesas cadastradas</caption>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { id, value, description, currency, method, tag, exchangeRates } = expense;
            const name = exchangeRates?.[currency]?.name;
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name ? name.split('/')[0] : currency}</td>
                <td>{rateOf(expense).toFixed(2)}</td>
                <td>{convertedBRL(expense)}</td>
                <td>Real</td>
                <td>
                  <button type="button" data-testid="edit-btn" onClick={ () => dispatch(editExpense(id)) } aria-label={ `Editar despesa ${description || value}` }>
                    Editar
                  </button>
                  <button type="button" data-testid="delete-btn" className="danger" onClick={ () => handleDelete(expense) } aria-label={ `Excluir despesa ${description || value}` }>
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
/* Fim de Table/index.js */
