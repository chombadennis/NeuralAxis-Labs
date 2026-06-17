
import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import { AutoAwesome, Code, QueryStats } from '@mui/icons-material';

const highlights = [
  {
    icon: <AutoAwesome sx={{ color: '#00F2FE', fontSize: 32 }} />,
    title: 'Bespoke AI Systems',
    desc: 'Intelligent, automated agents and models built specifically for custom business operations.'
  },
  {
    icon: <QueryStats sx={{ color: '#00F2FE', fontSize: 32 }} />,
    title: 'Advanced Analytics',
    desc: 'Unlocking raw data capability to reveal hidden patterns, predict trends and optimize decisions.'
  },
  {
    icon: <Code sx={{ color: '#00F2FE', fontSize: 32 }} />,
    title: 'High-Performance Web',
    desc: 'Scalable cloud architecture, blazing fast web apps and secure software integrations.'
  }
];

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, sm: 12 },
        background: 'linear-gradient(180deg, #070913 0%, #0B0E1F 100%)',
        color: '#fff',
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative'
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative' }}>
              <Typography
                variant="overline"
                sx={{
                  color: '#00F2FE',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  fontFamily: 'Lexend, sans-serif',
                  display: 'inline-block',
                  mb: 1
                }}
              >
                OUR IDENTITY
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontFamily: 'Lora, serif',
                  fontSize: { xs: '2rem', sm: '2.5rem' }
                }}
              >
                Who We Are
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.6,
                  mb: 3,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                NeuralAxis Labs is a collective of developers and researchers dedicated to building intuitive technology. We build tailored software in Artificial Intelligence, Machine Learning, Data Analytics and Web Development.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.6,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Our mission is to transform complex backend, algorithm and integration challenges into elegant, intelligent and highly scalable results that propel industries forward.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {highlights.map((item, idx) => (
                <Grid item xs={12} sm={6} md={12} key={idx}>
                  <Paper
                    sx={{
                      p: 3,
                      display: 'flex',
                      gap: 3,
                      alignItems: 'flex-start',
                      background: 'rgba(15, 18, 37, 0.4)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        borderColor: 'rgba(0, 242, 254, 0.3)',
                        boxShadow: '0 4px 20px rgba(0, 242, 254, 0.1)'
                      }
                    }}
                  >
                    <Box sx={{ p: 1.5, borderRadius: '12px', background: 'rgba(0, 242, 254, 0.08)', display: 'flex' }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontFamily: 'Lora, serif', fontSize: { xs: '1.05rem', sm: '1.15rem' } }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.8rem', sm: '0.85rem' }, lineHeight: 1.5 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
