import axios from 'axios';

// Set the base URL for your API endpoints
axios.defaults.baseURL = 'http://20.124.247.142:80/api/';

// Add a request interceptor to attach the auth token to each request
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;