/* Exportação das despesas em CSV para planilhas em português (separador ";" e vírgula decimal) */
import { convertedBRL, rateDate, rateOf } from './money';

const HEADER = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Data da cotação', 'Valor convertido (BRL)'];

/* Texto que começa com = + - @ tab ou retorno vira fórmula na planilha: recebe um apóstrofo (OWASP, CSV Injection) */
export const neutralize = (text) => (/^[=+\-@\t\r]/.test(text) ? `'${text}` : text);

/* Célula segura: neutraliza fórmula e põe entre aspas quando há separador, aspas ou quebra de linha */
export const cell = (raw) => {
  const text = neutralize(String(raw ?? ''));
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/* Número com vírgula decimal */
const decimal = (n) => String(n).replace('.', ',');

/* CSV completo, com uma linha por despesa e quebra de linha CRLF */
export const expensesToCSV = (expenses) => {
  const rows = expenses.map((e) => [
    e.description, e.tag, e.method, decimal(e.value), e.currency,
    decimal(rateOf(e).toFixed(2)), rateDate(e), decimal(convertedBRL(e)),
  ]);
  return [HEADER, ...rows].map((r) => r.map(cell).join(';')).join('\r\n');
};

/* Baixa o arquivo no navegador; o BOM faz o Excel ler os acentos em UTF-8 */
export const downloadCSV = (expenses, filename = 'coin-wallet-despesas.csv') => {
  const blob = new Blob([`﻿${expensesToCSV(expenses)}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
/* Fim de csv.js */
