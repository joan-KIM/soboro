import React from 'react';
import propTypes from 'prop-types';
import CustomButton from './CustomButton';

export default function StateButton({user}) {
  const status = user?.status;

  if (status === 'none') {
    return <CustomButton
      value='친구 요청'
      color='#FFFFFF'
      bgColor='#4886FF'/>;
  }
  if (status === 'requested') {
    return <CustomButton value='요청 수락' color='#FFFFFF' bgColor='#FF48CC' />;
  }
  if (status === 'requesting') {
    return <CustomButton value='요청됨' bgColor='F0F0F0' />;
  }
  if (status === 'friend') {
    return <CustomButton value='친구'/>;
  }
  return null;
}

StateButton.propTypes = {
  user: propTypes.object,
};
