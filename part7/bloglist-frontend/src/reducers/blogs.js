import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { notify } from './notification';

const blogsLikesComparison = (blog1, blog2) => {
  if (blog1.likes < blog2.likes) {
    return 1;
  }
  if (blog1.likes > blog2.likes) {
    return -1;
  }
  return 0;
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort(blogsLikesComparison);
    },
    addBlog(state, action){
      return state.concat(action.payload);
    },
    removeBlog(state, action){
      const blogToRemove = action.payload;
      return state.filter((blog) => {
        return blog._id.toString() !== blogToRemove._id.toString();
      });
    },
    incrementLikes(state, action){
      const incrementedBlog = { ...action.payload, likes: action.payload.likes + 1 }
      return state
        .map(b => {
          return b._id.toString() === incrementedBlog._id.toString() ? incrementedBlog : b;
        })
        .sort(blogsLikesComparison);
    },
  }
})

export const blogsActions = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(blogsActions.setBlogs(blogs));
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(blogsActions.addBlog(newBlog));
  }
}

export const incrementLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(updatedBlog);
    dispatch(blogsActions.incrementLikes(blog));
    notify(`liked ${blog.title}`);
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      await blogService.remove(blog)
      dispatch(blogsActions.removeBlog(blog));
      notify(`removed blog ${blog.title}`);
    }
  }
}

export default blogsSlice.reducer;
