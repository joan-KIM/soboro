import {useState, useCallback, useContext} from 'react';
import {AuthContext} from './AuthProvider';
import * as Auth from '../firebase/auth';

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
      const result = await Auth.login(email, password);
      context.setAuthInfo(result);
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

  const withdraw = useCallback(() => {
    Auth.withdraw(user);
  }, []);

  return {...context, signup, login, logout, withdraw, resetPassword, error, clearError};
}
