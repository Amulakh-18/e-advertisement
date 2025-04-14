import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const AdCreator = () => {
  const [adData, setAdData] = useState({
    title: '',
    description: '',
    type: 'banner',
    targetAudience: '',
    budget: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Ad Data:', adData);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Create New Advertisement
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ad Title"
                name="title"
                value={adData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ad Description"
                name="description"
                value={adData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Ad Type</InputLabel>
                <Select
                  name="type"
                  value={adData.type}
                  onChange={handleChange}
                  label="Ad Type"
                >
                  <MenuItem value="banner">Banner Ad</MenuItem>
                  <MenuItem value="video">Video Ad</MenuItem>
                  <MenuItem value="popup">Pop-up Ad</MenuItem>
                  <MenuItem value="social">Social Media Ad</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Target Audience"
                name="targetAudience"
                value={adData.targetAudience}
                onChange={handleChange}
                required
                placeholder="e.g., Age 18-35, Interest in Technology"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget"
                name="budget"
                value={adData.budget}
                onChange={handleChange}
                required
                type="number"
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Campaign Duration (days)"
                name="duration"
                value={adData.duration}
                onChange={handleChange}
                required
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setAdData({
                    title: '',
                    description: '',
                    type: 'banner',
                    targetAudience: '',
                    budget: '',
                    duration: '',
                  })}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create Advertisement
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AdCreator; 