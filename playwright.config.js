/* Testes no navegador sobre o build de produção (npm run build antes). A porta muda com PW_PORT. */
import { defineConfig, devices } from '@playwright/test';

const porta = Number(process.env.PW_PORT || 4181);

export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.pw.js',
  forbidOnly: !!process.env.CI,
  use: { baseURL: `http://127.0.0.1:${porta}`, ...devices['Desktop Chrome'] },
  webServer: {
    command: `npx vite preview --port ${porta} --host 127.0.0.1 --strictPort`,
    url: `http://127.0.0.1:${porta}`,
    reuseExistingServer: false,
  },
});
/* Fim de playwright.config.js */
