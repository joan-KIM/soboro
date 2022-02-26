import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import app from './firebase';

const auth = getAuth(app);

export const createUser = (user) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(userCredential => {
      return updateProfile(userCredential.user, {
        displayName: user.name,
        phoneNumber: user.phoneNumber,
      })
    });
}

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
  return signOut(auth);
}

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const updateUser = (user) => {
  return updateProfile(auth, user);
}

export const resetEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
}
