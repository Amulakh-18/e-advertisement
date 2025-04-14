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
  Rating,
  TextField,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const ViewerDashboard = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  // Mock data for advertisements
  const [advertisements] = useState([
    {
      id: 1,
      title: 'Summer Sale',
      description: 'Get up to 50% off on summer collection',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.5,
      feedbackCount: 128,
    },
    {
      id: 2,
      title: 'New Product Launch',
      description: 'Be the first to try our new product',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.2,
      feedbackCount: 85,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFeedbackSubmit = (adId) => {
    console.log('Feedback submitted:', { adId, feedback, rating });
    setFeedback('');
    setRating(0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user?.username}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Featured Ads" />
          <Tab label="My Interactions" />
          <Tab label="Surveys & Polls" />
        </Tabs>
      </Box>

      {currentTab === 0 && (
        <Grid container spacing={3}>
          {advertisements.map((ad) => (
            <Grid item xs={12} md={6} key={ad.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={ad.image}
                  alt={ad.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {ad.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {ad.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={ad.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({ad.feedbackCount} reviews)
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Leave Feedback
                    </Typography>
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Share your thoughts..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      sx={{ mt: 1, mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleFeedbackSubmit(ad.id)}
                      disabled={!feedback || !rating}
                    >
                      Submit Feedback
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {currentTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Your Recent Interactions
          </Typography>
          <Typography color="text.secondary">
            Track your engagement with advertisements here.
          </Typography>
        </Paper>
      )}

      {currentTab === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Available Surveys & Polls
          </Typography>
          <Typography color="text.secondary">
            Participate in surveys and polls to earn rewards.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default ViewerDashboard; 