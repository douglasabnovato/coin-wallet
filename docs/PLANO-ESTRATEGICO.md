# Plano estratégico — Coin Wallet

> Criado em 30/10/2026. Diagnóstico em `AVALIACAO.md`.

## Objetivo

Chegar ao nível N2 (vitrine): versão atual no ar, testes no CI e documentação fiel.

## Execução

| Etapa | Entrega | Situação |
|---|---|---|
| 1 | Build corrigido, cópias antigas removidas e CI ativo | PR aberto |
| 2 | Avaliação e plano | Este PR |
| 3 | Decidir a hospedagem e publicar a versão 2.0 | Com o responsável |

## O que você pode melhorar

- **Arquitetura:** trocar o Redux manual por Redux Toolkit e migrar do React Router antigo, em etapas.
- **Engenharia:** adicionar ESLint ao CI e proteger a `main`.
- **Produto:** mostrar a data da cotação usada, para a pessoa saber de quando é o valor convertido.
