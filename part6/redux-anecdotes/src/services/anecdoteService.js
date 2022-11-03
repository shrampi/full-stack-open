import axios from 'axios';

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
}

const create = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }
  const response = await axios.post(url, anecdote);
  return response.data;
}

export default { getAll, create }