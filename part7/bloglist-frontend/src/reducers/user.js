import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { notify } from '../reducers/notification';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const userActions = userSlice.actions;

export const checkLocalStorageForUser = () => {
  return (dispatch) => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(userActions.setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    console.log(`logging in as ${username}...`);
    loginService.login({ username, password })
      .then(user => {
        console.log('login successful');
        dispatch(userActions.setUser(user));
        blogService.setToken(user.token);
        window.localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((data) => {
        console.log('login failed');
        dispatch(notify('wrong credentials'));
      });
  }
}

export const logout = () => {
  return dispatch => {
    console.log(`logging out`);
    dispatch(userActions.setUser(null));
    window.localStorage.removeItem('user');
  }
}

export default userSlice.reducer;
