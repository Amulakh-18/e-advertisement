import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  Tabs,
  Tab,
  useTheme,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth, UserRoles } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Sign Up
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({}); // Clear previous submit errors
    try {
      await login(formData);
      
      // Get the stored user data after successful login
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Determine the redirect path based on user role
      let redirectPath = '/'; // Default path if role is unknown
      if (user) {
        switch (user.role) {
          case UserRoles.ADMIN:
            redirectPath = '/admin/dashboard';
            break;
          case UserRoles.ADVERTISER:
            redirectPath = '/advertiser/dashboard';
            break;
          case UserRoles.VIEWER:
            redirectPath = '/viewer/dashboard';
            break;
          default:
            // Handle unknown roles or redirect to a generic authenticated page
            redirectPath = '/dashboard'; // Default dashboard
        }
      }
      
      navigate(redirectPath, { replace: true }); // Use replace to avoid back button going to login
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.detail || error.message || 'Invalid email or password'
      }));
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Prevent blur on mouse down
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2027 100%)',
      }}
    >
      {/* Left side - Background and Info */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05))',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            mb: 3,
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: '600px',
            mb: 4,
          }}
        >
          Log in to your account to manage your advertising campaigns and track your performance
        </Typography>
        <Box
          sx={{
            mt: 4,
            p: 4,
            background: 'rgba(33, 150, 243, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(33, 150, 243, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              mb: 3,
              fontWeight: 600,
            }}
          >
            Why Choose Us?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(33, 150, 243, 0.1)',
                  border: '1px solid rgba(33, 150, 243, 0.2)',
                }}
              >
                ✓
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Advanced targeting capabilities
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(33, 150, 243, 0.1)',
                  border: '1px solid rgba(33, 150, 243, 0.2)',
                }}
              >
                ✓
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Real-time analytics and insights
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(33, 150, 243, 0.1)',
                  border: '1px solid rgba(33, 150, 243, 0.2)',
                }}
              >
                ✓
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Automated campaign optimization
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right side - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, sm: 4 },
            width: '100%',
            maxWidth: '500px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{
              textAlign: 'center',
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            Login to Your Account
          </Typography>

          {errors.submit && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              onClose={() => setErrors(prev => ({ ...prev, submit: '' }))} // Allow closing the alert
            >
              {errors.submit}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Forgot Password Link - Moved Here */}
            <Box sx={{ textAlign: 'right', mt: 1, mb: 1 }}> {/* Aligned right */} 
              <Link 
                href="#" // Replace with actual forgot password route later
                variant="body2"
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#2196F3' } }}
                >
                Forgot password?
              </Link>
            </Box>
            
            {/* Remember Me Checkbox - Add if needed */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3, // Keep margin top
                mb: 2,
                p: 1.5,
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
                },
                position: 'relative',
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Log In'}
            </Button>
            
            {/* Sign Up Link - Centered */}
            <Box sx={{ textAlign: 'center', mt: 2 }}> {/* Centered */} 
              <Link 
                component={RouterLink} 
                to="/signup" 
                variant="body2"
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#2196F3' } }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage; 