import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Autocomplete,
  Slider,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Chip,
  Card,
  CardContent,
  IconButton,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  TrackChanges as TargetIcon,
} from '@mui/icons-material';

// Mock data
const INTERESTS = [
  'Technology', 'Fashion', 'Sports', 'Gaming', 'Travel', 'Food', 'Music', 'Movies',
  'Books', 'Fitness', 'Photography', 'Art', 'Business', 'Education', 'Health'
];

const LOCATIONS = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose'
];

const BEHAVIORS = [
  'Online Shoppers', 'Mobile Users', 'Social Media Active', 'Video Streamers',
  'Frequent Travelers', 'Tech Enthusiasts', 'Fitness Enthusiasts', 'Foodies'
];

const Targeting = () => {
  const [targetingCriteria, setTargetingCriteria] = useState({
    ageRange: [18, 65],
    interests: [],
    locations: [],
    behaviors: [],
    gender: {
      male: true,
      female: true,
      other: true,
    },
    devices: {
      mobile: true,
      desktop: true,
      tablet: true,
    },
    customSegments: [],
  });

  const [customSegment, setCustomSegment] = useState({
    name: '',
    criteria: '',
  });

  const handleAgeRangeChange = (event, newValue) => {
    setTargetingCriteria(prev => ({
      ...prev,
      ageRange: newValue,
    }));
  };

  const handleInterestsChange = (event, newValue) => {
    setTargetingCriteria(prev => ({
      ...prev,
      interests: newValue,
    }));
  };

  const handleLocationsChange = (event, newValue) => {
    setTargetingCriteria(prev => ({
      ...prev,
      locations: newValue,
    }));
  };

  const handleBehaviorsChange = (event, newValue) => {
    setTargetingCriteria(prev => ({
      ...prev,
      behaviors: newValue,
    }));
  };

  const handleGenderChange = (event) => {
    setTargetingCriteria(prev => ({
      ...prev,
      gender: {
        ...prev.gender,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleDeviceChange = (event) => {
    setTargetingCriteria(prev => ({
      ...prev,
      devices: {
        ...prev.devices,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleAddCustomSegment = () => {
    if (customSegment.name && customSegment.criteria) {
      setTargetingCriteria(prev => ({
        ...prev,
        customSegments: [...prev.customSegments, customSegment],
      }));
      setCustomSegment({ name: '', criteria: '' });
    }
  };

  const handleRemoveCustomSegment = (index) => {
    setTargetingCriteria(prev => ({
      ...prev,
      customSegments: prev.customSegments.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    // Here you would typically save the targeting criteria to your backend
    console.log('Saving targeting criteria:', targetingCriteria);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 4 
      }}>
        Audience Targeting
      </Typography>

      <Grid container spacing={3}>
        {/* Demographics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Demographics</Typography>
            
            <Box sx={{ mb: 4 }}>
              <FormLabel component="legend">Age Range</FormLabel>
              <Slider
                value={targetingCriteria.ageRange}
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                min={13}
                max={100}
                sx={{ mt: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                Target users aged {targetingCriteria.ageRange[0]} to {targetingCriteria.ageRange[1]}
              </Typography>
            </Box>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={targetingCriteria.gender.male}
                      onChange={handleGenderChange}
                      name="male"
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={targetingCriteria.gender.female}
                      onChange={handleGenderChange}
                      name="female"
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={targetingCriteria.gender.other}
                      onChange={handleGenderChange}
                      name="other"
                    />
                  }
                  label="Other"
                />
              </FormGroup>
            </FormControl>
          </Paper>
        </Grid>

        {/* Interests and Behaviors */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Interests & Behaviors</Typography>
            
            <Autocomplete
              multiple
              options={INTERESTS}
              value={targetingCriteria.interests}
              onChange={handleInterestsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interests"
                  placeholder="Add interests"
                  sx={{ mb: 3 }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ m: 0.5 }}
                  />
                ))
              }
            />

            <Autocomplete
              multiple
              options={BEHAVIORS}
              value={targetingCriteria.behaviors}
              onChange={handleBehaviorsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Behaviors"
                  placeholder="Add behaviors"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ m: 0.5 }}
                  />
                ))
              }
            />
          </Paper>
        </Grid>

        {/* Location */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Location</Typography>
            
            <Autocomplete
              multiple
              options={LOCATIONS}
              value={targetingCriteria.locations}
              onChange={handleLocationsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Locations"
                  placeholder="Add locations"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ m: 0.5 }}
                  />
                ))
              }
            />
          </Paper>
        </Grid>

        {/* Devices */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Devices</Typography>
            
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={targetingCriteria.devices.mobile}
                      onChange={handleDeviceChange}
                      name="mobile"
                    />
                  }
                  label="Mobile"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={targetingCriteria.devices.desktop}
                      onChange={handleDeviceChange}
                      name="desktop"
                    />
                  }
                  label="Desktop"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={targetingCriteria.devices.tablet}
                      onChange={handleDeviceChange}
                      name="tablet"
                    />
                  }
                  label="Tablet"
                />
              </FormGroup>
            </FormControl>
          </Paper>
        </Grid>

        {/* Custom Segments */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Custom Segments</Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Segment Name"
                  value={customSegment.name}
                  onChange={(e) => setCustomSegment(prev => ({ ...prev, name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Segment Criteria"
                  value={customSegment.criteria}
                  onChange={(e) => setCustomSegment(prev => ({ ...prev, criteria: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddCustomSegment}
                  sx={{ height: '100%' }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {targetingCriteria.customSegments.map((segment, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">{segment.name}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveCustomSegment(index)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {segment.criteria}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
            },
          }}
        >
          Save Targeting Criteria
        </Button>
      </Box>
    </Container>
  );
};

export default Targeting; 