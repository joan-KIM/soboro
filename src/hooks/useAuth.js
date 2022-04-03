import {onAuthStateChanged} from 'firebase/auth';
import {createContext, useContext, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {auth} from '../firebase/auth';
import {getUser} from '../firebase/firestore';

export const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [authInfo, setAuthInfo] = useState();
  const [isAuth, setIsAuth] = useState(!!sessionStorage.getItem('refresh_token'));
  const [error, setError] = useState();
  const {data} = useQuery(['user', authInfo?.uid], () => getUser(authInfo?.uid), {
    enabled: !!authInfo
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setAuthInfo, setError);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsAuth(!!sessionStorage.getItem('refresh_token'));
  }, [authInfo])

  return <AuthContext.Provider value={{auth: authInfo, user: data, error, isAuth}}>
    {children}
  </AuthContext.Provider>
}
