
import React from 'react';
import { Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Box id="about" sx={{ py: { xs: 6, sm: 8 }, background: '#1a1a1a', color: '#fff', px: { xs: 2, sm: 3, md: 4 } }}>
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
        About Us
      </Typography>
      <Typography 
        variant="body1" 
        align="center" 
        sx={{ 
          mt: 2, 
          color: '#ccc',
          fontSize: { xs: '1rem', sm: '1.1rem' },
          maxWidth: '800px',
          mx: 'auto'
        }}
      >
        NeuralAxis Labs is a collective of passionate developers dedicated to advocating and using technology. We create bespoke solutions in Artificial Intelligence, Machine Learning, Data Analysis and Web Development. Our mission is to transform complex challenges into elegant, intelligent and impactful results.
      </Typography>
    </Box>
  );
};

export default About;
