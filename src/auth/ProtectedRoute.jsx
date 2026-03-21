import React from 'react';
import { useAuth } from './Auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
