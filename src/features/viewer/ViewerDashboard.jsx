import { useState, useEffect } from 'react';
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
  Chip,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  ThumbUp,
  ThumbDown,
  Poll,
  History,
  Visibility,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const MOCK_ADS = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    description: 'Discover our latest summer collection with up to 50% off on selected items.',
    image: 'https://source.unsplash.com/random/800x600/?summer,fashion',
    rating: 4.5,
    feedbackCount: 128,
    tags: ['Fashion', 'Summer', 'Sale'],
    advertiser: 'Fashion Store',
    likes: 245,
    views: 1200,
    category: 'Fashion',
  },
  {
    id: 2,
    title: 'New Tech Gadgets',
    description: 'Experience the future with our cutting-edge technology products.',
    image: 'https://source.unsplash.com/random/800x600/?technology,gadgets',
    rating: 4.2,
    feedbackCount: 85,
    tags: ['Technology', 'Gadgets', 'Innovation'],
    advertiser: 'Tech Hub',
    likes: 189,
    views: 890,
    category: 'Technology',
  },
  {
    id: 3,
    title: 'Healthy Living Products',
    description: 'Start your wellness journey with our organic product range.',
    image: 'https://source.unsplash.com/random/800x600/?healthy,organic',
    rating: 4.8,
    feedbackCount: 156,
    tags: ['Health', 'Organic', 'Wellness'],
    advertiser: 'Organic Life',
    likes: 312,
    views: 1500,
    category: 'Health',
  },
];

const MOCK_INTERACTIONS = [
  {
    id: 1,
    type: 'like',
    adTitle: 'Summer Collection 2024',
    date: '2024-03-15',
    advertiser: 'Fashion Store',
  },
  {
    id: 2,
    type: 'feedback',
    adTitle: 'New Tech Gadgets',
    date: '2024-03-14',
    advertiser: 'Tech Hub',
  },
  {
    id: 3,
    type: 'view',
    adTitle: 'Healthy Living Products',
    date: '2024-03-13',
    advertiser: 'Organic Life',
  },
];

const MOCK_SURVEYS = [
  {
    id: 1,
    title: 'Product Satisfaction Survey',
    description: 'Help us improve our products with your valuable feedback',
    reward: 50,
    duration: '5 mins',
    deadline: '2024-03-30',
  },
  {
    id: 2,
    title: 'User Experience Survey',
    description: 'Share your experience with our new website design',
    reward: 30,
    duration: '3 mins',
    deadline: '2024-03-25',
  },
];

const ViewerDashboard = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedAd, setSelectedAd] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [likedAds, setLikedAds] = useState(new Set());

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFeedbackSubmit = (adId) => {
    setSnackbar({
      open: true,
      message: 'Thank you for your feedback!',
      severity: 'success',
    });
    setFeedback('');
    setRating(0);
    setOpenDialog(false);
  };

  const handleLikeAd = (adId) => {
    setLikedAds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(adId)) {
        newSet.delete(adId);
      } else {
        newSet.add(adId);
      }
      return newSet;
    });
    setSnackbar({
      open: true,
      message: likedAds.has(adId) ? 'Removed from liked ads' : 'Added to liked ads',
      severity: 'success',
    });
  };

  const handleShareAd = (ad) => {
    navigator.clipboard.writeText(`Check out this ad: ${ad.title}`);
    setSnackbar({
      open: true,
      message: 'Ad link copied to clipboard!',
      severity: 'success',
    });
  };

  const handleSurveyParticipate = (survey) => {
    setSnackbar({
      open: true,
      message: 'Survey participation recorded. Rewards will be credited soon!',
      severity: 'success',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user?.username}!
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab icon={<Visibility />} label="Featured Ads" />
          <Tab icon={<History />} label="My Interactions" />
          <Tab icon={<Poll />} label="Surveys & Polls" />
        </Tabs>
      </Box>

      {currentTab === 0 && (
        <Grid container spacing={3}>
          {MOCK_ADS.map((ad) => (
            <Grid item xs={12} md={6} key={ad.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={ad.image}
                  alt={ad.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">{ad.title}</Typography>
                    <Chip label={ad.category} color="primary" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {ad.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {ad.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={ad.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({ad.feedbackCount} reviews)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton onClick={() => handleLikeAd(ad.id)}>
                        {likedAds.has(ad.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                      </IconButton>
                      <IconButton onClick={() => handleShareAd(ad)}>
                        <Share />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedAd(ad);
                        setOpenDialog(true);
                      }}
                    >
                      Give Feedback
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {currentTab === 1 && (
        <Grid container spacing={3}>
          {MOCK_INTERACTIONS.map((interaction) => (
            <Grid item xs={12} key={interaction.id}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {interaction.type === 'like' ? <ThumbUp /> : 
                     interaction.type === 'feedback' ? <Poll /> : <Visibility />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">
                      {interaction.adTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {interaction.advertiser} • {interaction.date}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {currentTab === 2 && (
        <Grid container spacing={3}>
          {MOCK_SURVEYS.map((survey) => (
            <Grid item xs={12} md={6} key={survey.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {survey.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {survey.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip label={`${survey.duration}`} variant="outlined" size="small" />
                    <Chip label={`Reward: ${survey.reward} points`} color="primary" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Deadline: {survey.deadline}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleSurveyParticipate(survey)}
                    >
                      Participate
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Feedback Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Share Your Feedback</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Rate this advertisement
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Share your thoughts about this advertisement..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleFeedbackSubmit(selectedAd?.id)}
            disabled={!feedback || !rating}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewerDashboard; 