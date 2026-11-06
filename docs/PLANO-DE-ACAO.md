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
