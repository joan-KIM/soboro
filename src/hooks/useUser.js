import {useCallback, useContext} from 'react';
import {updateUser} from '../firebase/firestore';
import {AuthContext} from './AuthProvider';

export function useUser() {
  const {user, refetch} = useContext(AuthContext);

  const updateProfile = useCallback(async (profile) => {
    const result = await updateUser({...user, ...profile});
    refetch();
    return result;
  }, [user, refetch]);

  const updatePhotoUrl = useCallback((url) => {
    return updateProfile({photoUrl: url});
  }, [updateProfile]);

  return {user, updatePhotoUrl, updateProfile};
}
