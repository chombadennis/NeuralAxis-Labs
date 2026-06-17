
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
        background: 'radial-gradient(circle at 50% 50%, #0F1633 0%, #070913 100%)',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        textAlign: 'center',
        p: { xs: 2, sm: 3, md: 4 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, rgba(156, 39, 176, 0.05) 50%, transparent 100%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '900px' }}>
        <Box
          component="img"
          src="/images/neuralaxis-logo.png"
          alt="NeuralAxis Labs Logo"
          sx={{
            height: { xs: '110px', sm: '130px', md: '160px' },
            mb: 3,
            filter: 'drop-shadow(0 0 20px rgba(0, 242, 254, 0.4))',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.05) rotate(5deg)',
            }
          }}
        />
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: 'Lora, serif',
            fontWeight: 800,
            letterSpacing: '0.02em',
            fontSize: { xs: '2.2rem', sm: '3.5rem', md: '4.5rem' },
            background: 'linear-gradient(135deg, #ffffff 30%, #00F2FE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(0, 242, 254, 0.2)',
            mb: 2
          }}
        >
          NeuralAxis Labs
        </Typography>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{
            fontFamily: 'Inter, sans-serif',
            mb: 5,
            color: 'text.secondary',
            fontWeight: 400,
            fontSize: { xs: '1.1rem', sm: '1.4rem' },
            letterSpacing: '0.05em',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Pioneering the Next Generation of Intelligence, Innovation & High-Performance Web Architecture.
        </Typography>
        <Link to="projects" smooth={true} duration={500} offset={-70}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              padding: '12px 36px',
              borderRadius: '30px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(0, 242, 254, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            Explore Our Work
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Hero;
