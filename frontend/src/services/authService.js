// src/services/authService.js
import apiClient from './apiClient.js';

export const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    const res = await apiClient.post('/auth/register', userData);
    return res.data; // { success, token, user }
  },

  /**
   * Login with email and password
   */
  login: async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password });
    return res.data; // { success, token, user }
  },

  /**
   * Get the current authenticated user's data
   */
  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data; // { success, user }
  },

  /**
   * Logout (server-side confirmation)
   */
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Even if network fails, we clear local state
    }
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword, newPassword) => {
    const res = await apiClient.put('/auth/change-password', { currentPassword, newPassword });
    return res.data;
  },
};
