import React, {useState} from 'react';
import {errorMessage} from '../constants/error';
import {findUserByName} from '../firebase/firestore';
import {useAuth} from '../hooks/useAuth';

function Auth() {
  const [email, setEmail] = useState('dmsdn960@gmail.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('박은우');
  const [birthday, setBirthday] = useState('1996-12-18');
  const {user, login, signup, logout, resetPassword, error, clearError} = useAuth();
  const [isSameName, setIsSameName] = useState(false);

  return (
    <div>
      {error && <div>{errorMessage[error]}<button onClick={clearError}>확인</button></div>}
      <h1>Current User</h1>
      {user && <dl>
        <dt>name</dt>
        <dd>{user.name}</dd>
        <dt>email</dt>
        <dd>{user.email}</dd>
        <dt>birthday</dt>
        <dd>{user.birthday}</dd>
      </dl>}
      <label>
        Email:
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Name:
        <input value={name} onChange={(e) => {
          setName(e.target.value);
          findUserByName(e.target.value)
              .then((user) => {
                setIsSameName(!!user);
              });
        }} />
        {isSameName && <p>중복된 이름 입니다.</p>}
      </label>
      <label>
        birthday:
        <input value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </label>

      <button onClick={() => {
        signup({email, password, name, birthday});
      }}>Sign Up</button>
      <button onClick={() => login(email, password)}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => resetPassword(email)}>Reset Password</button>
    </div>
  );
}

export default Auth;
