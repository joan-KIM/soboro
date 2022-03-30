import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import app from './firebase';
import { addUser } from './firestore';

export const auth = getAuth(app);

/**
 * 회원가입시 유저 생성 함수
 * @param {object} user 
 * @param {string} user.email
 * @param {string} user.password
 * @param {string} user.name
 * @param {string} user.birthday
 * @returns 
 */
export const createUser = (user) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(userCredential => {
      return addUser({uid: userCredential.user.uid, ...user});
    });
}

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(response => {
      sessionStorage.setItem('refresh_token', response._tokenResponse.refreshToken)
    });
}

export const logout = () => {
  return signOut(auth)
    .then(() => sessionStorage.removeItem('refresh_token'));
}

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const updateUser = (user) => {
  return updateProfile(getCurrentUser(), user);
}

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
}
