import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircleOutline,
  Timeline,
  Schedule,
  Security,
  Language,
  AccountBalance,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, UserRoles } from '../../contexts/AuthContext';

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      let dashboardPath = '/';
      switch (user?.role) {
        case UserRoles.ADMIN:
          dashboardPath = '/admin';
          break;
        case UserRoles.ADVERTISER:
          dashboardPath = '/advertiser';
          break;
        case UserRoles.VIEWER:
          dashboardPath = '/viewer';
          break;
        default:
          dashboardPath = '/settings';
      }
      navigate(dashboardPath);
    } else {
      navigate('/signup');
    }
  };

  return (
    <Box
      sx={{
        height: '80vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
        borderRadius: theme.shape.borderRadius,
        mb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                color="white"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Transform Your Advertising
              </Typography>
              <Typography
                variant="h5"
                color="white"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Reach your target audience with precision and maximize your ROI
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Paper
    component={motion.div}
    whileHover={{ y: -8 }}
    sx={{
      p: 3,
      height: '100%',
      background: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Icon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
      <Typography variant="h6">{title}</Typography>
    </Box>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const features = [
  {
    icon: Timeline,
    title: 'Targeted Advertising',
    description: 'Reach your ideal audience with precision targeting based on demographics, interests, and behavior.',
  },
  {
    icon: Schedule,
    title: 'Real-Time Analytics',
    description: 'Monitor campaign performance with comprehensive real-time analytics and visualizations.',
  },
  {
    icon: Security,
    title: 'Secure Infrastructure',
    description: 'Your data is protected with enterprise-grade security, ensuring privacy and compliance.',
  },
  {
    icon: Language,
    title: 'Multi-Platform Integration',
    description: 'Run campaigns across multiple platforms from a single dashboard.',
  },
  {
    icon: AccountBalance,
    title: 'Budget Management',
    description: 'Set flexible budgets and bid strategies to control spending while maximizing results.',
  },
];

const FAQSection = () => {
  const faqs = [
    {
      question: 'What is E-Advertisement platform?',
      answer: 'Our E-Advertisement platform is a comprehensive digital advertising solution that helps businesses create, manage, and optimize their advertising campaigns across multiple channels.',
    },
    {
      question: 'How do I create an account?',
      answer: 'Simply click the "Sign Up" button, fill in your details, and follow the verification process. Once completed, you can start creating your first campaign.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also set up direct billing.',
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Container maxWidth="md">
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ my: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

const ContactSection = () => (
  <Box sx={{ py: 8, bgcolor: 'background.default' }}>
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Get in Touch
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send Us a Message
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label="Message"
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Contact Information
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>support@e-advertisement.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>+1 (800) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>123 Ad Avenue, Suite 456<br />New York, NY 10001</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <HeroSection />
      
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Features
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Discover the powerful tools and capabilities of our E-Advertisement platform
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <FAQSection />
      <ContactSection />
    </Box>
  );
};

export default HomePage; 