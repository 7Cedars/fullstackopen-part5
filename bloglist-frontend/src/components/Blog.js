import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlogs, user }) => {

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
    // console.log(details)
  }

  const addLike = (event) => {
    event.preventDefault()
    // console.log('blog.id: ', blogs.id)
    updateLikes (blog.id, (blog.likes + 1))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    // console.log('RemoveBlog called on, blog id:', blog.id)
    removeBlogs(blog.id)
  }

  return (
    <div style={blogStyle} >
      <div className='blog'>
        { `'${blog.title}' by '${blog.author}'.`}
        <button onClick={toggleDetails}> {details ? 'hide':'view'}  </button>
      </div>

      {details ?
        <div>
          <div className="blogUrls"> {`Url: '${blog.url}' `} </div>
          <div className="blogLikes"> {`Blog likes: '${blog.likes}' `} <button onClick={addLike} id='like-input'> Like </button> </div>
          <div className="blogUsername"> {`Created by: '${blog.user.name}' `} </div>
          {user.username === blog.user.username ?
            <div className="blogRemoveButton"> <button onClick={removeBlog}> Remove </button> </div> : null
          }
        </div>
        : null
      }
    </div>
  )
}

export default Blog