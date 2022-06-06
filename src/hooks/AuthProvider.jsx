import {onAuthStateChanged} from 'firebase/auth';
import React, {createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from 'react-query';
import {getUser} from '../firebase/firestore';
import * as Auth from '../firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(!!sessionStorage.getItem('refresh_token'));
  const [authInfo, setAuthInfo] = useState();
  const [error, setError] = useState();
  const {data} = useQuery(['user', authInfo?.uid], () => getUser(authInfo?.uid));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth.auth, (auth) => {
      if (auth) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setAuthInfo(auth);
    }, setError);
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{auth: authInfo, user: data, error, isAuth}}>
    {children}
  </AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
