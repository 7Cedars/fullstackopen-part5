import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Togglable Blog Component', () => {
  let container

  const blog = {
    title: 'Testing the Blog component',
    author: 'ReactJS',
    url: 'www.vercel.com',
    user: '6486ddaee365d29b38fffc71',
    likes: 0
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog}/>
    ).container
  })

  test('initially only renders summary content', () => {

    const titleElement = screen.findByText('Testing the Blog component')
    expect(titleElement).toBeDefined()

    const authorElement = screen.findByText('ReactJS')
    expect(authorElement).toBeDefined()

    const urlElement = container.querySelector('.blogUrls')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('Likes')
    expect(likesElement).toBeNull()
  })

  test('displays detailed content after view button is pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = container.querySelector('.blogUrls')
    expect(urlElement).toBeDefined()

    const likesElement = screen.queryByText('Likes')
    expect(likesElement).toBeDefined()
  })
})

describe('The Like button', () => {

  test('sends correct number of props', async () => {

    const blog = {
      title: 'Testing the Blog component',
      author: 'ReactJS',
      url: 'www.vercel.com',
      user: '6486ddaee365d29b38fffc71',
      likes: 0
    }

    const mockHandler = jest.fn(0 + 0)

    render(<Blog blog={blog} updateLikes = {mockHandler}  />)

    const user = userEvent.setup()
    const button = screen.getAllByText('view')
    await user.click(button[0])

    const likeButton = screen.queryAllByText('Like')
    expect(likeButton[0]).toBeDefined()

    await user.click(likeButton[0])
    await user.click(likeButton[0])

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

