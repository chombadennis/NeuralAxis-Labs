
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, Box, useMediaQuery, useTheme } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
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
                  borderBottom: '2px solid #9c27b0',
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
                borderBottom: '2px solid #9c27b0',
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: '#1a1a1a', height: '100%' }}>
      <List>
        {navItems.map((item) => {
          const isHomePage = location.pathname === '/';
          const isHomeButton = item.name === 'Home';

          const linkProps = isHomeButton && !isHomePage
            ? { component: RouterLink, to: '/' }
            : { component: ScrollLink, to: item.to, smooth: true, duration: 500, spy: true, offset: -70 };

          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton {...linkProps} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} sx={{ color: '#fff' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
        {currentUser && isProtectedPage && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center' }}>
              <ListItemText primary="Sign Out" sx={{ color: '#fff' }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ background: '#1a1a1a', boxShadow: 'none' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <img src="/images/neuralaxis-logo.png" alt="NeuralAxis Labs Logo" style={{ height: isMobile ? '30px' : '40px', marginRight: '10px' }} />
              <Typography variant="h6" sx={{ color: '#fff', fontSize: isMobile ? '1rem' : '1.25rem' }}>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background: '#1a1a1a' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
