import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Auth = ({ children, auth }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (auth) {
    if (!token) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  } else {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default Auth;
