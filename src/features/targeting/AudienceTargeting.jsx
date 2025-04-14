import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Autocomplete,
} from '@mui/material';
import { targetingAPI } from '../../services/api';

const AudienceTargeting = ({ onSave, initialData }) => {
  const [targeting, setTargeting] = useState({
    demographics: {
      ageRange: [18, 65],
      gender: [],
      location: [],
      income: [],
    },
    interests: [],
    behaviors: [],
    customSegments: [],
  });

  const [availableOptions, setAvailableOptions] = useState({
    interests: [],
    behaviors: [],
    locations: [],
    incomeRanges: [
      'Under $25,000',
      '$25,000 - $49,999',
      '$50,000 - $74,999',
      '$75,000 - $99,999',
      '$100,000+',
    ],
  });

  useEffect(() => {
    // Load available targeting options
    const loadOptions = async () => {
      try {
        const audiences = await targetingAPI.getAudiences();
        setAvailableOptions((prev) => ({
          ...prev,
          interests: audiences.interests || [],
          behaviors: audiences.behaviors || [],
          locations: audiences.locations || [],
        }));
      } catch (error) {
        console.error('Error loading targeting options:', error);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    if (initialData) {
      setTargeting(initialData);
    }
  }, [initialData]);

  const handleDemographicsChange = (field, value) => {
    setTargeting((prev) => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(targeting);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Audience Targeting
        </Typography>

        {/* Demographics */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Demographics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography gutterBottom>Age Range</Typography>
              <Slider
                value={targeting.demographics.ageRange}
                onChange={(_, value) => handleDemographicsChange('ageRange', value)}
                valueLabelDisplay="auto"
                min={13}
                max={100}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  multiple
                  value={targeting.demographics.gender}
                  onChange={(e) => handleDemographicsChange('gender', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Income Range</InputLabel>
                <Select
                  multiple
                  value={targeting.demographics.income}
                  onChange={(e) => handleDemographicsChange('income', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {availableOptions.incomeRanges.map((range) => (
                    <MenuItem key={range} value={range}>
                      {range}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableOptions.locations}
                value={targeting.demographics.location}
                onChange={(_, value) => handleDemographicsChange('location', value)}
                renderInput={(params) => (
                  <TextField {...params} label="Location" placeholder="Add locations" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} />
                  ))
                }
              />
            </Grid>
          </Grid>
        </Box>

        {/* Interests */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Interests
          </Typography>
          <Autocomplete
            multiple
            options={availableOptions.interests}
            value={targeting.interests}
            onChange={(_, value) => setTargeting((prev) => ({ ...prev, interests: value }))}
            renderInput={(params) => (
              <TextField {...params} label="Interests" placeholder="Add interests" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
          />
        </Box>

        {/* Behaviors */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Behaviors
          </Typography>
          <Autocomplete
            multiple
            options={availableOptions.behaviors}
            value={targeting.behaviors}
            onChange={(_, value) => setTargeting((prev) => ({ ...prev, behaviors: value }))}
            renderInput={(params) => (
              <TextField {...params} label="Behaviors" placeholder="Add behaviors" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
          />
        </Box>

        {/* Custom Segments */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Custom Segments
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter custom targeting segments (one per line)"
            value={targeting.customSegments.join('\n')}
            onChange={(e) =>
              setTargeting((prev) => ({
                ...prev,
                customSegments: e.target.value.split('\n').filter(Boolean),
              }))
            }
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={() => setTargeting({
            demographics: {
              ageRange: [18, 65],
              gender: [],
              location: [],
              income: [],
            },
            interests: [],
            behaviors: [],
            customSegments: [],
          })}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Targeting
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AudienceTargeting; 