import React from 'react';
import propTypes from 'prop-types';
import {ReactComponent as Clear} from '../../assets/clear.svg';
import {ReactComponent as Back} from '../../assets/back.svg';
import {ReactComponent as Close} from '../../assets/close.svg';
import {ReactComponent as Home} from '../../assets/home.svg';
import {ReactComponent as Notification} from '../../assets/notification.svg';
import {ReactComponent as Search} from '../../assets/search.svg';
import {ReactComponent as Upload} from '../../assets/upload.svg';
import {ReactComponent as UserPlus} from '../../assets/user-plus.svg';
import {ReactComponent as User} from '../../assets/user.svg';
import {ReactComponent as ProfileUpload} from '../../assets/profile-upload.svg';
import {ReactComponent as Profile} from '../../assets/profile.svg';
import {ReactComponent as AcitveProfile} from '../../assets/profile_active.svg';
import {ReactComponent as Forward} from '../../assets/forward.svg';
import {ReactComponent as AcitveHome} from '../../assets/home_active.svg';
import {ReactComponent as AcitveUpload} from '../../assets/upload_active.svg';
import {ReactComponent as Camera} from '../../assets/camera.svg';
import {ReactComponent as Down} from '../../assets/down.svg';

export const ICON_TYPE = {
  CLEAR: 'clear',
  BACK: 'back',
  CLOSE: 'close',
  HOME: 'home',
  USER: 'user',
  DOWN: 'down',
  NOTIFICATION: 'notification',
  SEARCH: 'search',
  UPLOAD: 'upload',
  USER_PLUS: 'user-plus',
  PROFILE_UPLOAD: 'profile-upload',
  PROFILE: 'profile',
  ACTIVE_PROFILE: 'active-profile',
  FORWARD: 'forward',
  ACTIVE_HOME: 'active-home',
  ACTIVE_UPLOAD: 'active-upload',
  CAMERA: 'camera',
};

const Icon = ({type, size = 16, color = 'black', onClick}) => {
  if (type === ICON_TYPE.CLEAR) {
    return <Clear width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.BACK) {
    return <Back width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.CLOSE) {
    return <Close width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.HOME) {
    return <Home width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.USER) {
    return <User width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.NOTIFICATION) {
    return <Notification width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.SEARCH) {
    return <Search width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.UPLOAD) {
    return <Upload width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.USER_PLUS) {
    return <UserPlus width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.PROFILE_UPLOAD) {
    return <ProfileUpload width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.PROFILE) {
    return <Profile width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.ACTIVE_PROFILE) {
    return <AcitveProfile width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.FORWARD) {
    return <Forward width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.ACTIVE_HOME) {
    return <AcitveHome width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.ACTIVE_UPLOAD) {
    return <AcitveUpload width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.CAMERA) {
    return <Camera width={size} height={size} fill={color} onClick={onClick} />;
  }
  if (type === ICON_TYPE.DOWN) {
    return <Down width={size} height={size} fill={color} onClick={onClick} />;
  }

  return null;
};

Icon.propTypes = {
  type: propTypes.oneOf(Object.values(ICON_TYPE)).isRequired,
  size: propTypes.number,
  color: propTypes.string,
  onClick: propTypes.func,
};

export default Icon;
