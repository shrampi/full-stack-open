import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notification';
import blogsReducer from './reducers/blogs';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer
  }
})

export default store;