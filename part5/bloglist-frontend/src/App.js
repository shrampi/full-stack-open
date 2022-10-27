import { useState, useEffect } from 'react'
import axios from 'axios'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(blogsLikesComparison))
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));

      setUsername('');
      setPassword('');

    } catch (exception) {
      notify('wrong credentials')
    }
  }

  const addBlog = async (blog) => {
    console.log(blog)
    try {
      const response = await blogService.create(blog);
      setBlogs(blogs.concat(response));
      notify(`new blog ${blog.title} by ${blog.author} added`)
    } catch (error) {
      console.log(error.message);
    }
  }

  const blogsLikesComparison = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) {
      return 1;
    }
    if (blog1.likes > blog2.likes) {
      return -1;
    }
    return 0;
  }

  const incrementLikes = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(updatedBlog);
    const blogToUpdate = blogs.find(b => b._id.toString() === updatedBlog._id.toString())
    blogToUpdate.likes += 1;
    setBlogs(blogs.map(b => b._id.toString() === blogToUpdate._id.toString() ? blogToUpdate : b).sort(blogsLikesComparison));
  }

  const logoutButton = () => {
    if (user) {
      return (
        <div>
          {`logged in as ${user.username}`}
          <button
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem('user');
            }}>
            logout
          </button>
        </div>
      )
    }

  }

  const blogsDisplay = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog._id} blog={blog} incrementLikes={incrementLikes} />
        )}
      </div>
    )
  }

  const loginForm = () => {
    const showWhenUserNotLoggedIn = { display: user ? 'none' : '' }

    return (
      <div style={showWhenUserNotLoggedIn}>
        <Toggleable
          visible={user ? false : true}
          label={'click here to log in'}
        >
          <LoginForm
            onSubmit={handleLogin}
            username={username}
            onUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            onPasswordChange={({ target }) => setPassword(target.value)}
          />
        </Toggleable>
      </div>

    )
  }

  const blogForm = () => {
    const showWhenUserLoggedIn = { display: user ? '' : 'none' }

    return (
      <div style={showWhenUserLoggedIn}>
        <Toggleable
          visible={false}
          label={'new blog'}
        >
          <AddBlogForm addBlog={addBlog} />
        </Toggleable>
      </div>
    )
  }

  return (
    <div>

      {notification}
      {loginForm()}
      {logoutButton()}
      {blogForm()}
      {user !== null && blogsDisplay()}
    </div>
  )
}

export default App
