// src/services/apiClient.js
import axios from 'axios';

// Base URL — in dev, Vite proxies /api → http://localhost:5000
// In production, set VITE_API_URL in .env
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ─────────────────────────────────────────────
// Request Interceptor — attach JWT if available
// ─────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sk_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────
// Response Interceptor — handle 401 globally
// ─────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired/invalid — clear local storage and redirect to login
      localStorage.removeItem('sk_token');
      localStorage.removeItem('sk_user');
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.dispatchEvent(new CustomEvent('auth:expired'));
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
