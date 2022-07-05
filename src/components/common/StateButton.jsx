import React from 'react';
import propTypes from 'prop-types';
import BadgeButton from './BadgeButton';
import {FRIEND_ACTION} from '../../hooks/useFriends';

const STATUS_PROPS = {
  none: {
    value: '친구 요청',
    color: '#FFFFFF',
    bgColor: '#4886FF',
    action: FRIEND_ACTION.REQUEST,
  },
  requested: {
    value: '요청 수락',
    color: '#FFFFFF',
    bgColor: '#FF48CC',
    action: FRIEND_ACTION.APPROVE,
  },
  requesting: {
    value: '요청됨',
    bgColor: '#F0F0F0',
    action: FRIEND_ACTION.CANCEL,
  },
  friend: {
    value: '친구',
    bgColor: '#FFD12D',
  },
};

export default function StateButton({status, onClick}) {
  const getBadgeProps = (status) => STATUS_PROPS[status];
  const _props = getBadgeProps(status);
  return <BadgeButton {..._props} onClick={() => onClick(_props.action)} />;
}

StateButton.propTypes = {
  status: propTypes.string,
  onClick: propTypes.func,
};
