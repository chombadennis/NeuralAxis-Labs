
import React from 'react';
import { Box, Typography, IconButton, Link, Grid } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ background: '#1a1a1a', color: '#fff', py: { xs: 3, sm: 4 }, textAlign: 'center' }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12} sm="auto">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()}{' '}
            <Link component={RouterLink} to="/" sx={{ color: '#fff', textDecoration: 'none' }}>
              NeuralAxis Labs
            </Link>
            . All Rights Reserved.
          </Typography>
        </Grid>
        <Grid xs={12} sm="auto">
          <Link component={RouterLink} to="/terms" sx={{ color: '#fff', mx: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
            Terms of Service
          </Link>
          <Link component={RouterLink} to="/policy" sx={{ color: '#fff', mx: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
            Privacy Policy
          </Link>
        </Grid>
        <Grid xs={12} sm="auto">
          <IconButton sx={{ color: '#fff' }} href="#">
            <GitHub />
          </IconButton>
          <IconButton sx={{ color: '#fff' }} href="#">
            <LinkedIn />
          </IconButton>
          <IconButton sx={{ color: '#fff' }} href="#">
            <Twitter />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
