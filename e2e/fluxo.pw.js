/* Fluxo principal no navegador, sobre o build de produção: entrar, registrar uma despesa e ver o total em reais */
import { expect, test } from '@playwright/test';

/* Cotação simulada: o teste não depende da AwesomeAPI */
const cotacoes = {
  USD: { code: 'USD', codein: 'BRL', name: 'Dólar Americano/Real Brasileiro', ask: '5.00', bid: '5.00' },
  EUR: { code: 'EUR', codein: 'BRL', name: 'Euro/Real Brasileiro', ask: '6.00', bid: '6.00' },
};

test.beforeEach(async ({ page }) => {
  await page.route('https://economia.awesomeapi.com.br/**', (r) => r.fulfill({ json: cotacoes }));
});

async function entrar(page) {
  await page.goto('./');
  await page.getByLabel('E-mail').fill('pessoa@example.com');
  await page.getByLabel('Senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/\/carteira$/);
}

test('entra, registra uma despesa em dólar e vê o total em reais', async ({ page }) => {
  await entrar(page);
  await page.getByLabel('Valor:').fill('10');
  await page.getByLabel('Descrição:').fill('Café');
  await page.getByRole('button', { name: 'Adicionar despesa' }).click();
  const tabela = page.getByRole('table', { name: 'Despesas cadastradas' });
  await expect(tabela.getByRole('cell', { name: 'Café', exact: true })).toBeVisible();
  await expect(page.getByTestId('total-field')).toHaveText('50.00');
});

test('com a cotação fora do ar, avisa e não salva a despesa', async ({ page }) => {
  await entrar(page);
  await page.unroute('https://economia.awesomeapi.com.br/**');
  await page.route('https://economia.awesomeapi.com.br/**', (r) => r.fulfill({ status: 503, body: '' }));
  await page.getByLabel('Valor:').fill('10');
  await page.getByRole('button', { name: 'Adicionar despesa' }).click();
  await expect(page.getByText(/Não foi possível obter a cotação/)).toBeVisible();
  await expect(page.getByTestId('total-field')).toHaveText('0.00');
});

test('o GoatCounter não carrega nos testes nem em localhost', async ({ page }) => {
  const pedidos = [];
  page.on('request', (r) => pedidos.push(r.url()));
  await entrar(page);
  await expect(page.locator('script[data-goatcounter]')).toHaveCount(0);
  expect(pedidos.filter((u) => /goatcounter|gc\.zgo\.at/.test(u))).toEqual([]);
});

test('no site publicado, registrar uma despesa conta o evento sem dado pessoal', async ({ page }) => {
  // Simula o navegador de um visitante: sem a marca de automação e fora de localhost.
  await page.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await page.route('https://coin-wallet-app.netlify.app/**', async (r) => {
    const caminho = new URL(r.request().url()).pathname;
    await r.fulfill({ response: await page.request.get(caminho) });
  });
  await page.route('https://gc.zgo.at/**', (r) => r.fulfill({
    contentType: 'text/javascript',
    body: 'window.contagens = []; window.goatcounter = { count: (v) => window.contagens.push(v) };',
  }));
  await page.goto('https://coin-wallet-app.netlify.app/');
  await expect(page.locator('script[data-goatcounter]')).toHaveAttribute('data-goatcounter', 'https://douglasabnovato.goatcounter.com/count');
  await page.getByLabel('E-mail').fill('pessoa@example.com');
  await page.getByLabel('Senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByLabel('Valor:').fill('10');
  await page.getByLabel('Descrição:').fill('Café');
  await page.getByRole('button', { name: 'Adicionar despesa' }).click();
  await expect(page.getByRole('cell', { name: 'Café', exact: true })).toBeVisible();
  const contagens = await page.evaluate(() => window.contagens);
  expect(contagens).toContainEqual({ path: 'despesa-registrada', title: 'despesa-registrada', event: true });
  expect(contagens).toContainEqual({ path: '/carteira' });
  expect(JSON.stringify(contagens)).not.toMatch(/example\.com|Café|10/);
});
