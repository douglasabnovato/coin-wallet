/* Testes do ciclo de 16/11/2026: desfazer a exclusão de uma despesa (#27) */
import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { UNDO_MS } from '../components/Table';
import wallet from '../reducers/wallet';
import { restoreExpense } from '../actions';
import { renderWithRouterAndStore } from './testConfig';

const rates = { USD: { ask: '5', name: 'Dólar/Real' }, EUR: { ask: '6', name: 'Euro/Real' } };
const expenses = [
  { id: 0, value: '1', description: 'Café', currency: 'USD', method: 'Dinheiro', tag: 'Lazer', exchangeRates: rates },
  { id: 1, value: '10', description: 'Hotel', currency: 'EUR', method: 'Cartão de crédito', tag: 'Trabalho', exchangeRates: rates },
  { id: 2, value: '3', description: 'Cinema', currency: 'USD', method: 'Dinheiro', tag: 'Lazer', exchangeRates: rates },
];
const state = (list) => ({ user: { email: 'teste@exemplo.com' }, wallet: { currencies: [], expenses: list, editor: false, idToEdit: 0 } });
const aviso = () => screen.getAllByRole('status').find((el) => el.classList.contains('undo-notice'));

afterEach(() => vi.useRealTimers());

describe('desfazer a exclusão', () => {
  test('mostra "Despesa excluída" num status e leva o foco para "Desfazer"', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', state(expenses));
    expect(aviso().textContent).toBe('');
    fireEvent.click(screen.getByRole('button', { name: 'Excluir despesa Hotel' }));
    expect(aviso().textContent).toContain('Despesa excluída: Hotel.');
    expect(screen.getByRole('button', { name: 'Desfazer' })).toHaveFocus();
  });

  test('"Desfazer" devolve a despesa com o mesmo id, na mesma posição, e o total volta', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', state(expenses));
    fireEvent.click(screen.getByRole('button', { name: 'Excluir despesa Hotel' }));
    expect(screen.getByTestId('total-field').textContent).toBe('20.00');
    fireEvent.click(screen.getByRole('button', { name: 'Desfazer' }));
    expect(store.getState().wallet.expenses).toStrictEqual(expenses);
    expect(screen.getByTestId('total-field').textContent).toBe('80.00');
    expect(aviso().textContent).toBe('');
    expect(screen.getByRole('button', { name: 'Excluir despesa Hotel' })).toHaveFocus();
  });

  test('desfazer também funciona quando a lista ficou vazia', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', state([expenses[0]]));
    fireEvent.click(screen.getByRole('button', { name: 'Excluir despesa Café' }));
    expect(screen.getByText(/Nenhuma despesa cadastrada/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Desfazer' }));
    expect(store.getState().wallet.expenses).toStrictEqual([expenses[0]]);
  });

  test('o aviso some sozinho, mas o tempo pausa enquanto o foco está nele', () => {
    vi.useFakeTimers();
    renderWithRouterAndStore(<Wallet />, '/carteira', state(expenses));
    fireEvent.click(screen.getByRole('button', { name: 'Excluir despesa Hotel' }));
    // O foco está em "Desfazer": o tempo não corre.
    act(() => { vi.advanceTimersByTime(UNDO_MS * 2); });
    expect(screen.getByRole('button', { name: 'Desfazer' })).toBeInTheDocument();
    // O foco sai do aviso: o tempo volta a correr do zero.
    act(() => { screen.getByRole('button', { name: 'Desfazer' }).blur(); });
    act(() => { vi.advanceTimersByTime(UNDO_MS - 1); });
    expect(screen.getByRole('button', { name: 'Desfazer' })).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.queryByRole('button', { name: 'Desfazer' })).toBeNull();
    expect(screen.queryByRole('cell', { name: 'Hotel' })).toBeNull();
  });

  test('a action não duplica uma despesa que já voltou', () => {
    const atual = { ...state(expenses).wallet };
    expect(wallet(atual, restoreExpense(expenses[1]))).toBe(atual);
    const semHotel = { ...atual, expenses: [expenses[0], expenses[2]] };
    expect(wallet(semHotel, restoreExpense(expenses[1])).expenses.map((e) => e.id)).toEqual([0, 1, 2]);
  });
});
/* Fim de desfazer.test.jsx */
