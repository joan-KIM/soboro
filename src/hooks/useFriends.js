import {useQuery} from 'react-query';
import {getFriends} from '../firebase/firestore';

export const useFriends = (user) => {
  const {data} = useQuery(['friend/list'], () => getFriends(user), {
    enabled: !!user
  });
  return data || [];
}
