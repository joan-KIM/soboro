import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import Auth from './Auth';
import Store from './Store';
import { Route, Routes } from 'react-router-dom';
import TimelinePage from './pages/TimelinePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FilterPage from './pages/FilterPage';
import ProfilePage from './pages/ProfilePage';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import SearchFollowerPage from './pages/SearchFollowerPage';
import EditEventPage from './pages/EditEventPage';
import EditProfilePage from './pages/EditProfilePage';
import FollowersPage from './pages/FollowersPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/" element={<TimelinePage />} />
            <Route path="/account/login" element={<LoginPage />} />
            <Route path="/account/signup" element={<SignUpPage />} />            
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage /> } />
            <Route path="/follower/list" element={<FollowersPage /> } />
            <Route path="/follower/search" element={<SearchFollowerPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/event/edit" element={<EditEventPage /> } />
            <Route path="/event/create" element={<CreateEventPage />} />  
          </Routes>
          
          <header className="App-header">
              <Auth />
              <Store />
          </header>
        </div>
    </QueryClientProvider>
  );
}

export default App;
