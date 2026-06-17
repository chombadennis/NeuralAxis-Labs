
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, Box, useMediaQuery, useTheme } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../auth/Auth';

const navItems = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Services', to: 'services' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const isProtectedPage = location.pathname === '/admin' || location.pathname === '/dcadmin';

  const navLinks = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {navItems.map((item) => {
        const isHomePage = location.pathname === '/';
        const isHomeButton = item.name === 'Home';

        if (isHomeButton) {
          return isHomePage ? (
            <Button 
              key={item.name} 
              component={ScrollLink} 
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
              sx={{ 
                color: '#fff', 
                mx: 1, 
                fontSize: '1rem',
                '&.active': {
                  borderBottom: '2px solid #00F2FE',
                }
              }}
            >
              {item.name}
            </Button>
          ) : (
            <Button 
              key={item.name} 
              component={RouterLink} 
              to="/"
              sx={{ 
                color: '#fff', 
                mx: 1, 
                fontSize: '1rem',
              }}
            >
              {item.name}
            </Button>
          );
        }

        return (
          <Button 
            key={item.name} 
            component={ScrollLink} 
            to={item.to}
            smooth={true}
            duration={500}
            spy={true}
            offset={-70}
            sx={{ 
              color: '#fff', 
              mx: 1, 
              fontSize: '1rem',
              '&.active': {
                borderBottom: '2px solid #00F2FE',
              }
            }}
          >
            {item.name}
          </Button>
        );
      })}
      {currentUser && isProtectedPage && (
        <Button color="inherit" onClick={handleLogout} sx={{ color: '#fff', mx: 1, fontSize: '1rem' }}>Sign Out</Button>
      )}
    </Box>
  );

  const drawer = (
    <Box sx={{ background: '#0F1225', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with logo & Close Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/neuralaxis-logo.png" alt="NeuralAxis Labs Logo" style={{ height: '30px', marginRight: '8px' }} />
          <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
            NeuralAxis
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} edge="end" sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Nav List */}
      <List sx={{ pt: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isHomePage = location.pathname === '/';
          const isHomeButton = item.name === 'Home';

          const linkProps = isHomeButton && !isHomePage
            ? { component: RouterLink, to: '/', onClick: handleDrawerToggle }
            : { component: ScrollLink, to: item.to, smooth: true, duration: 500, spy: true, offset: -70, onClick: handleDrawerToggle };

          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                {...linkProps} 
                sx={{ 
                  textAlign: 'left', 
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  mx: 1.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(0, 242, 254, 0.08)',
                    color: '#00F2FE',
                  },
                  '&.active': {
                    background: 'rgba(0, 242, 254, 0.1)',
                    color: '#00F2FE',
                    borderLeft: '4px solid #00F2FE',
                  }
                }}
              >
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ 
                    fontSize: '1.05rem', 
                    fontWeight: 600, 
                    fontFamily: 'Lexend, sans-serif' 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        {currentUser && isProtectedPage && (
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              onClick={() => { handleLogout(); handleDrawerToggle(); }} 
              sx={{ 
                textAlign: 'left', 
                px: 3, 
                py: 1.5,
                borderRadius: '8px',
                mx: 1.5,
                '&:hover': {
                  background: 'rgba(230, 126, 34, 0.08)',
                  color: '#E67E22',
                }
              }}
            >
              <ListItemText 
                primary="Sign Out" 
                primaryTypographyProps={{ 
                  fontSize: '1.05rem', 
                  fontWeight: 600, 
                  fontFamily: 'Lexend, sans-serif' 
                }} 
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ background: 'rgba(8, 10, 22, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: 'none' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <img src="/images/neuralaxis-logo.png" alt="NeuralAxis Labs Logo" style={{ height: isMobile ? '30px' : '40px', marginRight: '10px' }} />
              <Typography variant="h6" sx={{ color: '#fff', fontSize: isMobile ? '1rem' : '1.25rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                NeuralAxis Labs
              </Typography>
            </RouterLink>
          </Box>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            navLinks
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{ 
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background: '#0F1225', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
