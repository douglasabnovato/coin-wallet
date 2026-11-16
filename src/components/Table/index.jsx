/* Tabela de despesas com conversão pela cotação do momento do cadastro, edição, exclusão e "Desfazer" */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, editExpense, restoreExpense } from '../../actions';
import { convertedBRL, rateDate, rateOf } from '../../utils/money';
import './index.css';

/* Tempo do aviso "Despesa excluída"; pausa com o foco ou o mouse nele (WCAG 2.2.1) */
export const UNDO_MS = 10000;

function Table() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();
  const [removed, setRemoved] = useState(null);
  const timer = useRef(null);
  const undoButton = useRef(null);

  const stopTimer = useCallback(() => clearTimeout(timer.current), []);
  const startTimer = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setRemoved(null), UNDO_MS);
  }, []);
  useEffect(() => stopTimer, [stopTimer]);

  /* Exclui na hora (o requisito pede exclusão imediata, sem diálogo) e oferece desfazer */
  const handleDelete = (expense) => {
    dispatch(deleteExpense(expense.id));
    setRemoved(expense);
    startTimer();
  };

  /* O botão da linha some: o foco vai para "Desfazer", senão cairia no início da página */
  useEffect(() => {
    if (removed) undoButton.current?.focus();
  }, [removed]);

  /* Depois de desfazer, o foco volta ao "Excluir" da linha devolvida */
  const [restoredId, setRestoredId] = useState(null);
  useEffect(() => {
    if (restoredId === null) return;
    document.getElementById(`excluir-${restoredId}`)?.focus();
    setRestoredId(null);
  }, [restoredId, expenses]);

  const handleUndo = () => {
    stopTimer();
    dispatch(restoreExpense(removed));
    setRestoredId(removed.id);
    setRemoved(null);
  };

  /* Pausa o tempo só se o foco sair do aviso de verdade */
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) startTimer();
  };

  /* Região sempre presente para o leitor de tela anunciar a mudança (WCAG 4.1.3) */
  const notice = (
    <div
      className="undo-notice"
      role="status"
      onMouseEnter={ stopTimer }
      onMouseLeave={ () => removed && startTimer() }
      onFocus={ stopTimer }
      onBlur={ handleBlur }
    >
      {removed && (
        <>
          <span>{`Despesa excluída: ${removed.description || removed.value}.`}</span>
          <button type="button" ref={ undoButton } className="secondary" onClick={ handleUndo }>
            Desfazer
          </button>
        </>
      )}
    </div>
  );

  if (!expenses.length) {
    return (
      <>
        {notice}
        <p className="table-empty">Nenhuma despesa cadastrada ainda. Use o formulário acima.</p>
      </>
    );
  }

  return (
    <>
      {notice}
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
              <th scope="col">Data da cotação</th>
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
                  <td>{rateDate(expense)}</td>
                  <td>{convertedBRL(expense)}</td>
                  <td>Real</td>
                  <td>
                    <button type="button" data-testid="edit-btn" onClick={ () => dispatch(editExpense(id)) } aria-label={ `Editar despesa ${description || value}` }>
                      Editar
                    </button>
                    <button type="button" id={ `excluir-${id}` } data-testid="delete-btn" className="danger" onClick={ () => handleDelete(expense) } aria-label={ `Excluir despesa ${description || value}` }>
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
/* Fim de Table/index.js */
