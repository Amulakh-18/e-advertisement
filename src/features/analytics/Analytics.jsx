import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const Analytics = () => {
  const theme = useTheme();

  // Sample data - replace with real data from your backend
  const performanceData = [
    { name: 'Mon', views: 4000, clicks: 2400, conversions: 2400 },
    { name: 'Tue', views: 3000, clicks: 1398, conversions: 2210 },
    { name: 'Wed', views: 2000, clicks: 9800, conversions: 2290 },
    { name: 'Thu', views: 2780, clicks: 3908, conversions: 2000 },
    { name: 'Fri', views: 1890, clicks: 4800, conversions: 2181 },
    { name: 'Sat', views: 2390, clicks: 3800, conversions: 2500 },
    { name: 'Sun', views: 3490, clicks: 4300, conversions: 2100 },
  ];

  const metrics = [
    { title: 'Total Views', value: '24,567', change: '+12%', color: theme.palette.primary.main },
    { title: 'Click-Through Rate', value: '3.2%', change: '+0.5%', color: theme.palette.success.main },
    { title: 'Conversion Rate', value: '1.8%', change: '+0.3%', color: theme.palette.info.main },
    { title: 'Revenue', value: '$12,345', change: '+8%', color: theme.palette.warning.main },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Analytics Dashboard
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: metric.color }}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {metric.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Performance Chart */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Performance Overview
        </Typography>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip
                contentStyle={{
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Legend />
              <Bar dataKey="views" fill={theme.palette.primary.main} />
              <Bar dataKey="clicks" fill={theme.palette.success.main} />
              <Bar dataKey="conversions" fill={theme.palette.info.main} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Trend Analysis */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Click-Through Rate Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                    contentStyle={{
                      background: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke={theme.palette.success.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Conversion Rate Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                    contentStyle={{
                      background: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke={theme.palette.info.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics; 