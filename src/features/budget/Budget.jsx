import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Card,
  CardContent,
  IconButton,
  Alert,
  LinearProgress,
  Divider,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  AttachMoney,
  Timeline,
  Speed,
  Notifications,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Mock data
const MOCK_CAMPAIGNS = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    budget: 5000,
    spent: 2500,
    dailyBudget: 200,
    status: 'active',
    performance: 'good',
  },
  {
    id: 2,
    name: 'Back to School',
    budget: 3000,
    spent: 1500,
    dailyBudget: 150,
    status: 'paused',
    performance: 'average',
  },
];

const Budget = () => {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [automaticOptimization, setAutomaticOptimization] = useState(true);

  const [newBudget, setNewBudget] = useState({
    campaignId: '',
    totalBudget: '',
    dailyBudget: '',
    bidStrategy: 'automatic',
    bidAmount: '',
  });

  const handleBudgetChange = (campaignId, field, value) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, [field]: value }
        : campaign
    ));
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
  };

  const handleSaveEdit = () => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(campaign =>
        campaign.id === editingCampaign.id ? editingCampaign : campaign
      ));
      setEditingCampaign(null);
      showAlertMessage('Budget updated successfully', 'success');
    }
  };

  const handleOptimizationToggle = () => {
    setAutomaticOptimization(!automaticOptimization);
    showAlertMessage(
      `Automatic optimization ${!automaticOptimization ? 'enabled' : 'disabled'}`,
      'info'
    );
  };

  const showAlertMessage = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'good':
        return 'success.main';
      case 'average':
        return 'warning.main';
      case 'poor':
        return 'error.main';
      default:
        return 'info.main';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 4 
      }}>
        Budget Management
      </Typography>

      {/* Alert */}
      {showAlert && (
        <Alert 
          severity={alertSeverity} 
          sx={{ mb: 3 }}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      )}

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Budget</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                ${campaigns.reduce((sum, campaign) => sum + campaign.budget, 0).toLocaleString()}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={70} 
                sx={{ mb: 1, height: 8, borderRadius: 4 }} 
              />
              <Typography variant="body2" color="text.secondary">
                70% of total budget allocated
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timeline sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Daily Spend</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                ${campaigns.reduce((sum, campaign) => sum + campaign.dailyBudget, 0).toLocaleString()}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={85} 
                color="success" 
                sx={{ mb: 1, height: 8, borderRadius: 4 }} 
              />
              <Typography variant="body2" color="text.secondary">
                85% of daily budget utilized
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Speed sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Performance</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Good
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={90} 
                color="warning" 
                sx={{ mb: 1, height: 8, borderRadius: 4 }} 
              />
              <Typography variant="body2" color="text.secondary">
                90% optimization score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Campaign Budget Management */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Campaign Budgets</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={automaticOptimization}
                onChange={handleOptimizationToggle}
                color="primary"
              />
            }
            label="Automatic Optimization"
          />
        </Box>

        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} key={campaign.id}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1">{campaign.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {campaign.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Total Budget"
                        type="number"
                        value={editingCampaign?.id === campaign.id ? editingCampaign.budget : campaign.budget}
                        onChange={(e) => handleBudgetChange(campaign.id, 'budget', e.target.value)}
                        fullWidth
                        disabled={editingCampaign?.id !== campaign.id}
                        InputProps={{
                          startAdornment: <Typography>$</Typography>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="Daily Budget"
                        type="number"
                        value={editingCampaign?.id === campaign.id ? editingCampaign.dailyBudget : campaign.dailyBudget}
                        onChange={(e) => handleBudgetChange(campaign.id, 'dailyBudget', e.target.value)}
                        fullWidth
                        disabled={editingCampaign?.id !== campaign.id}
                        InputProps={{
                          startAdornment: <Typography>$</Typography>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>Spent: </Typography>
                        <Typography color={getPerformanceColor(campaign.performance)}>
                          ${campaign.spent.toLocaleString()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(campaign.spent / campaign.budget) * 100}
                        sx={{ mt: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {editingCampaign?.id === campaign.id ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveEdit}
                            startIcon={<SaveIcon />}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={() => handleEditCampaign(campaign)}
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Budget Optimization Settings */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Budget Optimization</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Bid Strategy</InputLabel>
              <Select
                value={newBudget.bidStrategy}
                onChange={(e) => setNewBudget({ ...newBudget, bidStrategy: e.target.value })}
              >
                <MenuItem value="automatic">Automatic Bidding</MenuItem>
                <MenuItem value="manual">Manual CPC</MenuItem>
                <MenuItem value="target">Target CPA</MenuItem>
                <MenuItem value="maximize">Maximize Conversions</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Maximum Bid Amount"
              type="number"
              value={newBudget.bidAmount}
              onChange={(e) => setNewBudget({ ...newBudget, bidAmount: e.target.value })}
              InputProps={{
                startAdornment: <Typography>$</Typography>
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={automaticOptimization}
                  onChange={handleOptimizationToggle}
                />
              }
              label="Enable automatic bid adjustments based on performance"
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Budget; 