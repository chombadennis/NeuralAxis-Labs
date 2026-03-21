
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <Box 
      id="hero"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        p: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          component="img"
          src="/images/neuralaxis-logo.png"
          alt="NeuralAxis Labs Logo"
          sx={{
            height: { xs: '100px', sm: '120px', md: '150px' },
            mb: 2,
          }}
        />
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
          }}
        >
          NeuralAxis Labs
        </Typography>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{
            mb: 4,
            fontStyle: 'italic',
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }}
        >
          Pioneering the Future of Intelligence
        </Typography>
        <Link to="projects" smooth={true} duration={500}>
          <Button variant="contained" color="primary" size="large" sx={{ fontSize: { xs: '1rem', sm: '1.2rem'} }}>
            Explore Our Work
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Hero;
