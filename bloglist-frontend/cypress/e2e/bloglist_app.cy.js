describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Seven Cedars',
      username: '7Cedars',
      password: 'PleaseLetMeIn'
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
      cy.get('#password').type('PleaseLetMeIn')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: '7Cedars', password: 'PleaseLetMeIn' })

      cy.contains('add new blog').click()
      cy.get('#blogTitle').type('This is a standard blog..')
      cy.get('#blogAuthor').type('7Cedars')
      cy.get('#blogUrl').type('localhost:3003')
      cy.contains('Submit').click()
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()

      cy.get('#blogTitle').type('This is a test...')
      cy.get('#blogAuthor').type('Cypress')
      cy.get('#blogUrl').type('localhost:3000')

      cy.contains('Submit').click()
      cy.contains('Success')
      cy.contains('This is a test...')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('Like').click()
      cy.contains('1')
    })



  })
})