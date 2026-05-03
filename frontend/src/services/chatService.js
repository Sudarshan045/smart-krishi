import apiClient from './apiClient';

export const chatService = {
  saveMessage: async (data) => {
    // data: { userMessage, assistantResponse, sessionId, category, language }
    const res = await apiClient.post('/chat/message', data);
    return res.data;
  },

  getHistory: async (page = 1, limit = 20, sessionId = null) => {
    let url = `/chat/history?page=${page}&limit=${limit}`;
    if (sessionId) url += `&session_id=${sessionId}`;
    const res = await apiClient.get(url);
    return res.data;
  },

  clearHistory: async () => {
    const res = await apiClient.delete('/chat/history');
    return res.data;
  },

  submitFeedback: async (messageId, feedback) => {
    // feedback: 'positive' | 'negative'
    const res = await apiClient.patch(`/chat/messages/${messageId}/feedback`, { feedback });
    return res.data;
  }
};
