# MVP — Coin Wallet

> Criado em 31/10/2026, com os critérios usados no `movies`. Situação baseada em `AVALIACAO.md` e na conferência deste ciclo. Critério 10 revisto em 10/11/2026.

**Resumo:** 8 de 12 aplicáveis atendidos

**Finalizado:** sim

## Problema e hipótese

**Problema e público:** Quem gasta em outras moedas registra despesas e vê o total em reais, com a cotação do momento.

**Hipótese:** Pelo menos 50% de quem entra registra uma despesa. Proposta inicial, para o responsável confirmar ou trocar. Sem medição, a meta ainda não pode ser conferida.

## 1. Critérios

**Nível:** Vitrine (N2). Os 12 critérios se aplicam.

| # | Critério | Como verificar | Situação em 05/11/2026 | Evidência |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Frase acima |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Parcial: meta proposta pelo agente | Responsável confirma (#23) |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: o agente fez login, despesa, resumo e exclusão por teclado no build igual ao publicado, com a API real (03/11); falta uma pessoa de fora | #25 (responsável) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: tudo fica no navegador | Seção 3 |
| 5 | Medição de uso | A métrica principal é coletada | Não atende: nada coleta uso | #24 (responsável) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: falha de cotação, valor inválido, lista vazia e "Carregando moedas…" têm mensagem | `src/tests/v2.test.jsx`, `src/tests/resumo.test.jsx` |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: `/carteira` com 3 execuções válidas (1,50 s, 2,08 s e 2,42 s; mediana 2,08 s); login 1,30 s e 1,37 s | Lighthouse 12.8.2 móvel simulado, 03/11, site publicado |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100 no login e na carteira; carteira percorrida por Tab com foco visível em todos os 10 elementos | Medição de 03/11, abaixo |
| 9 | Segurança e conformidade | Riscos decididos; termos de terceiros cumpridos | Atende: sem senha real nem servidor; AwesomeAPI com CORS liberado; CSV neutraliza fórmulas (OWASP) | `src/utils/csv.js` |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: a `main` está protegida (exige PR, bloqueia force push e exclusão) e o workflow `CI` roda em PR e push para `main` e `developer/**`; falta a Netlify publicar só depois do CI verde | `gh api repos/douglasabnovato/coin-wallet/rulesets` em 10/11/2026: ruleset `principal-protegida` ativo; #22 (responsável, parte da Netlify) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 45 testes no CI (28 da Trybe e 17 próprios) | Workflow CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README, este documento e `PLANO-DE-ACAO.md` conferidos em 05/11 | Este PR |

**Resultado:** 8 de 12 critérios atendidos por inteiro (antes 6). Os 4 restantes (2, 3, 5 e 10) dependem do responsável e têm issue aberta com `depende-do-responsavel`. É um julgamento técnico.

**Finalizado: sim** (decisão 4 do processo de 03/11/2026).

**Endereço oficial:** https://coin-wallet-app.netlify.app/. Conferido em 03/11: responde 200 em `/` e `/carteira` e serve os mesmos arquivos do build da `main`. O GitHub Pages responde 404 e não está ligado. Confirmar e limpar o caminho do Pages: #26.

## 2. Tarefas

| # | Tarefa | Situação |
|---|---|---|
| 1 | Tratar deep link e recarga na Netlify | Feito |
| 2 | Corrigir a hospedagem no README | Feito |
| 3 | Mostrar a data da cotação usada | Feito |
| 4 | Resumo por categoria e exportação em CSV | Feito (#21) |
| 5 | Aviso de carregamento das moedas | Feito |

## 3. Fora do MVP

Contas reais, sincronização entre aparelhos e migração para Redux Toolkit. A lista é uma proposta e pode mudar com a decisão do responsável.

## Medições de 02/11/2026

LCP de 1,55 s, desempenho 99, acessibilidade 100 (1 execução válida de 3). Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real.

## Medições de 03/11/2026

Lighthouse 12.8.2 local, perfil móvel simulado, no site publicado. A primeira execução de cada página falhou com `NO_FCP` (Chrome sem página pintada); as outras contam.

| Página | LCP | Desempenho | Acessibilidade |
|---|---|---|---|
| `/` | 1,30 s · 1,37 s | 100 · 96 | 100 · 100 |
| `/carteira` | 1,50 s · 2,08 s · 2,42 s | 99 · 99 · 94 | 100 · 100 · 100 |

Teclado na carteira (build local idêntico ao publicado, API real): Sair, Valor, Descrição, Moeda, Método, Tag, Adicionar despesa, Exportar CSV, Editar e Excluir. Todos com contorno ou anel de foco visível. A despesa entrou com a cotação do dia, e o resumo mostrou 100% na tag.
