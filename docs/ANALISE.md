# Análise — Coin Wallet

## 1. Especificação

Carteira de despesas multimoeda (projeto Trybe): login local, cadastro de despesas com a cotação do momento, tabela com valor convertido em reais, edição e exclusão, total no cabeçalho.

| ID | Requisito (Trybe) | Antes | Depois |
|---|---|---|---|
| 1–3 | Login com validação e e-mail no estado | ✅ | ✅ |
| 4–7 | Página /carteira, header, formulário, moedas da API | ✅ | ✅ |
| 8 | Adicionar despesa com cotação | ✅ (falhava em versão anterior: id) | ✅ |
| 9–10 | Tabela e exclusão | ✅ | ✅ |
| 11 (bônus) | Edição | ✅ | ✅ |
| — | Dados sobrevivem ao recarregar | ❌ | ✅ |

## 2. Defeitos encontrados

| # | Severidade | Defeito | Referência |
|---|---|---|---|
| D1 | Alta | `id: expenses.length` repete id depois de excluir → editar/excluir afeta duas linhas | — |
| D2 | Alta | Falha da API de cotações só no console: a despesa some sem aviso | Nielsen #1, #9 |
| D3 | Média | Nada persiste: recarregar a página apaga a carteira | — |
| D4 | Média | Valor vazio, zero ou negativo aceito | — |
| D5 | Média | Scripts `react-scripts --openssl-legacy-provider` (flag inválida para o CRA 3); build não roda no Node 20 | — |
| D6 | Média | Login sem rótulos; foco quase invisível; contraste do total abaixo de AA | WCAG 2.2 1.3.1, 2.4.7, 1.4.3 |
| D7 | Baixa | Dependências sem uso (bootstrap, formik, yup, react-icons) e `redux-devtools-extension` obsoleto | — |

## 3. Baseline automatizado

| Verificação | Antes | Depois |
|---|---|---|
| Testes do avaliador | 27/28 (log no repositório) | 28/28 |
| Testes próprios | 0 | 5 |
| `npm audit` | dezenas (CRA 3) | 0 |
| axe-core | não medido | 0 violações |

## Rubrica v2 (grupo front-end)

Aprovação: média ponderada ≥ 7,0 **e** C1 e C4 (eliminatórios) ≥ 5. Regras: nota sem evidência vale no máximo 6; C1 limitado a 7 para parte não executada de ponta a ponta; C9 ≥ 8 só com URL publicada e CI verde.

| # | Critério | Referência | Peso | Antes | Depois | Evidência | Justificativa |
|---|---|---|---|---|---|---|---|
| C1 | Núcleo de valor | MVP (Ries); SWEBOK Requirements | 17% | 6 | 7 | E2E no Chromium: login → despesa em USD → tabela e total (API de cotações simulada) | Antes 27/28 requisitos do avaliador; agora 28/28 e sem perda de dados ao recarregar. Auditoria: a cotação real (economia.awesomeapi.com.br) não pôde ser chamada daqui; fluxo validado com API simulada, então vale o teto de 7 |
| C2 | Estados e condições excepcionais | Nielsen; OWASP A10:2025 | 10% | 3 | 8 | testes: falha de rede, valor inválido | Antes: erro só no console e despesa perdida sem aviso |
| C3 | Acessibilidade | WCAG 2.2 AA (axe-core) | 11% | 4 | 8 | axe-core 0 violações (login, carteira) | Rótulos no login, foco visível forte, contraste AA, tabela com cabeçalhos de coluna |
| C4 | Segurança e privacidade | OWASP Top 10:2025 / ASVS 5.0 N1 | 10% | 5 | 7 | sem segredos; dados só no navegador; aviso na tela | Login é local (sem servidor), agora explicado na tela |
| C5 | Dados | 3FN / ACID / fonte única | 3% | 4 | 7 | testes: id sem repetição, persistência, dado corrompido | Id duplicado depois de excluir causava edição/exclusão da linha errada |
| C6 | Testes | Pirâmide de testes; SWEBOK Testing | 9% | 6 | 8 | vitest 33 (28 do avaliador Trybe + 5 novos) | Testes originais adaptados só no necessário (act, user-event 13) |
| C7 | Qualidade de código | SOLID / camadas; SWEBOK Construction | 8% | 6 | 8 | actions/reducer/utils separados; componentes sem lógica de cálculo | Sem código morto (bootstrap, formik, yup não eram usados) |
| C8 | Desempenho | Complexidade; Core Web Vitals | 7% | 6 | 7 | total em centavos; build Vite | Sem Lighthouse |
| C9 | Operação | 12-Factor; DORA | 6% | 3 | 7 | CI em ci/, deploy estático | Sem URL publicada |
| C10 | Documentação | README como contrato | 5% | 5 | 7 | README com seção v2 + docs/ | README ainda é majoritariamente o enunciado da Trybe |
| C11 | Produto e evidência | Cagan (4 riscos); Torres | 8% | 5 | 7 | controle de gastos multimoeda funcional | Falta gráfico por categoria (próximo ciclo) |
| C12 | Sustentabilidade técnica | OWASP A03:2025; SWEBOK Maintenance | 6% | 2 | 8 | npm audit 0; React 18, Redux 5, Vite 8 | CRA 3 com --openssl-legacy-provider não roda no Node 20 |

**Média ponderada:** antes **4,77** (REPROVADO) → depois **7,44** (APROVADO).

## Adaptações nos testes do avaliador

Só o necessário para rodar em Vitest + React 18: `act()` em volta do `history.push`, valor inicial como texto em `toContainHTML`, `userEvent.clear` antes de digitar na edição (a user-event 7 substituía o texto; a 13 acrescenta) e `HistoryRouter` no lugar de `Router history`. Nenhuma expectativa de resultado foi alterada.
