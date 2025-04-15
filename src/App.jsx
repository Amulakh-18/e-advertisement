import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery, useTheme, Divider, Container } from '@mui/material';
import {
  Home,
  Dashboard,
  AddCircleOutline,
  Campaign,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Logout,
  TrackChanges as TargetIcon,
  AttachMoney as BudgetIcon,
} from '@mui/icons-material';
import theme from './theme';
import HomePage from './features/home/HomePage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import AdminDashboard from './features/admin/AdminDashboard';
import AdvertiserDashboard from './features/advertiser/AdvertiserDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider, useAuth, UserRoles } from './contexts/AuthContext';
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

// Define drawer width constant
const DRAWER_WIDTH = 240;

const Navigation = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAuthenticated, user, logout, isAdvertiser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Features', path: '/features', icon: <Dashboard /> },
    { text: 'Benefits', path: '/benefits', icon: <Dashboard /> },
    { text: 'FAQ', path: '/faq', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%',
      background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AV's Advertisement
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.primary,
              '&:hover': {
                background: 'rgba(33, 150, 243, 0.1)',
              },
              borderLeft: location.pathname === item.path ? `4px solid ${theme.palette.primary.main}` : 'none',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {isAuthenticated && user?.role === UserRoles.ADMIN && (
          <ListItem
            button
            component={Link}
            to="/admin"
            selected={location.pathname.startsWith('/admin')}
            sx={{
              color: location.pathname.startsWith('/admin') ? theme.palette.primary.main : theme.palette.text.primary,
              '&:hover': {
                background: 'rgba(33, 150, 243, 0.1)',
              },
              borderLeft: location.pathname.startsWith('/admin') ? `4px solid ${theme.palette.primary.main}` : 'none',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname.startsWith('/admin') ? theme.palette.primary.main : theme.palette.text.primary }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Admin Dashboard" />
          </ListItem>
        )}
        {isAuthenticated && user?.role === UserRoles.ADVERTISER && (
          <>
            <ListItem
              button
              component={Link}
              to="/advertiser"
              selected={location.pathname === '/advertiser'}
              sx={{
                color: location.pathname === '/advertiser' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/advertiser' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/advertiser' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/advertiser/create-ad"
              selected={location.pathname === '/advertiser/create-ad'}
              sx={{
                color: location.pathname === '/advertiser/create-ad' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/advertiser/create-ad' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/advertiser/create-ad' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <AddCircleOutline />
              </ListItemIcon>
              <ListItemText primary="Create Ad" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/advertiser/campaigns"
              selected={location.pathname === '/advertiser/campaigns'}
              sx={{
                color: location.pathname === '/advertiser/campaigns' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/advertiser/campaigns' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/advertiser/campaigns' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <Campaign />
              </ListItemIcon>
              <ListItemText primary="Campaigns" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/advertiser/targeting"
              selected={location.pathname === '/advertiser/targeting'}
              sx={{
                color: location.pathname === '/advertiser/targeting' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/advertiser/targeting' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/advertiser/targeting' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <TargetIcon />
              </ListItemIcon>
              <ListItemText primary="Targeting" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/advertiser/budget"
              selected={location.pathname === '/advertiser/budget'}
              sx={{
                color: location.pathname === '/advertiser/budget' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/advertiser/budget' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/advertiser/budget' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <BudgetIcon />
              </ListItemIcon>
              <ListItemText primary="Budget" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/advertiser/analytics"
              selected={location.pathname === '/advertiser/analytics'}
              sx={{
                color: location.pathname === '/advertiser/analytics' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/advertiser/analytics' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/advertiser/analytics' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <Divider sx={{ my: 2 }} />
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                color: theme.palette.error.main,
                '&:hover': {
                  background: 'rgba(211, 47, 47, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.error.main }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
        {isAuthenticated && (
          <ListItem
            button
            component={Link}
            to="/settings"
            selected={location.pathname === '/settings'}
            sx={{
              color: location.pathname === '/settings' ? theme.palette.primary.main : theme.palette.text.primary,
              '&:hover': {
                background: 'rgba(33, 150, 243, 0.1)',
              },
              borderLeft: location.pathname === '/settings' ? `4px solid ${theme.palette.primary.main}` : 'none',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === '/settings' ? theme.palette.primary.main : theme.palette.text.primary }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        )}
        {isAuthenticated && user?.role === UserRoles.VIEWER && (
          <>
            <ListItem
              button
              component={Link}
              to="/viewer"
              selected={location.pathname === '/viewer'}
              sx={{
                color: location.pathname === '/viewer' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/viewer' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/viewer' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Viewer Dashboard" />
            </ListItem>
            <Divider sx={{ my: 2 }} />
          </>
        )}
      </List>
      {isAuthenticated && (
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            sx={{ 
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
              },
            }}
          >
            Logout
          </Button>
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: theme.palette.text.secondary }}>
            Logged in as: {user.email}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: DRAWER_WIDTH,
          zIndex: 1200,
          transform: `translateX(-${DRAWER_WIDTH}px)`,
          transition: theme.transitions.create(['transform', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: 300,
          }),
          ...(sidebarOpen && {
            transform: 'translateX(0)',
          }),
          '&:hover': {
            transform: 'translateX(0)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: -35,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 35,
            height: 100,
            background: 'linear-gradient(90deg, rgba(33, 150, 243, 0.3), transparent)',
            borderRadius: '0 20px 20px 0',
            opacity: sidebarOpen ? 0 : 1,
            transition: 'opacity 0.3s ease',
            cursor: 'pointer',
            zIndex: 1201,
            boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              background: 'linear-gradient(90deg, rgba(33, 150, 243, 0.4), transparent)',
            },
          },
        }}
        onMouseEnter={() => !sidebarOpen && setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            transition: theme.transitions.create('transform', {
              easing: theme.transitions.easing.easeInOut,
              duration: 300,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {!isAuthenticated ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
                sx={{
                  borderColor: 'rgba(33, 150, 243, 0.5)',
                  '&:hover': {
                    borderColor: '#2196F3',
                    background: 'rgba(33, 150, 243, 0.08)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="textSecondary">
                {user?.name}
              </Typography>
              <IconButton
                size="large"
                edge="end"
                aria-label="account"
                aria-haspopup="true"
                color="inherit"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                  alt={user?.name}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Navigation component with Drawer */}
      <Navigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          mt: '64px', // Add margin top to account for AppBar height
          minHeight: 'calc(100vh - 64px)', // Ensure minimum height for content
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Protected routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Advertiser routes */}
            <Route path="/advertiser" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                <AdvertiserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/advertiser/create-ad" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                <AdBuilder />
              </ProtectedRoute>
            } />
            <Route path="/advertiser/campaigns" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                <Campaigns />
              </ProtectedRoute>
            } />
            <Route path="/advertiser/targeting" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                <Targeting />
              </ProtectedRoute>
            } />
            <Route path="/advertiser/budget" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                <Budget />
              </ProtectedRoute>
            } />
            <Route path="/advertiser/analytics" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADVERTISER]}>
                <Analytics />
              </ProtectedRoute>
            } />

            {/* Viewer routes */}
            <Route path="/viewer" element={
              <ProtectedRoute allowedRoles={[UserRoles.VIEWER]}>
                <ViewerDashboard />
              </ProtectedRoute>
            } />

            {/* Settings route - accessible to all authenticated users */}
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={[UserRoles.ADMIN, UserRoles.ADVERTISER, UserRoles.VIEWER]}>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;