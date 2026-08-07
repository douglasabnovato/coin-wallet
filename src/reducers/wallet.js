import { GET_CURRENCIES_SUCCESS, ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
    currencies: [],
    expenses: [],
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
                        id: state.expenses.length, // Cuidado: ajustaremos isso para evitar conflitos de ID ao excluir
                        ...action.payload,
                    },
                ],
            };
        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.id !== action.id),
            };
        default:
            return state;
    }
};

export default wallet;