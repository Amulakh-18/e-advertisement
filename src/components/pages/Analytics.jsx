import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  // Sample data for charts
  const impressionsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Impressions',
        data: [1200, 1900, 1500, 2100, 1800, 1600, 2000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const conversionData = {
    labels: ['Social Media', 'Display Ads', 'Search Ads', 'Email'],
    datasets: [
      {
        label: 'Conversion Rate by Channel',
        data: [65, 45, 75, 55],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
      },
    ],
  };

  const audienceData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        label: 'Age Distribution',
        data: [15, 30, 25, 20, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Campaign Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Impressions Over Time */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Impressions Over Time
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line options={chartOptions} data={impressionsData} />
            </Box>
          </Paper>
        </Grid>

        {/* Conversion Rate by Channel */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Conversion Rate by Channel
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar options={chartOptions} data={conversionData} />
            </Box>
          </Paper>
        </Grid>

        {/* Audience Demographics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Audience Age Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut options={chartOptions} data={audienceData} />
            </Box>
          </Paper>
        </Grid>

        {/* Key Metrics */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Click-Through Rate
            </Typography>
            <Typography variant="h3" color="primary">
              2.8%
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Average Cost per Click
            </Typography>
            <Typography variant="h3" color="primary">
              $0.45
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Total Conversions
            </Typography>
            <Typography variant="h3" color="primary">
              1,234
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics; 