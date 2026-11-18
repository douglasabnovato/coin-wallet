/* Testes do ciclo de 18/11/2026: foco na edição de uma despesa (#39) */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './testConfig';

const rates = { USD: { ask: '5', name: 'Dólar/Real' }, EUR: { ask: '6', name: 'Euro/Real' } };
const expenses = [
  { id: 0, value: '1', description: 'Café', currency: 'USD', method: 'Dinheiro', tag: 'Lazer', exchangeRates: rates },
  { id: 1, value: '10', description: 'Hotel', currency: 'EUR', method: 'Cartão de crédito', tag: 'Trabalho', exchangeRates: rates },
];
const state = { user: { email: 'teste@exemplo.com' }, wallet: { currencies: [], expenses, editor: false, idToEdit: 0 } };

describe('foco na edição de uma despesa', () => {
  test('"Editar" leva o foco ao Valor, e salvar devolve o foco ao "Editar" da linha', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', state);
    fireEvent.click(screen.getByRole('button', { name: 'Editar despesa Hotel' }));
    const valor = screen.getByLabelText('Valor:');
    expect(valor).toHaveFocus();
    expect(valor).toHaveValue(10);
    fireEvent.change(valor, { target: { value: '20' } });
    fireEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));
    expect(screen.getByTestId('total-field').textContent).toBe('125.00');
    expect(screen.getByRole('button', { name: 'Editar despesa Hotel' })).toHaveFocus();
  });

  test('"Cancelar edição" limpa o formulário, não muda a despesa e devolve o foco ao "Editar" da linha', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', state);
    fireEvent.click(screen.getByRole('button', { name: 'Editar despesa Hotel' }));
    expect(screen.getByLabelText('Tag:')).toHaveValue('Trabalho');
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar edição' }));
    fireEvent.click(screen.getByRole('button', { name: 'Editar despesa Café' }));
    fireEvent.change(screen.getByLabelText('Valor:'), { target: { value: '99' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar edição' }));
    expect(store.getState().wallet.expenses).toStrictEqual(expenses);
    expect(screen.getByLabelText('Valor:')).toHaveValue(null);
    expect(screen.getByLabelText('Descrição:')).toHaveValue('');
    expect(screen.getByLabelText('Método de pagamento:')).toHaveValue('Dinheiro');
    expect(screen.getByLabelText('Tag:')).toHaveValue('Alimentação');
    expect(screen.getByRole('button', { name: 'Editar despesa Café' })).toHaveFocus();
  });
});
/* Fim de edicao.test.jsx */
