import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

const update = (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`/api/blogs/${blog._id}`, blog, config);
  return request.then(response => response.data);
}

const remove = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`/api/blogs/${blog._id}`, config);
  return response.data;
}

export default { setToken, getAll, create, update, remove }