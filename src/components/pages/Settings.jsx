import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Box,
  Alert,
} from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Acme Corp',
    email: 'admin@acmecorp.com',
    notifyEmails: true,
    notifySlack: false,
    dailyReports: true,
    weeklyReports: true,
    monthlyReports: true,
    budgetAlerts: true,
    timezone: 'UTC-5',
    currency: 'USD',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the settings to your backend
    console.log('Settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Account Settings
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Company Information */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Company Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifyEmails}
                        onChange={handleChange}
                        name="notifyEmails"
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifySlack}
                        onChange={handleChange}
                        name="notifySlack"
                      />
                    }
                    label="Slack Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.budgetAlerts}
                        onChange={handleChange}
                        name="budgetAlerts"
                      />
                    }
                    label="Budget Alerts"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Reports */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Automated Reports
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.dailyReports}
                        onChange={handleChange}
                        name="dailyReports"
                      />
                    }
                    label="Daily Reports"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.weeklyReports}
                        onChange={handleChange}
                        name="weeklyReports"
                      />
                    }
                    label="Weekly Reports"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.monthlyReports}
                        onChange={handleChange}
                        name="monthlyReports"
                      />
                    }
                    label="Monthly Reports"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Timezone"
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Currency"
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </TextField>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Settings; 