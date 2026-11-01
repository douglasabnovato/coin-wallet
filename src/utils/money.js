/* Cálculos de valor convertido e total em reais (arredondamento em centavos) */

/* Cotação da moeda da despesa ou 0 quando ausente */
export const rateOf = (expense) => Number(expense.exchangeRates?.[expense.currency]?.ask) || 0;

/* Valor convertido em reais, em centavos inteiros */
export const convertedCents = (expense) => Math.round(Number(expense.value) * rateOf(expense) * 100);

/* Soma das despesas convertidas, com duas casas */
export const totalBRL = (expenses) => (expenses.reduce((acc, e) => acc + convertedCents(e), 0) / 100).toFixed(2);

/* Valor já convertido formatado com duas casas */
export const convertedBRL = (expense) => (convertedCents(expense) / 100).toFixed(2);

/* Data e hora da cotação, como a API informou (AAAA-MM-DD HH:MM:SS), em dd/mm/aaaa hh:mm */
export const rateDate = (expense) => {
  const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2})/.exec(expense.exchangeRates?.[expense.currency]?.create_date || '');
  return match ? `${match[3]}/${match[2]}/${match[1]} ${match[4]}` : 'Não informada';
};
/* Fim de money.js */
