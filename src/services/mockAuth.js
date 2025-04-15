// Mock user data
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'advertiser@example.com',
    password: 'advertiser123',
    role: 'advertiser',
    name: 'Advertiser User'
  },
  {
    id: 3,
    email: 'viewer@example.com',
    password: 'viewer123',
    role: 'viewer',
    name: 'Viewer User'
  }
];

// Mock authentication service
export const mockAuthService = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: 'mock-jwt-token'
      };
    }
    throw new Error('Invalid email or password');
  },

  signup: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    };
    mockUsers.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: 'mock-jwt-token'
    };
  },

  logout: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
}; 