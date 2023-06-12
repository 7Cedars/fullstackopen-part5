import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
      <Blog blog={blog} />
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
})

