import React, {useEffect, useState} from 'react';
import { createEvent } from '../firebase/firestore';
import { useAuth } from '../hooks/useAuth';

function Store() {
  const user = useAuth();
  const [title, setTitle] = useState('여수 여행');
  const [description, setDescription] = useState('즐거워');
  const [date, setDate] = useState('2021-12-11');
  const [members, setMembers] = useState(new Set());

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (user?.followers) {
      setFollowers(user.followers);
    } else {
      setFollowers([]);
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    createEvent({
      title,
      description,
      date,
      members: Array.from(members),
    })
  }
  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={onSubmit}>
        <label>
          Title: <input value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Description: <input value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          Member:
          <ul>
            {followers.map(follower => <li>
              <input type="checkbox" onChange={checked => setMembers(prev => {
                if (checked) {
                  prev.add(follower.id)
                  return new Set(prev);
                } else {
                  prev.delete(follower.id)
                  return new Set(prev);
                }})}>{follower.name}</input>
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
