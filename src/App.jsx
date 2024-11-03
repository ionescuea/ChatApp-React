import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Chat from './components/pages/Chat';
import AdminPage from './components/pages/AdminPage';
import NotFound from './components/pages/NotFound';

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('currentUser') !== null);

  const handleLogin = (userIsAdmin) => {
    setIsAdmin(userIsAdmin);
    localStorage.setItem('isAdmin', userIsAdmin); 
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  };

  return (
    <Router>
      <NavBar currentPage={window.location.pathname} isAdmin={isAdmin} />
      <Routes>
        <Route path='/' element={<HomePage />} exact />
        <Route
          path='/register'
          element={<Register onRegister={handleLogout} />} // Pass handleLogout as onRegister
          exact
        />
        <Route path='/login' element={<Login onLogin={handleLogin} />} exact />
        <Route
          path='/chat'
          element={isLoggedIn ? <Chat /> : <Navigate to='/login' replace />}
          exact
        />
        <Route
          path='/adminPage'
          element={
            isLoggedIn && isAdmin ? (
              <AdminPage />
            ) : (
              <Navigate to={isLoggedIn ? '/NotFound' : '/login'} replace />
            )
          }
          exact
        />
        <Route path='*' element={<NotFound />} exact />
      </Routes>
    </Router>
  );
}

export default App;
