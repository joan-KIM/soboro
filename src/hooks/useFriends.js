import {useCallback, useEffect, useMemo, useState} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {
  getEvents,
  getUsers,
  findUserByName,
  requestFriend,
  approveFriend,
  cancelRequestFriend,
  rejectFriend,
  removeFriend,
} from '../firebase/firestore';
import {useUser} from './useUser';

export const FRIEND_STATUS = {
  FRIEND: 'friend',
  REQUESTED: 'requested',
  REQUESTING: 'requesting',
  NONE: 'none',
};
export const FRIEND_ACTION = {
  REQUEST: 'request',
  APPROVE: 'approve',
  CANCEL: 'cancel',
  REJECT: 'reject',
  REMOVE: 'remove',
};

export const useFriends = () => {
  const {user} = useUser();
  const queryClient = useQueryClient();
  const {data: timeline} = useQuery('timeline', getEvents, {
    initialData: [],
    placeholderData: [],
  });
  const {data} = useQuery(['friend/list', user?.uid], () => getUsers(user?.friend?.list), {
    initialData: [],
    placeholderData: [],
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const {data: searchedFriend} = useQuery(['friend/search', searchKeyword], () => findUserByName(searchKeyword));

  const friends = useMemo(() => data
      .filter(({isDeleted}) => !isDeleted)
      .map((friend) => ({
        ...friend,
        memories: timeline.filter(({members}) => members.includes(user?.uid) && members.includes(friend.uid)),
      })),
  [timeline, data]);

  const getStatus = useCallback((friend) => {
    if (!user || !friend) {
      return FRIEND_STATUS.NONE;
    }
    if (user.friend.list.includes(friend.uid)) {
      return FRIEND_STATUS.FRIEND;
    }
    if (user.friend.requesting.includes(friend.uid)) {
      return FRIEND_STATUS.REQUESTING;
    }
    if (user.friend.requested.includes(friend.uid)) {
      return FRIEND_STATUS.REQUESTED;
    }
    return FRIEND_STATUS.NONE;
  }, [user]);

  useEffect(() => {
    queryClient.invalidateQueries(['friend/search', searchKeyword]);
  }, [searchKeyword]);

  const searchFriend = useCallback((keyword) => {
    setSearchKeyword(keyword);
  }, []);
  const searchResult = useMemo(() => ({...searchedFriend, status: getStatus(searchedFriend)}), [searchedFriend]);

  const isFriend = useCallback((uid) => user && user.friend.list.includes(uid), [user]);

  const request = useCallback((uid) => requestFriend(user, uid), [user]);
  const approve = useCallback((uid) => approveFriend(user, uid), [user]);
  const cancel = useCallback((uid) => cancelRequestFriend(user, uid), [user]);
  const reject = useCallback((uid) => rejectFriend(user, uid), [user]);
  const remove = useCallback((uid) => removeFriend(user, uid), [user]);

  const dispatchFriendAction = useCallback((uid, action) => {
    let result = null;
    switch (action) {
      case FRIEND_ACTION.REQUEST:
        result = request(uid);
        break;
      case FRIEND_ACTION.APPROVE:
        result = approve(uid);
        break;
      case FRIEND_ACTION.CANCEL:
        result = cancel(uid);
        break;
      case FRIEND_ACTION.REJECT:
        result = reject(uid);
        break;
      case FRIEND_ACTION.REMOVE:
        result = remove(uid);
        break;
      default:
        return null;
    }
    return result.then(() => {
      queryClient.invalidateQueries(['friend/search', searchKeyword]);
      queryClient.invalidateQueries(['user', user?.uid]);
    });
  }, [request, approve, cancel, reject, remove, searchKeyword]);


  return {
    friends,
    isFriend,
    searchFriend,
    dispatchFriendAction,
    searchResult,
  };
};
