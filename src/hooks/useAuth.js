import {useAuthState} from 'react-firebase-hooks/auth';
import {useQuery} from 'react-query';
import {auth} from '../firebase/auth';
import {getUser} from '../firebase/firestore';

export function useAuth () {
  const [currentUser] = useAuthState(auth);
  const {data} = useQuery(['user', currentUser?.displayName], () => getUser(currentUser?.displayName), {
    enabled: !!currentUser
  });
  return data;
}
