import {useCallback, useContext} from 'react';
import {updateUser} from '../firebase/firestore';
import {AuthContext} from './AuthProvider';

export function useUser() {
  const {user} = useContext(AuthContext);
  const updatePhotoUrl = useCallback((url) => {
    return updateUser({...user, photoUrl: url});
  }, [user]);
  const updateProfile = useCallback((profile) => {
    return updateUser(profile);
  }, [user]);

  return {user, updatePhotoUrl, updateProfile};
}
