# Reposição – Testes E2E com Cypress

**Horário:** 13h00 às 16h00 (4 aulas)
**Projeto:** Biblioteca SENAI (esta pasta)

## Objetivo

Você pesquisou o Cypress ontem. Hoje vai **usar** o Cypress para testar de ponta a ponta (E2E) o front-end de uma biblioteca: login, cadastro de livros, busca, empréstimo e remoção. No fim, vai procurar um bug escondido no sistema e reportá-lo como um QA faria.

**Entrega final:** a pasta do projeto zipada (sem `node_modules`), com os seus testes em `cypress/e2e/` e o arquivo `BUGS.md`, mais o print do `npm run cy:run`.

---

## Aula 1 (13h00–13h45): Preparação e login

### 1.1 Instalar e configurar o Cypress (20 min)

O projeto vem **sem** o Cypress: instalar e configurar a ferramenta faz parte da atividade.

1. Siga o passo a passo do arquivo [`SETUP-CYPRESS.md`](SETUP-CYPRESS.md), do Passo 1 ao Passo 8.
2. Só avance quando todos os itens do checklist no fim daquele arquivo estiverem marcados.

### 1.2 Explorar antes de testar (10 min)

Use o sistema manualmente antes de escrever qualquer teste. Login: usuário `aluno`, senha `senai123`. Veja no `README.md` os livros que já vêm cadastrados.

Faça uma lista de tudo o que o sistema faz e de todas as mensagens de erro que aparecerem. Essa lista vira os seus casos de teste.

> **Importante:** o sistema não tem banco de dados. Os dados voltam ao estado inicial sempre que a página recarrega, então cada `cy.visit('/')` começa do zero.

### 1.3 Completar os testes de login

No `SETUP-CYPRESS.md` você criou o `cypress/e2e/login.cy.js` com o primeiro teste. Adicione mais 3 `it` nesse arquivo:

1. Mostra `Preencha usuario e senha` quando você clica em Entrar com os campos vazios.
2. Mostra `Usuario ou senha invalidos` quando a senha está errada.
3. Faz login, clica em **Sair** e confere que voltou para a tela de login.

**Seletores:** todo elemento importante tem o atributo `data-cy`. Use sempre `cy.get('[data-cy=nome]')`. Para descobrir os nomes, abra `src/App.jsx` ou use o seletor do próprio Cypress (o ícone de mira no `cy:open`).

**Checkpoint:** 4 testes de login passando.

---

## Aula 2 (13h45–14h30): Cadastro de livros

Crie o arquivo `cypress/e2e/cadastro.cy.js`. Daqui em diante, todos os testes precisam fazer login antes. Para não repetir código, crie uma função no topo do arquivo:

```js
function login() {
  cy.visit('/');
  cy.get('[data-cy=login-usuario]').type('aluno');
  cy.get('[data-cy=login-senha]').type('senai123');
  cy.get('[data-cy=btn-entrar]').click();
}

describe('Cadastro de livros', () => {
  beforeEach(() => {
    login();
  });

  // seus testes aqui
});
```

Casos de teste (um `it` para cada):

1. Ao entrar, o contador mostra `4 livro(s) no acervo, 1 emprestado(s)`.
2. Cadastra o livro **Duna** (autor Frank Herbert, ano 1965, gênero Ficcao). O livro aparece na tabela, o contador vai para 5 e aparece o aviso `Livro cadastrado com sucesso`.
3. Mostra `Titulo e autor sao obrigatorios` quando o formulário é enviado vazio.
4. Mostra `Ano invalido` quando o ano está no futuro (por exemplo, 2999).
5. Mostra `Livro ja cadastrado` ao tentar cadastrar `dom casmurro` (em minúsculas!).
6. Depois de um cadastro com sucesso, os campos do formulário ficam vazios.

**Dicas:**

- Escolher uma opção no select: `cy.get('[data-cy=select-genero]').select('Ficcao')`
- Contar linhas: `cy.get('[data-cy=linha-livro]').should('have.length', 5)`
- Conferir que um campo está vazio: `.should('have.value', '')`

