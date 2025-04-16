import { mockCampaigns } from './mockData';

const campaignAPI = {
  createCampaign: async (campaignData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: campaignData });
      }, 500);
    });
  },

  getCampaigns: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns);
      }, 500);
    });
  },

  getCampaign: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns.find(c => c.id === id));
      }, 500);
    });
  },

  updateCampaign: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: { id, ...data } });
      }, 500);
    });
  },

  deleteCampaign: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  pauseCampaign: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  resumeCampaign: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  submitCampaign: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

export default campaignAPI; 