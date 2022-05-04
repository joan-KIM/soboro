import {onAuthStateChanged} from 'firebase/auth';
import React, {createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from 'react-query';
import {getUser} from '../firebase/firestore';
import * as Auth from '../firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
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

export default AuthProvider;
