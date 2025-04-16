import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  useTheme,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  People,
  MonetizationOn,
  Timeline,
  MoreVert,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { advertisementAPI, analyticsAPI } from '../../services/api';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
         <Paper sx={{ p: 3, border: '1px solid red' }}>
            <Typography variant="h6" color="error">Something went wrong rendering this section.</Typography>
            <Typography variant="body2">Please check the console for details.</Typography>
            {this.state.error && <pre style={{ whiteSpace: 'pre-wrap', color: 'red' }}>{this.state.error.toString()}</pre>}
         </Paper>
       );
    }

    return this.props.children; 
  }
}

const DashboardCard = ({ title, value, icon, color, progress, loading }) => {
  const theme = useTheme();
  
  if (loading) {
    return (
      <Card sx={{ 
        height: '100%', 
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        height: '100%', 
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        '&:hover': {
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                backgroundColor: `${color}20`,
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {React.cloneElement(icon, { sx: { color: color, fontSize: '1.5rem' } })}
            </Box>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {value}
        </Typography>
        {progress !== undefined && (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: `${color}15`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                },
                mb: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {progress}% of target
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const AdvertiserDashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalImpressions: 0,
    totalClicks: 0,
    totalSpent: 0,
    averageConversionRate: 0,
  });
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch analytics data
        const analyticsResponse = await analyticsAPI.getDashboardData();
        setAnalytics(analyticsResponse.data);

        // Fetch recent campaigns
        const campaignsResponse = await advertisementAPI.getAds({ limit: 5, sort: '-createdAt' });
        setCampaigns(campaignsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return theme.palette.success.main;
      case 'paused':
      case 'draft':
      case 'pending':
        return theme.palette.warning.main;
      case 'rejected':
      case 'ended':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <ErrorBoundary>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Dashboard Overview
        </Typography>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Impressions"
              value={analytics.totalImpressions.toLocaleString()}
              icon={<TrendingUp />}
              color={theme.palette.primary.main}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Clicks"
              value={analytics.totalClicks.toLocaleString()}
              icon={<People />}
              color={theme.palette.info.main}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Spent"
              value={`$${analytics.totalSpent.toLocaleString()}`}
              icon={<MonetizationOn />}
              color={theme.palette.warning.main}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Avg. Conv. Rate"
              value={`${analytics.averageConversionRate}%`}
              icon={<Timeline />}
              color={theme.palette.success.main}
              loading={loading}
            />
          </Grid>
        </Grid>

        {/* Recent Campaigns */}
        <Paper sx={{ 
          p: 3, 
          background: 'rgba(255, 255, 255, 0.05)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Recent Campaigns
            </Typography>
            <Button component={RouterLink} to="/advertiser/campaigns" variant="outlined">
              View All Campaigns
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : campaigns.length > 0 ? (
            <Grid container spacing={2}>
              {campaigns.map((campaign) => (
                <Grid item xs={12} key={campaign.id}>
                  <Paper sx={{ 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="subtitle1">
                        {campaign.name}
                      </Typography>
                      <Chip 
                        label={campaign.status} 
                        size="small"
                        sx={{ 
                          backgroundColor: `${getStatusColor(campaign.status)}20`,
                          color: getStatusColor(campaign.status),
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        component={RouterLink} 
                        to={`/advertiser/campaigns/${campaign.id}`}
                        size="small"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              No campaigns found. Create your first campaign!
            </Typography>
          )}
        </Paper>
      </Box>
    </ErrorBoundary>
  );
};

export default AdvertiserDashboard; 