import {selectorFamily} from 'recoil';
import { getUser } from './firebase/firestore';

export const getUserSelector = selectorFamily({
  key: 'getUserSelector',
  get: (currentUser) => async () => {
    try {
      if (currentUser) {
        const user = await getUser(currentUser.displayName);
        return user;
      }
      return {};
    } catch(e) {
      return {};
    }
  }
});
