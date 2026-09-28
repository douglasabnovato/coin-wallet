# Deploy · Coin Wallet

Plano de ação para publicar a carteira de despesas em hospedagem gratuita.

## 1. Desafio

Publicar uma SPA em Vite + React + Redux, com duas rotas no cliente (`/` e `/carteira`), que consulta cotações na AwesomeAPI direto do navegador, sem servidor próprio, com deploy automático e sem custo, e sem quebrar os 28 requisitos da Trybe nem os 5 testes novos.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages publicado pelo GitHub Actions (escolhida)** | Gratuito, no mesmo lugar do código; o workflow que já testa e gera o build passa a publicar a `main` |
| Netlify / Vercel | Funcionariam, mas exigem outra conta e outro painel para um site só estático |
| Render Static Site | Funcionaria, mas não há backend no projeto que justifique mais um serviço |

URL esperada: **https://douglasabnovato.github.io/coin-wallet/**

### O que foi ajustado

| Arquivo | Ajuste | Por quê |
|---|---|---|
| `vite.config.js` | `base: '/coin-wallet/'` no build e no preview (raiz no `npm run dev` e nos testes) e um plugin que copia `build/index.html` para `build/404.html` | No Pages o site fica em `/coin-wallet/`; sem o `base` os arquivos JS/CSS e o favicon seriam pedidos na raiz do domínio. O `404.html` faz o Pages entregar o app quando alguém abre `/coin-wallet/carteira` direto ou dá F5 nessa página |
| `src/index.jsx` | `BrowserRouter basename={ import.meta.env.BASE_URL }` | As rotas passam a valer dentro de `/coin-wallet/` |
| `src/App.jsx` | Na página "não encontrada", `<a href="/">` virou `<Link to="/">` | O link levava para a raiz do domínio (`douglasabnovato.github.io/`), fora do app |
| `ci/github-actions-ci.yml` | Node 22; job `web` gera o artefato do Pages e novo job `deploy` publica (só em push na `main`) | Node 20 saiu de suporte em abr/2026; a publicação fica automática |
| `README.md` | Seção "Em produção" | Link do site e deste passo a passo |

Validação feita antes da entrega (sandbox, Node 22):

- `npm ci` limpo; `npm test`: **33 testes passando** (28 requisitos + 5 novos, 4 arquivos); `npm run build` gera `build/` com `404.html`.
- `npm audit --omit=dev` e `npm audit`: **0 vulnerabilidades** (antes e depois).
- `vite preview --base /coin-wallet/` e um servidor que imita o Pages (entrega `404.html` para caminhos inexistentes), abertos no Chromium com Playwright: login leva para `/coin-wallet/carteira`, as 22 moedas aparecem, abrir `/coin-wallet/carteira` direto funciona, o link da página "não encontrada" volta para `/coin-wallet/`, sem erros no console. A AwesomeAPI foi simulada nesse teste (a sandbox não tem acesso a ela).

### API de cotações (AwesomeAPI)

- O app chama `https://economia.awesomeapi.com.br/json/all` (HTTPS, sem chave). O GitHub Pages é HTTPS, então não há conteúdo misto.
- Não foi possível chamar a API daqui para confirmar o cabeçalho de CORS. A documentação atual da AwesomeAPI já não lista o endpoint `/json/all` (lista `/json/last/:moedas`) e informa que pedidos sem chave têm cache de 1 minuto. **Confira na Etapa 4** se as moedas carregam; se não carregarem, veja "Decisões pendentes".
- Quando a API falha, o app mostra "Não foi possível carregar as moedas. Verifique sua conexão." em vez de quebrar.

### Limitações do plano gratuito

- GitHub Pages: site público, até 1 GB, cerca de 100 GB de banda por mês; o repositório precisa ser público no plano gratuito.
- Deep link (`/coin-wallet/carteira`) funciona pelo `404.html`: a página abre normalmente, mas o servidor responde com status 404 nesse primeiro carregamento (efeito conhecido do Pages; não afeta o uso).

### Segurança e LGPD

- Não há segredo no projeto. O "login" é local: o e-mail e as despesas ficam só no `localStorage` do navegador de quem usa (chave `coin-wallet.v1`); nada vai para servidor.
- A senha digitada no login não é guardada nem enviada.

### Decisões pendentes (para você validar)

1. **Endpoint `/json/all`**: se na Etapa 4 as moedas não carregarem (erro de CORS ou 404 no console), a troca para `/json/last/USD-BRL,EUR-BRL,...` muda o formato da resposta (chaves `USDBRL` em vez de `USD`) e mexe nos 28 requisitos da Trybe, que usam o mock do `/json/all`. Não troquei; me avise se for preciso.
2. **Lint da Trybe**: o script `lint` com `eslint-config-trybe` saiu na migração para Vite (ver PENDENCIAS). Reinstale só se quiser.

## 3. Solução (passo a passo)

### Etapa 1 · Validar localmente (Git Bash)

1. `cd /c/ambiente-projeto/ser-mvp/coin-wallet`
2. `npm ci` (se reclamar do lockfile, `npm install` e depois `npm ci` de novo)
3. `npm test` (33 testes)
4. `npm run build` (confira que `build/404.html` foi gerado)
5. `npm run preview` e abrir `http://localhost:4173/coin-wallet/`: entrar com um e-mail válido e senha de 6+ caracteres, conferir as moedas e adicionar uma despesa.

### Etapa 2 · Ligar o GitHub Pages (antes do push)

1. No repositório `coin-wallet` no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Não é preciso criar variável nem segredo.

### Etapa 3 · Subir para o GitHub

1. Remover os arquivos substituídos (viraram `.jsx` / `index.html` foi para a raiz):
   ```bash
   git rm src/App.js src/index.js src/components/Header/index.js src/components/Table/index.js src/components/WalletForm/index.js src/pages/Login/index.js src/pages/Wallet/index.js src/tests/bonus.test.js src/tests/login.test.js src/tests/wallet.test.js src/tests/testConfig.js public/index.html
   ```
2. Opcional: `git rm test-results-2.log` (log antigo de testes).
3. Mover o workflow:
   ```bash
   mkdir -p .github/workflows && mv ci/github-actions-ci.yml .github/workflows/ci.yml && rmdir ci
   ```
4. `git status` (conferir que nenhum `build/` ou `node_modules/` aparece)
5. `git add -A`
6. `git commit -m "chore: deploy no GitHub Pages (base /coin-wallet/, 404.html, workflow com publicação)"`
7. `git push origin main`
8. Aba **Actions**: o workflow "CI" precisa ficar verde nos jobs `web` e `deploy`.

### Etapa 4 · Conferir no ar

1. Abrir https://douglasabnovato.github.io/coin-wallet/ e confirmar que a tela de login aparece com o favicon.
2. Entrar: a URL vira `/coin-wallet/carteira` e o campo "Moeda" lista as moedas (USD, EUR, ...). Abrir o DevTools (F12) → Console: nenhum erro de CORS.
3. Adicionar uma despesa e conferir o valor convertido em BRL.
4. Dar F5 em `/coin-wallet/carteira`: a carteira continua, com a despesa salva.
5. Abrir `https://douglasabnovato.github.io/coin-wallet/qualquer-coisa`: aparece "Página não encontrada" e o link volta para o login.

### Etapa 5 · Fechar

1. No GitHub, **About → Website**: colar `https://douglasabnovato.github.io/coin-wallet/`.
