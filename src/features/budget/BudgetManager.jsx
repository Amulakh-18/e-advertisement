import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  Switch,
  FormControlLabel,
  Slider,
} from '@mui/material';
import { budgetAPI } from '../../services/api';

const BudgetManager = ({ campaignId, onSave }) => {
  const [budget, setBudget] = useState({
    totalBudget: '',
    dailyBudget: '',
    bidStrategy: 'automatic',
    maxBidAmount: '',
    budgetPacing: 'even',
    startDate: '',
    endDate: '',
    enableAlerts: true,
    alertThreshold: 80, // percentage
  });

  const [stats, setStats] = useState({
    spent: 0,
    remaining: 0,
    projectedSpend: 0,
    averageCPC: 0,
    impressions: 0,
    clicks: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (campaignId) {
      loadBudgetStats();
    }
  }, [campaignId]);

  const loadBudgetStats = async () => {
    try {
      setLoading(true);
      const response = await budgetAPI.getBudgetStats(campaignId);
      setStats(response.data);
      setBudget(response.data.budgetSettings);
    } catch (error) {
      setError('Failed to load budget statistics');
      console.error('Error loading budget stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      await budgetAPI.updateBudget(campaignId, budget);
      setSuccess('Budget settings updated successfully');
      onSave(budget);
    } catch (error) {
      setError('Failed to update budget settings');
      console.error('Error updating budget:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Budget Management
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {/* Budget Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" gutterBottom>
                Total Spent
              </Typography>
              <Typography variant="h6">${stats.spent.toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" gutterBottom>
                Remaining Budget
              </Typography>
              <Typography variant="h6">${stats.remaining.toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" gutterBottom>
                Average CPC
              </Typography>
              <Typography variant="h6">${stats.averageCPC.toFixed(2)}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Budget Settings */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Budget"
                name="totalBudget"
                type="number"
                value={budget.totalBudget}
                onChange={handleChange}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Daily Budget"
                name="dailyBudget"
                type="number"
                value={budget.dailyBudget}
                onChange={handleChange}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>

            {/* Bid Strategy */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Bid Strategy</InputLabel>
                <Select
                  name="bidStrategy"
                  value={budget.bidStrategy}
                  onChange={handleChange}
                  label="Bid Strategy"
                >
                  <MenuItem value="automatic">Automatic Bidding</MenuItem>
                  <MenuItem value="manual">Manual CPC</MenuItem>
                  <MenuItem value="target">Target CPA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Maximum Bid Amount"
                name="maxBidAmount"
                type="number"
                value={budget.maxBidAmount}
                onChange={handleChange}
                disabled={budget.bidStrategy === 'automatic'}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>

            {/* Campaign Duration */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={budget.startDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={budget.endDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Budget Pacing */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Budget Pacing</InputLabel>
                <Select
                  name="budgetPacing"
                  value={budget.budgetPacing}
                  onChange={handleChange}
                  label="Budget Pacing"
                >
                  <MenuItem value="even">Even Distribution</MenuItem>
                  <MenuItem value="accelerated">Accelerated Spending</MenuItem>
                  <MenuItem value="custom">Custom Schedule</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Alert Settings */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={budget.enableAlerts}
                    onChange={(e) =>
                      setBudget((prev) => ({
                        ...prev,
                        enableAlerts: e.target.checked,
                      }))
                    }
                  />
                }
                label="Enable Budget Alerts"
              />
            </Grid>

            {budget.enableAlerts && (
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Alert Threshold: {budget.alertThreshold}%
                </Typography>
                <Slider
                  value={budget.alertThreshold}
                  onChange={(_, value) =>
                    setBudget((prev) => ({
                      ...prev,
                      alertThreshold: value,
                    }))
                  }
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={50}
                  max={100}
                />
              </Grid>
            )}
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={loadBudgetStats}
              disabled={loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Budget Settings'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BudgetManager; 