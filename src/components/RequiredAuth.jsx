import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequiredAuth = ({children, to}) => {
  const {isAuth} = useAuth();
  const location = useLocation();
  
  if (isAuth) {
    return children;
  }

  return <Navigate state={{from: location}} to={to} replace />;
}

export default RequiredAuth;
