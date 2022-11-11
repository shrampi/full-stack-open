import axios from 'axios';
const url = '/api/login';

const login = async (credentials) => {
  console.log('here')
  const response = await axios.post(url, credentials);
  return response.data;
};

export default { login };
