describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Seven Cedars',
      username: '7Cedars',
      password: 'PleaseLetMeIn!'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('7Cedars')
      cy.get('#password').type('PleaseLetMeIn!')
      cy.get('#login-button').click()

      cy.contains('Seven Cedars')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('7Cedars')
      cy.get('#password').type('WRONG PASSWORD')
      cy.get('#login-button').click()

      cy.contains('Wrong')
    })
  })

})