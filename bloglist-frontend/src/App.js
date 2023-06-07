import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload(false)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = (event) => {
      event.preventDefault()
      const blogObject = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: 0
      }

      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog({title: '', author: '', url: ''})
          setSuccessMessage(
            `Success! Blog '${blogObject.title}' by '${blogObject.author}' was saved.`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Blog '${blogObject.title}' was not saved. That's all I know!`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    } 


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const userInfo = () => ( 
      <h2> 
        Logged in as: {user.name} 
        <button type="submit" onClick={handleLogout}> logout </button>
      </h2>      
  )

  const newBlogForm = () => (
    <form onSubmit={addBlog}>
      <h2>New Blog Entry</h2>
      <div>
        title:
          <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => setNewBlog({
            ...newBlog,
            title: target.value
          })}

        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => setNewBlog({
            ...newBlog,
            author: target.value
          })}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) => setNewBlog({
            ...newBlog,
            url: target.value
          })}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )

  return (
    <div>
      <Notification.Success message={successMessage} />
      <Notification.Error message={errorMessage} />
      {user ? userInfo() : loginForm()} 
      {user && newBlogForm()} 

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App