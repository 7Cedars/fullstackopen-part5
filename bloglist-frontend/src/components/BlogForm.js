import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, user }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog2 = (event) => {
    event.preventDefault()
    createBlog ({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: user,
      likes: 0
    })

    setNewBlog({ title: '', author: '', url: '' })
  }

  useEffect(() => {
    console.log('newBlog: ', newBlog)
  }, [newBlog])

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  return (
    <div>

      <h2>New Blog Entry</h2>

      <form onSubmit={addBlog2}>
        <div>
            title:
          <input
            type='text'
            value={newBlog.title}
            placeholder='Title of blog'
            id='blogTitle'
            onChange={event => setNewBlog({
              ...newBlog,
              title: event.target.value
            })}
          />
        </div>
        <div>
            author:
          <input
            type='text'
            value={newBlog.author}
            placeholder='Author of blog'
            id='blogAuthor'
            onChange={event => setNewBlog({
              ...newBlog,
              author: event.target.value
            })}
          />
        </div>
        <div>
            url:
          <input
            type='text'
            value={newBlog.url}
            placeholder='Url of blog'
            id='blogUrl'
            onChange={event => setNewBlog({
              ...newBlog,
              url: event.target.value
            })}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default BlogForm