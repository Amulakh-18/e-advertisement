import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Increased ROI',
    description: 'Maximize your return on investment with targeted campaigns that reach the right audience at the right time.',
  },
  {
    title: 'Time Efficiency',
    description: 'Save valuable time with our intuitive interface and automated campaign management tools.',
  },
  {
    title: 'Data-Driven Decisions',
    description: 'Make informed marketing decisions based on comprehensive analytics and performance metrics.',
  },
  {
    title: 'Cost Effectiveness',
    description: 'Optimize your advertising budget with flexible payment options and no hidden fees.',
  },
];

const BenefitItem = ({ title, description, index }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box sx={{ display: 'flex', mb: 4 }}>
        <Box sx={{ mr: 2, mt: 0.5 }}>
          <CheckCircleOutline
            sx={{
              color: 'primary.main',
              fontSize: 24,
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '90%' }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const BenefitsPage = () => {
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
            Benefits
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}
          >
            Experience the advantages of our powerful E-Advertisement platform
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Column - Benefits List */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, mb: 4 }}
              >
                Why Choose Our Platform?
              </Typography>
              
              <Box>
                {benefits.map((benefit, index) => (
                  <BenefitItem
                    key={index}
                    {...benefit}
                    index={index}
                  />
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Right Column - Image */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper
                sx={{
                  overflow: 'hidden',
                  borderRadius: 4,
                  boxShadow: theme.shadows[20],
                }}
              >
                <Box
                  component="img"
                  src="https://source.unsplash.com/random/800x600?business,meeting"
                  alt="Team collaboration"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />
              </Paper>

              {/* Image Caption */}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontStyle: 'italic' }}
                >
                  Photo by Brooke Cagle
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Additional Benefits Section */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Transform Your Advertising Strategy
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Smart Campaign Optimization',
                description: 'Our AI-powered platform automatically optimizes your campaigns for maximum performance.',
              },
              {
                title: 'Comprehensive Analytics',
                description: 'Get detailed insights into your campaign performance with our advanced analytics tools.',
              },
              {
                title: 'Global Reach',
                description: 'Expand your reach to new markets with our worldwide advertising network.',
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
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
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                    >
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default BenefitsPage; 