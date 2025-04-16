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
import { advertisementAPI, analyticsAPI } from '../../services/api';

const ViewerDashboard = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ads, setAds] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedAd, setSelectedAd] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [likedAds, setLikedAds] = useState(new Set());

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch featured ads
        const adsResponse = await advertisementAPI.getAds({ 
          status: 'active',
          limit: 6,
          sort: '-createdAt'
        });
        setAds(adsResponse.data);

        // Fetch user interactions
        const interactionsResponse = await analyticsAPI.getUserInteractions();
        setInteractions(interactionsResponse.data);

        // Fetch available surveys
        const surveysResponse = await analyticsAPI.getSurveys();
        setSurveys(surveysResponse.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFeedbackSubmit = async (adId) => {
    try {
      await analyticsAPI.submitFeedback({
        adId,
        rating,
        feedback,
        userId: user.id
      });

      setSnackbar({
        open: true,
        message: 'Thank you for your feedback!',
        severity: 'success',
      });
      setFeedback('');
      setRating(0);
      setOpenDialog(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to submit feedback. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleLikeAd = async (adId) => {
    try {
      const isLiked = likedAds.has(adId);
      await analyticsAPI.toggleLike({
        adId,
        userId: user.id,
        action: isLiked ? 'unlike' : 'like'
      });

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
        message: isLiked ? 'Removed from liked ads' : 'Added to liked ads',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to update like status. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleShareAd = (ad) => {
    navigator.clipboard.writeText(`Check out this ad: ${ad.title}`);
    setSnackbar({
      open: true,
      message: 'Ad link copied to clipboard!',
      severity: 'success',
    });
  };

  const handleSurveyParticipate = async (survey) => {
    try {
      await analyticsAPI.participateInSurvey({
        surveyId: survey.id,
        userId: user.id
      });

      setSnackbar({
        open: true,
        message: 'Survey participation recorded. Rewards will be credited soon!',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to record survey participation. Please try again.',
        severity: 'error',
      });
    }
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

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
          {loading ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Grid>
          ) : ads.length > 0 ? (
            ads.map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={ad.image}
                    alt={ad.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {ad.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {ad.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {ad.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Avatar src={ad.advertiserAvatar} sx={{ width: 24, height: 24 }} />
                      <Typography variant="body2" color="text.secondary">
                        {ad.advertiser}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Rating value={ad.rating} readOnly precision={0.5} />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleLikeAd(ad.id)}
                          color={likedAds.has(ad.id) ? 'error' : 'default'}
                        >
                          {likedAds.has(ad.id) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <IconButton size="small" onClick={() => handleShareAd(ad)}>
                          <Share />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                No featured ads available at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {currentTab === 1 && (
        <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : interactions.length > 0 ? (
            interactions.map((interaction) => (
              <Box key={interaction.id} sx={{ mb: 2, p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="subtitle1">{interaction.adTitle}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {interaction.type} • {interaction.date}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
              No interactions recorded yet.
            </Typography>
          )}
        </Paper>
      )}

      {currentTab === 2 && (
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Grid>
          ) : surveys.length > 0 ? (
            surveys.map((survey) => (
              <Grid item xs={12} sm={6} key={survey.id}>
                <Card sx={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {survey.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {survey.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Reward: {survey.reward} points • Duration: {survey.duration}
                      </Typography>
                      <Button 
                        variant="contained" 
                        onClick={() => handleSurveyParticipate(survey)}
                        startIcon={<Poll />}
                      >
                        Participate
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                No surveys available at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Submit Feedback</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts..."
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleFeedbackSubmit(selectedAd?.id)} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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