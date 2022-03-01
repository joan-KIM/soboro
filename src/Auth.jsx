import React, {useState} from 'react';
import './App.css';
import { createUser, login, logout } from './firebase/auth';
import { useAuth } from './useAuth';

function Auth() {
  const [email, setEmail] = useState('dmsdn960@gmail.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('박은우');
  const [phoneNumber, setPhoneNumber] = useState('01012345678');
  const user = useAuth();

  return (
    <div>
      <h1>Current User</h1>
      <dl>
        <dt>name</dt>
        <dd>{user.name}</dd>
        <dt>email</dt>
        <dd>{user.email}</dd>
        <dt>phoneNumber</dt>
        <dd>{user.phoneNumber}</dd>
      </dl>
      <label>
        Email:
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        phone:
        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      </label>

      <button onClick={() => {createUser({email, password, name, phoneNumber})}}>Sign Up</button>
      <button onClick={() => {
        login(email, password)
      }}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Auth;
