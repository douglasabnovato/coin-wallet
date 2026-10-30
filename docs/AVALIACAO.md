# Avaliação — Coin Wallet

> Data: 30/10/2026 · Base: `main` em `c14b2b5`.

## Evidências

| Item | Resultado |
|---|---|
| `npm test` e `npm run build` na `main` | **Falham**: cópias `.js` de 07/08 têm prioridade sobre os `.jsx` novos, e o Vite 8 recusa JSX em `.js` |
| Depois da correção | 33 testes e build passam |
| `npm audit --omit=dev` | Nenhuma vulnerabilidade |
| CI | Não rodava: o arquivo estava em `ci/` |
| Site na Netlify | Responde 200, ainda com o build antigo em Create React App |
| GitHub Pages | Desligado, embora o build use a base `/coin-wallet/` |

**Não testado:** a versão 2.0 em ambiente publicado.

## Achados

| # | Severidade | Achado | Encaminhamento |
|---|---|---|---|
| A1 | Alta | A `main` não compila | PR de correção |
| A2 | Alta | A versão 2.0 nunca foi publicada | Issue de hospedagem |
| A3 | Média | CI inativo | PR de correção |
| A4 | Baixa | `test-results-2.log` versionado, com caminhos locais | Removido no PR de correção |

## Nota

Nota anterior do portfólio: 6,3, sem compilar. **Nota atual: 6,5 com a correção.** É um julgamento técnico.
