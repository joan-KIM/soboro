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
} from 'firebase/firestore';
import app from './firebase';

const db = getFirestore(app);
const eventsRef = collection(db, 'events');

export const createEvent = (event) => {
  return addDoc(eventsRef, {
      ...event,
      isUpdating: false,
    });
}

export const getEventRef = (id) => {
  return doc(eventsRef, id);
}

export const getEventData = async (ref) => {
  const eventSnap = await getDoc(ref);

  if (eventSnap.exists()) {
    return eventSnap.data();
  }
  return Promise.reject('Event not found');
}

export const startUpdateEvent = async (id) => {
  const eventRef = getEventRef(id);
  const {isUpdating} = await getEventData(eventRef);

  if (isUpdating) {
    return Promise.reject('Event is now updating');
  }
  return updateDoc(eventRef, {isUpdating: true});
}

export const updateEvent = (id, event) => {
  const eventRef = getEventRef(id);
  return updateDoc(eventRef, {
    ...event,
    isUpdating: false,
  }, {merge: true});
}

export const deleteEvent = (id) => {
  const eventRef = getEventRef(id);
  return deleteDoc(eventRef);
}

const usersRef = collection(db, 'users');

export const addUser = (user) => {
  return setDoc(usersRef, user.phoneNumber);
}

export const getUserRef = (phoneNumber) => {
  return doc(usersRef, phoneNumber);
}

export const getFollower = async (phoneNumber) => {
  const userRef = getUserRef(phoneNumber);
  if (userRef.exists()) {
    return userRef.data();
  }
  return Promise.reject('User not found');
}

export const getFollowers = async (user) => {
  const userRef = getUserRef(user.phoneNumber);
  if (userRef.exists()) {
    return userRef.data().followers;
  }
  return Promise.reject('User not found');
}

export const follow = (user, phoneNumber) => {
  const userRef = getUserRef(user.phoneNumber);
  updateDoc(userRef, {
    followers: arrayUnion(phoneNumber),
  })
}

export const unFollow = (user, phoneNumber) => {
  const userRef = getUserRef(user.phoneNumber);
  updateDoc(userRef, {
    followers: arrayRemove(phoneNumber),
  })
}

export const getTimeline = async (user, options) => {
  // 1. current user로 부터 멤버를 가져온다.
  const followers = [
    options.isIncludingMe && user.uid,
    ...(options.members ?
      options.members :
      getFollowers(user).map(({uid}) => uid)),
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
      orderBy('date', 'desc')
    ) :
    query(eventsRef,
      where('members', 'array-contains-any', followers),
      orderBy('date', 'desc')
    );

  const querySnapshot = await getDocs(q);
  return querySnapshot.map(doc => doc.data())
    .filter(({members}) => members.every(member => followers.includes(member)));
}
