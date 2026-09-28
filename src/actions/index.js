/* Actions da carteira: login, moedas, despesas (com cotação no momento do cadastro) e edição */
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

const API = 'https://economia.awesomeapi.com.br/json/all';

/* Salva o e-mail de quem entrou */
export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

/* Lista de moedas recebida */
export const getCurrenciesSuccess = (currencies) => ({ type: GET_CURRENCIES_SUCCESS, currencies });

/* Falha de rede ou da API de cotações */
export const requestFailed = (message) => ({ type: REQUEST_FAILED, message });

/* Busca as cotações; lança erro se a resposta não for válida */
async function fetchRates() {
  const response = await fetch(API);
  if (response.ok === false) throw new Error('Serviço de cotações indisponível.');
  const data = await response.json();
  if (!data || typeof data !== 'object') throw new Error('Resposta inválida do serviço de cotações.');
  return data;
}

/* Carrega as moedas disponíveis (sem USDT, conforme requisito) */
export const fetchCurrencies = () => async (dispatch) => {
  try {
    const data = await fetchRates();
    dispatch(getCurrenciesSuccess(Object.keys(data).filter((c) => c !== 'USDT')));
  } catch {
    dispatch(requestFailed('Não foi possível carregar as moedas. Verifique sua conexão.'));
  }
};

/* Despesa com as cotações do momento */
export const addExpense = (expense, exchangeRates) => ({ type: ADD_EXPENSE, payload: { ...expense, exchangeRates } });

/* Busca a cotação do momento e adiciona a despesa; devolve true se deu certo */
export const fetchNewExpense = (expenseData) => async (dispatch) => {
  try {
    dispatch(addExpense(expenseData, await fetchRates()));
    return true;
  } catch {
    dispatch(requestFailed('Não foi possível obter a cotação. A despesa não foi salva; tente novamente.'));
    return false;
  }
};

/* Remove a despesa pelo id */
export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, id });

/* Entra no modo de edição da despesa */
export const editExpense = (id) => ({ type: EDIT_EXPENSE, id });

/* Sai do modo de edição sem salvar */
export const cancelEdit = () => ({ type: CANCEL_EDIT });

/* Salva a despesa editada (mantém id e cotações originais) */
export const saveEditedExpense = (expenseData) => ({ type: SAVE_EDITED_EXPENSE, payload: expenseData });
/* Fim de actions/index.js */
