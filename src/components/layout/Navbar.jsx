import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  Info,
  Help,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Create,
  PeopleAlt,
  AttachMoney,
  Analytics as AnalyticsIcon,
  Campaign,
  Visibility,
  Tune,
} from '@mui/icons-material';
import { useAuth, UserRoles } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const publicMenuItems = [
    { text: 'Benefits', icon: <Info />, path: '/benefits' },
    { text: 'FAQ', icon: <Help />, path: '/faq' },
  ];

  const getAuthorizedMenuItems = () => {
    if (!isAuthenticated) return [];

    switch (user?.role) {
      case UserRoles.ADMIN:
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
          { text: 'Manage Ads', icon: <Create />, path: '/admin/manage-ads' },
          { text: 'Manage Users', icon: <PeopleAlt />, path: '/admin/users' },
          { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        ];
      case UserRoles.ADVERTISER:
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/advertiser' },
          { text: 'Create Ad', icon: <Create />, path: '/advertiser/create-ad' },
          { text: 'Campaigns', icon: <PeopleAlt />, path: '/advertiser/campaigns' },
          { text: 'Targeting', icon: <PeopleAlt />, path: '/advertiser/targeting' },
          { text: 'Budget', icon: <AttachMoney />, path: '/advertiser/budget' },
          { text: 'Analytics', icon: <AnalyticsIcon />, path: '/advertiser/analytics' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        ];
      case UserRoles.VIEWER:
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/viewer' },
          { text: 'My Ads', icon: <Visibility />, path: '/viewer/my-ads' },
          { text: 'Preferences', icon: <Tune />, path: '/viewer/preferences' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = isAuthenticated ? getAuthorizedMenuItems() : publicMenuItems;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0A192F' }}>
      {/* Navbar */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          width: '100%',
          zIndex: 1200,
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            AV's Advertisement Platform
          </Typography>
          {!isAuthenticated ? (
            <Box>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/signup"
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
            <Avatar sx={{ bgcolor: '#2196F3' }}>
              {user?.email?.[0]?.toUpperCase()}
            </Avatar>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: isHovered ? '240px' : '60px',
          background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
          transition: 'width 0.3s ease',
          zIndex: 1100,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pt: '64px',
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                px: 2.5,
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{
                minWidth: 0,
                mr: isHovered ? 2 : 'auto',
                color: 'white',
                justifyContent: 'center',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.2s',
                  display: isHovered ? 'block' : 'none',
                  color: location.pathname === item.path ? '#2196F3' : 'inherit',
                }}
              />
            </ListItem>
          ))}
        </List>

        {isAuthenticated && (
          <Box sx={{ mb: 2 }}>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                color: '#ef4444',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{
                minWidth: 0,
                mr: isHovered ? 2 : 'auto',
                color: '#ef4444',
                justifyContent: 'center',
              }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.2s',
                  display: isHovered ? 'block' : 'none',
                }}
              />
            </ListItem>
            <Box sx={{ 
              px: 2, 
              display: isHovered ? 'block' : 'none',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s',
            }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Logged in as:
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          ml: isHovered ? '240px' : '60px',
          pt: '64px',
          px: 3,
          transition: 'margin-left 0.3s ease',
          position: 'relative',
          width: `calc(100% - ${isHovered ? '240px' : '60px'})`,
        }}
      >
        {/* Your routes/content will be rendered here */}
      </Box>
    </Box>
  );
};

export default Navbar; 