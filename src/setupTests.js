/* Configuração dos testes: matchers do jest-dom e alias "jest" para os testes originais do avaliador */
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

globalThis.jest = vi;
/* Fim de setupTests.js */
