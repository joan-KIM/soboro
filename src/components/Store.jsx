import React, {useState} from 'react';
import {createEvent} from '../firebase/firestore';
import {useAuth} from '../hooks/useAuth';
import {useFriends} from '../hooks/useFriends';

function Store() {
  const {user} = useAuth();
  const [title, setTitle] = useState('여수 여행');
  const [description, setDescription] = useState('즐거워');
  const [date, setDate] = useState('2021-12-11');
  const [members, setMembers] = useState(new Set());

  const friends = useFriends(user);

  const onSubmit = (e) => {
    e.preventDefault();
    createEvent({
      title,
      description,
      date,
      members: Array.from(members),
    });
  };
  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={onSubmit}>
        <label>
          Title: <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description: <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Member:
          <ul>
            {friends.map((friend) => <li key={friend.uid}>
              <input type="checkbox" onChange={(checked) => setMembers((prev) => {
                if (checked) {
                  prev.add(friend.uid);
                  return new Set(prev);
                } else {
                  prev.delete(friend.uid);
                  return new Set(prev);
                }
              })}>{friend.name}</input>
            </li>)}
          </ul>
        </label>
        <button type="submit">Create</button>
      </form>

      <ul>

      </ul>
    </div>
  );
}

export default Store;
