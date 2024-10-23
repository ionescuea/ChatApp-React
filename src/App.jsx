import { useState } from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Chat from './components/pages/Chat';
import AdminPage from './components/pages/AdminPage';
import NotFound from './components/pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (isAdmin) => {
    setIsAdmin(isAdmin);
    localStorage.setItem('isAdmin', isAdmin);
  };

  return (
    <Router>
      <NavBar currentPage={window.location.pathname} isAdmin={isAdmin} />
      <Routes>
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='adminPage' element={<AdminPage />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
  )
}

export default App;
