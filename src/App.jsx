import React from 'react';
import { useState } from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Chat from './components/pages/Chat';
import AdminPage from './components/pages/AdminPage';
import NotFound from './components/pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('currentUser') !== null);

  const handleLogin = (isAdmin) => {
    setIsAdmin(isAdmin);
    localStorage.setItem('isAdmin', isAdmin);
  };

  return (
    <Router>
      <NavBar currentPage={window.location.pathname} isAdmin={isAdmin} />
      <Routes>
        <Route path='/HomePage' element={<HomePage />} exact />
        <Route path='/register' element={<Register />} exact />
        <Route path='/login' element={<Login onLogin={handleLogin} />} exact />
        <Route
          path='/chat'
          element={
            isLoggedIn ? (
              <Chat />
            ) : (
              <Navigate to='/login' replace />
            )
          }
          exact
        />
        <Route
          path='/adminPage'
          element={
            isLoggedIn ? (
              isAdmin ? (
                <AdminPage />
              ) : (
                <Navigate to='/NotFound' replace />
              )
            ) : (
              <Navigate to='/login' replace />
            )
          }
          exact
        />
        <Route path='*' element={<NotFound />} exact />
      </Routes>
    </Router>
  )
}

export default App;
