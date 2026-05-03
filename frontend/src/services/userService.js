// src/services/userService.js
import apiClient from './apiClient.js';

export const userService = {
  getProfile: async () => {
    const res = await apiClient.get('/user/profile');
    return res.data;
  },

  updateProfile: async (profileData) => {
    const res = await apiClient.put('/user/profile', profileData);
    return res.data;
  },

  // Farms
  getFarms: async () => {
    const res = await apiClient.get('/user/farms');
    return res.data;
  },

  addFarm: async (farmData) => {
    const res = await apiClient.post('/user/farms', farmData);
    return res.data;
  },

  updateFarm: async (farmId, farmData) => {
    const res = await apiClient.put(`/user/farms/${farmId}`, farmData);
    return res.data;
  },

  deleteFarm: async (farmId) => {
    const res = await apiClient.delete(`/user/farms/${farmId}`);
    return res.data;
  },
};
