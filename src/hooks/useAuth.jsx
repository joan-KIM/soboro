import {onAuthStateChanged} from 'firebase/auth';
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from 'react-query';
import * as Auth from '../firebase/auth';
import {getUser} from '../firebase/firestore';

export const AuthContext = createContext();

export function useAuth() {
  const [error, setError] = useState(null);
  const context = useContext(AuthContext);

  const clearError = useCallback(() => setError(null), []);

  const signup = useCallback(async (user) => {
    try {
      await Auth.createUser(user);
    } catch (e) {
      setError(e.message);
      return e.message;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      await Auth.login(email, password);
    } catch (e) {
      setError(e.message);
      return e.message;
    }
  }, []);

  const logout = useCallback(() => {
    Auth.logout();
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      await Auth.resetPassword(email);
    } catch (e) {
      setError(e.message);
      return e.message;
    }
  }, []);

  return {...context, signup, login, logout, resetPassword, error, clearError};
}

export const AuthProvider = ({children}) => {
  const [authInfo, setAuthInfo] = useState();
  const [isAuth, setIsAuth] = useState(!!sessionStorage.getItem('refresh_token'));
  const [error, setError] = useState();
  const {data} = useQuery(['user', authInfo?.uid], () => getUser(authInfo?.uid), {
    enabled: !!authInfo,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth.auth, setAuthInfo, setError);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsAuth(!!sessionStorage.getItem('refresh_token'));
  }, [authInfo]);

  return <AuthContext.Provider value={{auth: authInfo, user: data, error, isAuth}}>
    {children}
  </AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
