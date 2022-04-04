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
  orderBy,
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
  return eventsSnapshot.map((doc) => doc.data());
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
  const ref = getUserRef(uid);
  return getUserData(ref);
};

export const findUserByName = async (name) => {
  const querySnapshot = await getDocs(query(usersRef, where('name', '==', name)));
  let user = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
};

export const getFriends = async (user) => {
  return Promise.all(user.friend.list.map((friend) => getUser(friend.uid)));
};

// 친구 요청
export const requestFriend = (user, uid) => {
  runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.updateDoc(userRef, {
      'friend.requesting': arrayUnion(uid),
    });
    transaction.updateDoc(friendRef, {
      'friend.requested': arrayUnion(user.uid),
    });
  });
};

// 요청 온 친구 승인
export const approveFriend = (user, uid) => {
  runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.updateDoc(userRef, {
      'friend.list': arrayUnion(uid),
      'friend.requested': arrayRemove(uid),
    });
    transaction.updateDoc(friendRef, {
      'friend.list': arrayUnion(user.uid),
      'friend.requesting': arrayRemove(user.uid),
    });
  });
};

// 내가 한 친구 요청 취소
export const cancelRequestFriend = (user, uid) => {
  runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.updateDoc(userRef, {
      'friend.requesting': arrayRemove(uid),
    });
    transaction.updateDoc(friendRef, {
      'friend.requested': arrayRemove(user.uid),
    });
  });
};

// 요청 온 친구 거절
export const rejectFriend = (user, uid) => {
  runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.updateDoc(userRef, {
      'friend.requested': arrayRemove(uid),
    });
    transaction.updateDoc(friendRef, {
      'friend.requesting': arrayRemove(user.uid),
    });
  });
};

// 친구 삭제
export const removeFriend = (user, uid) => {
  runTransaction(db, async (transaction) => {
    const userRef = getUserRef(user.uid);
    const friendRef = getUserRef(uid);

    transaction.updateDoc(userRef, {
      'friend.list': arrayRemove(uid),
    });
    transaction.updateDoc(friendRef, {
      'friend.list': arrayRemove(user.uid),
    });
  });
};

// TODO: 복잡한 필터 없이 전체 타임라인 가져오기로 변경
export const getTimeline = async (user, options) => {
  // 1. current user로 부터 멤버를 가져온다.
  const followers = [
    options.isIncludingMe && user.uid,
    ...(options.members ?
      options.members :
      getFriends(user).map(({uid}) => uid)),
  ];
  // 2. 멤버가 모두 포함된 이벤트를 가져온다.
  // 해당 문서에 속한 멤버들이 전부 followers에 속하는지 확인.

  // 멤버, 팔로워들
  // 이벤트의 멤버가 모두 내 팔로워들에 속한 이벤트들
  // 이벤트의 멤버 한명한명 다 내 팔로워들에 속해있는지 확인해야함. 그리고 전부 속해있을때 조건 성립.

  // 하지만 지금 주어진 것
  // array-contains
  // 문서의 배열에 특정 값이 존재하는지 확인하는 연산자.
  // array-contains-any
  // 문서의 배열에 여러개의 값 or로 존재하는지 확인
  // 이벤트의 멤버에 특정 값이 속해있는지 확인

  // 내  팔로어 = (A, B, C)

  // 이벤트 멤버 = (A, B, C, D)
  const q = options ?
    query(eventsRef,
        where('title', '>=', options.keyword),
        where('description', '>=', options.keyword),
        where('date', '>=', options.startDate),
        where('date', '<=', options.endDate),
        where('members', 'array-contains-any', followers),
        orderBy('date', 'desc'),
    ) :
    query(eventsRef,
        where('members', 'array-contains-any', followers),
        orderBy('date', 'desc'),
    );

  const querySnapshot = await getDocs(q);
  return querySnapshot.map((doc) => doc.data())
      .filter(({members}) => members.every((member) => followers.includes(member)));
};
