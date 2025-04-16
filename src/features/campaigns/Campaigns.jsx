import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  InputAdornment,
  TableSortLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import campaignAPI from '../../services/campaignAPI';
import { useAuth } from '../../contexts/AuthContext';

const Campaigns = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // New state variables for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    filterAndSortCampaigns();
  }, [campaigns, searchTerm, statusFilter, sortConfig]);

  const filterAndSortCampaigns = () => {
    let filtered = [...campaigns];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredCampaigns(filtered);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await campaignAPI.getCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch campaigns');
      showSnackbar('Failed to fetch campaigns', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'draft':
        return 'default';
      case 'pending':
        return 'info';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleOpenDialog = (campaign = null) => {
    setSelectedCampaign(campaign);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCampaign(null);
  };

  const handleSaveCampaign = async () => {
    try {
      const formData = new FormData(document.getElementById('campaign-form'));
      const campaignData = {
        name: formData.get('name'),
        type: formData.get('type'),
        budget: parseFloat(formData.get('budget')),
        daily_budget: parseFloat(formData.get('daily_budget')),
        start_date: new Date(formData.get('start_date')),
        end_date: new Date(formData.get('end_date')),
        status: formData.get('status'),
      };

      if (selectedCampaign) {
        await campaignAPI.updateCampaign(selectedCampaign.id, campaignData);
        showSnackbar('Campaign updated successfully', 'success');
      } else {
        await campaignAPI.createCampaign(campaignData);
        showSnackbar('Campaign created successfully', 'success');
      }

      fetchCampaigns();
      handleCloseDialog();
    } catch (err) {
      showSnackbar('Failed to save campaign', 'error');
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await campaignAPI.deleteCampaign(id);
      showSnackbar('Campaign deleted successfully', 'success');
      fetchCampaigns();
    } catch (err) {
      showSnackbar('Failed to delete campaign', 'error');
    }
  };

  const handleSubmitCampaign = async (id) => {
    try {
      await campaignAPI.submitCampaign(id);
      showSnackbar('Campaign submitted for approval', 'success');
      fetchCampaigns();
    } catch (err) {
      showSnackbar('Failed to submit campaign', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <Typography>Loading campaigns...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Campaigns</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
            },
          }}
        >
          New Campaign
        </Button>
      </Box>

      {/* New Filter and Search Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="paused">Paused</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Campaign Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'budget'}
                  direction={sortConfig.key === 'budget' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('budget')}
                >
                  Budget
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'spent'}
                  direction={sortConfig.key === 'spent' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('spent')}
                >
                  Spent
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'start_date'}
                  direction={sortConfig.key === 'start_date' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('start_date')}
                >
                  Date Range
                </TableSortLabel>
              </TableCell>
              <TableCell>Performance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id} hover>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={campaign.status}
                      color={getStatusColor(campaign.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                  <TableCell>${campaign.spent.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Typography variant="body2">
                        {campaign.impressions.toLocaleString()} views
                      </Typography>
                      <Typography variant="body2">
                        {campaign.clicks.toLocaleString()} clicks
                      </Typography>
                      <Typography variant="body2">
                        {campaign.conversions.toLocaleString()} conv.
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(campaign)}
                      sx={{ color: theme.palette.primary.main }}
                      title="Edit Campaign"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.error.main }}
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      title="Delete Campaign"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.info.main }}
                      title="View Campaign Details"
                    >
                      <VisibilityIcon fontSize="inherit" />
                    </IconButton>
                    {campaign.status === 'draft' && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleSubmitCampaign(campaign.id)}
                        sx={{ ml: 1 }}
                      >
                        Submit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="textSecondary">No campaigns found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Campaign Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
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
        <DialogTitle>
          {selectedCampaign ? 'Edit Campaign' : 'New Campaign'}
        </DialogTitle>
        <DialogContent>
          <form id="campaign-form">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Campaign Name"
                  defaultValue={selectedCampaign?.name}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    label="Type"
                    defaultValue={selectedCampaign?.type || 'display'}
                    required
                  >
                    <MenuItem value="display">Display</MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="social">Social</MenuItem>
                    <MenuItem value="search">Search</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    label="Status"
                    defaultValue={selectedCampaign?.status || 'draft'}
                    required
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="paused">Paused</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="budget"
                  label="Budget"
                  type="number"
                  defaultValue={selectedCampaign?.budget}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="daily_budget"
                  label="Daily Budget"
                  type="number"
                  defaultValue={selectedCampaign?.daily_budget}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="start_date"
                  label="Start Date"
                  type="date"
                  defaultValue={selectedCampaign?.start_date?.split('T')[0]}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="end_date"
                  label="End Date"
                  type="date"
                  defaultValue={selectedCampaign?.end_date?.split('T')[0]}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveCampaign}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Campaigns; 