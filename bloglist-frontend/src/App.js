import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

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
      console.log('User: ', user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('user: ', user)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload(false)
  }

  const compareLikes = (a, b) => {
    return b.likes - (a.likes + 1)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs.sort(compareLikes) )
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

  useEffect(() => {
    setBlogs( blogs.sort(compareLikes) )
  }, [blogs])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('blogObject: ', blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log('returnedBlog: ', returnedBlog.user)
        setSuccessMessage(
          `Success! Blog '${blogObject.title}' by '${blogObject.author}' was saved.`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Blog '${blogObject.title}' was not saved. Error message: ${error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateLikes = (id, newLikes) => {
    // console.log('id:', id)
    // console.log('blogs:', blogs)
    // let index = blogs.findIndex(blog => blog.id === id)
    const blog = blogs.find(b => b.id ===id)
    const changedBlog = { ...blog, likes: newLikes }

    // console.log('index: ', index)
    // console.log('changedBlog: ', changedBlog)

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(
          `Additional like was not saved. Full error message: ${error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlogs = (id) => {
    console.log('id :', id)
    const blog = blogs.find(b => b.id ===id)

    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      blogService
        .deleteItem(id)
        .then(setBlogs(blogs.filter(blog => blog.id !== id )))
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        type='submit'
        id='login-button'> login </button>
    </form>
  )

  const userInfo = () => (
    <h2>
        Logged in as: {user.name}
      <button type='submit' onClick={handleLogout}> logout </button>
    </h2>
  )

  return (
    <div>
      <Notification.Success message={successMessage} />
      <Notification.Error message={errorMessage} />
      {user ? userInfo() : loginForm()}
      {user &&
        <div>
          <Togglable buttonLabel='add new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
              user = {user}/>
          </Togglable>
        </div>
      }

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          removeBlogs = {removeBlogs}
          user = {user} />
      )}
    </div>
  )
}

export default App