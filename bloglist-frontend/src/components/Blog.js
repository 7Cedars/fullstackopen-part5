import { useState } from 'react'

const Blog = ({blog}) => {

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

  return (
    <div style={blogStyle}>
      <div>
        { `'${blog.title}' by '${blog.author}'.`} 
        <button onClick={toggleDetails}> {details ? 'hide':'view'}  </button>
      </div> 
      
      {details ? 
        <div> 
          <div> {`Url: '${blog.url}' `}  </div> 
          <div> {`Likes: '${blog.likes}' `} </div> 
          <div> {`Created by: '${blog.user.name}' `} </div> 
        </div> 
        : null 
      } 
    </div>
  )
}

export default Blog