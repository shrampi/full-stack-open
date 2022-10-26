import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState(null);
  const [notification, setNotification] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userTokenJSON = window.localStorage.getItem('userToken');
    if (userTokenJSON) {
      const token = JSON.parse(userTokenJSON)
      setUserToken(token);
      const user = JSON.parse(window.localStorage.getItem('currentUser'));
      setCurrentUser(user);
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const token = await loginService.login({ username, password });
      setUserToken(token);
      setCurrentUser(username);
      window.localStorage.setItem('userToken', JSON.stringify(token));
      window.localStorage.setItem('currentUser', JSON.stringify(username));

      setUsername('');
      setPassword('');

    } catch (exception) {
      setNotification('wrong credentials');
      setTimeout(() => setNotification(null), 5000);
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
          <button type='submit'>login</button>
        </form>
      </div>
    );
  }

  const blogsDisplay = () => {
    return (
      <div>
        <div>
          {`logged in as ${currentUser}`}
          <button 
            onClick={() => {
              setUserToken(null);
              setCurrentUser(null);
              window.localStorage.removeItem('userToken');
              window.localStorage.removeItem('currentUser');
            }}>
            logout
          </button>
        </div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {notification}
      {userToken === null && loginForm()}
      {userToken !== null && blogsDisplay()}

    </div>
  )
}

export default App
