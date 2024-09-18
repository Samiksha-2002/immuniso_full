import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Make sure this points to your actual AuthContext file

const PrivateRoute = () => {
  const { currentUser } = useAuth(); // Access authentication state

  // If the user is not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render child routes (through Outlet)
  return <Outlet />;
};

export default PrivateRoute;
