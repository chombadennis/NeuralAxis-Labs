
import React from 'react';
import { Box, Typography, IconButton, Link, Grid } from '@mui/material';
import { GitHub, LinkedIn, X } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ background: '#070913', borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', py: { xs: 4, sm: 6 }, px: 3 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Inter, sans-serif' }}>
            &copy; {new Date().getFullYear()}{' '}
            <Link component={RouterLink} to="/" sx={{ color: '#00F2FE', textDecoration: 'none', fontWeight: 600 }}>
              NeuralAxis Labs
            </Link>
            . All Rights Reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
          <Link component={RouterLink} to="/terms" sx={{ color: 'text.secondary', mx: 1.5, fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'Inter, sans-serif', '&:hover': { color: '#00F2FE' } }}>
            Terms of Service
          </Link>
          <Link component={RouterLink} to="/policy" sx={{ color: 'text.secondary', mx: 1.5, fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'Inter, sans-serif', '&:hover': { color: '#00F2FE' } }}>
            Privacy Policy
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
          <IconButton sx={{ color: 'text.secondary', '&:hover': { color: '#00F2FE' } }} href="#">
            <GitHub />
          </IconButton>
          <IconButton sx={{ color: 'text.secondary', '&:hover': { color: '#00F2FE' } }} href="#">
            <LinkedIn />
          </IconButton>
          <IconButton sx={{ color: 'text.secondary', '&:hover': { color: '#00F2FE' } }} href="#">
            <X />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
