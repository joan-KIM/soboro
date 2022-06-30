import {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {getEvents} from '../firebase/firestore';
import {useFriends} from './useFriends';

export const useTimeline = (user) => {
  const {data} = useQuery('timeline', getEvents, {
    initialData: [],
    placeholderData: [],
  });
  const {friends, isFriend, getFriend} = useFriends(user);

  const timeline = useMemo(
      () => data
          .filter(({members}) => members.includes(user?.uid))
          .filter(({members}) => members.every((uid) => user?.uid === uid || isFriend(uid)))
          .sort((a, b) => b.createdAt - a.createdAt)
          .map(({members, ...event}) => ({
            ...event,
            members: members.map((id) => {
              if (id === user?.uid) {
                return user;
              }
              return getFriend(id);
            }).filter((v) => !!v),
          })),
      [user, data, isFriend, getFriend, friends],
  );

  const timelineWithMe = useMemo(
      () => timeline.filter(({members}) => members.some(({uid}) => uid === user.uid)),
      [timeline, user],
  );

  const [keyword, setKeyword] = useState();
  const timelineWithSearch = useMemo(
      () => timeline.filter(({title, description}) => title.includes(keyword) || description.includes(keyword)),
      [timeline, keyword],
  );

  return {timeline, timelineWithMe, timelineWithSearch, setKeyword};
};
