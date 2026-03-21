import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { BarChart, Code, Memory, Storage } from '@mui/icons-material';

const services = [
  {
    icon: <Memory sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Artificial Intelligence',
    description: 'Cutting-edge AI solutions for your business.',
  },
  {
    icon: <BarChart sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Data Analysis',
    description: 'Transforming complex data into clear, actionable insights.',
  },
  {
    icon: <Code sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Web Development',
    description: 'Building modern, responsive, and scalable web applications.',
  },
  {
    icon: <Storage sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Machine Learning',
    description: 'Developing intelligent systems that learn from data.',
  },
];

const Services = () => {
  return (
    <Box id="services" sx={{ py: { xs: 6, sm: 8 }, background: '#2a2a2a', color: '#fff', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '2.5rem' } 
          }}
        >
          Our Services
        </Typography>
        {/* 
          This reverts to the original structure but uses a robust CSS Grid to prevent overlap.
          This avoids all the complex styling that was causing issues.
        */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr 1fr'
            },
            gap: 3, // Use gap for spacing, which is more reliable.
            mt: { xs: 2, sm: 4 },
          }}
        >
          {services.map((service, index) => (
            <Paper 
              key={index}
              sx={{
                p: { xs: 2, sm: 3 },
                textAlign: 'center',
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #4a4a4a',
                borderRadius: '12px',
                // No fixed height, no flex stretching. The card is as big as its content.
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                }
              }}
            >
              <Box>
                {service.icon}
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                  {service.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#ccc', px: 1 }}>
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
