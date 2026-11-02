# MVP — Coin Wallet

> Criado em 31/10/2026, com os critérios usados no `movies`. Situação baseada em `AVALIACAO.md` e na conferência deste ciclo.

## Problema e hipótese

**Problema e público:** Quem gasta em outras moedas registra despesas e vê o total em reais, com a cotação do momento.

**Hipótese:** Pelo menos 50% de quem entra registra uma despesa. Proposta inicial, para o responsável confirmar ou trocar. Sem medição, a meta ainda não pode ser conferida.

## 1. Critérios

| # | Critério | Como verificar | Situação em 31/10/2026 |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Parcial: meta proposta |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: fluxo testado com API simulada; a tela de login abre em produção, despesa não testada lá |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: tudo fica no navegador |
| 5 | Medição de uso | A métrica principal é coletada | Não atende: nada coleta uso |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: falha de cotação e valor inválido têm mensagem; recarregar em `/carteira` corrigido em PR |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Parcial: 1,55 s na única execução válida do Lighthouse no site publicado; as outras 2 falharam ao pintar |
| 8 | Acessibilidade básica | Lighthouse e teclado | Parcial: login com Lighthouse 100, axe sem violações e foco visível em todos os elementos alcançados por Tab (2 elementos); carteira não testada por teclado |
| 9 | Segurança e conformidade | Riscos decididos; termos de terceiros cumpridos | Atende: não há senha real nem servidor; a AwesomeAPI responde com CORS liberado |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: a Netlify publica a `main` sem esperar o CI; `main` sem proteção |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 33 testes no CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende com este documento e o PR do README |

**Resultado:** 6 de 12 critérios atendidos por inteiro. É um julgamento técnico.

## 2. Tarefas

| # | Tarefa | Situação |
|---|---|---|
| 1 | Tratar deep link e recarga na Netlify | Feito |
| 2 | Corrigir a hospedagem no README | Feito |
| 3 | Mostrar a data da cotação usada | Feito |

## 3. Fora do MVP

Contas reais, sincronização entre aparelhos e migração para Redux Toolkit. A lista é uma proposta e pode mudar com a decisão do responsável.

## Medições de 02/11/2026

LCP de 1,55 s, desempenho 99, acessibilidade 100 (1 execução válida de 3). Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real.
