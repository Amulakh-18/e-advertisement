import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 3 }, py: 4 }}>
      <Grid container spacing={4}>
        {/* Company Info and Social Links */}
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h5" sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              E-Advertisement
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Transform your advertising strategy with our cutting-edge platform. Reach your target audience and maximize your ROI with advanced analytics and automated campaign management.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: <Facebook />, link: '#' },
                { icon: <Twitter />, link: '#' },
                { icon: <LinkedIn />, link: '#' },
                { icon: <Instagram />, link: '#' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component={Link}
                  href={social.link}
                  target="_blank"
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      background: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Product</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Features', 'Benefits', 'Pricing', 'FAQ'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Company</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['About Us', 'Contact', 'Careers', 'Blog'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Legal Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Legal</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Security'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Copyright */}
        <Grid item xs={12}>
          <Box sx={{ 
            pt: 3, 
            mt: 3, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              © {new Date().getFullYear()} E-Advertisement. All rights reserved.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer; 