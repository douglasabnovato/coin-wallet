# Plano de ação — Coin Wallet

Timebox: 40 min.

| MoSCoW | Item | Ganho | Esforço | Status |
|---|---|---|---|---|
| Must | Id único (D1) | Alto | Baixo | ✅ |
| Must | Erro de rede visível (D2) | Alto | Baixo | ✅ |
| Must | Build no Node atual (D5) | Alto | Médio | ✅ Vite |
| Should | Persistência (D3) | Alto | Baixo | ✅ |
| Should | Validação do valor (D4) | Médio | Baixo | ✅ |
| Should | Acessibilidade (D6) | Médio | Baixo | ✅ axe 0 |
| Could | Desfazer exclusão (toast) | Médio | Baixo | Próximo ciclo |
| Could | Gráfico de gastos por tag | Médio | Médio | Próximo ciclo |
| Could | README próprio (hoje é o enunciado da Trybe) | Baixo | Baixo | Próximo ciclo |

## Ciclo de 16/11/2026

> Branch `feature/2026-11-16` → `developer/sprint-2026-11-19` → `main`. Nível: Vitrine (N2), 12 critérios. Estado: [`MVP.md`](MVP.md).

### Produto

- **Problema e público:** quem gasta em outras moedas registra despesas e vê o total em reais, com a cotação do momento.
- **Hipótese:** pelo menos 50% de quem entra registra uma despesa (evento `despesa-registrada`). A conta do GoatCounter ainda não existe (#24).
- **O que a revisão mostrou:** o `MVP.md` declarava 11 de 12, mas três critérios não tinham a evidência que a régua pede hoje:
  - 8 (acessibilidade): só Lighthouse e um percurso por Tab feito à mão; não há axe nem teclado num teste de navegador no CI.
  - 9 (segurança): a API de alertas do Dependabot responde 403. Pela regra em decisão (engenharia#33), fica Parcial, não "Atende" só pelo audit.
  - 7 (desempenho): a série é de 10/11. O bundle publicado hoje (`index-DT4agUWF.js`) é o mesmo do build da `main`, então vale medir de novo no ar.
- **Pesquisa (fontes oficiais):**
  - Playwright, "Accessibility testing" (https://playwright.dev/docs/accessibility-testing): usar `@axe-core/playwright` com as tags WCAG A e AA dentro do teste de navegador, e lembrar que o axe não pega tudo; o teclado pede teste à parte.
  - W3C, WCAG 2.2, "Understanding 4.1.3 Status Messages" (https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html): aviso que aparece sem tirar o foco, como "Despesa excluída", precisa de `role="status"` para o leitor de tela anunciar.
  - W3C, WCAG 2.2, "Understanding 2.2.1 Timing Adjustable" (https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html): um aviso que some sozinho é um limite de tempo; pausar o tempo enquanto a pessoa está com o foco ou o mouse nele.
  - W3C, WCAG 2.2, "Understanding 1.4.3 Contrast (Minimum)" (https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): texto pequeno precisa de 4,5:1.
  - web.dev, "Largest Contentful Paint" (https://web.dev/articles/lcp): LCP bom é até 2,5 s no percentil 75.
- **Backlog priorizado (impacto × esforço):**

| Item | Impacto | Esforço | Neste ciclo |
|---|---|---|---|
| Axe e teclado no Playwright, no CI (#29) | Alto | Baixo | Sim |
| MVP honesto: critérios 8 e 9 conforme a evidência | Alto | Baixo | Sim |
| Patch e minor das dependências (#30, parte) | Médio | Baixo | Sim |
| Desfazer a exclusão com aviso anunciado (#27) | Médio | Baixo | Sim |
| LCP de novo no site publicado | Médio | Baixo | Sim |
| Filtro por categoria e mês (#28) | Médio | Médio | Não |
| ESLint 9 no CI (#30, parte) | Médio | Médio | Não |

- **Fora do escopo:** contas reais, sincronização, Redux Toolkit, React 19 e outras trocas de versão maior.

### Engenharia

- **Arquitetura:** SPA em Vite + React 18 + Redux, publicada na Netlify. Sem servidor: a cotação vem da AwesomeAPI, e os dados ficam no `localStorage`. O "desfazer" guarda a última despesa excluída no estado do componente e a devolve por uma action nova (`RESTORE_EXPENSE`), na posição pelo id.
- **Riscos:** o aviso de desfazer não pode quebrar os 28 requisitos da Trybe (exclusão imediata, sem diálogo); o axe pode achar contraste baixo em botões que o Lighthouse não pegou.
- **Qualidade:** axe sem violações nas telas de login e carteira com despesas, em largura de desktop e de celular (375 px); o app não tem tema escuro próprio (não há `prefers-color-scheme` no CSS), por isso não há teste no escuro. Teste só de teclado: entra, registra e exclui uma despesa com `Tab` e `keyboard.type`, conferindo o contorno de 3 px definido em `src/index.css`.
- **Pronto:** `npm test`, `npm run build` e `npm run test:e2e` verdes no CI; `MVP.md` com cada "Atende" citando comando, data e resultado.

### Plano de ação

1. Atualizar patch e minor (`react-redux`, `react-router-dom`, `vite`, `vitest`, `@vitejs/plugin-react`), com `npm audit --omit=dev`.
2. `@axe-core/playwright` e teste de teclado no `e2e/`; corrigir o que o axe achar.
3. Desfazer a exclusão (#27), com testes no Vitest e no Playwright.
4. Lighthouse móvel no site publicado depois de conferir o hash do bundle.
5. `MVP.md`, README e `DEPLOY.md` com o estado real.
6. Vira issue: ligar os alertas do Dependabot (responsável), ESLint 9 no CI (#30), filtro (#28).

## Ciclo de 03/11/2026

> Branch `feature/2026-11-03` → `developer/sprint-2026-11-05` → `main`. Nível: Vitrine (N2), 12 critérios. Estado: [`MVP.md`](MVP.md).

### Produto

**Problema e público.** Quem gasta em outras moedas registra despesas e vê o total em reais, com a cotação do momento. Para o portfólio, a carteira mostra React, Redux e tratamento de API em um teste técnico da Trybe.

**Hipótese e meta.** Pelo menos 50% de quem entra registra uma despesa. A meta segue proposta; confirmar é do responsável (#23). Medir depende de uma ferramenta (#24).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Total por categoria, com valor e percentual | Apps de gastos mostram quanto cada categoria pesa no total. Virou "Gastos por categoria", com barra, valor em reais e percentual por tag | [Wild and Free Tools: tracker x planilha](https://wildandfreetools.com/blog/expense-tracker-vs-spreadsheet-excel), [Idea Blueprint: expense tracker](https://ideablueprint.pages.dev/blueprints/expense-tracker/) |
| Exportar em CSV | A exportação é citada como básica, para backup e para levar a uma planilha. Virou "Exportar CSV" no formato do Excel em português (`;`, vírgula decimal, BOM UTF-8). Filtro por período ficou para a #28 | [Ademero: expense tracker](https://www.ademero.com/free-tools/expense-tracker) |
| CSV Injection | Texto vindo da pessoa pode virar fórmula na planilha. A OWASP recomenda tratar como texto a célula que começa com `=`, `+`, `-`, `@`, tab ou retorno. Fizemos isso com um apóstrofo no início | [OWASP: CSV Injection](https://owasp.org/www-community/attacks/CSV_Injection), [Symfony: CVE-2021-41270](https://symfony.com/blog/cve-2021-41270-prevent-csv-injection-via-formulas) |
| Netlify esperar o CI | A Netlify não espera o GitHub Actions por conta própria. O caminho comum é desligar o build automático e chamar um build hook no fim do CI. Mudar a Netlify é do responsável (#22) | [Fórum da Netlify](https://answers.netlify.com/t/make-the-netlify-build-wait-for-another-gh-action-to-run/157647) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Resumo por categoria e exportação em CSV | Alto | Baixo | Este ciclo (#21) |
| 2 | Aviso "Carregando moedas…" | Médio | Baixo | Este ciclo |
| 3 | CI também nos PRs para a `developer` | Alto | Baixo | Este ciclo |
| 4 | Proteger a `main` e publicar só depois do CI | Alto | Baixo | Responsável (#22) |
| 5 | Endereço oficial: Netlify | Médio | Baixo | Responsável (#26) |
| 6 | Pessoa de fora no site publicado | Alto | Baixo | Responsável (#25) |
| 7 | Desfazer exclusão | Médio | Baixo | Issue (#27) |
| 8 | Filtro por categoria e mês | Médio | Médio | Issue (#28) |
| 9 | Teste de teclado em navegador no CI | Médio | Médio | Issue (#29) |
| 10 | Lint e dependências | Baixo | Baixo | Issue (#30) |
| 11 | Meta e medição | Médio | Médio | Responsável (#23, #24) |

**Fora do escopo.** Contas reais, sincronização entre aparelhos, Redux Toolkit, gráfico de pizza.

### Engenharia

**Arquitetura.** SPA React 18 + Redux 5 (sem Toolkit, ADR-01), build com Vite 8, publicada na Netlify. Cotações vêm da AwesomeAPI direto do navegador. E-mail e despesas ficam no `localStorage`. O resumo (`utils/summary.js`) e o CSV (`utils/csv.js`) são funções puras sobre a lista de despesas, usadas pelo componente `Summary`.

**Riscos.**
- A AwesomeAPI levou mais de 4 s para responder no teste local. Agora há aviso de carregamento, mas a lista de moedas depende de um serviço de terceiros.
- A Netlify publica cada push na `main` sem esperar o CI (#22).
- O apóstrofo contra CSV Injection muda descrições que começam com `-` ou `+`. É o custo aceito pela OWASP.

**Qualidade.**
- Testes: 45 no Vitest (28 requisitos da Trybe e 17 próprios), 9 novos neste ciclo. O resumo foi testado também com a lista em ordem inversa.
- CI: agora roda nos PRs e pushes para `developer/**`, que antes passavam sem verificação.
- Acessibilidade: percurso por teclado na carteira (login, despesa, resumo, editar, excluir, sair) com foco visível em todos os 10 elementos; Lighthouse 100 no login e na carteira.
- Segurança: sem segredo nem servidor; CSV neutraliza fórmulas.

**Definição de pronto.** `npm ci`, `npm test` e `npm run build` passam; CI verde no PR; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.**
1. Resumo por categoria e exportação em CSV, com testes (#21).
2. Aviso de carregamento das moedas, com teste.
3. CI nos PRs para a `developer`.
4. Endereço oficial conferido e documentado: Netlify.
5. `docs/MVP.md` com evidência e data por linha; README com próximos passos.

**Vira issue.** #22, #23, #24, #25, #26 (responsável); #27, #28, #29, #30 (agente).
