import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Ad Campaign API
export const campaignAPI = {
  createCampaign: (data) => api.post('/campaigns', data),
  getCampaigns: () => api.get('/campaigns'),
  getCampaign: (id) => api.get(`/campaigns/${id}`),
  updateCampaign: (id, data) => api.put(`/campaigns/${id}`, data),
  deleteCampaign: (id) => api.delete(`/campaigns/${id}`),
};

// Ad Builder API
export const adBuilderAPI = {
  createAd: (data) => api.post('/ads', data),
  getAds: () => api.get('/ads'),
  getAd: (id) => api.get(`/ads/${id}`),
  updateAd: (id, data) => api.put(`/ads/${id}`, data),
  deleteAd: (id) => api.delete(`/ads/${id}`),
  uploadMedia: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/ads/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Analytics API
export const analyticsAPI = {
  getCampaignStats: (campaignId) => api.get(`/analytics/campaigns/${campaignId}`),
  getOverallStats: () => api.get('/analytics/overall'),
  getDateRangeStats: (startDate, endDate) =>
    api.get('/analytics/range', { params: { startDate, endDate } }),
};

// Targeting API
export const targetingAPI = {
  getAudiences: () => api.get('/targeting/audiences'),
  createAudience: (data) => api.post('/targeting/audiences', data),
  updateAudience: (id, data) => api.put(`/targeting/audiences/${id}`, data),
  deleteAudience: (id) => api.delete(`/targeting/audiences/${id}`),
};

// Budget API
export const budgetAPI = {
  getBudgetStats: (campaignId) => api.get(`/budget/${campaignId}`),
  updateBudget: (campaignId, data) => api.put(`/budget/${campaignId}`, data),
  getBudgetAlerts: () => api.get('/budget/alerts'),
};

export default api; 