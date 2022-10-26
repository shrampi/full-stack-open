import { useState, useEffect } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      notify(`new blog ${blogTitle} by ${blogAuthor} added`)
      setBlogAuthor('');
      setBlogTitle('');
      setBlogUrl('');
    } catch (error) {
      console.log(error.message);
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h1>Log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type='text' value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type='submit'>log in</button>
        </form>
      </div>
    );
  }

  const logoutButton = () => {
    return (
      <button
        onClick={() => {
          setUser(null);
          window.localStorage.removeItem('user');
        }}>
        logout
      </button>
    )
  }

  const blogsDisplay = () => {
    return (
      <div>
        <div>
          {`logged in as ${user.username}`}
          {logoutButton()};
        </div>
        <h2>Add Blog</h2>
        <AddBlogForm
          onSubmit={handleAddBlog}
          onTitleChange={({ target }) => setBlogTitle(target.value)}
          blogTitle={blogTitle}
          onAuthorChange={({ target }) => setBlogAuthor(target.value)}
          blogAuthor={blogAuthor}
          onUrlChange={({ target }) => setBlogUrl(target.value)}
          blogUrl={blogUrl}
        />
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {notification}
      {user === null && loginForm()}
      {user !== null && blogsDisplay()}

    </div>
  )
}

export default App
