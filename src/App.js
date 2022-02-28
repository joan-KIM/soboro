import React, {useState} from 'react';
import './App.css';
import { createUser, getCurrentUser, login } from './firebase/auth';
import { getUser } from './firebase/firestore';

function App() {
  const [email, setEmail] = useState('dmsdn960@gmail.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('박은우');
  const [phoneNumber, setPhoneNumber] = useState('01012345678');

  return (
    <div className="App">
      <header className="App-header">
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
          login('dmsdn960@gmail.com', '123456')
            .then(() => getCurrentUser())
            .then((user) => {
              console.log(user.displayName);
              return getUser(user.displayName)
            })
            .then(user => {
              console.log(user)
            })
        }}>Login</button>
      </header>
    </div>
  );
}

export default App;
