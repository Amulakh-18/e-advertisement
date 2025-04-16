import { mockAnalytics } from './mockData';

export const analyticsAPI = {
  getPerformanceData: async (timeRange = 'week') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalytics.performance);
      }, 500);
    });
  },

  getMetrics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalytics.metrics);
      }, 500);
    });
  },

  exportData: async (format = 'csv') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  },

  getTrends: async (metric, timeRange = 'week') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalytics.trends);
      }, 500);
    });
  }
}; 