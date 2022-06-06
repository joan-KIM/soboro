import {useCallback, useContext} from 'react';
import {useQueryClient} from 'react-query';
import {updateUser} from '../firebase/firestore';
import {AuthContext} from './AuthProvider';

export function useUser() {
  const {user} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const updateProfile = useCallback(async (profile) => {
    const result = await updateUser({...user, ...profile});
    queryClient.invalidateQueries(['user', user?.uid]);
    return result;
  }, [user, queryClient]);

  const updatePhotoUrl = useCallback((url) => {
    return updateProfile({photoUrl: url});
  }, [updateProfile]);

  return {user, updatePhotoUrl, updateProfile};
}
