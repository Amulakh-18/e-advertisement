import axios from 'axios';
import { mockAuthService } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
    console.error('Request error:', error);
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
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Handle forbidden access
      window.location.href = '/unauthorized';
    } else if (error.response?.status === 500) {
      console.error('Server error:', error);
      // Handle server error
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      // Use mock data for now
      return await mockAuthService.login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/me', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

// Advertisement API
export const advertisementAPI = {
  createAd: async (adData) => {
    const response = await api.post('/advertisements', adData);
    return response.data;
  },

  getAds: async (params = {}) => {
    const response = await api.get('/advertisements', { params });
    return response.data;
  },

  getAd: async (id) => {
    const response = await api.get(`/advertisements/${id}`);
    return response.data;
  },

  updateAd: async (id, adData) => {
    const response = await api.put(`/advertisements/${id}`, adData);
    return response.data;
  },

  deleteAd: async (id) => {
    const response = await api.delete(`/advertisements/${id}`);
    return response.data;
  },

  approveAd: async (id) => {
    const response = await api.post(`/advertisements/${id}/approve`);
    return response.data;
  },

  rejectAd: async (id) => {
    const response = await api.post(`/advertisements/${id}/reject`);
    return response.data;
  },

  uploadMedia: async (adId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/advertisements/${adId}/media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

// Ad Campaign API
export const campaignAPI = {
  createCampaign: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  getCampaigns: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns);
      }, 500);
    });
  },
  getCampaign: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns.find(c => c.id === id));
      }, 500);
    });
  },
  updateCampaign: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  deleteCampaign: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  pauseCampaign: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  resumeCampaign: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

// Ad Builder API
export const adBuilderAPI = {
  createAd: async (adData) => {
    try {
      const response = await api.post('/advertisements', adData);
      return response.data;
    } catch (error) {
      console.error('Create ad error:', error);
      throw error;
    }
  },

  getAds: async () => {
    try {
      const response = await api.get('/advertisements');
      return response.data;
    } catch (error) {
      console.error('Get ads error:', error);
      throw error;
    }
  },

  getAd: async (id) => {
    try {
      const response = await api.get(`/advertisements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get ad error:', error);
      throw error;
    }
  },

  updateAd: async (id, data) => {
    try {
      const response = await api.put(`/advertisements/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update ad error:', error);
      throw error;
    }
  },

  deleteAd: async (id) => {
    try {
      const response = await api.delete(`/advertisements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete ad error:', error);
      throw error;
    }
  },

  uploadMedia: async (adId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(`/advertisements/${adId}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload media error:', error);
      throw error;
    }
  }
};

// Analytics API
export const analyticsAPI = {
  getDashboardData: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getUserInteractions: async () => {
    const response = await api.get('/analytics/interactions');
    return response.data;
  },

  getSurveys: async () => {
    const response = await api.get('/analytics/surveys');
    return response.data;
  },

  submitFeedback: async (feedbackData) => {
    const response = await api.post('/analytics/feedback', feedbackData);
    return response.data;
  },

  toggleLike: async (likeData) => {
    const response = await api.post('/analytics/likes', likeData);
    return response.data;
  },

  participateInSurvey: async (participationData) => {
    const response = await api.post('/analytics/surveys/participate', participationData);
    return response.data;
  },

  getAdMetrics: async (adId) => {
    const response = await api.get(`/analytics/ads/${adId}/metrics`);
    return response.data;
  },

  getCampaignMetrics: async (campaignId) => {
    const response = await api.get(`/analytics/campaigns/${campaignId}/metrics`);
    return response.data;
  }
};

// Targeting API
export const targetingAPI = {
  getAudiences: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },
  createAudience: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  updateAudience: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  deleteAudience: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

export default api;