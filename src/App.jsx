import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Toolbar } from '@mui/material';
import theme from './theme';
import HomePage from './features/home/HomePage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import AdminDashboard from './features/admin/AdminDashboard';
import AdvertiserDashboard from './features/advertiser/AdvertiserDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider, UserRoles } from './contexts/AuthContext';
import FeaturesPage from './features/features/FeaturesPage';
import BenefitsPage from './features/benefits/BenefitsPage';
import FAQPage from './features/faq/FAQPage';
import AdBuilder from './features/adBuilder/AdBuilder';
import Analytics from './features/analytics/Analytics';
import Campaigns from './features/campaigns/Campaigns';
import Footer from './components/layout/Footer';
import Settings from './features/settings/Settings';
import ViewerDashboard from './features/viewer/ViewerDashboard';
import Targeting from './features/targeting/Targeting';
import Budget from './features/budget/Budget';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - 240px)` },
                ml: { sm: '240px' },
                background: 'linear-gradient(135deg, #0A1929 0%, #1A2027 100%)',
              }}
            >
              <Toolbar /> {/* This creates space for the fixed AppBar */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/benefits" element={<BenefitsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                
                {/* Protected Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.ADMIN]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Advertiser Routes */}
                <Route
                  path="/advertiser"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                      <AdvertiserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/advertiser/create-ad"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                      <AdBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/advertiser/campaigns"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                      <Campaigns />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/advertiser/analytics"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/advertiser/targeting"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                      <Targeting />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/advertiser/budget"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                      <Budget />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Viewer Routes */}
                <Route
                  path="/viewer"
                  element={
                    <ProtectedRoute allowedRoles={[UserRoles.VIEWER]}>
                      <ViewerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Settings Route (accessible to all authenticated users) */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;