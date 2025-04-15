import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  People,
  MonetizationOn,
  Timeline,
  MoreVert,
} from '@mui/icons-material';
import { mockAnalytics, mockCampaigns } from '../../services/mockData';

const DashboardCard = ({ title, value, icon, color, progress }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {value}
      </Typography>
      {progress && (
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
            }}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {progress}% of target
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
);

const AdvertiserDashboard = () => {
  const { overview } = mockAnalytics;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Impressions"
            value={overview.totalImpressions.toLocaleString()}
            icon={<TrendingUp sx={{ color: '#2196F3' }} />}
            color="#2196F3"
            progress={75}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Clicks"
            value={overview.totalClicks.toLocaleString()}
            icon={<People sx={{ color: '#4CAF50' }} />}
            color="#4CAF50"
            progress={85}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Spent"
            value={`$${overview.totalSpent.toLocaleString()}`}
            icon={<MonetizationOn sx={{ color: '#FF9800' }} />}
            color="#FF9800"
            progress={60}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Conversion Rate"
            value={`${overview.averageConversionRate}%`}
            icon={<Timeline sx={{ color: '#E91E63' }} />}
            color="#E91E63"
            progress={90}
          />
        </Grid>

        {/* Recent Campaigns */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Campaigns
            </Typography>
            <Grid container spacing={2}>
              {mockCampaigns.map((campaign) => (
                <Grid item xs={12} md={6} key={campaign.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">{campaign.name}</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: campaign.status === 'active' ? 'success.main' : 'text.secondary',
                            textTransform: 'capitalize',
                          }}
                        >
                          {campaign.status}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Budget: ${campaign.budget.toLocaleString()} • Spent: ${campaign.spent.toLocaleString()}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(campaign.spent / campaign.budget) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Impressions: {campaign.impressions.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Clicks: {campaign.clicks.toLocaleString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvertiserDashboard; 