import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, addLikes, removeBlogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
    console.log(details)
  }

  const addLike = (event) => {
    event.preventDefault()
    console.log('blog.id: ', blogs.id)
    addLikes (blog.id, (blog.likes + 1))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    console.log('RemoveBlog called on, blog id:', blog.id)
    removeBlogs(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        { `'${blog.title}' by '${blog.author}'.`}
        <button onClick={toggleDetails}> {details ? 'hide':'view'}  </button>
      </div>

      {details ?
        <div>
          <div> {`Url: '${blog.url}' `}  </div>
          <div> {`Likes: '${blog.likes}' `} <button onClick={addLike}> Like </button> </div>
          <div> {`Created by: '${blog.user.name}' `} </div>
          <div> <button onClick={removeBlog}> Remove </button> </div>
        </div>
        : null
      }
    </div>
  )
}

export default Blog