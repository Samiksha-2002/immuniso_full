import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthContext

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  // If user is authenticated, render child routes
  // Otherwise, redirect to login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
