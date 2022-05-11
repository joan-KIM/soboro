import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import app from './firebase';
import {addUser, updateUser} from './firestore';

export const auth = getAuth(app);

export const createUser = (user) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        return addUser({uid: userCredential.user.uid, ...user});
      });
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        sessionStorage.setItem('refresh_token', response._tokenResponse.refreshToken);
        return response.user;
      });
};

export const logout = () => {
  return signOut(auth)
      .then(() => sessionStorage.removeItem('refresh_token'));
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const withdraw = (user) => {
  return deleteUser(getCurrentUser())
      .then(() => updateUser({uid: user.uid, isDeleted: true}));
};
