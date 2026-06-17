import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { Engineering, LocalShipping, Hub, TrendingUp } from '@mui/icons-material';

const services = [
  {
    icon: <Engineering sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Construction Site Intelligence',
    description: 'Automating site progress aggregation, compliance reviews, and correspondence register parsing with advanced document analysis.',
  },
  {
    icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Operations & Logistics Systems',
    description: 'Engineering real-time dispatcher portals, task coordination workflows and smart tracking systems for field operations.',
  },
  {
    icon: <Hub sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Enterprise Collaboration Platforms',
    description: 'Creating high-performance digital environments, unified resource portals and communication systems for distributed groups.',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Business Intelligence & Analytics',
    description: 'Designing interactive financial performance dashboards, S-curves, slippage tracking and predictive decision-support tools.',
  },
];

const Services = () => {
  return (
    <Box
      id="services"
      sx={{
        py: { xs: 5, sm: 8 },
        background: 'linear-gradient(180deg, #0B0E1F 0%, #080A16 100%)',
        color: '#fff',
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography
          variant="overline"
          align="center"
          sx={{
            color: '#00F2FE',
            fontWeight: 700,
            letterSpacing: '0.15em',
            fontFamily: 'Lexend, sans-serif',
            display: 'block',
            mb: 1
          }}
        >
          WHAT WE DELIVER
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 800,
            fontFamily: 'Lora, serif',
            fontSize: { xs: '2rem', sm: '2.5rem' }
          }}
        >
          Our Core Services
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: 'text.secondary',
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            maxWidth: '600px',
            mx: 'auto',
            mb: 6
          }}
        >
          We build robust, intelligent systems utilizing modern industry workflows and state-of-the-art frameworks.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr 1fr'
            },
            gap: 3,
            mt: { xs: 2, sm: 4 },
          }}
        >
          {services.map((service, index) => (
            <Paper
              key={index}
              sx={{
                p: { xs: 3, sm: 4 },
                textAlign: 'center',
                background: 'rgba(15, 18, 37, 0.4)',
                backdropFilter: 'blur(12px)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: 'rgba(0, 242, 254, 0.4)',
                  boxShadow: '0 8px 25px rgba(0, 242, 254, 0.15)',
                }
              }}
            >
              <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', background: 'rgba(0, 242, 254, 0.06)', mb: 2 }}>
                {service.icon}
              </Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mt: 1, mb: 1, fontFamily: 'Lora, serif', fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
                {service.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Inter, sans-serif', px: 1, fontSize: { xs: '0.8rem', sm: '0.85rem' }, lineHeight: 1.5 }}>
                {service.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
