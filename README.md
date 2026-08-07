## Detalhes do Projeto

Nesse readme teremos as especificações do projeto apresentados e as anotações registradas durante a construção e desenvolvimento do projeto.

#### Inspirações

- [Email Trybe - Processo Seletivo - Teste técnico](https://mail.google.com/mail/u/0/?tab=rm&ogbl#search/trybe/FMfcgzGqQJfsRlMRClHTDXlKVsVPdCXz)
- [Cultura Trybe](https://drive.google.com/file/d/1Jo_abm2FaFpAy9PusxO0b1j40zb6EKCn/view)
- [Conhecer Trybe](https://drive.google.com/file/d/11O82-xPPb5-Xnyn6HSZNfUKob1WUgVt-/view)
- [impulso do Google](https://www.betrybe.com/parceria-google-vamoquevamo?utm_medium=social&utm_source=instagram&utm_campaign=link-bio)
- [Descrição das regras do teste](https://drive.google.com/file/d/11O82-xPPb5-Xnyn6HSZNfUKob1WUgVt-/view)

# Boas vindas ao processo seletivo para o Time de Instrução de Front-End!

Aqui você vai encontrar os detalhes de como desenvolver seu projeto a partir deste repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos. Clone este repositório, abra uma branch sua e crie uma Pull Request a partir dela. O nosso **avaliador automatizado** irá rodar nela através da integração com o GitHub e será importante para a análise da sua entrega.

## Como este README foi organizado

Este README foi estruturado em três blocos para apoiar a implementação:

1. Contexto e entregáveis: apresenta o objetivo do projeto e o que deve ser entregue.
2. Instruções de ambiente: reúne os passos de instalação, testes, linter e integração com a API.
3. Requisitos detalhados: preserva as especificações do projeto e adiciona observações técnicas em parênteses para orientar decisões de arquitetura, estado global e componentes.

A implementação esperada segue este fluxo: Login → estado global com Redux → página da carteira → header → formulário de despesas → tabela de gastos → edição e exclusão.

---

# Sumário

- 1. [Entregáveis](#entregáveis)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
  - [Avaliação Automática](#avaliacao-automatica)
- 2. [Instruções de início](#instruções-de-inicio)
- 3. [Como desenvolver](#como-desenvolver)
  - [Configurando o Redux DevTools](#configurando-o-redux-devtools)
  - [Documentação da API de Cotações de Moedas](#documentação-da-api-de-cotações-de-moedas)
  - [Execução de testes unitários](#execução-de-testes-unitários)
- 4. [Requisitos do projeto](#requisitos-do-projeto)
  - [Lista de requisitos](#lista-de-requisitos)
    - [Página de Login](#página-de-login)
      - [1. Crie uma página inicial de login com os seguintes campos e características:](#1-crie-uma-página-inicial-de-login-com-os-seguintes-campos-e-características)
      - [2. Realize as seguintes verificações nos campos de email, senha e botão:](#2-realize-as-seguintes-verificações-nos-campos-de-email-senha-e-botão)
      - [3. Utilize o Redux para salvar no estado global as informações da pessoa logada](#3-utilize-o-redux-para-salvar-no-estado-global-as-informações-da-pessoa-logada)
    - [Página da Carteira](#página-da-carteira)
    - [Configurando sua página](#configurando-sua-página)
      - [4. Crie uma página para sua carteira com as seguintes características:](#4-crie-uma-página-para-sua-carteira-com-as-seguintes-características)
    - [Header (cabeçalho)](#header-cabeçalho)
      - [5. Crie um header para a página de carteira contendo as seguintes características:](#5-crie-um-header-para-a-página-de-carteira-contendo-as-seguintes-características)
    - [Formulário de adição de Despesa](#formulário-de-adição-de-despesa)
      - [6. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:](#6-desenvolva-um-formulário-para-adicionar-uma-despesa-contendo-as-seguintes-características)
      - [7. Implemente a lógica para preencher as opções do campo "Moedas", buscando as siglas das moedas da API:](#7-implemente-a-lógica-para-preencher-as-opções-do-campo-moedas-buscando-as-siglas-das-moedas-da-api)
      - [8. Desenvolva a opção de "Adicionar despesa" na sua tabela de gastos](#8-desenvolva-a-opção-de-adicionar-despesa-na-sua-tabela-de-gastos)
    - [Tabela de Gastos](#tabela-de-gastos)
      - [9. Desenvolva uma tabela com os gastos contendo as seguintes características:](#9-desenvolva-uma-tabela-com-os-gastos-contendo-as-seguintes-características)
      - [10. Crie um botão para deletar uma despesa da tabela contendo as seguintes características:](#10-crie-um-botão-para-deletar-uma-despesa-da-tabela-contendo-as-seguintes-características)
    - [Bônus](#bônus)
      - [11. Crie um botão para editar uma despesa da tabela contendo as seguintes características:](#11-crie-um-botão-para-editar-uma-despesa-da-tabela-contendo-as-seguintes-características)

---

# Entregáveis

## O que deverá ser desenvolvido

Neste projeto você vai desenvolver uma carteira de controle de gastos com conversor de moedas, ao utilizar essa aplicação uma pessoa deverá ser capaz de:
- [ ] Adicionar, remover e editar um gasto;
- [ ] Visualizar uma tabelas com seus gastos;
- [ ] Visualizar o total de gastos convertidos para uma moeda de escolha;
- [ ] Para entregar o seu projeto você deverá criar um **Pull Request** neste repositório.

## Desenvolvimento

- [ ] Você deve desenvolver uma aplicação em React que use Redux como ferramenta de manipulação de estado. Através dessa aplicação, será possível realizar as operações básicas de criação e manipulação de um estado de redux.

## Avaliação automática

### Atenção!

O projeto já contém testes e linters configurados. É essencial que **você obtenha 100% de aprovação no projeto, incluindo requisitos bônus, sem problemas de linter**. Beleza?!

- [ ] Obter aprovação nos testes e no linter é condição essencial para a análise do projeto, **mas é importante que a qualidade do seu código vá além disso!**

Observaremos legibilidade do código, estrutura da aplicação, domínio de bons conceitos da linguagem, domínio de CSS. Utilize o projeto para nos mostrar o seu melhor!

### Linter

Para garantir a qualidade do código, vamos utilizar neste projeto o linter ESLint.

- [ ] Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção!

Para rodar o *linter* localmente no projeto, execute o comando abaixo:
- `npm run lint`
- `npm run lint:styles`

---

# Instruções de início

## Antes de começar a desenvolver

- [ ] 1. Após clonar e acessar o repositório, instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador com um texto simples)
  * Verifique que os testes estão executando:
    * `npm test` (os testes devem rodar e falhar)

- [ ] 2. Crie uma branch a partir da branch `master` e mãos à obra!

---

## Durante o desenvolvimento

* [ ] Faça `commits` **bem estruturados** das alterações que você fizer no código regularmente

* [ ] Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

---

# Como desenvolver

- [ ] Em função da forma como os testes automatizados foram construídos, nessa aplicação você deverá **obrigatoriamente** utilizar o seguinte formato do estado global:

````javascript
{
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
}
````

Você pode adicionar novos campos ao seu estado global, mas essa estrutura básica deve se manter. Por exemplo, você pode adicionar uma propriedade `isFetching` no seu estado. Mas você **não** pode salvar as despesas em uma chave diferente de `wallet.expenses`.

- [ ] Outra coisa importante: devido a estrutura que o avaliador utiliza para realizar os testes, é **necessário** que o seu `<Provider />` e o seu `<BrowserRouter />` estejam no arquivo `index.js` e **não** no `<App />`.

---

## Configurando o Redux DevTools

- [ ] Para usarmos o Redux DevTools com o Redux-Thunk, você pode usar uma biblioteca chamada `composeWithDevTools`. Ela já está no package.json, a única coisa que você vai precisar fazer é configurar a sua store, por exemplo:

````javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
````

---

## Documentação da API de Cotações de Moedas

- [ ] Sua página _web_ irá consumir os dados da API do _awesomeapi API de Cotações_ para realizar a busca de câmbio de moedas. Para realizar essas buscas, vocês precisarão consultar o seguinte _endpoint_: https://economia.awesomeapi.com.br/json/all

O retorno desse **_endpoint_** será algo no formato:
````json
{
   {
     "USD": {
       "code":"USD",
       "codein":"BRL",
       "name":"Dólar Comercial",
       "high":"5.6689",
       "low":"5.6071",
       "varBid":"-0.0166",
       "pctChange":"-0.29",
       "bid":"5.6173",
       "ask":"5.6183",
       "timestamp":"1601476370",
       "create_date":"2020-09-30 11:32:53"
       },
      ...
   }
}
````

Se você quiser aprender mais informações sobre a API, veja a [documentação](https://docs.awesomeapi.com.br/api-de-moedas).

---

## Execução de testes unitários

- [ ] Vamos utilizar [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) para execução dos testes unitários.

- [ ] Esse _framework_ de testes utiliza algumas marcações no código para verificar a solução proposta, uma dessas marcações é o atributo `data-testid` e faremos uso dele aqui.

Na descrição dos requisitos (logo abaixo) será pedido que seja feita a adição de atributos `data-testid` nos elementos _HTML_. Vamos a um exemplo para deixar claro essa configuração:

Se o requisito pedir "crie um botão e adicione o id de teste (ou `data-testid`) com o valor `my-action`, você pode criar:

```html
<button data-testid="my-action"></button>
```

ou

```html
<a data-testid="my-action"><a/>
```

ou seja, o atributo `data-testid="my-action"` servirá para o React Testing Library(RTL) identificar o elemento e dessa forma, conseguiremos realizar testes unitários focados no comportamento da aplicação.

- [ ] Em alguns requisitos, utilizamos o `getByRole` para poder selecionar os elementos de forma semântica. Portanto atente-se às instruções de cada requisito. Por exemplo, se o requisito pedir explicitamente um `button`, você deverá utilizar exatamente esse elemento.

- [ ] Afim de verificar a solução proposta, você pode executar todos os testes unitários localmente, basta executar:

```bash
npm test
```

---

# Requisitos do projeto
## Lista de requisitos

### Página de Login

Crie uma página para que a pessoa usuária se identifique, com email e senha. Esta página deve ser a página inicial de seu aplicativo.

  ![image login](./.github/template/login.gif)

#### 1. Crie uma página inicial de login com os seguintes campos e características:

  - [ ] A rota para esta página deve ser ‘/’. (use React Router e defina a rota principal em uma página dedicada de login)

  - [ ] Você deve criar um local para que a pessoa usuária insira seu email e senha. Utilize o atributo `data-testid="email-input"` para o email e `data-testid="password-input"` para a senha. (mantenha os campos como controlled inputs e use os data-testid exigidos pelos testes)

  - [ ] Crie um botão com o texto ‘Entrar’. (prefira um elemento button semântico e controle a habilitação via estado local)

- **O que será testado**
  ```
  - A rota para esta página deve ser "/"
  - Existe um local para que o usuário insira seu email e senha
  - Existe um botão com o texto "Entrar"
  ```

- **Observações da minha resolução**
  * Estilizada essa página conforme o layout do gif exibido acima.
  * A estratégia de elemento com o nome da pasta e com arquivos `index.js` e `index.css`.
  * Construído o formulário com Formik com campos e mensagens de erro de exibição.

#### 2. Realize as seguintes verificações nos campos de email, senha e botão:

  - [ ] O email está no formato válido, como 'alguem@alguem.com'. (valide com expressão regular simples ou uma biblioteca de validação, sem depender de um backend)

  - [ ] A senha possui 6 ou mais caracteres. (defina a regra no estado do formulário e desabilite o botão enquanto a validação não passar)

  - [ ] Salve o email no estado da aplicação, com a chave ***email***, assim que a pessoa usuária logar. (dispare uma action para o reducer de usuário e mantenha o estado global coerente)

  - [ ] A rota deve ser mudada para '/carteira' após o clique no botão '**Entrar**'. (use navegação programática com history ou navigate após a autenticação bem-sucedida)

- **O que será testado**
  ```
  - O botão de "Entrar" está desabilitado ao entrar na página
  - O botão de "Entrar está desabilitado quando um email inválido é digitado
  - O botão de "Entrar" está habilitado quando um email e uma senha válidos são passados
  ```

- **Observações da minha resolução**
  * As validações foram realizadas com Yup.

#### 3. Utilize o Redux para salvar no estado global as informações da pessoa logada

  - [ ] Salve o email no estado da aplicação, com a chave email, assim que o usuário logar. (mantenha a estrutura base do estado em user.email e wallet.{currencies, expenses})

  - [ ] A rota deve ser mudada para `/carteira` quando o login for efetuado com sucesso. (a navegação é um efeito colateral do sucesso do login, então pode ser tratada no evento do botão)

- **O que será testado**
  ```
  - O estado global possui a chave `email` no formato esperado
  - A rota deve ser mudada para `/carteira` após o clique no botão
  ```

- **Observações da minha resolução**
  * tarefa.

---
### Página da Carteira

- [ ] Crie uma página para gerenciar a carteira de gastos em diversas moedas.
- [ ] Que traga a despesa total em uma moeda só.
- [ ] Esta página deve ser renderizada por um componente chamado ***Wallet***.

  ![image carteira](./.github/template/carteira.gif)
---
### Configurando sua página

#### 4. Crie uma página para sua carteira com as seguintes características:

  * [ ] A rota para esta página deve ser `/carteira` (a página deve ser renderizada por uma rota específica e não depender do componente App para isso)

  * [ ] O componente deve se chamar Wallet e estar localizado na pasta `src/pages` no arquivo `Wallet.js` (mantenha a organização em pastas e exporte o componente como default)

- **O que será testado**
  ```
  - A rota para esta página deve ser "/carteira"
  - O componente deve se chamar Wallet e estar localizado na pasta "src/pages"
  ```

- **Observações da minha resolução**
  * tarefa.

---
### Header (cabeçalho)

#### 5. Crie um header para a página de carteira contendo as seguintes características:

  * [ ] Um elemento que exiba o email da pessoa usuária que fez login. (leia o valor de user.email diretamente do estado global)

    * [ ] Adicione o atributo `data-testid="email-field"`.

  ```
  ***Dica: você deve pegar o email do estado global da aplicação (no Redux)***
  ```

  * [ ] Um campo com a despesa total gerada pela lista de gastos. (calcule o total a partir de wallet.expenses e atualize sempre que uma despesa for adicionada, removida ou editada)

    * [ ] Adicione o atributo `data-testid="total-field"`.

    * [ ] Inicialmente esse campo deve exibir o valor `0`

  * [ ] Um campo que mostre qual câmbio está sendo utilizado, que será neste caso será 'BRL'. (use um valor fixo para o header, pois a moeda de conversão da aplicação é o real)

    * [ ] Adicione o atributo `data-testid="header-currency-field"`.

  **O que será testado**
  ```
  - Um elemento que exiba o email do usuário que fez login.
  - Crie um campo com a despesa total gerada pela lista de gastos.
  - Crie um campo que mostre que qual câmbio está sendo utilizado, que será neste caso "BRL"
  ```

- **Observações da minha resolução**
  * tarefa.

---
### Formulário de adição de Despesa

 **Dica:** atente-se ao [formato sugerido pelo React](https://pt-br.reactjs.org/docs/forms.html) para criar formulários.

  ````html
  <form>
    <label>
      Nome:
      <input type="text" name="name" />
    </label>
  </form>
  ````

#### 6. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:

  * [ ] Um campo para adicionar valor da despesa. (o valor deve ser armazenado como string ou número, mas deve ser consistente com os testes e com a renderização da tabela)

    * [ ] O campo deverá ter a label `Valor`.

  * [ ] Um campo de texto para adicionar a descrição da despesa.

    * [ ] O campo deverá ter a label `Descrição`.

  * [ ] Um campo de select para adicionar em qual moeda será registrada a despesa.

    * [ ] O campo deverá ter a label `Moeda`.

    * [ ] O campo deverá ser um `<select>`.

    * [ ] As opções do select serão preenchidas através da consulta à API. Isso será feito em um requisito mais a frente. Nesse momento você pode deixar o `<select>` vazio.

  * [ ] Um campo para adicionar qual método de pagamento será utilizado.

    * [ ] O campo deverá ter a label `Método de pagamento`.

    * [ ] Este campo deve ser um `<select>`. A pessoa usuária deve poder escolher entre os campos: 'Dinheiro', 'Cartão de crédito' e 'Cartão de débito'.

  * [ ] Um campo para selecionar uma categoria (tag) para a despesa.

    * [ ] Este campo deve ser um `<select>`. A pessoa usuária deve poder escolher entre os campos: 'Alimentação', 'Lazer', 'Trabalho', 'Transporte' e 'Saúde'.

    * [ ] O campo deverá ter a label `Tag`.

- **Observações da minha resolução**
  * tarefa.

---
#### 7. Implemente a lógica para preencher as opções do campo "Moedas", buscando as siglas das moedas da API:

  * [ ] Ao entrar na página `/carteira`, você deverá fazer uma requisição para a API das moedas e preencher as opções do `<select>` de "Moedas" com os valores retornados. Utilizando as siglas das moedas. (faça a requisição no carregamento da página, filtre a resposta para remover USDT e guarde as moedas em wallet.currencies)

  * [ ] As opções devem conter os valores: 'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH' e 'XRP'.

    * [ ] Esses valores devem vir da API através do endpoint: https://economia.awesomeapi.com.br/json/all.

    * [ ] Remova das informações trazidas pela API a opção 'USDT' (Dólar Turismo).

- **Observações da minha resolução**
  * tarefa.

----
#### 8. Desenvolva a opção de "Adicionar despesa" na sua tabela de gastos

  * [ ] O botão de adicionar despesa deve salvar a despesa no estado global e recalcular o total no header. (use uma action para inserir o objeto na lista wallet.expenses e mantenha exchangeRates salvo junto com a despesa)

  * [ ] Desenvolva a funcionalidade do botão "Adicionar despesa" de modo que ao clicar no botão, as seguintes ações sejam executadas:

    * [ ] Os valores dos campos devem ser salvos no estado da aplicação, na chave ***expenses***, dentro de um array contendo todos gastos que serão adicionados:

      * [ ] O `id` da despesa **deve** ser um número sequencial, começando em 0. Ou seja: a primeira despesa terá id 0, a segunda terá id 1, a terceira id 2, e assim por diante.

      * [ ] Você deverá salvar a cotação do câmbio feita no momento da adição para ter esse dado quando for efetuar uma edição do gasto. Caso você não tenha essa informação salva, o valor da cotação trazida poderá ser diferente do obtido anteriormente.

        > * [ ] **Atenção nesse ponto:** você deverá fazer uma requisição para API e buscar a cotação no momento que o botão de `Adicionar despesa` for apertado. Para isso você deve utilizar um thunk. Atente-se ao formato do objeto da despesa descrito abaixo: o valor retornado pela API deverá ficar dentro da chave `exchangeRates`.

    * [ ] Após adicionar a despesa, atualize a soma total das despesas. Essa informação deve ficar no header dentro do elemento com `data-testid="total-field"`

    * [ ] As despesas salvas no Redux ficarão com um formato semelhante ao seguinte:
      <details>
      <summary>Clique para expandir.</summary>
      <p>

        ```json
          expenses: [{
            "id": 0,
            "value": "3",
            "description": "Hot Dog",
            "currency": "USD",
            "method": "Dinheiro",
            "tag": "Alimentação",
            "exchangeRates": {
              "USD": {
                "code": "USD",
                "name": "Dólar Comercial",
                "ask": "5.6208",
                ...
              },
              "CAD": {
                "code": "CAD",
                "name": "Dólar Canadense",
                "ask": "4.2313",
                ...
              },
              "EUR": {
                "code": "EUR",
                "name": "Euro",
                "ask": "6.6112",
                ...
              },
              "GBP": {
                "code": "GBP",
                "name": "Libra Esterlina",
                "ask": "7.2498",
                ...
              },
              "ARS": {
                "code": "ARS",
                "name": "Peso Argentino",
                "ask": "0.0729",
                ...
              },
              "BTC": {
                "code": "BTC",
                "name": "Bitcoin",
                "ask": "60299",
                ...
              },
              "LTC": {
                "code": "LTC",
                "name": "Litecoin",
                "ask": "261.69",
                ...
              },
              "JPY": {
                "code": "JPY",
                "name": "Iene Japonês",
                "ask": "0.05301",
                ...
              },
              "CHF": {
                "code": "CHF",
                "name": "Franco Suíço",
                "ask": "6.1297",
                ...
              },
              "AUD": {
                "code": "AUD",
                "name": "Dólar Australiano",
                "ask": "4.0124",
                ...
              },
              "CNY": {
                "code": "CNY",
                "name": "Yuan Chinês",
                "ask": "0.8278",
                ...
              },
              "ILS": {
                "code": "ILS",
                "name": "Novo Shekel Israelense",
                "ask": "1.6514",
                ...
              },
              "ETH": {
                "code": "ETH",
                "name": "Ethereum",
                "ask": "5184",
                ...
              },
              "XRP": {
                "code": "XRP",
                "name": "Ripple",
                "ask": "1.4",
                ...
              }
            }
          }]
        ```

        </p>
      </details>

- **Observações da minha resolução**
  * tarefa.

---
### Tabela de Gastos

#### 9. Desenvolva uma tabela com os gastos contendo as seguintes características:

  * [ ] A tabela deve ser renderizada a partir do estado wallet.expenses. (cada linha representa uma despesa e deve exibir valor, moeda, câmbio, valor convertido e moeda de conversão)

  * [ ] A tabela deve possuir um cabeçalho **exatamente** com os campos Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão e Editar/Excluir

  * [ ] Atente-se ao formato semântico da tabela. Utilize os elementos corretos para o cabeçalho, para as linhas e para as células.

  * [ ] A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave ***expenses*** que vem do reducer `wallet`.

    * [ ] O campo de Moeda e Moeda de Conversão deverão conter o nome da moeda. Portanto, ao invés de 'USD' ou 'EUR', deve conter "Dólar Comercial" e "Euro", respectivamente

    * [ ] Por padrão, o campo 'Moeda de conversão' exibirá 'Real'

    * [ ] Atenção também às casas decimais dos campos. Como são valores contábeis, eles devem apresentar duas casas após a vírgula. Arredonde sua resposta somente na hora de renderizar o resultado, e para os cálculos utilize sempre os valores vindos da API (utilize o campo `ask` que vem da API).

    * [ ] Utilize sempre o formato `0.00` (número - ponto - duas casas decimais)

**O que será testado**
```
- [ ] A tabela deve possuir um cabeçalho com os campos Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido e Moeda de conversão.
- [ ] A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave expenses que vem do reducer wallet.
```

- **Observações da minha resolução**
  * tarefa.


#### 10. Crie um botão para deletar uma despesa da tabela contendo as seguintes características:

  * [ ] O botão deve remover a linha correspondente do estado global e atualizar o total. (use o id da despesa para filtrar a lista e recomputar a soma)

   ![image btnExcluir](./.github/template/btnExcluir.gif)

  * [ ] O botão deve estar na linha da tabela e deve possuir `data-testid="delete-btn"`.

  * [ ] Ao ser clicado, o botão deleta a linha da tabela, alterando o estado global.

**O que será testado**
```
- O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="delete-btn"`
- Ao ser clicado, o botão deleta a linha da tabela, alterando o estado global
```

- **Observações da minha resolução**
  * tarefa.


### Bônus

#### 11. Crie um botão para editar uma despesa da tabela contendo as seguintes características:

  * [ ] O botão deve permitir editar uma despesa já cadastrada. (prefira um fluxo de edição que preencha o formulário com os valores atuais e substitua a despesa no estado ao salvar)


   ![image btnEditar](./.github/template/btnEditar.gif)

  * [ ] O botão deve estar dentro da linha da tabela e deve possuir `data-testid="edit-btn"`

  * [ ] Ao ser clicado, o botão habilita um formulário para editar a linha da tabela. Ao clicar em "Editar despesa" ela é atualizada, alterando o estado global.

    * [ ] O formulário deverá ter os mesmos `data-testid` do formulário de adicionar despesa. Você pode reaproveitá-lo.

    * [ ] O botão para submeter a despesa para edição deverá conter **exatamente** o texto "Editar despesa"

    *  [ ] **Atenção**: o câmbio utilizado na edição deve ser o mesmo do cálculo feito na adição do gasto.

  **O que será testado**
  ```
  - [ ] O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="edit-btn"
  - [ ] Ao ser clicado, o botão habilita um formulário para editar a linha da tabela. Ao clicar em "Editar despesa" ela é atualizada, alterando o estado global
  ```

- **Observações da minha resolução**
  * tarefa.

### Detalhes

- Projeto tem origem no repositório [betrybe](https://github.com/betrybe/douglasnovato-test)
---

#### 📅 Telas Resultado da resolução das tarefas

- Página de Login

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="versão 1 do projeto" title="#receita" src="./.github/telas/tela-1.jpg">
</p>

Feito com ❤️ por Douglas A B Novato. 👋🏽 [Entre em contato!](https://www.linkedin.com/in/douglasabnovato/)



---


#### 📅 estrutura de pastas


```text
trybe/
├── .editorconfig
├── .eslintignore
├── .eslintrc.json
├── .git/
├── .github/
├── .gitignore
├── .stylelintignore
├── .stylelintrc.json
├── .trybe/
├── node_modules/
├── package-lock.json
├── package.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── ...
├── README.md
├── src/
│   ├── actions/
│   │   └── index.js
│   ├── components/
│   │   └── Header/
│   │       ├── index.css
│   │       └── index.js
│   ├── images/
│   │   └── logo.png
│   ├── pages/
│   │   ├── Login/
│   │   │   ├── index.css
│   │   │   └── index.js
│   │   └── Wallet/
│   │       ├── index.css
│   │       └── index.js
│   ├── reducers/
│   │   ├── index.js
│   │   ├── user.js
│   │   └── wallet.js
│   ├── store/
│   │   └── index.js
│   ├── tests/
│   │   ├── bonus.test.js
│   │   ├── login.test.js
│   │   ├── mockData.js
│   │   ├── testConfig.js
│   │   └── wallet.test.js
│   ├── index.js
│   ├── logo.svg
│   └── setupTests.js
├── trybe.yml
└── ...
```


---


# Fluxo de Trabalho com Branches (Git Workflow)

Para garantir a estabilidade do código em produção, manutenibilidade e organização do projeto, adotamos o seguinte fluxo de trabalho baseado em branches:

## 🌿 Estrutura das Branches e 🔄 Fluxo Operacional

1. **`main` (Produção / Versão Estável)**
   - Contém apenas código testado, validado e pronto para entrega.
   - Nenhum commit direto deve ser feito nesta branch.

2. **`developer-versao` (Integração e Homologação)**
   - Branch responsável por centralizar as novas funcionalidades já desenvolvidas antes de irem para produção.
   - Serve como ponto de validação e testes integrados.

3. **`feature/issues-mvp` (Desenvolvimento de Funcionalidades)**
   - Branch de trabalho ativo onde implementamos as issues, telas, componentes e lógicas do MVP da TrybeWallet.
   - É a partir daqui que abrimos os Pull Requests / Merges para a `developer-versao`.
 
 


---

 
## Sugestão de ordem de estudo
Se quiser seguir de forma ainda mais tranquila, recomendo fazer na ordem:
1. login
2. Redux
3. carteira
4. header
5. formulário
6. API
7. tabela
8. edição/exclusão
9. testes


---


# Plano de Ação para Desenvolvimento - TrybeWallet

## Visão Geral do Progresso
- [x] **Fase 1:** Entender o escopo do projeto
- [x] **Fase 2:** Configurar o ambiente inicial
- [x] **Fase 3:** Compreender a estrutura existente
- [x] **Fase 4:** Implementar a tela de login
- [x] **Fase 5:** Integrar Redux no fluxo de login
- [x] **Fase 6:** Criar a página da carteira
- [x] **Fase 7:** Construir o header da carteira
- [x] **Fase 8:** Buscar as moedas na API (Thunk e filtragem de USDT)
- [x] **Fase 9:** Implementar o formulário de despesas (com atributos data-testid e estilização)
- [x] **Fase 10:** Salvar despesas no estado global com cotações (atualização automática do Header)
- [x] **Fase 11:** Renderizar a tabela de gastos
- [x] **Fase 12:** Implementar remoção de despesas
- [x] **Fase 13:** Implementar edição de despesas
- [x] **Fase 14:** Ajustar detalhes visuais e semânticos
- [x] **Fase 15:** Validar com testes e linter

---

## Detalhamento dos Passos

### 1. Entender o escopo do projeto
- Ler o README completo e identificar os requisitos obrigatórios e bônus.
- Verificar quais funcionalidades principais a aplicação precisa ter: login, carteira, formulário de despesas, tabela de gastos, edição e exclusão. *(Concluído)*

### 2. Configurar o ambiente inicial
- Instalar as dependências com `npm install`.
- Rodar o projeto localmente com `npm start`.
- Executar os testes iniciais com `npm test`. *(Concluído)*

### 3. Compreender a estrutura existente
- Verificar as pastas principais (`src/pages`, `src/components`, `src/reducers`, `src/actions`, `src/store`).
- Entender como o estado global está organizado. *(Concluído)*

### 4. Implementar a tela de login
- Criar a página inicial em rota `/`.
- Adicionar os campos de email e senha com validação.
- Garantir que o botão “Entrar” gerencie o estado de habilitado/desabilitado. *(Concluído)*

### 5. Integrar Redux no fluxo de login
- Criar o reducer de usuário e a action `SAVE_EMAIL`.
- Salvar o email no estado global e redirecionar para `/carteira`. *(Concluído)*

### 6. Criar a página da carteira
- Criar o componente `Wallet` na rota protegida `/carteira`. *(Concluído)*

### 7. Construir o header da carteira
- Exibir o email do usuário logado (`data-testid="email-field"`).
- Exibir o valor total das despesas (`data-testid="total-field"`).
- Exibir a moeda de conversão BRL (`data-testid="header-currency-field"`). *(Concluído)*

### 8. Buscar as moedas na API
- Criar Action Thunk para buscar cotações na AwesomeAPI (`https://economia.awesomeapi.com.br/json/all`).
- Filtrar e remover a moeda `USDT` conforme requisito obrigatório.
- Preencher o estado global `wallet.currencies`. *(Concluído)*

### 9. Implementar o formulário de despesas
- Criar os campos: valor, descrição, moeda, método de pagamento e tag com seus respectivos `data-testid`.
- Integrar os selects com as moedas vindas do Redux. *(Concluído)*

### 10. Salvar despesas no estado global
- Criar lógica via Thunk para capturar cotações atuais no momento do clique.
- Armazenar a despesa no estado `wallet.expenses` com ID sequencial e taxas de câmbio.
- Atualizar dinamicamente o total no Header. *(Concluído)*

### 11. Renderizar a tabela de gastos
- Criar a tabela com as colunas exigidas (Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão, Excluir/Editar).
- Popular a tabela com os dados vindos do estado global. *(Próximo passo)*

### 12. Implementar remoção de despesas
- Criar o botão de excluir na tabela.
- Remover a despesa do estado global e recalcular o total.

### 13. Implementar edição de despesas
- Criar o botão de editar e carregar os dados no formulário.
- Atualizar a despesa correspondente no estado global após salvar.

### 14. Ajustar detalhes visuais e semânticos
- Garantir refinamento de layout, responsividade e conformidade com os testes automatizados.

### 15. Validar com testes e linter
- Executar suíte completa de testes da Trybe e validação de linter.


---

# Relatório de Execução e Correção de Testes — TrybeWallet

Este relatório consolida o panorama completo da suíte de testes da aplicação, detalhando o status inicial, as intervenções realizadas e a conclusão do ciclo de validação.

---

## 1. Visão Geral da Execução

* **Total de Testes (Test Suites):** 3 arquivos (`login.test.js`, `wallet.test.js`, `bonus.test.js`)
* **Total de Casos de Teste:** 28 testes
* **Status Final:** **100% Aprovado (3 suites passadas, 28 testes bem-sucedidos)**

---

## 2. Detalhamento dos Testes Realizados e Status

| Suíte de Testes | Componente / Funcionalidade Avaliada | Status Final |
| :--- | :--- | :--- |
| **`login.test.js`** | Validação de e-mail e senha, habilitação/desabilitação dinâmica do botão de entrada, gravação de e-mail no estado global (Redux) e redirecionamento de rota para `/carteira`. | **Passou** |
| **`wallet.test.js`** | Renderização do header (e-mail e total de despesas), estruturação do formulário de despesas (campos de valor, descrição, moeda, método de pagamento e tag), requisição assíncrona de cotações, adição de despesas à tabela e atualização de estados globais. | **Passou** |
| **`bonus.test.js`** | Botões e funcionalidades de edição e exclusão de despesas da tabela com recálculo automático do header. | **Passou** |

---

## 3. Ajustes Realizados no Código

Para alcançar 100% de aprovação na suíte, foram executados ajustes cirúrgicos nos seguintes pontos do projeto:

1. **Ajuste no Label de Categoria (Tag):**
   * *Problema:* O teste procurava um campo associado ao texto `/tag/i`, mas o label do formulário estava definido como `Categoria:`.
   * *Correção:* Alterado o texto descritivo do `<label>` correspondente no componente de formulário para **`Tag:`**.

2. **Correção no Caminho de Importação da Action de E-mail:**
   * *Problema:* O arquivo `pages/Login/index.js` tentava importar `saveEmail` de um caminho incorreto (`../redux/actions`).
   * *Correção:* O import foi atualizado para **`../../actions`**, alinhando-se à estrutura de pastas real do projeto.

3. **Padronização da Geração de ID das Despesas:**
   * *Problema:* O reducer da carteira utilizava `id: Date.now()`, gerando um timestamp numérico aleatório. Os testes exigiam que a primeira despesa começasse estritamente com **`id: 0`** e incrementasse sequencialmente.
   * *Correção:* Ajustado o reducer `ADD_EXPENSE` para utilizar **`id: state.expenses.length`**.


---

## 4. Conclusão

O projeto encontra-se em um estado **estável, funcional e totalmente aderente** aos critérios de aceitação propostos pelos testes automatizados. Todas as barreiras de integração entre componentes React, rotas e o estado global do Redux foram superadas com sucesso, garantindo a integridade dos fluxos de autenticação e gerenciamento de carteira financeira.


---



<div align="center">
  <p>Desenvolvido com 💜 por <strong>@douglasabnovato</strong></p>
  <p><em>Desenvolvedor Fullstack & Produtos Digitais</em></p>
</div>