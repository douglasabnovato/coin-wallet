import { 
  GET_CURRENCIES_SUCCESS, 
  ADD_EXPENSE, 
  DELETE_EXPENSE, 
  EDIT_EXPENSE, 
  SAVE_EDITED_EXPENSE 
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: Date.now(),
          ...action.payload,
        },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          // Mantém o ID e as cotações originais, mas atualiza os dados do formulário
          return {
            ...expense,
            ...action.payload,
          };
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;