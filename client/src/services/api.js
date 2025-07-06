import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically add token and access key to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  const accessKey = localStorage.getItem('accessKey');
  if (token) {
    req.headers['Authorization'] = token;
    req.headers['x-access-key'] = accessKey;
  }
  return req;
});

export default API;
