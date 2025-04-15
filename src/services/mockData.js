// Mock campaign data
export const mockCampaigns = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    status: 'active',
    budget: 5000,
    spent: 2300,
    impressions: 45000,
    clicks: 1200,
    conversions: 85,
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    targetAudience: {
      age: '18-35',
      location: ['New York', 'Los Angeles'],
      interests: ['Fashion', 'Shopping']
    }
  },
  {
    id: 2,
    name: 'Product Launch Campaign',
    status: 'scheduled',
    budget: 10000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    targetAudience: {
      age: '25-45',
      location: ['All US'],
      interests: ['Technology', 'Innovation']
    }
  }
];

// Mock analytics data
export const mockAnalytics = {
  overview: {
    totalImpressions: 150000,
    totalClicks: 4500,
    totalConversions: 320,
    totalSpent: 8500,
    averageCTR: 3.0,
    averageConversionRate: 7.1
  },
  dailyStats: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 5, i + 1).toISOString().split('T')[0],
    impressions: Math.floor(Math.random() * 5000) + 2000,
    clicks: Math.floor(Math.random() * 200) + 50,
    conversions: Math.floor(Math.random() * 20) + 5,
    spent: Math.floor(Math.random() * 300) + 100
  })),
  demographicData: {
    ageGroups: [
      { group: '18-24', percentage: 25 },
      { group: '25-34', percentage: 35 },
      { group: '35-44', percentage: 20 },
      { group: '45-54', percentage: 15 },
      { group: '55+', percentage: 5 }
    ],
    locations: [
      { city: 'New York', percentage: 30 },
      { city: 'Los Angeles', percentage: 25 },
      { city: 'Chicago', percentage: 20 },
      { city: 'Houston', percentage: 15 },
      { city: 'Others', percentage: 10 }
    ]
  }
};

// Mock ad templates
export const mockAdTemplates = [
  {
    id: 1,
    name: 'Banner Ad - Standard',
    type: 'banner',
    dimensions: '728x90',
    thumbnail: 'banner-template-1.jpg'
  },
  {
    id: 2,
    name: 'Social Media Post',
    type: 'social',
    dimensions: '1200x628',
    thumbnail: 'social-template-1.jpg'
  }
];

// Mock users data
const users = {
  admin: {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true
  },
  advertiser: {
    id: 2,
    email: 'advertiser@example.com',
    password: 'advertiser123',
    firstName: 'Advertiser',
    lastName: 'User',
    role: 'advertiser',
    isActive: true
  },
  viewer: {
    id: 3,
    email: 'viewer@example.com',
    password: 'viewer123',
    firstName: 'Viewer',
    lastName: 'User',
    role: 'viewer',
    isActive: true
  }
};

// Mock advertisements data
export const advertisements = [
  {
    id: "ad-1",
    title: "Summer Sale Campaign",
    description: "Promote summer collection with special discounts",
    image_url: "https://picsum.photos/seed/summer/600/400",
    advertiser_id: "adv-123",
    status: "active",
    start_date: "2024-03-01",
    end_date: "2024-03-31",
    target_audience: {
      age_range: [18, 35],
      interests: ["fashion", "shopping"],
      location: "New York"
    },
    budget: 1000,
    metrics: {
      views: 15000,
      clicks: 2500,
      conversions: 150,
      engagement_rate: 0.12
    }
  },
  {
    id: "ad-2",
    title: "Tech Gadget Launch",
    description: "New smartphone launch campaign",
    image_url: "https://picsum.photos/seed/tech/600/400",
    advertiser_id: "adv-123",
    status: "pending",
    start_date: "2024-04-01",
    end_date: "2024-04-30",
    target_audience: {
      age_range: [25, 45],
      interests: ["technology", "gadgets"],
      location: "Global"
    },
    budget: 2000,
    metrics: {
      views: 0,
      clicks: 0,
      conversions: 0,
      engagement_rate: 0
    }
  }
];

// Mock analytics data
export const analyticsData = {
  daily_views: [
    { date: "2024-03-01", views: 1200 },
    { date: "2024-03-02", views: 1500 },
    { date: "2024-03-03", views: 1800 }
  ],
  daily_clicks: [
    { date: "2024-03-01", clicks: 250 },
    { date: "2024-03-02", clicks: 320 },
    { date: "2024-03-03", clicks: 280 }
  ],
  conversion_rates: [
    { date: "2024-03-01", rate: 0.08 },
    { date: "2024-03-02", rate: 0.12 },
    { date: "2024-03-03", rate: 0.10 }
  ]
};

// Mock authentication service
export const mockAuthService = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    const user = Object.values(users).find(u => u.email === email);
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + user.role
      };
    }
    throw new Error('Invalid email or password');
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // Check if email already exists
    if (Object.values(users).some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      isActive: true
    };

    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + userData.role
    };
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return true;
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No token found');
    
    const role = token.split('-').pop();
    const user = Object.values(users).find(u => u.role === role);
    if (!user) throw new Error('User not found');
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};

export const mockAdService = {
  getAds: async () => advertisements,
  getAdById: async (id) => advertisements.find(ad => ad.id === id),
  createAd: async (adData) => ({
    ...adData,
    id: "ad-" + Date.now(),
    status: "pending",
    metrics: { views: 0, clicks: 0, conversions: 0, engagement_rate: 0 }
  }),
  updateAd: async (id, adData) => ({ ...adData, id }),
  deleteAd: async (id) => true,
  approveAd: async (id) => ({ ...advertisements.find(ad => ad.id === id), status: "active" }),
  rejectAd: async (id) => ({ ...advertisements.find(ad => ad.id === id), status: "rejected" })
};

export const mockAnalyticsService = {
  getDashboardData: async () => ({
    totalAds: advertisements.length,
    activeAds: advertisements.filter(ad => ad.status === "active").length,
    totalBudget: advertisements.reduce((sum, ad) => sum + ad.budget, 0),
    analytics: analyticsData
  })
};

export const mockDataService = {
  // Campaigns
  getCampaigns: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCampaigns;
  },

  createCampaign: async (campaignData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newCampaign = {
      id: mockCampaigns.length + 1,
      ...campaignData,
      status: 'draft',
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0
    };
    mockCampaigns.push(newCampaign);
    return newCampaign;
  },

  // Analytics
  getAnalytics: async (dateRange) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAnalytics;
  },

  // Ad Templates
  getAdTemplates: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAdTemplates;
  }
}; 