import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import based on your context file location

const ProtectedRoute = () => {
  const { currentUser } = useAuth(); // Access authentication state

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
