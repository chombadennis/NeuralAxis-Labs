import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Auth';
import ProtectedRoute from './auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import AdminPage from './pages/Admin';
import AuthPage from './pages/AuthPage';
import Confirmation from './pages/Confirmation';
import PolicyPage from './pages/Policy';
import TermsPage from './pages/Terms';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CssBaseline, Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, pt: { xs: '56px', sm: '64px' } }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/confirm" element={<Confirmation />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/dcadmin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default App;
