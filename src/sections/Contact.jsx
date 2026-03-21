
import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      if (!name) newErrors.name = 'Name is required';
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!message) newErrors.message = 'Message is required';
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };
    validateForm();
  }, [name, email, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const functionUrl = import.meta.env.VITE_EMAIL_SEND_URL;

    if (!functionUrl || functionUrl === 'YOUR_CLOUD_FUNCTION_URL_HERE') {
      setResponseMessage('The backend function is not configured yet. Please deploy the function and add the URL to the .env file.');
      setSeverity('error');
      setOpen(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setResponseMessage('Message sent successfully!');
        setSeverity('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorText = await response.text();
        setResponseMessage(`Failed to send message: ${errorText}`);
        setSeverity('error');
      }
    } catch {
      setResponseMessage('An unknown error occurred while contacting the backend.');
      setSeverity('error');
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box id="contact" sx={{ py: { xs: 6, sm: 8 }, background: '#2a2a2a', color: '#fff', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
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
          Contact Us
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 4, 
            color: '#ccc', 
            fontSize: { xs: '1rem', sm: '1.1rem' } 
          }}
        >
          Have a project in mind? We'd love to hear from you.
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ 
              input: { color: '#fff' }, 
              label: { color: '#ccc' }, 
              mb: { xs: 2, sm: 3 },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ 
              input: { color: '#fff' }, 
              label: { color: '#ccc' }, 
              mb: { xs: 2, sm: 3 },
            }}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={!!errors.message}
            helperText={errors.message}
            sx={{ 
              textarea: { color: '#fff' }, 
              label: { color: '#ccc' },
              mb: { xs: 2, sm: 3 },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ 
              mt: 2,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
            type="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Message'}
          </Button>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {responseMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Contact;
