import { useState, useEffect } from 'react';
import AddBlogForm from './components/AddBlogForm';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';
import { notify } from './reducers/notification';
import { initializeBlogs } from './reducers/blogs';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      
      notify('wrong credentials');
    }
  };

  const logoutButton = () => {
    if (user) {
      return (
        <div>
          {`logged in as ${user.username}`}
          <button
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem('user');
            }}
          >
            logout
          </button>
        </div>
      );
    }
  };

  const blogsDisplay = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {state.blogs.map((blog) => (
          <Blog
            key={blog._id}
            blog={blog}
          />
        ))}
      </div>
    );
  };

  const loginForm = () => {
    const showWhenUserNotLoggedIn = { display: user ? 'none' : '' };

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
    );
  };

  const blogForm = () => {
    const showWhenUserLoggedIn = { display: user ? '' : 'none' };
    return (
      <div style={showWhenUserLoggedIn}>
        <Toggleable visible={false} label={'new blog'}>
          <AddBlogForm />
        </Toggleable>
      </div>
    );
  };

  return (
    <div>
      {state.notification}
      {loginForm()}
      {logoutButton()}
      {blogForm()}
      {user !== null && blogsDisplay()}
    </div>
  );
};

export default App;
