# MVP — Coin Wallet

> Criado em 31/10/2026, com os critérios usados no `movies`. Revisto em 16/11/2026 (ciclo de 16/11/2026), conferindo cada "Atende" contra a coluna de evidência da régua do `engenharia`.

**Nível:** Vitrine (N2). Os 12 critérios se aplicam.

**Resumo:** 10 de 12 aplicáveis atendidos

**Finalizado:** sim. Os dois critérios abertos dependem do responsável e têm issue com `depende-do-responsavel`: 5 (conta do GoatCounter, #24) e 9 (ligar os alertas do Dependabot, #38).

## Problema e hipótese

**Problema e público:** Quem gasta em outras moedas registra despesas e vê o total em reais, com a cotação do momento.

**Hipótese:** Acreditamos que quem entra na carteira registra uma despesa, porque a conversão para reais é automática. Meta: pelo menos 50% de quem entra registra uma despesa. Saberemos quando, nas 4 primeiras semanas com o painel do GoatCounter ligado, os eventos `despesa-registrada` somarem pelo menos metade das visitas a `/carteira`. Meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável (#23).

## 1. Critérios

| # | Critério | Como verificar | Situação em 16/11/2026 | Evidência |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Frase acima |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende: meta e "saberemos quando" acima, decididas pelo coordenador em 10/11/2026 (D1), revisáveis pelo responsável | Hipótese acima; #23 |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador (Playwright) no CI | Atende: no build de produção, entra, registra uma despesa em dólar e confere o total em reais; com a cotação fora do ar, avisa e não salva. No ar, a AwesomeAPI responde 200 com `access-control-allow-origin: *` | `e2e/fluxo.pw.js`. `npm run build && npm run test:e2e`, 16/11/2026: 8 testes, 0 falhas. Job `e2e` verde no run 43799383630 da `main` (16/11/2026). `curl -D - https://economia.awesomeapi.com.br/json/all`, 16/11/2026: 200. Pessoa de fora: validação de produto (#25) |
| 4 | Escopo enxuto | Seção "Fora do MVP" | Atende: tudo fica no navegador | Seção 3 |
| 5 | Medição de uso | Painel da ferramenta com visitas | Parcial: código pronto (GoatCounter sem cookie, só no site publicado, rotas e evento `despesa-registrada`, sem e-mail, valor nem descrição); a conta não existe | `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.goatcounter.com/`, 16/11/2026: 400 (conta inexistente). Código: `src/tests/medicao.test.jsx` e `e2e/fluxo.pw.js`. Conta: #24 (responsável) |
| 6 | Falhas tratadas | Testes de falha de rede, lista vazia e espera | Atende: falha de cotação, valor inválido, lista vazia e "Carregando moedas…" têm mensagem e teste | `npm test`, 16/11/2026: 56 testes, 0 falhas. `src/tests/v2.test.jsx` ("sem cotação a despesa não é salva", "valor vazio ou zero não chama a API"), `src/tests/resumo.test.jsx` ("Carregando moedas…", "sem despesas não há resumo"); falha de cotação também em `e2e/fluxo.pw.js` |
| 7 | Desempenho aceitável | Lighthouse móvel no site publicado, 3 execuções, mediana | Atende: `/carteira`, 3 execuções válidas: 2,29 / 2,26 / 2,38 s, mediana 2,29 s; TBT 16 / 55 / 65 ms (mediana 55 ms); elemento do LCP `main.wallet-main > p.table-empty` | `npx lighthouse@12.8.2 https://coin-wallet-app.netlify.app/carteira` (móvel, padrão), 16/11/2026 04h54. Antes, o bundle publicado (`index-DT4agUWF.js`) foi conferido igual ao `npm run build` da `main`. Esta série não cobre o ciclo de 16/11/2026, que muda o estilo do próprio elemento do LCP (`.table-empty`) e só vai ao ar com o merge na `main`: medir de novo (#40) |
| 8 | Acessibilidade básica | axe e teclado no navegador | Atende: axe (WCAG 2.0 a 2.2, A e AA) sem violações e sem contraste "incompleto" no login, na carteira vazia, com 3 despesas, com o aviso de desfazer e com o mouse sobre "Adicionar despesa", em desktop e em celular (375 px, sem rolagem horizontal). Percurso só por teclado: entra, registra, exclui e desfaz, com o foco visível conferido pelos valores do app em cada parada. O app não tem tema escuro próprio (não há `prefers-color-scheme` no CSS), por isso não há teste no escuro | `e2e/acessibilidade.pw.js`. `npm run test:e2e`, 16/11/2026: 4 testes de acessibilidade, 0 falhas; job `e2e` verde no run 43827865995 (PR #41, 16/11/2026). Mutação, 16/11/2026: com o gradiente #04AA6D de volta no `src/pages/Login/index.css`, `npx playwright test e2e/acessibilidade.pw.js -g login` falha com `color-contrast: button`; com #e53e3e no Excluir, `-g "com despesas"` falha com `color-contrast: #excluir-0 \| #excluir-1 \| #excluir-2` |
| 9 | Segurança e conformidade | `npm audit --omit=dev` e alertas do Dependabot pela API | Parcial: a API de alertas do Dependabot responde 403 (alertas desligados). A regra para esse caso está em decisão (engenharia#33); sem a API, não fica "Atende" só pelo audit. O resto está decidido: sem senha real nem servidor, sem segredo no código, CSV neutraliza fórmulas (OWASP), a medição não envia dado pessoal | `gh api "repos/douglasabnovato/coin-wallet/dependabot/alerts?state=open&per_page=100"`, 16/11/2026: 403. `npm audit --omit=dev`, 16/11/2026: 0 vulnerabilidades. `src/utils/csv.js`. Ligar os alertas: #38 (responsável) |
| 10 | Entrega confiável | CI nos PRs e principal protegida | Atende: a `main` só recebe PR, com os jobs `verificar` e `e2e` verdes; force push e exclusão bloqueados. A Netlify publica a `main` | `gh api repos/douglasabnovato/coin-wallet/rules/branches/main`, 16/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` com `e2e` e `verificar` (ruleset `principal-protegida`, ativo) |
| 11 | Testes dos fluxos críticos | Testes no CI, sem `skipped` | Atende: 56 testes Vitest no job `verificar` e 8 testes Playwright no job `e2e`, sem `skip` | `npm test` e `npm run test:e2e`, 16/11/2026: 56 e 8 testes, 0 falhas, 0 pulados. Jobs `verificar` e `e2e` verdes no run 43799383630 da `main` |
| 12 | Documentação honesta | README com comandos conferidos contra o `package.json` | Atende: README, este documento e `PLANO-DE-ACAO.md` conferidos contra o `package.json` e contra a saída dos testes em 16/11/2026 | Scripts `dev`, `build`, `test`, `test:e2e` no `package.json`; link publicado: `curl`, 16/11/2026: 200 em `/` e `/carteira` |

**Endereço oficial:** https://coin-wallet-app.netlify.app/. Conferido em 16/11/2026: responde 200 em `/` e `/carteira` e serve `index-DT4agUWF.js`, o mesmo do build da `main`. O GitHub Pages não está ligado: #26.

## Histórico

- 10/11/2026: declarado 11 de 12. Revisto em 16/11/2026 contra a régua: eram 9 de 12. O 8 não tinha axe nem teclado em teste de navegador (só Lighthouse e um percurso à mão), e o 9 estava "Atende" com o Dependabot desligado (regra 1 do ciclo, engenharia#33).
- 05/11/2026, critério 10 revisto em 10/11/2026: 8 de 12. Parciais: 2 (meta proposta), 3 (pessoa de fora), 10 (Netlify sem esperar o CI); 5 "Não atende".

## 2. Tarefas

| # | Tarefa | Situação |
|---|---|---|
| 1 | Tratar deep link e recarga na Netlify | Feito |
| 2 | Corrigir a hospedagem no README | Feito |
| 3 | Mostrar a data da cotação usada | Feito |
| 4 | Resumo por categoria e exportação em CSV | Feito (#21) |
| 5 | Aviso de carregamento das moedas | Feito |
| 6 | Desfazer a exclusão (#27) | Feito no ciclo de 16/11/2026 (na sprint; falta a `main`) |
| 7 | axe e teclado no navegador, no CI (#29) | Feito no ciclo de 16/11/2026 (na sprint; falta a `main`) |
| 8 | Contraste dos botões e rolagem horizontal no celular | Feito no ciclo de 16/11/2026 (na sprint; falta a `main`) |

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
