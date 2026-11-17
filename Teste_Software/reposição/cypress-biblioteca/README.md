# Biblioteca SENAI — prática de testes E2E com Cypress

Front-end React simples (sem back-end: os dados ficam em memória e **voltam ao estado inicial a cada recarregamento da página**).

## Como rodar

```bash
npm install
npm run dev   # -> http://localhost:5173
```

A atividade está em [`ENUNCIADO.md`](ENUNCIADO.md). O Cypress **não vem instalado**: a primeira etapa é seguir o [`SETUP-CYPRESS.md`](SETUP-CYPRESS.md).

## Login

- Usuário: `aluno`
- Senha: `senai123`

## Dados iniciais

| Título | Autor | Ano | Gênero | Situação |
| --- | --- | --- | --- | --- |
| Dom Casmurro | Machado de Assis | 1899 | Romance | Disponível |
| O Hobbit | J. R. R. Tolkien | 1937 | Fantasia | Emprestado para Carlos |
| Codigo Limpo | Robert C. Martin | 2008 | Tecnologia | Disponível |
| 1984 | George Orwell | 1949 | Ficcao | Disponível |

## Seletores

Todos os elementos importantes têm o atributo `data-cy`, que é a forma recomendada pelo Cypress de selecionar elementos:

```js
cy.get('[data-cy=btn-cadastrar]').click();
```
