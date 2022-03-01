import {useAuthState} from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import {auth} from './firebase/auth';
import { getUserSelector } from './state';

export function useAuth () {
  const [currentUser] = useAuthState(auth);
  const user = useRecoilValue(getUserSelector(currentUser));
  return user;
}