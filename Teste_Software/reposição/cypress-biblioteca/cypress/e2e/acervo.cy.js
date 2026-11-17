function login() {
  cy.visit('/');
  cy.get('[data-cy=login-usuario]').type('aluno')
  cy.get('[data-cy=login-senha]').type('senai123')
  cy.get('[data-cy=btn-entrar]').click()
}

describe('Acervo - biblioteca', () => {
  beforeEach(() => {
    login();
  });

  it('Buscar mostra so 1 livro', () => {
    cy.get('[data-cy=busca]').type('hobbit')

    cy.get('[data-cy=linha-livro]').should('have.length', 1)
    cy.get('[data-cy=linha-livro]').should('contain', 'O Hobbit')
  })

  it('Buscar livro inexistente', () => {
    cy.get('[data-cy=busca]').type('zzz')

    cy.get('[data-cy=vazio]').should('be.visible').and('have.text', 'Nenhum livro encontrado')
  })

  it('O filtro dos emprestados', () => {
    cy.get('[data-cy=filtro-status]').select('emprestados')

    cy.get('[data-cy=linha-livro]').should('have.length', 1)
    cy.get('[data-cy=linha-livro]').should('contain', 'O Hobbit')
  })

  it('Emprestar, nome e contador', () => {
    cy.contains('[data-cy=linha-livro]', '1984').find('[data-cy=btn-emprestar]').click()

    cy.get('[data-cy=input-leitor]').type('Maria')
    cy.get('[data-cy=btn-confirmar-emprestimo]').click()

    cy.contains('[data-cy=linha-livro]', '1984').find('[data-cy=situacao]').should('have.text', 'Emprestado para Maria')

    cy.get('[data-cy=contador]').should('have.text', '4 livro(s) no acervo, 2 emprestado(s)')
  })

  it('Informe o nome do leitor', () => {
    cy.contains('[data-cy=linha-livro]', '1984').find('[data-cy=btn-emprestar]').click()

    cy.get('[data-cy=btn-confirmar-emprestimo]').click()

    cy.get('[data-cy=emprestimo-erro]').should('be.visible').and('have.text', 'Informe o nome do leitor')
  })

  it('cancelar o emprestimo', () => {
    cy.contains('[data-cy=linha-livro]', '1984').find('[data-cy=btn-emprestar]').click()

    cy.get('[data-cy=btn-cancelar-emprestimo]').click()

    cy.get('[data-cy=modal-emprestimo]').should('not.exist')
    cy.contains('[data-cy=linha-livro]', '1984').find('[data-cy=situacao]').should('have.text', 'Disponivel')
  })

  it('Devolução e volta ao disponivel', () => {
    cy.contains('[data-cy=linha-livro]', 'O Hobbit').find('[data-cy=btn-devolver]').click();

    cy.contains('[data-cy=linha-livro]', 'O Hobbit').find('[data-cy=situacao]').should('have.text', 'Disponivel')
  })


  it('remover desabilitado', () => {
    cy.contains('[data-cy=linha-livro]', 'O Hobbit').find('[data-cy=btn-remover]').should('be.disabled')
  })

  it('Remover, modal, livro continua na tabela', () => {
    cy.contains('[data-cy=linha-livro]', '1984').find('[data-cy=btn-remover]').click()

    cy.get('[data-cy=btn-cancelar-remocao]').click()

    cy.get('[data-cy=modal-remover]').should('not.exist')
    cy.contains('[data-cy=linha-livro]', '1984').should('be.visible')
  })

  it('Remover e confirmar', () => {
    cy.contains('[data-cy=linha-livro]', '1984')
      .find('[data-cy=btn-remover]')
      .click()

    cy.get('[data-cy=btn-confirmar-remocao]').click()

    cy.contains('[data-cy=linha-livro]', '1984').should('not.exist')
    cy.get('[data-cy=linha-livro]').should('have.length', 3)
  })

  it('busca por autor em minusculas', () => {
  cy.get('[data-cy=busca]').type('tolkien');

  cy.get('[data-cy=linha-livro]').should('have.length', 1);
  cy.get('[data-cy=linha-livro]').should('contain', 'O Hobbit');
})
})