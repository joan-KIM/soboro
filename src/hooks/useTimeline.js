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

  const groupByDate = (timeline) => timeline.reduce((list, event) => {
    const lastList = list.at(-1);
    if (!lastList) {
      return [[event]];
    }
    const [{date}] = lastList;
    if (date === event.date) {
      return [...list.slice(0, -1), [...lastList, event]];
    }
    return [...list, [event]];
  }, []);

  return {timeline, timelineWithMe, timelineWithSearch, setKeyword, groupByDate};
};
