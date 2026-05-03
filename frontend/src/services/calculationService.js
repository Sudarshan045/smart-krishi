import apiClient from './apiClient.js';

export const calculationService = {
  getCalculations: async () => {
    const res = await apiClient.get('/calculations');
    return res.data;
  },

  getCalculationById: async (id) => {
    const res = await apiClient.get(`/calculations/${id}`);
    return res.data;
  },

  saveCalculation: async (calcData) => {
    const res = await apiClient.post('/calculations', calcData);
    return res.data;
  },
};
