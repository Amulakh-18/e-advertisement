import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';

const Campaigns = () => {
  // Sample campaign data
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale 2024',
      status: 'active',
      budget: 5000,
      spent: 2300,
      impressions: 15000,
      clicks: 450,
      startDate: '2024-06-01',
      endDate: '2024-06-30',
    },
    {
      id: 2,
      name: 'Product Launch',
      status: 'paused',
      budget: 3000,
      spent: 1200,
      impressions: 8000,
      clicks: 280,
      startDate: '2024-05-15',
      endDate: '2024-07-15',
    },
    {
      id: 3,
      name: 'Brand Awareness',
      status: 'active',
      budget: 7500,
      spent: 4200,
      impressions: 25000,
      clicks: 850,
      startDate: '2024-04-01',
      endDate: '2024-09-30',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'ended':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" color="primary">
          Campaign Management
        </Typography>
        <Button variant="contained" color="primary">
          Create New Campaign
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Campaign Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Spent</TableCell>
                  <TableCell>Impressions</TableCell>
                  <TableCell>Clicks</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        color={getStatusColor(campaign.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                    <TableCell>{formatCurrency(campaign.spent)}</TableCell>
                    <TableCell>{formatNumber(campaign.impressions)}</TableCell>
                    <TableCell>{formatNumber(campaign.clicks)}</TableCell>
                    <TableCell>
                      {campaign.startDate} to {campaign.endDate}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        {campaign.status === 'active' ? <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Campaigns; 