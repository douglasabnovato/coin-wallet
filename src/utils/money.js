/* Cálculos de valor convertido e total em reais (arredondamento em centavos) */

/* Cotação da moeda da despesa ou 0 quando ausente */
export const rateOf = (expense) => Number(expense.exchangeRates?.[expense.currency]?.ask) || 0;

/* Valor convertido em reais, em centavos inteiros */
export const convertedCents = (expense) => Math.round(Number(expense.value) * rateOf(expense) * 100);

/* Soma das despesas convertidas, com duas casas */
export const totalBRL = (expenses) => (expenses.reduce((acc, e) => acc + convertedCents(e), 0) / 100).toFixed(2);

/* Valor já convertido formatado com duas casas */
export const convertedBRL = (expense) => (convertedCents(expense) / 100).toFixed(2);
/* Fim de money.js */
