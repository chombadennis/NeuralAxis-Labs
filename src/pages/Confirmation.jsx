import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 128px)', // Adjust height to account for navbar and footer
        textAlign: 'center',
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, background: '#2a2a2a', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Check Your Email
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          We've sent a verification link to your email address. Please check your inbox and follow the instructions to complete your registration.
        </Typography>
        <Typography variant="body2">
          Didn't receive an email? Check your spam folder or <Link to="/signup">try signing up again</Link>.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Confirmation;
