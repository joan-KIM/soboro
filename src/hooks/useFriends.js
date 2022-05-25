import {useCallback, useMemo} from 'react';
import {useQuery} from 'react-query';
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
  const {data: timeline} = useQuery('timeline', getEvents, {
    initialData: [],
    placeholderData: [],
  });
  const {data} = useQuery(['friend/list', user?.uid], () => getUsers(user?.friend?.list), {
    initialData: [],
    placeholderData: [],
  });
  const friends = useMemo(() => data
      .filter(({isDeleted}) => !isDeleted)
      .map((friend) => ({
        ...friend,
        memories: timeline.filter(({members}) => members.includes(user?.uid) && members.includes(friend.uid)),
      })),
  [timeline, data]);

  const getStatus = useCallback((friend) => {
    if (!user) {
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

  const searchFriend = useCallback(async (keyword) => {
    const friend = await findUserByName(keyword);
    if (friend) {
      return {...friend, status: getStatus(friend)};
    }
    return null;
  }, [getStatus]);

  const isFriend = useCallback((uid) => user && user.friend.list.includes(uid), [user]);

  const request = useCallback((uid) => requestFriend(user, uid), [user]);
  const approve = useCallback((uid) => approveFriend(user, uid), [user]);
  const cancel = useCallback((uid) => cancelRequestFriend(user, uid), [user]);
  const reject = useCallback((uid) => rejectFriend(user, uid), [user]);
  const remove = useCallback((uid) => removeFriend(user, uid), [user]);

  const dispatchFriendAction = useCallback((uid, action) => {
    switch (action) {
      case FRIEND_ACTION.REQUEST:
        return request(uid);
      case FRIEND_ACTION.APPROVE:
        return approve(uid);
      case FRIEND_ACTION.CANCEL:
        return cancel(uid);
      case FRIEND_ACTION.REJECT:
        return reject(uid);
      case FRIEND_ACTION.REMOVE:
        return remove(uid);
      default:
        return null;
    }
  }, [request, approve, cancel, reject, remove]);

  return {
    friends,
    isFriend,
    searchFriend,
    dispatchFriendAction,
  };
};
