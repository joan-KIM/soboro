import React, { Suspense } from 'react';
import './App.css';
import {RecoilRoot} from 'recoil';
import Auth from './Auth';
import Store from './Store';
import { Route, Routes } from 'react-router-dom';
import Timeline from './pages/Timeline';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Filter from './pages/Filter';
import Profile from './pages/Profile';
import Event from './pages/Event';

import CreateEvent from './pages/CreateEvent';
import SearchFollower from './pages/SearchFollower';

function App() {
  return (
      <RecoilRoot>
        <div className="App">
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/signup" element={<SignUp />} />            
            <Route path="/filter" element={<Filter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/follower/search" element={<SearchFollower />} />
            <Route path="/event" element={<Event />} />
            <Route path="/event/create" element={<CreateEvent />} />
          </Routes>
          
          <header className="App-header">
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <Store />
            </Suspense>
          </header>
        </div>
      </RecoilRoot>
  );
}

export default App;
