import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery, useTheme, Divider, Container } from '@mui/material';
import { Home, Dashboard, People, Settings, Login, Logout, Menu as MenuIcon } from '@mui/icons-material';
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

// Define drawer width constant
const DRAWER_WIDTH = 240;

const Navigation = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAuthenticated, user, logout } = useAuth();
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
    { text: 'Benefits', path: '/benefits', icon: <People /> },
    { text: 'FAQ', path: '/faq', icon: <Settings /> },
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
        {isAuthenticated && user?.role === 'admin' && (
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
        {isAuthenticated && user?.role === 'advertiser' && (
          <>
            <ListItem
              button
              component={Link}
              to="/advertiser"
              selected={location.pathname.startsWith('/advertiser')}
              sx={{
                color: location.pathname.startsWith('/advertiser') ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname.startsWith('/advertiser') ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname.startsWith('/advertiser') ? theme.palette.primary.main : theme.palette.text.primary }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Advertiser Dashboard" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/create-ad"
              selected={location.pathname === '/create-ad'}
              sx={{
                color: location.pathname === '/create-ad' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/create-ad' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/create-ad' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Create Ad" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/campaigns"
              selected={location.pathname === '/campaigns'}
              sx={{
                color: location.pathname === '/campaigns' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/campaigns' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/campaigns' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Campaigns" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/analytics"
              selected={location.pathname === '/analytics'}
              sx={{
                color: location.pathname === '/analytics' ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
                borderLeft: location.pathname === '/analytics' ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/analytics' ? theme.palette.primary.main : theme.palette.text.primary }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
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
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const location = useLocation();

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1929 0%, #1A2027 100%)',
    }}>
      <Navigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: 300,
          }),
          ...(sidebarOpen && {
            ml: { sm: `${DRAWER_WIDTH}px` },
          }),
        }}
      >
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: '100%',
            background: 'rgba(10, 25, 41, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeInOut,
              duration: 300,
            }),
            ...(sidebarOpen && {
              ml: { sm: `${DRAWER_WIDTH}px` },
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            }),
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="toggle drawer"
                edge="start"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                sx={{
                  mr: 2,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: 'rgba(33, 150, 243, 0.1)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px',
                }}
              >
                AV's Advertisement
              </Typography>
            </Box>
            {!isAuthenticated && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/login"
                  sx={{
                    borderColor: 'rgba(33, 150, 243, 0.5)',
                    color: '#2196F3',
                    '&:hover': {
                      borderColor: '#2196F3',
                      background: 'rgba(33, 150, 243, 0.08)',
                    },
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 3,
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/signup"
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
                    },
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 3,
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            mt: '64px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Container maxWidth="lg" sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  py: 8,
                }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      textAlign: 'center',
                      background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                    }}
                  >
                    Transform Your Advertising
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      color: 'rgba(255, 255, 255, 0.8)',
                      maxWidth: '800px',
                      mb: 4,
                    }}
                  >
                    Reach your target audience with precision and maximize your ROI
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/signup"
                    sx={{
                      background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                      color: '#fff',
                      fontSize: '1.2rem',
                      padding: '12px 48px',
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: '0 8px 32px rgba(33, 150, 243, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
                        boxShadow: '0 12px 48px rgba(33, 150, 243, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              } />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/benefits" element={<BenefitsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole={UserRoles.ADMIN}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advertiser/*"
                element={
                  <ProtectedRoute requiredRole={UserRoles.ADVERTISER}>
                    <AdvertiserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-ad"
                element={
                  <ProtectedRoute requiredRole={UserRoles.ADVERTISER}>
                    <AdBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute requiredRole={UserRoles.ADVERTISER}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campaigns"
                element={
                  <ProtectedRoute requiredRole={UserRoles.ADVERTISER}>
                    <Campaigns />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </Box>
        <Box
          component="footer"
          sx={{
            width: '100%',
            background: 'rgba(10, 25, 41, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
