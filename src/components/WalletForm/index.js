import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewExpense, saveEditedExpense } from '../../actions';
import './index.css';

function WalletForm() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  const currencies = useSelector((state) => state.wallet.currencies);
  const editor = useSelector((state) => state.wallet.editor);
  const idToEdit = useSelector((state) => state.wallet.idToEdit);
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  // Efeito para preencher os campos do formulário quando entrar no modo de edição
  useEffect(() => {
    if (editor) {
      const expenseToEdit = expenses.find((exp) => exp.id === idToEdit);
      if (expenseToEdit) {
        setValue(expenseToEdit.value);
        setDescription(expenseToEdit.description);
        setCurrency(expenseToEdit.currency);
        setMethod(expenseToEdit.method);
        setTag(expenseToEdit.tag);
      }
    }
  }, [editor, idToEdit, expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editor) {
      const updatedData = {
        value,
        description,
        currency,
        method,
        tag,
      };
      dispatch(saveEditedExpense(updatedData));
    } else {
      const expenseData = {
        value,
        description,
        currency,
        method,
        tag,
      };
      dispatch(fetchNewExpense(expenseData));
    }

    // Limpa os campos após a ação
    setValue('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="wallet-form">
      {/* 4. Campo de Valor */}
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          id="value-input"
          data-testid="value-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>

      {/* 5. Campo de Descrição */}
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          id="description-input"
          data-testid="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {/* 6. Campo de Moeda */}
      <label htmlFor="currency-input">
        Moeda:
        <select
          id="currency-input"
          data-testid="currency-input"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </label>

      {/* 7. Campo de Método de Pagamento */}
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          id="method-input"
          data-testid="method-input"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      {/* 8. Campo de Tag / Categoria */}
      <label htmlFor="tag-input">
        Tag:
        <select
          id="tag-input"
          data-testid="tag-input"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      <button type="submit">
        {editor ? 'Editar despesa' : 'Adicionar despesa'}
      </button>
    </form>
  );
}

export default WalletForm;