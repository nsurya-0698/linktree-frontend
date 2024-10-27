import axios from 'axios';

const login = (email, password) => {
  return axios.post('http://localhost:3000/api/login', { email, password });
};

export { login };
