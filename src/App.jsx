import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Chat from './components/pages/Chat';
import AdminPage from './components/pages/AdminPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='adminPage' element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
