import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  PauseCircle,
  PlayCircle,
  Add,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const AdvertiserDashboard = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Mock data for campaigns
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Summer Collection Launch',
      status: 'active',
      budget: 5000,
      spent: 2500,
      impressions: 15000,
      clicks: 450,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      targetAudience: 'Young adults, Fashion enthusiasts',
      type: 'Display Ad',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'Spring Sale Promotion',
      status: 'paused',
      budget: 3000,
      spent: 1200,
      impressions: 8000,
      clicks: 280,
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      targetAudience: 'All ages, Value seekers',
      type: 'Banner Ad',
      image: 'https://via.placeholder.com/300x200',
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCreateCampaign = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCreateDialogOpen(false);
    setSelectedCampaign(null);
  };

  const handleSaveCampaign = () => {
    // Implement campaign save logic here
    handleCloseDialog();
  };

  const renderCampaignOverview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Campaigns
            </Typography>
            <Typography variant="h4">
              {campaigns.filter(c => c.status === 'active').length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Impressions
            </Typography>
            <Typography variant="h4">
              {campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Clicks
            </Typography>
            <Typography variant="h4">
              {campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Budget Spent
            </Typography>
            <Typography variant="h4">
              ${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderCampaignList = () => (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Campaign Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Spent</TableCell>
            <TableCell>Impressions</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>CTR</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>
                <Chip
                  label={campaign.status}
                  color={campaign.status === 'active' ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>${campaign.budget.toLocaleString()}</TableCell>
              <TableCell>${campaign.spent.toLocaleString()}</TableCell>
              <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
              <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
              <TableCell>
                {((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%
              </TableCell>
              <TableCell>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
                <IconButton size="small">
                  <Edit />
                </IconButton>
                {campaign.status === 'active' ? (
                  <IconButton size="small" color="warning">
                    <PauseCircle />
                  </IconButton>
                ) : (
                  <IconButton size="small" color="success">
                    <PlayCircle />
                  </IconButton>
                )}
                <IconButton size="small" color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCampaignCreation = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create New Campaign
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Campaign Name"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Campaign Type</InputLabel>
                  <Select label="Campaign Type">
                    <MenuItem value="display">Display Ad</MenuItem>
                    <MenuItem value="banner">Banner Ad</MenuItem>
                    <MenuItem value="video">Video Ad</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Target Audience"
                  multiline
                  rows={2}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Budget"
                  type="number"
                  InputProps={{
                    startAdornment: '$',
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Add />}
                >
                  Create Campaign
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderAnalytics = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Campaign Performance
            </Typography>
            {campaigns.map((campaign) => (
              <Box key={campaign.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1">{campaign.name}</Typography>
                  <Typography variant="subtitle1">
                    {((campaign.spent / campaign.budget) * 100).toFixed(1)}% of budget spent
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(campaign.spent / campaign.budget) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    ${campaign.spent.toLocaleString()} spent
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${campaign.budget.toLocaleString()} budget
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Advertiser Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateCampaign}
        >
          Create Campaign
        </Button>
      </Box>

      {renderCampaignOverview()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4, mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Campaigns" />
          <Tab label="Create Campaign" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {currentTab === 0 && renderCampaignList()}
      {currentTab === 1 && renderCampaignCreation()}
      {currentTab === 2 && renderAnalytics()}

      <Dialog
        open={createDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent>
          {/* Campaign creation form */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCampaign} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdvertiserDashboard; 