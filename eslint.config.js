/* ESLint 9 (configuração plana) com regras de React e de hooks; substitui o trybe-frontend, que saiu na migração para o Vite (#30) */
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['build/', 'coverage/', 'playwright-report/', 'test-results/', '.trybe/'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  /* Testes do Vitest (globals: true; "jest" é o alias de vi em setupTests.js) e configurações que rodam no Node */
  {
    files: ['src/tests/**', 'src/setupTests.js'],
    languageOptions: { globals: { ...globals.node, ...globals.vitest, jest: 'readonly' } },
  },
  {
    files: ['*.config.js', 'e2e/**'],
    languageOptions: { globals: { ...globals.node } },
  },
];
/* Fim de eslint.config.js */
