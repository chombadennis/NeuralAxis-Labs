import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import HeroGraphics from '../components/HeroGraphics';
import { East } from '@mui/icons-material';

const Hero = () => {
  return (
    <Box
      id="hero"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 50%, #0c0f24 0%, #070913 100%)',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Dynamic Fluid Gradients & Curved Ribbons (Dribbble/Figma style) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {/* Soft Glowing Blob 1 (Top Right Neon Cyan) */}
        <Box
          sx={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, transparent 70%)',
            top: '-200px',
            right: '-100px',
            filter: 'blur(80px)',
            animation: 'floatGlow1 14s ease-in-out infinite alternate',
            '@keyframes floatGlow1': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(-60px, 40px) scale(1.05)' }
            }
          }}
        />

        {/* Soft Glowing Blob 2 (Center Left Electric Purple) */}
        <Box
          sx={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(156, 39, 176, 0.08) 0%, transparent 70%)',
            top: '35%',
            left: '-150px',
            filter: 'blur(90px)',
            animation: 'floatGlow2 18s ease-in-out infinite alternate',
            '@keyframes floatGlow2': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(50px, -30px) scale(0.95)' }
            }
          }}
        />

        {/* Glowing Fluid Vector Curves */}
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.65,
            filter: 'blur(2px)'
          }}
        >
          {/* Wave Curve 1 */}
          <path
            d="M -100,250 C 250,150 400,650 750,450 T 1700,150"
            fill="none"
            stroke="url(#fluidGrad1)"
            strokeWidth="5"
            strokeOpacity="0.4"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.35))'
            }}
          />
          {/* Wave Curve 2 */}
          <path
            d="M -50,650 C 450,450 550,150 950,350 T 1800,850"
            fill="none"
            stroke="url(#fluidGrad2)"
            strokeWidth="4"
            strokeOpacity="0.25"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(156, 39, 176, 0.25))'
            }}
          />

          <defs>
            <linearGradient id="fluidGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="50%" stopColor="#9C27B0" />
              <stop offset="100%" stopColor="#00F2FE" />
            </linearGradient>
            <linearGradient id="fluidGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9C27B0" />
              <stop offset="50%" stopColor="#00F2FE" />
              <stop offset="100%" stopColor="#9C27B0" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      {/* Main Responsive Grid Container */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">

          {/* Branding & Text Column (Left) */}
          <Grid size={{ xs: 12, md: 6.5 }} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Highly Prominent Logo Positioning (Centered and 20% Larger) */}
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 1.5
              }}
            >
              <Box
                component="img"
                src="/images/neuralaxis-logo.png"
                alt="NeuralAxis Labs Logo"
                sx={{
                  height: { xs: '110px', sm: '130px', md: '145px' },
                  mb: 0,
                  filter: 'drop-shadow(0 0 35px rgba(0, 242, 254, 0.45))',
                  transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    transform: 'scale(1.08) rotate(4deg)',
                  }
                }}
              />
            </Box>

            {/* NeuralAxis Labs Brand Title as Primary h1 */}
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: 'Lora, serif',
                fontWeight: 800,
                letterSpacing: '0.01em',
                fontSize: { xs: '2.3rem', sm: '3.2rem', md: '3.8rem' },
                lineHeight: 1.1,
                mb: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #ffffff 40%, #00F2FE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 20px rgba(0, 242, 254, 0.15))'
              }}
            >
              NeuralAxis Labs
            </Typography>

            {/* Informative Subtitle Description */}
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                fontFamily: 'Inter, sans-serif',
                mb: 5,
                color: 'text.secondary',
                fontWeight: 400,
                fontSize: { xs: '1.05rem', sm: '1.2rem' },
                lineHeight: 1.6,
                maxWidth: { xs: '600px', md: '560px' },
                mx: 'auto',
                textAlign: 'center'
              }}
            >
              Pioneering Our Generation of Intelligence, Innovation & High-Performance Web Architecture.
            </Typography>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2.5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '450px'
              }}
            >
              <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<East />}
                  sx={{
                    fontSize: '1rem',
                    padding: { xs: '10px 24px', sm: '14px 38px' },
                    borderRadius: '30px',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    width: { xs: 'auto', sm: '100%' },
                    boxShadow: '0 4px 20px rgba(0, 242, 254, 0.35)',
                    background: 'linear-gradient(135deg, #00F2FE 0%, #00C9FF 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00C9FF 0%, #00F2FE 100%)',
                      boxShadow: '0 6px 24px rgba(0, 242, 254, 0.5)',
                    }
                  }}
                >
                  Let's Engage
                </Button>
              </ScrollLink>

              <ScrollLink to="projects" smooth={true} duration={500} offset={-70}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    fontSize: '1rem',
                    padding: { xs: '9px 22px', sm: '13px 36px' },
                    borderRadius: '30px',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    width: { xs: 'auto', sm: '100%' },
                    color: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    '&:hover': {
                      borderColor: '#00F2FE',
                      background: 'rgba(0, 242, 254, 0.04)',
                    }
                  }}
                >
                  Explore Portfolio
                </Button>
              </ScrollLink>
            </Box>
          </Grid>

          {/* Telemetry Graphics Widget Column (Right) */}
          <Grid size={{ xs: 12, md: 5.5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <HeroGraphics />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
