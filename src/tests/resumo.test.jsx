/* Testes do ciclo de 03/11/2026: resumo por categoria e exportação em CSV */
import React from 'react';
import { screen, fireEvent, within, waitFor } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { totalsByTag } from '../utils/summary';
import { cell, expensesToCSV, neutralize } from '../utils/csv';
import { renderWithRouterAndStore } from './testConfig';

const rates = { USD: { ask: '5', name: 'Dólar/Real', create_date: '2026-10-30 19:00:08' }, EUR: { ask: '6', name: 'Euro/Real' } };
const expenses = [
  { id: 0, value: '1', description: 'Café', currency: 'USD', method: 'Dinheiro', tag: 'Lazer', exchangeRates: rates },
  { id: 1, value: '10', description: 'Hotel', currency: 'EUR', method: 'Cartão de crédito', tag: 'Trabalho', exchangeRates: rates },
  { id: 2, value: '3', description: 'Cinema', currency: 'USD', method: 'Dinheiro', tag: 'Lazer', exchangeRates: rates },
];
const state = (list) => ({ user: { email: 'teste@exemplo.com' }, wallet: { currencies: [], expenses: list, editor: false, idToEdit: 0 } });

afterEach(() => vi.restoreAllMocks());

describe('resumo por categoria', () => {
  test('soma por tag em reais, da maior para a menor, com percentual', () => {
    expect(totalsByTag(expenses).map(({ tag, total, percent }) => [tag, total, percent])).toEqual([
      ['Trabalho', '60.00', 75],
      ['Lazer', '20.00', 25],
    ]);
  });

  test('a ordem das despesas não muda o resultado', () => {
    expect(totalsByTag([...expenses].reverse())).toEqual(totalsByTag(expenses));
  });

  test('sem despesas não há resumo nem divisão por zero', () => {
    expect(totalsByTag([])).toEqual([]);
    expect(totalsByTag([{ value: '1', tag: 'Saúde', currency: 'USD' }])).toEqual([{ tag: 'Saúde', total: '0.00', percent: 0, cents: 0 }]);
    renderWithRouterAndStore(<Wallet />, '/carteira', state([]));
    expect(screen.queryByRole('heading', { name: 'Gastos por categoria' })).toBeNull();
  });

  test('a carteira mostra cada categoria com valor e percentual', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', state(expenses));
    const region = screen.getByRole('region', { name: 'Gastos por categoria' });
    const items = within(region).getAllByTestId('summary-item');
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain('Trabalho');
    expect(items[0].textContent).toContain('R$ 60.00 (75%)');
  });

  test('excluir uma despesa atualiza o resumo', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', state(expenses));
    fireEvent.click(screen.getByRole('button', { name: 'Excluir despesa Hotel' }));
    const items = screen.getAllByTestId('summary-item');
    expect(items).toHaveLength(1);
    expect(items[0].textContent).toContain('R$ 20.00 (100%)');
  });
});

describe('carregamento das moedas', () => {
  test('mostra "Carregando moedas…" até a API responder e some depois', async () => {
    let answer;
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise((ok) => { answer = ok; }));
    renderWithRouterAndStore(<Wallet />, '/carteira', state([]));
    expect(screen.getByRole('status').textContent).toBe('Carregando moedas…');
    answer({ ok: true, json: async () => rates });
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());
    expect(screen.getAllByRole('option', { name: 'EUR' })).toHaveLength(1);
  });
});

describe('exportação em CSV', () => {
  test('cabeçalho e linhas com ";" e vírgula decimal', () => {
    const lines = expensesToCSV(expenses).split('\r\n');
    expect(lines).toHaveLength(4);
    expect(lines[0]).toBe('Descrição;Tag;Método de pagamento;Valor;Moeda;Câmbio utilizado;Data da cotação;Valor convertido (BRL)');
    expect(lines[1]).toBe('Café;Lazer;Dinheiro;1;USD;5,00;30/10/2026 19:00;5,00');
    expect(lines[2]).toBe('Hotel;Trabalho;Cartão de crédito;10;EUR;6,00;Não informada;60,00');
  });

  test('descrição que parece fórmula vira texto (CSV Injection)', () => {
    ['=1+1', '+SOMA(A1)', '-2', '@x', '\tA'].forEach((t) => expect(neutralize(t)).toBe(`'${t}`));
    expect(neutralize('Almoço')).toBe('Almoço');
    expect(cell('=HYPERLINK("x")')).toBe('"\'=HYPERLINK(""x"")"');
    expect(cell('a;b')).toBe('"a;b"');
    expect(cell(undefined)).toBe('');
  });

  test('o botão Exportar CSV baixa o arquivo com BOM', async () => {
    const created = [];
    URL.createObjectURL = vi.fn((blob) => { created.push(blob); return 'blob:teste'; });
    URL.revokeObjectURL = vi.fn();
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    renderWithRouterAndStore(<Wallet />, '/carteira', state(expenses));
    fireEvent.click(screen.getByRole('button', { name: 'Exportar CSV' }));
    expect(click).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:teste');
    const read = (as) => new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r[as](created[0]); });
    expect([...new Uint8Array(await read('readAsArrayBuffer')).slice(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);
    const text = await read('readAsText');
    expect(text).toContain('Cinema;Lazer;Dinheiro;3;USD;5,00;30/10/2026 19:00;15,00');
  });
});
/* Fim de resumo.test.jsx */