**Checkpoint:** 6 testes passando.

---

## Aula 3 (14h30–15h15): Busca, empréstimo e remoção

Crie o arquivo `cypress/e2e/acervo.cy.js` e reaproveite a função `login`.

**Busca e filtro**

1. Buscar `hobbit` mostra só 1 livro.
2. Buscar `zzz` mostra a mensagem `Nenhum livro encontrado`.
3. O filtro **Emprestados** mostra só O Hobbit.

**Empréstimo e devolução**

4. Empresta **1984** para Maria. A situação muda para `Emprestado para Maria` e o contador vai para 2 emprestados.
5. Mostra `Informe o nome do leitor` quando o empréstimo é confirmado sem nome.
6. Ao cancelar o empréstimo, o modal fecha e o livro continua `Disponivel`.
7. Devolve O Hobbit e a situação volta para `Disponivel`.

**Remoção**

8. O botão Remover de um livro emprestado fica desabilitado (`should('be.disabled')`).
9. Clicar em Remover e depois em **Cancelar** no modal: o livro continua na tabela.
10. Clicar em Remover e depois em **Confirmar**: o livro some da tabela.

**Dica:** para agir em uma linha específica, encontre a linha pelo texto e depois procure o botão dentro dela:

```js
cy.contains('[data-cy=linha-livro]', '1984')
  .find('[data-cy=btn-emprestar]')
  .click();
```

**Checkpoint:** 10 testes passando. Rode tudo em modo headless com `npm run cy:run` e tire um print do resultado no terminal.

---

## Aula 4 (15h15–16h00): Caça ao bug e entrega

### 4.1 Caça ao bug

**Este sistema tem pelo menos 1 bug escondido.** Seu trabalho como QA é encontrá-lo.

1. Teste o sistema pensando como usuário: varie maiúsculas e minúsculas, espaços e campos diferentes. Compare o que acontece com o que o placeholder e as mensagens prometem.
2. Quando achar o bug, escreva um teste que mostre o **comportamento correto esperado**. Esse teste deve **falhar**, e é a falha que prova o bug.
3. Registre o bug em um arquivo `BUGS.md` na raiz do projeto, seguindo este modelo:

```markdown
## BUG-01: <título curto>

- **Passos para reproduzir:** 1. ... 2. ... 3. ...
- **Resultado esperado:**
- **Resultado obtido:**
- **Severidade:** baixa / média / alta (justifique)
- **Teste que reproduz:** nome do arquivo e do `it`
```

### 4.2 Desafio extra: o aviso que some

O aviso verde some sozinho depois de 3 segundos. Escreva um teste que confira que ele **aparece** e depois **some** (`should('not.exist')`).

Depois, reescreva esse teste usando `cy.clock()` e `cy.tick(3000)`, para que ele não precise esperar 3 segundos de verdade. No `BUGS.md`, responda em 2 linhas: por que controlar o relógio deixa a suíte de testes mais rápida e confiável?

### 4.3 Entrega

Compacte a pasta do projeto **sem** `node_modules` e envie no Classroom junto com o print do `npm run cy:run`.

---

## Critérios de avaliação

| Critério | Consigo | Não consigo |
| --- | --- | --- |
| Instala, configura e executa o Cypress (modo interativo e headless) | | |
| Seleciona elementos com `data-cy` e interage com eles (digitar, clicar, selecionar opção) | | |
| Organiza a suíte com `describe`, `it` e `beforeEach` | | |
| Escreve asserções de sucesso e de erro (mensagens de validação) | | |
| Testa fluxos completos com regra de negócio (livro emprestado não pode ser removido) | | |
| Encontra um defeito e escreve um teste que o reproduz | | |
| Escreve um relatório de bug com passos, resultado esperado, resultado obtido e severidade | | |

## Se travar

- **O Cypress não instala** (a rede da escola pode bloquear o download): avise o professor.
- **O `cy.visit` não carrega:** confira se o `npm run dev` está rodando no outro terminal.
- **O elemento não é encontrado:** confira o nome do `data-cy` em `src/App.jsx`.
