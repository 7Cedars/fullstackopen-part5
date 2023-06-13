describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Seven Cedars',
      username: '7Cedars',
      password: 'PleaseLetMeIn'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Teije Hidde',
      username: 'teijehidde',
      password: '7Cedars'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

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

      cy.get('.error').should('contain', 'Wrong')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: '7Cedars', password: 'PleaseLetMeIn' })

      cy.createBlog({
        title: 'Another blog',
        author: 'Someone',
        user: JSON.parse(localStorage.getItem('loggedNoteappUser')),
        url: 'google.com',
        likes: 0
      })
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

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('Remove').click()

      cy.contains('Another Blog').should('not.exist')
    })

    it('Only shows Remove button when creator is logged in ', function() {
      cy.contains('logout').click()
      cy.login({ username: 'teijehidde', password: '7Cedars' })

      cy.contains('view').click()
      cy.contains('Remove').should('not.exist')
    })
  })

  describe('Blogs sorting', function() {

    beforeEach(function() {
      cy.login({ username: '7Cedars', password: 'PleaseLetMeIn' })

      cy.login({ username: '7Cedars', password: 'PleaseLetMeIn' })

      cy.createBlog({
        title: 'A blog less liked',
        author: 'Noone?',
        user: JSON.parse(localStorage.getItem('loggedNoteappUser')),
        url: 'google.com',
        likes: 0
      })

      cy.createBlog({
        title: 'A most liked blog',
        author: 'Someone',
        user: JSON.parse(localStorage.getItem('loggedNoteappUser')),
        url: 'google.com',
        likes: 3
      })

      cy.createBlog({
        title: 'A second most liked blog',
        author: 'Someone else',
        user: JSON.parse(localStorage.getItem('loggedNoteappUser')),
        url: 'google.com',
        likes: 2
      })

      cy.createBlog({
        title: 'A third most liked blog',
        author: 'Someone else',
        user: JSON.parse(localStorage.getItem('loggedNoteappUser')),
        url: 'google.com',
        likes: 1
      })
    })

    it('Correctly sorts blogs at startup', function() {

      cy.get('.blog').eq(0).should('contain', 'most')
      cy.get('.blog').eq(1).should('contain', 'second')
      cy.get('.blog').eq(2).should('contain', 'third')

    })

    it('reorders blogs after likes are added', function() {

      cy.contains('third most liked').parent().find('button').click()

      cy.contains('Like').click()
      cy.wait(500)
      cy.contains('Like').click()
      cy.wait(500)

      cy.get('.blog').eq(0).should('contain', 'most')
      cy.get('.blog').eq(1).should('contain', 'third')
      cy.get('.blog').eq(2).should('contain', 'second')

    })
  })
})