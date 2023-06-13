import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Togglable Blog Component', () => {

  test('form calls the event handler it received as props with the right details', async () => {
    const createBlog = jest.fn()

    render(<BlogForm BlogForm={BlogForm} createBlog = {createBlog}  />)

    const user = userEvent.setup()
    const inputTitle = await screen.findByPlaceholderText('Title of blog')
    const inputAuthor = await screen.findByPlaceholderText('Author of blog')
    const inputUrl = await screen.findByPlaceholderText('Url of blog')
    const button = await screen.findByText('Submit')

    await userEvent.type(inputTitle, 'This is a test title..')
    await userEvent.type(inputAuthor, 'This is a test author..')
    await userEvent.type(inputUrl, 'This is a test url..')

    await user.click(button)

    expect(createBlog.mock.calls[0][0])
      .toStrictEqual({
        'author': 'This is a test author..',
        'likes': 0,
        'title': 'This is a test title..',
        'url': 'This is a test url..',
        'user': undefined
      })
  })
})