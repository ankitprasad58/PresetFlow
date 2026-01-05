// services/aiService.ts
import axios from 'axios';

const API_BASE =  'http://localhost:4000/api';

export const aiService = {
  async generateContent(data: {
    prompt: string;
    template?: string;
    platform?: string;
    status?: string;
  }) {
    const response = await axios.post(`${API_BASE}/ai/generate`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async getConversations(page = 1, limit = 10) {
    const response = await axios.get(`${API_BASE}/ai/conversations`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async getTemplates() {
    const response = await axios.get(`${API_BASE}/ai/templates`);
    return response.data;
  },

  async getConversation(id: string) {
    const response = await axios.get(`${API_BASE}/ai/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },
};