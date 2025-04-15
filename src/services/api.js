import axios from 'axios';
import { mockCampaigns, mockAnalytics, mockAdTemplates } from './mockData';

// Use mock services in development
const USE_MOCK = true;

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// For testing purposes, use mock data
const mockUsers = {
  'admin@example.com': {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true
  },
  'advertiser@example.com': {
    id: 2,
    email: 'advertiser@example.com',
    password: 'advertiser123',
    firstName: 'Advertiser',
    lastName: 'User',
    role: 'advertiser',
    isActive: true
  },
  'viewer@example.com': {
    id: 3,
    email: 'viewer@example.com',
    password: 'viewer123',
    firstName: 'Viewer',
    lastName: 'User',
    role: 'viewer',
    isActive: true
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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
    // Use mock data for testing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers[email];
        if (user && user.password === password) {
          const { password: _, ...userWithoutPassword } = user;
          resolve({
            user: userWithoutPassword,
            token: 'mock-jwt-token-' + user.role
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },

  register: async (userData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  logout: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  getProfile: async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    // Extract role from mock token
    const role = token.split('-')[2];
    const user = Object.values(mockUsers).find(u => u.role === role);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
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
  createAd: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now() });
      }, 500);
    });
  },

  getAds: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns);
      }, 500);
    });
  },

  getAd: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns.find(c => c.id === id));
      }, 500);
    });
  },

  updateAd: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  deleteAd: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  uploadMedia: async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true,
          url: `https://picsum.photos/seed/${Date.now()}/600/400`
        });
      }, 1000);
    });
  }
};

// Analytics API
export const analyticsAPI = {
  getDashboardData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalytics);
      }, 500);
    });
  },

  getCampaignStats: async (campaignId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalytics);
      }, 500);
    });
  },

  getOverallStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalytics.overview);
      }, 500);
    });
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