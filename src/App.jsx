import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Chat from './components/pages/Chat';
import AdminPage from './components/pages/AdminPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';


function App() {
  const handlePageChange = (page) => {
    window.location.pathname = page;
  };

  return (
    <Router>
      <NavBar currentPage={window.location.pathname} handlePageChange={handlePageChange} />
      <Routes>
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/adminPage' element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App;
