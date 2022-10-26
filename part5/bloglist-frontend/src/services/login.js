import axios from 'axios';
const url = '/api/login';

const login = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(url, credentials);
  return response.data;
}

export default { login };