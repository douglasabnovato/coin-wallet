const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // Cases para moedas e despesas serão adicionados nas próximas etapas
  default:
    return state;
  }
};

export default walletReducer;