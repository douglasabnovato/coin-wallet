/* Resumo por categoria (tag): total em reais e parte de cada uma no total, em centavos */
import { convertedCents } from './money';

/* Lista as tags com despesa, da maior para a menor; percentuais inteiros */
export const totalsByTag = (expenses) => {
  const cents = {};
  expenses.forEach((e) => { cents[e.tag] = (cents[e.tag] || 0) + convertedCents(e); });
  const all = Object.values(cents).reduce((a, b) => a + b, 0);
  return Object.entries(cents)
    .map(([tag, c]) => ({ tag, total: (c / 100).toFixed(2), percent: all ? Math.round((c * 100) / all) : 0, cents: c }))
    .sort((a, b) => b.cents - a.cents || a.tag.localeCompare(b.tag));
};
/* Fim de summary.js */
