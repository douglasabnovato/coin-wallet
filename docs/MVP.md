# MVP — Coin Wallet

> Criado em 31/10/2026, com os critérios usados no `movies`. Revisto em 10/11/2026 (ciclo da faixa de 90%, decisões D1 a D7 do repositório `engenharia`).

**Resumo:** 11 de 12 aplicáveis atendidos

**Finalizado:** sim — falta só a conta do GoatCounter, do responsável (#24, com `depende-do-responsavel`).

## Problema e hipótese

**Problema e público:** Quem gasta em outras moedas registra despesas e vê o total em reais, com a cotação do momento.

**Hipótese:** Pelo menos 50% de quem entra registra uma despesa. Meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável (#23). O evento que conta é `despesa-registrada`.

## 1. Critérios

**Nível:** Vitrine (N2). Os 12 critérios se aplicam.

| # | Critério | Como verificar | Situação em 10/11/2026 | Evidência |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Frase acima |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável | Hipótese acima; #23 |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende (decisão D2): Playwright no build de produção entra, registra uma despesa em dólar e confere o total em reais; com a cotação fora do ar, avisa e não salva. No ar: o site responde 200 em `/` e `/carteira` e a AwesomeAPI responde 200 com `access-control-allow-origin: *` | `npm run test:e2e` (job `e2e` no CI), 10/11/2026: 4 testes, 0 falhas; `curl`, 10/11/2026. Pessoa de fora virou validação (#25) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: tudo fica no navegador | Seção 3 |
| 5 | Medição de uso | A métrica principal é coletada | Parcial: código pronto; falta a conta (decisão D5). GoatCounter com o código `douglasabnovato`, sem cookie, só no site publicado; conta as rotas e o evento `despesa-registrada`, sem e-mail, valor nem descrição | `src/tests/medicao.test.jsx` e `e2e/fluxo.pw.js`, 10/11/2026; #24 (responsável) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: falha de cotação, valor inválido, lista vazia e "Carregando moedas…" têm mensagem | `src/tests/v2.test.jsx`, `src/tests/resumo.test.jsx`; falha de cotação também no Playwright |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: `/carteira`, 3 execuções válidas: 2,30 / 2,11 / 2,31 s, mediana 2,30 s, TBT 51 ms, elemento do LCP `p.table-empty` | Lighthouse 12.8.2 móvel, site publicado, 10/11/2026 |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100 no login e na carteira; carteira percorrida por Tab com foco visível em todos os 10 elementos | Medição de 03/11, abaixo |
| 9 | Segurança e conformidade | Riscos decididos; termos de terceiros cumpridos | Atende: sem senha real nem servidor; AwesomeAPI com CORS liberado; CSV neutraliza fórmulas (OWASP); a medição não envia dado pessoal | `src/utils/csv.js`; `npm audit --omit=dev`: 0 vulnerabilidades; Dependabot desligado (API 403), 10/11/2026 |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende: a `main` exige PR e o job `verificar` verde; a Netlify publica a `main`, que só recebe o que passou no CI | `gh api repos/douglasabnovato/coin-wallet/rules/branches/main`, 10/11/2026: `required_status_checks` com `verificar`, além de PR obrigatório e bloqueio de force push e exclusão (#22). Incluir o novo job `e2e` nos checks é do responsável (#22) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: `npm test`, 10/11/2026: 49 testes Vitest, 0 falhas; 4 testes Playwright no job `e2e` | Workflow CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README, este documento e `PLANO-DE-ACAO.md` conferidos contra o `package.json` em 10/11/2026 | Este PR |

**Endereço oficial:** https://coin-wallet-app.netlify.app/. Conferido em 10/11/2026: responde 200 em `/` e `/carteira`. O GitHub Pages não está ligado: #26.

## Histórico

- 05/11/2026, critério 10 revisto em 10/11/2026: 8 de 12. Parciais: 2 (meta proposta), 3 (pessoa de fora), 10 (Netlify sem esperar o CI); 5 "Não atende".

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
