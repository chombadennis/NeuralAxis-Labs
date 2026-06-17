
import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, CircularProgress, Snackbar, Alert, Grid, Paper } from '@mui/material';
import { Email, LocationOn, AccessTime } from '@mui/icons-material';

const contactDetails = [
  {
    icon: <LocationOn sx={{ color: '#00F2FE', fontSize: 28 }} />,
    title: 'Our Location',
    value: 'Nairobi, Kenya',
    desc: 'Operating globally, serving clients with premium remote software solutions.'
  },
  {
    icon: <AccessTime sx={{ color: '#00F2FE', fontSize: 28 }} />,
    title: 'Response Time',
    value: 'Within 24 Hours',
    desc: 'We analyze all submissions and respond with initial feedback promptly.'
  }
];

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
    <Box
      id="contact"
      sx={{
        py: { xs: 8, sm: 12 },
        background: 'linear-gradient(180deg, #0B0E1F 0%, #070913 100%)',
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
          GET IN TOUCH
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 800,
            fontFamily: 'Lora, serif',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            mb: 6
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {contactDetails.map((detail, idx) => {
            const isEmail = !!detail.link;
            const CardComponent = isEmail ? 'a' : Box;
            const cardProps = isEmail ? { href: detail.link, style: { textDecoration: 'none' } } : {};

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Paper
                  component={CardComponent}
                  {...cardProps}
                  sx={{
                    p: 3,
                    display: 'flex',
                    gap: 3,
                    alignItems: 'flex-start',
                    background: 'rgba(15, 18, 37, 0.4)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(0, 242, 254, 0.3)',
                      boxShadow: '0 8px 25px rgba(0, 242, 254, 0.12)'
                    }
                  }}
                >
                  <Box sx={{ p: 1.5, borderRadius: '12px', background: 'rgba(0, 242, 254, 0.08)', display: 'flex' }}>
                    {detail.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontFamily: 'Lora, serif', fontSize: { xs: '1.05rem', sm: '1.15rem' }, color: '#fff' }}>
                      {detail.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontFamily: 'Lexend, sans-serif', fontSize: { xs: '0.85rem', sm: '0.9rem' }, color: '#00F2FE' }}>
                      {detail.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.8rem', sm: '0.85rem' }, lineHeight: 1.5 }}>
                      {detail.desc}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            sx={{
              p: { xs: 3, sm: 5 },
              width: '100%',
              maxWidth: '750px',
              background: 'rgba(15, 18, 37, 0.2)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'text.secondary',
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '0.95rem', sm: '1rem' },
                textAlign: 'center'
              }}
            >
              Have a project in mind, want to collaborate, or consult with us? Submit the form below and we will get back to you shortly.
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
                  input: { color: '#fff', fontFamily: 'Inter, sans-serif' },
                  label: { color: 'text.secondary' },
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
                  input: { color: '#fff', fontFamily: 'Inter, sans-serif' },
                  label: { color: 'text.secondary' },
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
                  textarea: { color: '#fff', fontFamily: 'Inter, sans-serif' },
                  label: { color: 'text.secondary' },
                  mb: { xs: 2, sm: 3 },
                }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(230, 126, 34, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D35400 0%, #E67E22 100%)',
                    boxShadow: '0 6px 24px rgba(230, 126, 34, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  '&.Mui-disabled': {
                    background: 'rgba(230, 126, 34, 0.15)',
                    color: 'rgba(255, 255, 255, 0.3)',
                    borderColor: 'rgba(230, 126, 34, 0.2)',
                    boxShadow: 'none',
                  }
                }}
                type="submit"
                disabled={!isFormValid || loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
              </Button>
            </Box>
          </Paper>
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
