
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, useMediaQuery, useTheme, Divider, Link, Grid } from '@mui/material';
import { useAuth } from '../auth/Auth';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleGLogo = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M17.64 9.2045c0-.6381-.0573-1.2545-.1699-1.8409H9v3.4818h4.8436c-.2086 1.125-.8441 2.0782-1.7777 2.7232v2.2591h2.9086c1.7018-1.5668 2.6836-3.8732 2.6836-6.6232z" fill="#4285F4"></path>
      <path d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1818l-2.9086-2.2591c-.8064.5427-1.8409.8645-2.9973.8645-2.3227 0-4.2859-1.5668-5.0018-3.6659H.9573v2.3332A8.9957 8.9957 0 009 18z" fill="#34A853"></path>
      <path d="M3.9982 10.7341c-.1318-.3977-.2086-.8141-.2086-1.241s.0768-.8432.2086-1.241V5.9205H.9573A8.9957 8.9957 0 000 9.4932c0 1.4523.3441 2.8159.9573 4.0227l3.0409-2.3332z" fill="#FBBC05"></path>
      <path d="M9 3.5659c1.3218 0 2.5077.4582 3.4409 1.3468l2.5859-2.5859C13.4673.8064 11.43 0 9 0 5.4273 0 2.3718 2.0373 1.0427 4.9341L3.9982 7.266c.7159-2.099 2.6791-3.6659 5.0018-3.6659z" fill="#EA4335"></path>
    </g>
  </svg>
);

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await signup(email, password);
        navigate('/confirm');
      } else {
        await login(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <Grid container sx={{ minHeight: 'calc(100vh - 64px)', background: '#121212', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* LOGO CONTAINER */}
      <Grid 
        item 
        xs={12} 
        sm={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-start',
          p: 3,
        }}
      >
        {isMobile ? null : (
            <img 
              src="/images/neuralaxis-logo.png" 
              alt="NeuralAxis Labs Logo" 
              style={{ width: '100%', maxWidth: '150px' }}
            />
        )}
      </Grid>

      {/* DIVIDER */}
      {!isMobile && (
        <Grid item sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Divider orientation="vertical" sx={{ height: '50vh', bgcolor: '#333' }} />
        </Grid>
      )}

      {/* FORM CONTAINER */}
      <Grid 
        item 
        xs={12} 
        sm={4}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isMobile ? 'center' : 'flex-start',
          p: 3 
        }}
      >
        <Paper
            elevation={20}
            sx={{
                p: { xs: 3, sm: 4 },
                width: '100%',
                maxWidth: '380px',
                borderRadius: '16px',
                background: isMobile ? 'transparent' : '#1e1e1e',
                boxShadow: isMobile ? 'none' : '0 20px 40px rgba(0,0,0,0.7)',
                border: isMobile ? 'none' : '1px solid #333',
            }}
        >
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {isMobile && (
                  <img 
                      src="/images/neuralaxis-logo.png" 
                      alt="NeuralAxis Labs Logo" 
                      style={{ width: '100%', maxWidth: '100px', marginBottom: '2rem' }} 
                  />
              )}
              <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#fff' }}>
                  {isSignUp ? 'Create Account' : 'Sign In'}
              </Typography>

              <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleGLogo />}
                  onClick={handleGoogleSignIn}
                  sx={{
                      mb: 2,
                      color: '#fff',
                      borderColor: '#555',
                      textTransform: 'none',
                      fontWeight: '600',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: '#777' },
                  }}
              >
                  Continue with Google
              </Button>
              
              <Divider sx={{ width: '80%', my: 2, mx: 'auto', '&::before, &::after': { borderColor: '#444' } }}>
                  <Typography variant="caption" sx={{ color: '#888' }}>OR</Typography>
              </Divider>
              
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
                  <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="small"
                      InputLabelProps={{ sx: { color: '#aaa' } }}
                      sx={{ 'input': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#777' }, '&.Mui-focused fieldset': { borderColor: '#9c27b0' } } }}
                  />
                  <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      size="small"
                      sx={{ mt: 2, 'input': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#777' }, '&.Mui-focused fieldset': { borderColor: '#9c27b0' } } }}
                      InputLabelProps={{ sx: { color: '#aaa' } }}
                  />
                  {error && <Typography color="error" align="center" variant="body2" sx={{ mt: 2 }}>{error}</Typography>}
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                          mt: 3,
                          py: 1.2,
                          fontWeight: 'bold',
                          bgcolor: '#9c27b0',
                          boxShadow: '0 0 20px rgba(156, 39, 176, 0.5)',
                          '&:hover': { bgcolor: '#7b1fa2', boxShadow: '0 0 25px rgba(156, 39, 176, 0.7)' },
                      }}
                  >
                      {isSignUp ? 'Continue' : 'Sign In'}
                  </Button>
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Link component="button" type="button" variant="body2" onClick={toggleForm} sx={{ color: '#aaa', textTransform: 'none' }}>
                          {isSignUp ? 'Already have an account? Sign In' : "No account? Sign Up"}
                      </Link>
                  </Box>
              </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
