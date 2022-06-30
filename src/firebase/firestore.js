import {
  collection,
  getFirestore,
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
  runTransaction,
} from 'firebase/firestore';
import app from './firebase';

let db = getFirestore(app);
let usersRef = collection(db, 'users');
let eventsRef = collection(db, 'events');

export const initDB = (firestore) => {
  db = firestore;
  usersRef = collection(db, 'users');
  eventsRef = collection(db, 'events');
};

export const createEvent = (event) => {
  return addDoc(eventsRef, {
    ...event,
    isUpdating: false,
  });
};

export const getEvent = (id) => {
  const ref = getEventRef(id);
  return getEventData(ref);
};

export const getEvents = async () => {
  const eventsSnapshot = await getDocs(eventsRef);
  const events = [];
  eventsSnapshot.forEach((doc) => events.push({id: doc.id, ...doc.data()}));
  return events;
};

export const getEventRef = (id) => {
  return doc(eventsRef, id);
};

export const getEventData = async (ref) => {
  const eventSnap = await getDoc(ref);

  if (eventSnap.exists()) {
    return eventSnap.data();
  }
  return Promise.reject(new Error('Event not found'));
};

export const startUpdateEvent = async (id) => {
  const eventRef = getEventRef(id);
  const {isUpdating} = await getEventData(eventRef);

  if (isUpdating) {
    return Promise.reject(new Error('Event is now updating'));
  }
  return updateDoc(eventRef, {isUpdating: true});
};

export const updateEvent = (id, event) => {
  const eventRef = getEventRef(id);
  return updateDoc(eventRef, {
    ...event,
    isUpdating: false,
  }, {merge: true});
};

export const deleteEvent = (id) => {
  const eventRef = getEventRef(id);
  return deleteDoc(eventRef);
};

export const addUser = (user) => {
  const {email, name, birthday, uid} = user;
  const userRef = getUserRef(uid);
  return setDoc(userRef, {uid, email, name, birthday, friend: {list: [], requested: [], requesting: []}});
};

export const updateUser = (user) => {
  const userRef = getUserRef(user.uid);
  return updateDoc(userRef, user);
};

export const getUserRef = (uid) => {
  return doc(usersRef, uid);
};

export const getUserData = async (ref) => {
  const userSnap = await getDoc(ref);
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return Promise.reject(new Error('User not found'));
};

export const getUser = (uid) => {
  if (!uid) {
    return null;
  }
  const ref = getUserRef(uid);
  return getUserData(ref);
};

export const findUserByName = async (name) => {
  if (!name) {
    return null;
  }
  const querySnapshot = await getDocs(query(usersRef, where('name', '==', name)));
  let user = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
};

export const findUserByEmail = async (email) => {
  const querySnapshot = await getDocs(query(usersRef, where('email', '==', email)));
  let user = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
};

export const getUsers = (uids = []) => {
  return Promise.all(uids.map(getUser));
};

// 친구 요청
export const requestFriend = (user, uid) => {
  return runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.update(userRef, {
      'friend.requesting': arrayUnion(uid),
    });
    transaction.update(friendRef, {
      'friend.requested': arrayUnion(user.uid),
    });
  });
};

// 요청 온 친구 승인
export const approveFriend = (user, uid) => {
  return runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.update(userRef, {
      'friend.list': arrayUnion(uid),
      'friend.requested': arrayRemove(uid),
    });
    transaction.update(friendRef, {
      'friend.list': arrayUnion(user.uid),
      'friend.requesting': arrayRemove(user.uid),
    });
  });
};

// 내가 한 친구 요청 취소
export const cancelRequestFriend = (user, uid) => {
  return runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.update(userRef, {
      'friend.requesting': arrayRemove(uid),
    });
    transaction.update(friendRef, {
      'friend.requested': arrayRemove(user.uid),
    });
  });
};

// 요청 온 친구 거절
export const rejectFriend = (user, uid) => {
  return runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.update(userRef, {
      'friend.requested': arrayRemove(uid),
    });
    transaction.update(friendRef, {
      'friend.requesting': arrayRemove(user.uid),
    });
  });
};

// 친구 삭제
export const removeFriend = (user, uid) => {
  return runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.update(userRef, {
      'friend.list': arrayRemove(uid),
    });
    transaction.update(friendRef, {
      'friend.list': arrayRemove(user.uid),
    });
  });
};
