/* Reducer da carteira: moedas, despesas, modo de edição e último erro */
import {
  GET_CURRENCIES_SUCCESS, REQUEST_FAILED, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, CANCEL_EDIT, SAVE_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

/* Próximo id: maior id + 1 (antes usava o tamanho da lista e repetia id depois de excluir) */
export const nextId = (expenses) => expenses.reduce((max, e) => Math.max(max, e.id + 1), 0);

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS:
    return { ...state, currencies: action.currencies, error: undefined };
  case REQUEST_FAILED:
    return { ...state, error: action.message };
  case ADD_EXPENSE:
    return { ...state, error: undefined, expenses: [...state.expenses, { id: nextId(state.expenses), ...action.payload }] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.id),
      editor: state.editor && state.idToEdit !== action.id,
    };
  case EDIT_EXPENSE:
    return { ...state, editor: true, idToEdit: action.id };
  case CANCEL_EDIT:
    return { ...state, editor: false };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((e) => (e.id === state.idToEdit ? { ...e, ...action.payload } : e)),
    };
  default:
    return state;
  }
};

export default wallet;
/* Fim de reducers/wallet.js */
