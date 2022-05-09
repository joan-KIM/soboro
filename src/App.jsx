import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Route, Routes} from 'react-router-dom';
import TimelinePage from './pages/TimelinePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchEventPage from './pages/SearchEventPage';
import ProfilePage from './pages/ProfilePage';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import SearchFriendsPage from './pages/SearchFriendsPage';
import EditEventPage from './pages/EditEventPage';
import EditProfilePage from './pages/EditProfilePage';
import FriendsPage from './pages/FriendsPage';
import RequiredAuth from './components/RequiredAuth';
import AuthProvider from './hooks/AuthProvider';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePhotoPage from './pages/ProfilePhotoPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/account/login" element={<LoginPage />} />
            <Route path="/account/signup" element={<SignUpPage />} />
            <Route path="/account/resetpassword" element={<ResetPasswordPage />} />
            <Route path="/account/photo" element={
              <RequiredAuth to="/account/login">
                <ProfilePhotoPage />
              </RequiredAuth>}
            />
            <Route path="/" element={
              <RequiredAuth to="/account/login">
                <TimelinePage />
              </RequiredAuth>}
            />
            <Route path="/search" element={
              <RequiredAuth to="/account/login">
                <SearchEventPage />
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
            <Route path="/friends/list" element={
              <RequiredAuth to="/account/login">
                <FriendsPage />
              </RequiredAuth>}
            />
            <Route path="/friends/search" element={
              <RequiredAuth to="/account/login">
                <SearchFriendsPage />
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
            <Route path="/notifications" element={
              <RequiredAuth to="/account/login">
                <NotificationsPage />
              </RequiredAuth>}
            />
          </Routes>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
