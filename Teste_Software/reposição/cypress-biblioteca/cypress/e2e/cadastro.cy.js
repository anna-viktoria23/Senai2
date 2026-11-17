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

  it('ao entrar', () => {
    cy.get('[data-cy="contador"]').should('be.visible').and('have.text', '4 livro(s) no acervo, 1 emprestado(s)')
  })

  it('Cadastro, tabela, contador e aviso', () => {
    cy.get('[data-cy="input-titulo"]').type('Duna')
    cy.get('[data-cy="input-autor"]').type('Frank Herbert')
    cy.get('[data-cy="input-ano"]').type('1965')
    cy.get('[data-cy="select-genero"]').select('Ficcao')
    cy.get('[data-cy="btn-cadastrar"]').click()

    cy.get('[data-cy="linha-livro"]').should('have.length', 5)
    cy.get('[data-cy="tabela-livros"]').should('contain', 'Duna')

    cy.get('[data-cy=aviso]').should('be.visible').and('have.text', 'Livro cadastrado com sucesso');
  })

  it('Titulo e Autor obrigatorios, formulario enviado vazio', ()=>{
    cy.get('[data-cy="btn-cadastrar"]').click()

    cy.get('[data-cy="form-erro"]').should('be.visible').and('have.text', "Titulo e autor sao obrigatorios")
  })

  it('Ano invalido no futuro', () => {
    cy.get('[data-cy="input-titulo"]').type('Fundacao')
    cy.get('[data-cy="input-autor"]').type('Isaac Asimov')
    cy.get('[data-cy="input-ano"]').type('2999')
    cy.get('[data-cy="btn-cadastrar"]').click()

    cy.get('[data-cy="form-erro"]').should('be.visible').and('have.text', 'Ano invalido')
  })

  it('Livro ja cadastrado', () => {
    cy.get('[data-cy=input-titulo]').type('dom casmurro');
    cy.get('[data-cy=input-autor]').type('Machado de Assis');
    cy.get('[data-cy=input-ano]').type('1899');
    cy.get('[data-cy=btn-cadastrar]').click();

    cy.get('[data-cy=form-erro]')
      .should('be.visible')
      .and('have.text', 'Livro ja cadastrado');
  });

  it('campos vazios apos o cadastro', () => {
    cy.get('[data-cy=input-titulo]').type('Duna');
    cy.get('[data-cy=input-autor]').type('Frank Herbert');
    cy.get('[data-cy=input-ano]').type('1965');
    cy.get('[data-cy=select-genero]').select('Ficcao');
    cy.get('[data-cy=btn-cadastrar]').click();

    cy.get('[data-cy=input-titulo]').should('have.value', '');
    cy.get('[data-cy=input-autor]').should('have.value', '');
    cy.get('[data-cy=input-ano]').should('have.value', '');
    cy.get('[data-cy=select-genero]').should('have.value', 'Romance');
  });

});