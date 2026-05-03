import apiClient from './apiClient.js';

export const adminService = {
  getStats: async () => {
    const res = await apiClient.get('/admin/stats');
    return res.data;
  },
  getUsers: async () => {
    const res = await apiClient.get('/admin/users');
    return res.data;
  },
  toggleUserRole: async (userId, newRole) => {
    const res = await apiClient.put(`/admin/users/${userId}/role`, { role: newRole });
    return res.data;
  }
};
