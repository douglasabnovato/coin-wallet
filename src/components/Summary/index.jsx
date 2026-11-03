/* Resumo por categoria e exportação em CSV; só aparece com despesa cadastrada */
import React from 'react';
import { useSelector } from 'react-redux';
import { totalsByTag } from '../../utils/summary';
import { downloadCSV } from '../../utils/csv';
import './index.css';

function Summary() {
  const expenses = useSelector((state) => state.wallet.expenses);
  if (!expenses.length) return null;
  const totals = totalsByTag(expenses);

  return (
    <section className="summary" aria-labelledby="summary-title">
      <div className="summary-head">
        <h2 id="summary-title">Gastos por categoria</h2>
        <button type="button" className="summary-export" onClick={ () => downloadCSV(expenses) }>
          Exportar CSV
        </button>
      </div>
      <ul className="summary-list">
        {totals.map(({ tag, total, percent }) => (
          <li key={ tag } data-testid="summary-item">
            <span className="summary-tag">{tag}</span>
            <span className="summary-bar" aria-hidden="true"><span style={ { width: `${percent}%` } } /></span>
            <span className="summary-value">{`R$ ${total} (${percent}%)`}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Summary;
/* Fim de Summary/index.jsx */
