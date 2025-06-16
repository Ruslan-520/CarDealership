import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api'
    : '/api',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {

  if(!config.skipAuth){
    const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;

      }
  }

  return config;
});

export default apiClient;