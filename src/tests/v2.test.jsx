/* Testes da revisão v2: ids após exclusão, falha da API de cotações, persistência e arredondamento */
import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { response as mockData } from './mockData';
import Wallet from '../pages/Wallet';
import walletReducer, { nextId } from '../reducers/wallet';
import { addExpense, deleteExpense } from '../actions';
import { loadState, saveState } from '../store/persist';
import { rateDate, totalBRL } from '../utils/money';
import { renderWithRouterAndStore } from './testConfig';

afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); });

describe('regras da carteira', () => {
  test('id não se repete depois de excluir (antes usava o tamanho da lista)', () => {
    let s = walletReducer(undefined, { type: '@@INIT' });
    s = walletReducer(s, addExpense({ value: '1' }, {}));
    s = walletReducer(s, addExpense({ value: '2' }, {}));
    s = walletReducer(s, deleteExpense(0));
    s = walletReducer(s, addExpense({ value: '3' }, {}));
    expect(s.expenses.map((e) => e.id)).toEqual([1, 2]);
    expect(nextId([])).toBe(0);
  });

  test('total em centavos evita erro de ponto flutuante', () => {
    const rates = { USD: { ask: '0.1' } };
    expect(totalBRL([{ value: '0.1', currency: 'USD', exchangeRates: rates }, { value: '0.2', currency: 'USD', exchangeRates: rates }])).toBe('0.03');
  });

  test('persistência guarda e-mail e despesas e ignora dado corrompido', () => {
    saveState({ user: { email: 'a@b.com' }, wallet: { expenses: [{ id: 0, value: '1' }] } });
    expect(loadState().wallet.expenses).toHaveLength(1);
    localStorage.setItem('coin-wallet.v1', '{quebrado');
    expect(loadState()).toBeUndefined();
  });
});

describe('data da cotação', () => {
  test('mostra a data e a hora vindas da API', () => {
    const expense = { currency: 'USD', exchangeRates: { USD: { create_date: '2026-10-30 19:00:08' } } };
    expect(rateDate(expense)).toBe('30/10/2026 19:00');
  });

  test('sem data válida informa que não há', () => {
    expect(rateDate({ currency: 'USD', exchangeRates: { USD: {} } })).toBe('Não informada');
    expect(rateDate({ currency: 'USD' })).toBe('Não informada');
  });

  test('a tabela exibe a data da cotação da despesa', () => {
    const expenses = [{ id: 0, value: '1', description: 'Café', currency: 'USD', method: 'Dinheiro', tag: 'Lazer', exchangeRates: { USD: { ask: '5', name: 'Dólar/Real', create_date: '2026-10-30 19:00:08' } } }];
    renderWithRouterAndStore(<Wallet />, '/carteira', { wallet: { currencies: [], expenses, editor: false, idToEdit: 0 } });
    expect(screen.getByRole('columnheader', { name: 'Data da cotação' })).toBeTruthy();
    expect(screen.getByRole('cell', { name: '30/10/2026 19:00' })).toBeTruthy();
  });
});

describe('falhas de rede', () => {
  test('sem cotação a despesa não é salva e a mensagem aparece', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ ok: true, json: async () => mockData })
      .mockRejectedValueOnce(new TypeError('offline'));
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');
    await screen.findByRole('option', { name: 'CAD' });
    userEvent.type(screen.getByLabelText(/valor/i), '10');
    fireEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    expect((await screen.findByRole('alert')).textContent).toMatch(/cotação/);
    expect(store.getState().wallet.expenses).toHaveLength(0);
    expect(screen.getByLabelText(/valor/i).value).toBe('10');
  });

  test('valor vazio ou zero não chama a API', async () => {
    const spy = vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => mockData });
    renderWithRouterAndStore(<Wallet />, '/carteira');
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    expect(screen.getByRole('alert').textContent).toBe('Informe um valor maior que zero.');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
/* Fim de v2.test.js */
