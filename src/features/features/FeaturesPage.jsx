import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Timeline,
  Analytics,
  Schedule,
  Language,
  AccountBalance,
  Security,
  Campaign,
  Assessment,
  Speed,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Paper
        sx={{
          p: 3,
          height: '100%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: '12px',
              bgcolor: 'primary.main',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const features = [
  {
    icon: Timeline,
    title: 'Targeted Advertising',
    description: 'Reach your ideal audience with precision targeting based on demographics, interests, and online behavior.',
  },
  {
    icon: Analytics,
    title: 'Real-Time Analytics',
    description: 'Monitor campaign performance with comprehensive real-time analytics and insightful visualizations.',
  },
  {
    icon: Schedule,
    title: 'Automated Scheduling',
    description: 'Schedule campaigns in advance and let our system optimize delivery times for maximum engagement.',
  },
  {
    icon: Language,
    title: 'Multi-Platform Integration',
    description: 'Run campaigns across multiple platforms from a single dashboard, simplifying your advertising workflow.',
  },
  {
    icon: AccountBalance,
    title: 'Budget Management',
    description: 'Set flexible budgets and bid strategies to control spending while maximizing campaign results.',
  },
  {
    icon: Security,
    title: 'Secure Infrastructure',
    description: 'Your data is protected with enterprise-grade security, ensuring privacy and compliance.',
  },
];

const AdvancedTools = [
  {
    icon: Campaign,
    title: 'A/B Testing Framework',
    description: 'Test different ad variations simultaneously to identify the highest-performing content and strategies for your audience.',
    features: [
      'Compare multiple ad variations',
      'Statistical significance testing',
      'Conversion optimization',
    ],
  },
  {
    icon: Assessment,
    title: 'Audience Insights',
    description: 'Gain deep understanding of your audience with comprehensive demographic and behavioral analytics.',
    features: [
      'Demographic segmentation',
      'Interest mapping',
      'Buying behavior analysis',
    ],
  },
  {
    icon: Speed,
    title: 'Performance Optimization',
    description: 'Automatically optimize your campaigns for maximum performance and ROI.',
    features: [
      'Smart bid optimization',
      'Dynamic content adjustment',
      'Real-time performance tracking',
    ],
  },
];

const FeaturesPage = () => {
  const theme = useTheme();

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
            Features
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}
          >
            Discover the powerful tools and capabilities of our E-Advertisement platform
          </Typography>

          {/* Core Features Grid */}
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard {...feature} delay={index * 0.1} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Advanced Tools Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Advanced Advertisement Tools
        </Typography>

        <Grid container spacing={4}>
          {AdvancedTools.map((tool, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.05), rgba(25, 118, 210, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '12px',
                        bgcolor: 'primary.main',
                        mr: 2,
                      }}
                    >
                      <tool.icon sx={{ color: 'white', fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {tool.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {tool.description}
                  </Typography>
                  <Box>
                    {tool.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            mr: 2,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesPage; 