import React from 'react';
import propTypes from 'prop-types';
import CustomButton from './CustomButton';
import {useFriends, FRIEND_ACTION} from '../../hooks/useFriends';
import {useUser} from '../../hooks/useUser';

export default function StateButton({friend}) {
  const {dispatchFriendAction} = useFriends();
  const {user} = useUser();
  const status = friend?.status;
  const uid = friend?.uid;

  if (user.uid === uid) {
    return null;
  }
  if (status === 'none') {
    return <CustomButton
      value='친구 요청'
      color='#FFFFFF'
      bgColor='#4886FF'
      onClick={() => dispatchFriendAction(uid, FRIEND_ACTION.REQUEST)}
    />;
  }
  if (status === 'requested') {
    return <CustomButton
      value='요청 수락'
      color='#FFFFFF'
      bgColor='#FF48CC'
      onClick={() => dispatchFriendAction(uid, FRIEND_ACTION.APPROVE)}
    />;
  }
  if (status === 'requesting') {
    return <CustomButton
      value='요청됨'
      bgColor='F0F0F0'
      onClick={() => dispatchFriendAction(uid, FRIEND_ACTION.CANCEL)}
    />;
  }
  if (status === 'friend') {
    return <CustomButton value='친구' />;
  }
  return null;
}

StateButton.propTypes = {
  friend: propTypes.object,
};
