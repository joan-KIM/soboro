import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Route, Routes} from 'react-router-dom';
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
import RequiredAuth from './components/RequiredAuth';
import {AuthProvider} from './hooks/useAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/account/login" element={<LoginPage />} />
            <Route path="/account/signup" element={<SignUpPage />} />
            <Route path="/" element={
              <RequiredAuth to="/account/login">
                <TimelinePage />
              </RequiredAuth>}
            />
            <Route path="/filter" element={
              <RequiredAuth to="/account/login">
                <FilterPage />
              </RequiredAuth>}
            />
            <Route path="/profile" element={
              <RequiredAuth to="/account/login">
                <ProfilePage />
              </RequiredAuth>}
            />
            <Route path="/profile/edit" element={
              <RequiredAuth to="/account/login">
                <EditProfilePage />
              </RequiredAuth>}
            />
            <Route path="/follower/list" element={
              <RequiredAuth to="/account/login">
                <FollowersPage />
              </RequiredAuth>}
            />
            <Route path="/follower/search" element={
              <RequiredAuth to="/account/login">
                <SearchFollowerPage />
              </RequiredAuth>}
            />
            <Route path="/event" element={
              <RequiredAuth to="/account/login">
                <EventPage />
              </RequiredAuth>}
            />
            <Route path="/event/edit" element={
              <RequiredAuth to="/account/login">
                <EditEventPage />
              </RequiredAuth>}
            />
            <Route path="/event/create" element={
              <RequiredAuth to="/account/login">
                <CreateEventPage />
              </RequiredAuth>}
            />
          </Routes>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
