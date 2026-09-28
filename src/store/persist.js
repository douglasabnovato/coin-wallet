/* Persistência no navegador: guarda e-mail e despesas (não guarda cotações de moedas da lista nem estado de edição) */
const KEY = 'coin-wallet.v1';

/* Estado salvo ou undefined (storage indisponível ou dado corrompido) */
export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!saved || !Array.isArray(saved.expenses)) return undefined;
    return {
      user: { email: String(saved.email || '') },
      wallet: { currencies: [], expenses: saved.expenses, editor: false, idToEdit: 0 },
    };
  } catch {
    return undefined;
  }
}

/* Salva o essencial do estado */
export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ email: state.user.email, expenses: state.wallet.expenses }));
  } catch {
    /* modo privado ou cota cheia: segue sem persistir */
  }
}
/* Fim de persist.js */
