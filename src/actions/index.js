export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

// Action de login existente
export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

// Action síncrona para salvar as moedas no estado
export const getCurrenciesSuccess = (currencies) => ({
  type: GET_CURRENCIES_SUCCESS,
  currencies,
});

// Action Thunk assíncrona para buscar as moedas da API
export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    
    // Remove a chave 'USDT' conforme exigido pelos requisitos do projeto
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    
    dispatch(getCurrenciesSuccess(currencies));
  } catch (error) {
    console.error('Erro ao buscar moedas:', error);
  }
};


// Action síncrona para salvar a despesa no estado
export const addExpense = (expense, exchangeRates) => ({
  type: ADD_EXPENSE,
  payload: {
    ...expense,
    exchangeRates,
  },
});

// Action Thunk para buscar a cotação no momento do clique e adicionar a despesa
export const fetchNewExpense = (expenseData) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    
    dispatch(addExpense(expenseData, exchangeRates));
  } catch (error) {
    console.error('Erro ao buscar cotações para a despesa:', error);
  }
};

// Action síncrona para deletar a despesa pelo ID
export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});