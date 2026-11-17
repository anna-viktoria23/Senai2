
describe('login', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('entra com usuario e senha validos', () => {

    cy.get('[data-cy="login-usuario"]').type('aluno')
    cy.get('[data-cy="login-senha"]').type('senai123')
    cy.get('[data-cy="btn-entrar"]').click()

    cy.get('[data-cy="saudacao"]')
      .should('have.text', 'Ola, aluno')

  })

  it('preencha usuario e senha', () => {
    cy.get('[data-cy="btn-entrar"]').click()

    cy.get('[data-cy="login-erro"]').should('be.visible').and('have.text', 'Preencha usuario e senha')
  })

  it('usuario ou senha invalidos', () => {
    cy.get('[data-cy="login-usuario"]').type('alunos')
    cy.get('[data-cy="login-senha"]').type("123456")
    cy.get('[data-cy=btn-entrar]').click()

    cy.get('[data-cy="login-erro"]').should('be.visible').and('have.text', "Usuario ou senha invalidos")
  })

  it('faz login, conferir se voltou para tela de login', () => {
    cy.get('[data-cy="login-usuario"]').type('aluno')
    cy.get('[data-cy="login-senha"]').type('senai123')
    cy.get('[data-cy="btn-entrar"]').click()

    cy.get('[data-cy="btn-sair"]').click()

    cy.get('[data-cy="login-usuario"]').should('be.visible') //para preencher
    cy.get('[data-cy="login-senha"]').should('be.visible')
    cy.get('[data-cy="btn-entrar"]').should('be.visible')
  })
})

