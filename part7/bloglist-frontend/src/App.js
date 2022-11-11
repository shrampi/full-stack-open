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
import { checkLocalStorageForUser, login, logout } from './reducers/user';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(checkLocalStorageForUser());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(login(username, password));
      setUsername('');
      setPassword('');
    } catch {
      notify('wrong credentials');
    }
  };

  const logoutButton = () => {
    if (state.user) {
      return (
        <div>
          {`logged in as ${state.user.username}`}
          <button
            onClick={() => {
              dispatch(logout());
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
    const showWhenUserNotLoggedIn = { display: state.user ? 'none' : '' };

    return (
      <div style={showWhenUserNotLoggedIn}>
        <Toggleable
          visible={state.user ? false : true}
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
    const showWhenUserLoggedIn = { display: state.user ? '' : 'none' };
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
      {state.user !== null && blogsDisplay()}
    </div>
  );
};

export default App;
