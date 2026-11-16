/* Acessibilidade no navegador, sobre o build de produção: axe (WCAG A e AA) e uso só pelo teclado (#29).
   O app não tem tema escuro próprio (não há prefers-color-scheme no CSS); por isso não há teste no escuro. */
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const cotacoes = {
  USD: { code: 'USD', codein: 'BRL', name: 'Dólar Americano/Real Brasileiro', ask: '5.00', bid: '5.00', create_date: '2026-11-16 10:00:00' },
  EUR: { code: 'EUR', codein: 'BRL', name: 'Euro/Real Brasileiro', ask: '6.00', bid: '6.00', create_date: '2026-11-16 10:00:00' },
  GBP: { code: 'GBP', codein: 'BRL', name: 'Libra Esterlina/Real Brasileiro', ask: '7.00', bid: '7.00', create_date: '2026-11-16 10:00:00' },
};

/* Três despesas fictícias, com descrições longas, para a tabela ficar larga como no uso real */
const despesas = [
  { id: 0, value: '12.5', description: 'Almoço no aeroporto de Lisboa', currency: 'EUR', method: 'Cartão de crédito', tag: 'Alimentação', exchangeRates: cotacoes },
  { id: 1, value: '80', description: 'Hotel perto da estação central', currency: 'GBP', method: 'Cartão de débito', tag: 'Trabalho', exchangeRates: cotacoes },
  { id: 2, value: '9.99', description: 'Assinatura de streaming', currency: 'USD', method: 'Dinheiro', tag: 'Lazer', exchangeRates: cotacoes },
];

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.beforeEach(async ({ page }) => {
  await page.route('https://economia.awesomeapi.com.br/**', (r) => r.fulfill({ json: cotacoes }));
});

/* Abre a carteira já com despesas salvas no navegador (mesma chave que o app usa) */
async function carteiraComDespesas(page) {
  await page.addInitScript((lista) => {
    localStorage.setItem('coin-wallet.v1', JSON.stringify({ email: 'pessoa@empresa.test', expenses: lista }));
  }, despesas);
  await page.goto('./carteira');
  await expect(page.getByRole('cell', { name: 'Assinatura de streaming', exact: true })).toBeVisible();
  await expect(page.getByRole('option', { name: 'GBP' })).toBeAttached();
}

/* Violações e também contraste "incompleto": sobre gradiente o axe não mede e não acusa,
   e foi assim que botões com 3:1 passaram até 16/11/2026 */
async function semViolacoes(page) {
  // O cartão do login entra com fadeIn: no meio da animação o axe lê a cor com opacidade parcial.
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'));
  const { violations, incomplete } = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  const lista = (vs) => vs.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`);
  expect(lista(violations)).toEqual([]);
  expect(lista(incomplete.filter((v) => v.id === 'color-contrast'))).toEqual([]);
}

test('axe sem violações no login e na carteira vazia, em largura de desktop', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  await semViolacoes(page);
  await page.goto('./carteira');
  await expect(page.getByText(/Nenhuma despesa cadastrada/)).toBeVisible();
  await semViolacoes(page);
});

test('axe sem violações na carteira com despesas e com o aviso de desfazer', async ({ page }) => {
  await carteiraComDespesas(page);
  await semViolacoes(page);
  await page.getByRole('button', { name: 'Excluir despesa Hotel perto da estação central' }).click();
  await expect(page.getByRole('button', { name: 'Desfazer' })).toBeVisible();
  await semViolacoes(page);
  // O contraste do hover só aparece com o mouse em cima.
  await page.getByRole('button', { name: 'Adicionar despesa' }).hover();
  await semViolacoes(page);
});

test('no celular (375 px), axe sem violações e sem rolagem horizontal da página', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await carteiraComDespesas(page);
  await semViolacoes(page);
  const rolagem = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(rolagem).toBeLessThanOrEqual(0);
});

/* Nome acessível e indicador de foco do elemento focado */
function focado(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    const nome = el.getAttribute('aria-label') || el.labels?.[0]?.textContent || el.textContent;
    const css = getComputedStyle(el);
    return {
      nome: (nome || '').trim(),
      contorno: `${css.outlineStyle} ${css.outlineWidth} ${css.outlineColor}`,
      sombra: css.boxShadow,
    };
  });
}

/* O app define dois indicadores: contorno azul de 3 px (src/index.css) e anel verde nos campos.
   Conferir os valores do app, não só "diferente de none" (o contorno padrão do Chromium passaria). */
function focoVisivel({ contorno, sombra }) {
  return /^solid 3px rgb\((29, 78, 216|147, 197, 253)\)$/.test(contorno) || sombra.includes('rgba(4, 120, 87, 0.55)');
}

/* Aperta Tab até chegar ao elemento com o nome pedido, conferindo o foco de cada parada */
async function tabAte(page, nome, limite = 20) {
  for (let i = 0; i < limite; i += 1) {
    await page.keyboard.press('Tab');
    const atual = await focado(page);
    expect(focoVisivel(atual), `foco visível em "${atual.nome}" (${atual.contorno}; ${atual.sombra})`).toBe(true);
    if (atual.nome === nome) return;
  }
  throw new Error(`"${nome}" não foi alcançado com Tab`);
}

test('só pelo teclado: entra, registra, exclui e desfaz, com foco visível em cada parada', async ({ page }) => {
  await page.goto('./');
  await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
  await tabAte(page, 'E-mail');
  await page.keyboard.type('pessoa@empresa.test');
  await tabAte(page, 'Senha');
  await page.keyboard.type('123456');
  await tabAte(page, 'Entrar');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/carteira$/);
  await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
  await expect(page.getByRole('option', { name: 'EUR' })).toBeAttached();

  await tabAte(page, 'Valor:');
  await page.keyboard.type('10');
  await tabAte(page, 'Descrição:');
  await page.keyboard.type('Táxi');
  await tabAte(page, 'Adicionar despesa');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('cell', { name: 'Táxi', exact: true })).toBeVisible();
  await expect(page.getByTestId('total-field')).toHaveText('50.00');

  await tabAte(page, 'Excluir despesa Táxi');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('total-field')).toHaveText('0.00');
  await expect(page.getByRole('status').filter({ hasText: 'Despesa excluída: Táxi.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Desfazer' })).toBeFocused();
  expect(focoVisivel(await focado(page))).toBe(true);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('cell', { name: 'Táxi', exact: true })).toBeVisible();
  await expect(page.getByTestId('total-field')).toHaveText('50.00');
  await expect(page.getByRole('button', { name: 'Excluir despesa Táxi' })).toBeFocused();
});
/* Fim de acessibilidade.pw.js */
