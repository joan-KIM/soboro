import React from 'react';
import PropTypes from 'prop-types';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

const RequiredAuth = ({children, to}) => {
  const {isAuth} = useAuth();
  const location = useLocation();

  if (isAuth) {
    return children;
  }

  return <Navigate state={{from: location}} to={to} replace />;
};

RequiredAuth.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

export default RequiredAuth;
