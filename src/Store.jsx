import React, {useEffect, useState} from 'react';
import { useRecoilValue } from 'recoil';
import './App.css';
import { getCurrentUser } from './firebase/auth';
import { getFollowers, getUser } from './firebase/firestore';
import { getUserSelector } from './state';
import { useAuth } from './useAuth';

function Store() {
  const user = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState();

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (user.followers) {
      setFollowers(user.followers);
    } else {
      setFollowers([]);
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
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
            {followers.map(follower => console.log(follower))}
          </ul>

        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Store;
