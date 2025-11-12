import axios from 'axios';

// Use relative path for API (works for both local dev and Vercel)
// In Vercel, /api routes are handled by serverless functions
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      try {
        const parsed = JSON.parse(token);
        if (parsed.state?.token) {
          config.headers.Authorization = `Bearer ${parsed.state.token}`;
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth on 401
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

