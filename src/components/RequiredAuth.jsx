import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequiredAuth = ({children, to}) => {
  const auth = useAuth();
  const location = useLocation();
  
  if (auth) {
    return children;
  }
  
  return <Navigate state={{from: location}} to={to} replace />;
}

export default RequiredAuth;
