import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  useTheme,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const theme = useTheme();
  const { user, updatePassword } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openThemeDialog, setOpenThemeDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [themeMode, setThemeMode] = useState('dark');
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleNotificationChange = (type) => (event) => {
    setNotifications({
      ...notifications,
      [type]: event.target.checked,
    });
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setOpenPasswordDialog(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordError('');
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
    // Here you would typically dispatch an action to update the theme in your theme context
    // For now, we'll just update the local state
    setOpenThemeDialog(false);
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would typically call an API to update the profile
      // For now, we'll just show a success message
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleProfileChange = (field) => (event) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Profile Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={user?.photoURL}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                }}
              >
                {profileData.firstName[0] || <PersonIcon />}
              </Avatar>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{
                  mb: 2,
                  color: 'primary.main',
                  borderColor: 'rgba(33, 150, 243, 0.5)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: 'rgba(33, 150, 243, 0.08)',
                  },
                }}
              >
                Upload New Photo
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profileData.firstName}
                  onChange={handleProfileChange('firstName')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={handleProfileChange('lastName')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={handleProfileChange('email')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveProfile}
                  sx={{ mt: 2 }}
                >
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Account & Notification Settings */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LockIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Change Password"
                      secondary="Update your password for better security"
                    />
                    <Button 
                      variant="outlined"
                      size="small"
                      sx={{
                        color: 'primary.main',
                        borderColor: 'rgba(33, 150, 243, 0.5)',
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: 'rgba(33, 150, 243, 0.08)',
                        },
                      }}
                    >
                      Change
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Language"
                      secondary="English"
                    />
                    <Button 
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      Change
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PaletteIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Theme"
                      secondary={themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
                    />
                    <Button 
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => setOpenThemeDialog(true)}
                    >
                      Change
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DeleteIcon color="error" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Delete Account"
                      secondary="This action cannot be undone"
                      primaryTypographyProps={{ color: 'error' }}
                    />
                    <Button 
                      variant="outlined"
                      size="small"
                      color="error"
                    >
                      Delete
                    </Button>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Notifications"
                      secondary="Receive notifications via email"
                    />
                    <Switch
                      checked={notifications.email}
                      onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                      color="primary"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Push Notifications"
                      secondary="Receive push notifications"
                    />
                    <Switch
                      checked={notifications.push}
                      onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                      color="primary"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Marketing Emails"
                      secondary="Receive marketing and promotional emails"
                    />
                    <Switch
                      checked={notifications.marketing}
                      onChange={(e) => setNotifications({ ...notifications, marketing: e.target.checked })}
                      color="primary"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
              },
            }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Theme Selection Dialog */}
      <Dialog
        open={openThemeDialog}
        onClose={() => setOpenThemeDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DialogTitle>Select Theme</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              button
              onClick={() => handleThemeChange('light')}
              selected={themeMode === 'light'}
            >
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>
              <ListItemText primary="Light Theme" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleThemeChange('dark')}
              selected={themeMode === 'dark'}
            >
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <ListItemText primary="Dark Theme" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenThemeDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings; 