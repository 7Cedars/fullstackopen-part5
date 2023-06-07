const Blog = ({blog}) => (
  <div>
    Title: {blog.title}  
    Author: {blog.author} 
    URL: {blog.url} 
    Likes: {blog.likes}
  </div>  
)

export default Blog