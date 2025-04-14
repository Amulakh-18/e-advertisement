import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
  Grid,
  useTheme,
} from '@mui/material';
import {
  ExpandMore,
  Email,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'What is E-Advertisement platform?',
    answer: 'Our E-Advertisement platform is a comprehensive digital advertising solution that helps businesses create, manage, and optimize their advertising campaigns across multiple channels. It provides advanced targeting capabilities, real-time analytics, and automated campaign management tools to maximize your advertising ROI.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Creating an account is simple. Click the "Sign Up" button, fill in your details including name, email, and password. Choose your account type (Advertiser or Viewer), verify your email address, and you\'re ready to start using our platform. The entire process takes less than 5 minutes.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For enterprise customers, we also offer invoice-based billing with flexible payment terms. All payments are processed securely through our encrypted payment system.',
  },
  {
    question: 'How does campaign targeting work?',
    answer: 'Our platform uses advanced algorithms and machine learning to target your ads to the most relevant audience. You can target based on demographics, interests, behavior, location, and more. The system continuously optimizes your campaigns based on performance data to improve results over time.',
  },
  {
    question: 'Can I track the performance of my ads?',
    answer: 'Yes, our platform provides comprehensive real-time analytics. You can track key metrics like impressions, clicks, conversions, ROI, and more through our intuitive dashboard. We also offer detailed reports and insights to help you understand your campaign performance and make data-driven decisions.',
  },
];

const FAQPage = () => {
  const theme = useTheme();
  const [expandedPanel, setExpandedPanel] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header Section */}
      <Box
        sx={{
          pt: 12,
          pb: 8,
          background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.05), rgba(25, 118, 210, 0.1))',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            FAQ
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}
          >
            Find answers to the most commonly asked questions about our E-Advertisement platform
          </Typography>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Left Column - FAQ List */}
          <Grid item xs={12} md={8}>
            <Box>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Accordion
                    expanded={expandedPanel === index}
                    onChange={handleAccordionChange(index)}
                    sx={{
                      mb: 2,
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      '&:before': {
                        display: 'none',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          my: 2,
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Right Column - Contact Support */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper
                sx={{
                  p: 4,
                  background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.05), rgba(25, 118, 210, 0.1))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Box
                  component="img"
                  src="https://source.unsplash.com/random/600x400/?customer-service"
                  alt="Customer Support"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 3,
                  }}
                />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Have additional questions?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Contact our support team for personalized assistance with your advertising needs
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Email />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                  }}
                >
                  Contact Us
                </Button>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                    Photo by Brooke Lark
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQPage;