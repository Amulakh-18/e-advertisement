import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Block,
  CheckCircle,
  Delete,
  Edit,
  Visibility,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Mock data for users
  const [users] = useState([
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      role: 'advertiser',
      status: 'active',
      joinDate: '2024-03-01',
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      role: 'viewer',
      status: 'suspended',
      joinDate: '2024-03-05',
    },
  ]);

  // Mock data for campaigns
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale Campaign',
      advertiser: 'Fashion Store',
      status: 'active',
      impressions: 15000,
      clicks: 450,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
    },
    {
      id: 2,
      name: 'Product Launch',
      advertiser: 'Tech Company',
      status: 'pending',
      impressions: 0,
      clicks: 0,
      startDate: '2024-03-15',
      endDate: '2024-04-15',
    },
  ]);

  // Analytics data
  const analyticsData = {
    totalUsers: 1250,
    activeUsers: 890,
    totalCampaigns: 45,
    activeCampaigns: 28,
    totalRevenue: 25000,
    monthlyGrowth: 15,
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    // Implement user update logic here
    handleCloseDialog();
  };

  const renderUserManagement = () => (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">User Management</Typography>
        <Button variant="contained" color="primary">
          Export User Data
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === 'advertiser' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditUser(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color={user.status === 'active' ? 'error' : 'success'}>
                    {user.status === 'active' ? <Block /> : <CheckCircle />}
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderCampaignManagement = () => (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Campaign Management</Typography>
        <Button variant="contained" color="primary">
          Review Pending Campaigns
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Campaign Name</TableCell>
              <TableCell>Advertiser</TableCell>
              <TableCell>Status</TableCell>
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
                <TableCell>{campaign.advertiser}</TableCell>
                <TableCell>
                  <Chip
                    label={campaign.status}
                    color={campaign.status === 'active' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                <TableCell>{`${campaign.startDate} - ${campaign.endDate}`}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Block />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderAnalytics = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h4">
              {analyticsData.totalUsers.toLocaleString()}
            </Typography>
            <Typography color="textSecondary">
              {analyticsData.activeUsers.toLocaleString()} active users
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Campaigns
            </Typography>
            <Typography variant="h4">
              {analyticsData.activeCampaigns}/{analyticsData.totalCampaigns}
            </Typography>
            <Typography color="textSecondary">
              {((analyticsData.activeCampaigns / analyticsData.totalCampaigns) * 100).toFixed(1)}% active rate
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h4">
              ${analyticsData.totalRevenue.toLocaleString()}
            </Typography>
            <Typography color="success.main">
              +{analyticsData.monthlyGrowth}% from last month
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Analytics
          </Typography>
          <Typography color="textSecondary">
            More detailed analytics and charts will be displayed here.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="User Management" />
          <Tab label="Campaign Management" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {currentTab === 0 && renderUserManagement()}
      {currentTab === 1 && renderCampaignManagement()}
      {currentTab === 2 && renderAnalytics()}

      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                defaultValue={selectedUser.username}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                defaultValue={selectedUser.email}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Role</InputLabel>
                <Select defaultValue={selectedUser.role} label="Role">
                  <MenuItem value="viewer">Viewer</MenuItem>
                  <MenuItem value="advertiser">Advertiser</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={selectedUser.status} label="Status">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 