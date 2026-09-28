/* Formulário de despesa: adiciona com a cotação do momento ou salva a edição; valida o valor */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewExpense, saveEditedExpense, cancelEdit } from '../../actions';
import './index.css';

const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

function WalletForm() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState(METHODS[0]);
  const [tag, setTag] = useState(TAGS[0]);
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);

  const { currencies, editor, idToEdit, expenses, error } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!editor) return;
    const exp = expenses.find((e) => e.id === idToEdit);
    if (exp) {
      setValue(exp.value);
      setDescription(exp.description);
      setCurrency(exp.currency);
      setMethod(exp.method);
      setTag(exp.tag);
    }
  }, [editor, idToEdit, expenses]);

  /* Valida e envia */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const n = Number(String(value).replace(',', '.'));
    if (!(n > 0)) {
      setFormError('Informe um valor maior que zero.');
      return;
    }
    setFormError('');
    const data = { value: String(value).replace(',', '.'), description: description.trim(), currency, method, tag };
    if (editor) {
      dispatch(saveEditedExpense(data));
    } else {
      setBusy(true);
      const ok = await dispatch(fetchNewExpense(data));
      setBusy(false);
      if (!ok) return;
    }
    setValue('');
    setDescription('');
  };

  const options = currencies.length ? currencies : [currency];

  return (
    <form onSubmit={ handleSubmit } className={ `wallet-form${editor ? ' editing' : ''}` } noValidate>
      <label htmlFor="value-input">
        Valor:
        <input type="number" id="value-input" data-testid="value-input" min="0" step="0.01" inputMode="decimal" value={ value } onChange={ (e) => setValue(e.target.value) } />
      </label>
      <label htmlFor="description-input">
        Descrição:
        <input type="text" id="description-input" data-testid="description-input" maxLength={ 80 } value={ description } onChange={ (e) => setDescription(e.target.value) } />
      </label>
      <label htmlFor="currency-input">
        Moeda:
        <select id="currency-input" data-testid="currency-input" value={ currency } onChange={ (e) => setCurrency(e.target.value) }>
          {options.map((c) => <option key={ c } value={ c }>{c}</option>)}
        </select>
      </label>
      <label htmlFor="method-input">
        Método de pagamento:
        <select id="method-input" data-testid="method-input" value={ method } onChange={ (e) => setMethod(e.target.value) }>
          {METHODS.map((m) => <option key={ m } value={ m }>{m}</option>)}
        </select>
      </label>
      <label htmlFor="tag-input">
        Tag:
        <select id="tag-input" data-testid="tag-input" value={ tag } onChange={ (e) => setTag(e.target.value) }>
          {TAGS.map((t) => <option key={ t } value={ t }>{t}</option>)}
        </select>
      </label>
      <button type="submit" disabled={ busy }>{editor ? 'Editar despesa' : 'Adicionar despesa'}</button>
      {editor && <button type="button" className="secondary" onClick={ () => dispatch(cancelEdit()) }>Cancelar edição</button>}
      {(formError || error) && <p className="form-error" role="alert">{formError || error}</p>}
    </form>
  );
}

export default WalletForm;
/* Fim de WalletForm/index.js */
