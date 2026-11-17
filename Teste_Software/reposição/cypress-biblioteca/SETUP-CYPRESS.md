# Instalando e configurando o Cypress do zero

Faça este passo a passo **antes** de começar a atividade. No fim, você terá o Cypress instalado, configurado e com o primeiro teste passando.

> O projeto vem **sem** o Cypress de propósito: instalar e configurar a ferramenta faz parte do exercício.

---

## Pré-requisitos

- Node.js 18 ou superior (`node -v` para conferir)
- Google Chrome instalado
- O projeto descompactado e aberto no VS Code

---

## Passo 1: instalar as dependências do projeto

No terminal, dentro da pasta do projeto:

```bash
npm install
```

## Passo 2: subir o sistema

O Cypress testa o sistema **rodando**, então ele precisa estar no ar antes dos testes. Deixe este terminal aberto:

```bash
npm run dev
```

Abra `http://localhost:5173` no navegador e confira se a tela de login aparece. Login: `aluno` / `senai123`.

## Passo 3: instalar o Cypress

Abra um **segundo terminal** (o primeiro continua rodando o `npm run dev`):

```bash
npm install -D cypress
```

- O `-D` instala como **dependência de desenvolvimento**: o Cypress é usado para testar, não faz parte do sistema que vai para o usuário final. Confira no `package.json`: ele aparece em `devDependencies`.
- Na primeira vez, o npm baixa também o **binário** do Cypress (um aplicativo de uns 500 MB). Pode demorar.

Confira se deu certo:

```bash
npx cypress verify
```

Deve aparecer `Verified Cypress!`. Se der erro de download ou de rede, chame o professor.

## Passo 4: o "init" (primeira abertura)

```bash
npx cypress open
```

Na janela do Cypress:

1. Escolha **E2E Testing**.
2. Ele mostra os arquivos de configuração que vai criar. Clique em **Continue**.
3. Escolha o navegador **Chrome** e clique em **Start E2E Testing in Chrome**.
4. Na tela "Create your first spec", **feche** o Cypress por enquanto: vamos configurar antes.

Volte ao VS Code. O Cypress criou esta estrutura:

```
cypress.config.js        <- configuração do Cypress
cypress/
  fixtures/example.json  <- dados de exemplo para usar nos testes
  support/
    commands.js          <- comandos personalizados (cy.algumaCoisa)
    e2e.js               <- roda antes de cada arquivo de teste
```

## Passo 5: configurar o `baseUrl`

Abra o `cypress.config.js` e deixe assim:

```js
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
});
```

Com o `baseUrl`, em vez de escrever `cy.visit('http://localhost:5173/')` em todo teste, você escreve só `cy.visit('/')`.

> Se o arquivo gerado tiver `module.exports` e `require` em vez de `import`/`export`, tudo bem: os dois funcionam. Só mantenha o `baseUrl` dentro de `e2e`.

## Passo 6: atalhos no `package.json`

Adicione dois scripts dentro de `"scripts"`:

```json
"cy:open": "cypress open",
"cy:run": "cypress run"
```

- `npm run cy:open`: abre a interface gráfica, para escrever e depurar os testes vendo o navegador.
- `npm run cy:run`: roda todos os testes no terminal, sem interface (**headless**), do jeito que rodaria num servidor de CI.

## Passo 7: primeiro teste

Crie o arquivo `cypress/e2e/login.cy.js`:

```js
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('entra com usuario e senha validos', () => {
    cy.get('[data-cy=login-usuario]').type('aluno');
    cy.get('[data-cy=login-senha]').type('senai123');
    cy.get('[data-cy=btn-entrar]').click();

    cy.get('[data-cy=saudacao]').should('have.text', 'Ola, aluno');
  });
});
```

Entendendo cada parte:

| Código | O que faz |
| --- | --- |
| `describe('Login', ...)` | Agrupa os testes de uma funcionalidade |
| `beforeEach(...)` | Roda antes de **cada** `it` (aqui: abre a página) |
| `it('...', ...)` | Um caso de teste |
| `cy.get('[data-cy=...]')` | Encontra um elemento pelo atributo `data-cy` |
| `.type('aluno')` | Digita no campo |
| `.click()` | Clica |
| `.should('have.text', ...)` | Asserção: confere o resultado esperado |

> **Por que `data-cy`?** É a forma recomendada pelo Cypress. Classes CSS e textos mudam quando alguém mexe no visual; um atributo criado só para teste não muda. Abra `src/App.jsx` para ver todos os `data-cy` do sistema.

## Passo 8: rodar

Interface gráfica:

```bash
npm run cy:open
```

E2E Testing → Chrome → clique em `login.cy.js`. Você verá o teste rodando no navegador e cada comando listado à esquerda. Clique num comando para "voltar no tempo" e ver como a tela estava naquele momento.

Headless:

```bash
npm run cy:run
```

Deve terminar com `All specs passed!`.

---

## Checklist antes de começar a atividade

- [ ] `npm run dev` rodando e o sistema abrindo em `http://localhost:5173`
- [ ] `npx cypress verify` sem erro
- [ ] `cypress.config.js` com `baseUrl`
- [ ] Scripts `cy:open` e `cy:run` no `package.json`
- [ ] `login.cy.js` passando no `cy:open` **e** no `cy:run`

Tudo marcado? Pode ir para a Aula 1 da atividade.

---

## Problemas comuns

| Problema | Causa provável | Solução |
| --- | --- | --- |
| `cy.visit()` falha com "failed trying to load" | O `npm run dev` não está rodando | Suba o sistema no outro terminal |
| `Cypress verification timed out` | Primeira execução é lenta | Rode `npx cypress verify` de novo |
| Erro de download no `npm install -D cypress` | Rede bloqueando o binário | Chame o professor |
| `Timed out retrying... Expected to find element` | Nome do `data-cy` errado | Confira o nome em `src/App.jsx` |
| O teste passou, mas os dados "sumiram" | Normal: o sistema não tem banco | Cada `cy.visit('/')` volta aos dados iniciais |
